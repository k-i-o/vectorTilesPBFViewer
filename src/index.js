import "./style.css";
import { VectorTile } from "@mapbox/vector-tile";
import JSONFormatter from "json-formatter-js";
import Protobuf from "pbf";

const fileInput = document.getElementById('fileInput');
const clearResultsButton = document.getElementById('clearResults');
const urlInput = document.getElementById('urlInput');
const loadFromUrlButton = document.getElementById('loadFromUrl');
const statusDiv = document.getElementById('status');
const jsonDiv = document.getElementById('json');

function showStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
}

function clearResults() {
    jsonDiv.innerHTML = '';
    statusDiv.textContent = '';
    statusDiv.className = 'status';
}

function processVectorTile(arrayBuffer) {
    try {
        const tile = new VectorTile(new Protobuf(arrayBuffer));
        
        showStatus('Vector tile loaded successfully!', 'success');

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';

        const layersInfo = document.createElement('div');
        layersInfo.className = 'layers-info';
        layersInfo.innerHTML = `<h3>Available Layers (${Object.keys(tile.layers).length}):</h3>`;
        
        const layersList = document.createElement('ul');
        Object.keys(tile.layers).forEach(layerName => {
            const layer = tile.layers[layerName];
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${layerName}</strong>: ${layer.length} features`;
            layersList.appendChild(listItem);
        });
        layersInfo.appendChild(layersList);
        resultsContainer.appendChild(layersInfo);

        const firstLayerName = Object.keys(tile.layers)[0];
        if (firstLayerName && tile.layers[firstLayerName].length > 0) {
            const firstFeature = tile.layers[firstLayerName].feature(0);
            const featureGeoJSON = firstFeature.toGeoJSON();
            
            const featureTitle = document.createElement('h3');
            featureTitle.textContent = `Sample Feature from "${firstLayerName}" layer:`;
            resultsContainer.appendChild(featureTitle);

            const formatter = new JSONFormatter(featureGeoJSON, 2, { theme: "dark" });
            resultsContainer.appendChild(formatter.render());
        }

        jsonDiv.appendChild(resultsContainer);

    } catch (error) {
        console.error('Error processing vector tile:', error);
        showStatus(`Error processing vector tile: ${error.message}`, 'error');
    }
}

async function loadFromUrl(url) {
    try {
        showStatus('Loading tile from URL...', 'loading');
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        processVectorTile(arrayBuffer);
        
    } catch (error) {
        console.error('Error loading tile from URL:', error);
        showStatus(`Error loading tile: ${error.message}`, 'error');
    }
}

function loadFromFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        processVectorTile(e.target.result);
    };
    
    reader.onerror = function() {
        showStatus('Error reading file', 'error');
    };
    
    showStatus('Reading file...', 'loading');
    reader.readAsArrayBuffer(file);
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        clearResults();
        loadFromFile(file);
    }
});

loadFromUrlButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (url) {
        clearResults();
        loadFromUrl(url);
    } else {
        showStatus('Please enter a valid URL', 'error');
    }
});

urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const url = urlInput.value.trim();
        if (url) {
            clearResults();
            loadFromUrl(url);
        } else {
            showStatus('Please enter a valid URL', 'error');
        }
    }
});

clearResultsButton.addEventListener('click', clearResults);

showStatus('Ready! Load a .pbf file or click "Load Default Tile" to start.');
