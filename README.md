# Vector Tile Viewer

A simple and modern web application to visualize and explore vector tile (.pbf) files. Built with Vite.js and modern web technologies.

## 🚀 Live Demo

Visit the live application: [https://k-i-o.github.io/vectorTilesPBFViewer/](https://k-i-o.github.io/vectorTilesPBFViewer/)

## ✨ Features

- **Upload .pbf files** from your computer
- **Load from custom URLs** - Enter any URL pointing to a .pbf file
- **Default tile loading** - Test with a pre-configured endpoint
- **Layer visualization** - See all available layers and feature counts
- **GeoJSON preview** - View sample features formatted as GeoJSON
- **Responsive design** - Works on desktop and mobile devices
- **Dark theme** - Easy on the eyes interface

## 🛠️ Technologies

- **Vite.js** - Fast build tool and dev server
- **@mapbox/vector-tile** - Vector tile parsing
- **json-formatter-js** - Beautiful JSON visualization
- **pbf** - Protocol buffer handling

## 🏃‍♂️ Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Clone the repository
git clone https://github.com/k-i-o/vectorTilesPBFViewer.git

# Navigate to project directory
cd vectorTilesPBFViewer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📦 Usage

1. **Load Default Tile**: Click "Load Default Tile" to test with the default endpoint
2. **Upload File**: Use the file input to upload your own .pbf files
3. **Custom URL**: Enter any URL pointing to a .pbf file and click "Load from URL"
4. **Clear Results**: Clear the current results to start fresh

## 🌐 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/k-i-o/vectorTilesPBFViewer/issues).

---

Made with ❤️ using Vite.js