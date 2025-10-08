# A-Frame VR Project with Vite

A modern A-Frame VR project built with Vite for fast development and optimized builds.

## Features

- ⚡ **Vite** - Lightning fast build tool
- 🥽 **A-Frame 1.7.0** - WebVR framework
- 🎮 **Interactive 3D Scene** - Click and hover interactions
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Beautiful UI** - Modern gradient background and overlay
- 🌟 **Animations** - Smooth object animations and interactions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Controls

- **WASD Keys** - Move around the scene
- **Mouse** - Look around (first-person view)
- **Click** - Interact with 3D objects
- **R Key** - Reset camera position
- **L Key** - Toggle ambient lighting

## Scene Contents

The scene includes:
- A colorful ground plane
- Interactive 3D objects (box, sphere, cylinder)
- Dynamic lighting system
- Welcome text
- Smooth animations and hover effects

## Project Structure

```
├── index.html          # Main HTML file with A-Frame scene
├── main.js            # JavaScript entry point and interactions
├── vite.config.js     # Vite configuration
├── package.json       # Project dependencies and scripts
└── README.md         # This file
```

## Technologies Used

- **A-Frame 1.7.0** - WebVR framework
- **Vite 5.0** - Build tool and dev server
- **HTML5** - Scene structure
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Interactive functionality

## Browser Compatibility

This project works in all modern browsers that support WebGL:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## VR Support

For VR experiences, use:
- **WebXR** compatible browsers
- **VR headsets** (Oculus, HTC Vive, etc.)
- **Mobile VR** (Google Cardboard, etc.)

## Customization

### Adding New Objects

Add new 3D objects to the scene in `index.html`:

```html
<a-box position="0 1 -5" color="#FF6B6B"></a-box>
```

### Styling

Modify the CSS in `index.html` or create separate CSS files for custom styling.

### Interactions

Add new interactions in `main.js` by extending the event listeners.

## Troubleshooting

### Common Issues

1. **Objects not loading**: Check browser console for errors
2. **Performance issues**: Reduce object count or complexity
3. **VR not working**: Ensure WebXR is supported and enabled

### Getting Help

- [A-Frame Documentation](https://aframe.io/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [WebXR Documentation](https://immersiveweb.dev/)

## License

MIT License - feel free to use this project for learning and development!
