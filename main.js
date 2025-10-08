// A-Frame Vite Project - Main JavaScript Entry Point

import 'aframe';

// Wait for A-Frame to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('A-Frame Vite project loaded successfully!');
    
    // Get the scene element
    const scene = document.querySelector('a-scene');
    
    // Add event listeners for scene events
    scene.addEventListener('loaded', () => {
        console.log('A-Frame scene loaded');
        
        // Add some interactive functionality
        addInteractionListeners();
    });
    
    // Function to add interaction listeners
    function addInteractionListeners() {
        // Add click listeners to all interactive objects
        const interactiveObjects = document.querySelectorAll('a-box, a-sphere, a-cylinder');
        
        interactiveObjects.forEach((obj, index) => {
            // Add cursor interaction
            obj.setAttribute('cursor-listener', '');
            
            // Add click event
            obj.addEventListener('click', () => {
                console.log(`Clicked on ${obj.tagName.toLowerCase()} ${index + 1}`);
                
                // Change color on click
                const colors = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4', '#EC407A'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                obj.setAttribute('color', randomColor);
                
                // Add a small animation
                obj.setAttribute('animation', `property: scale; to: 1.2 1.2 1.2; dur: 200; easing: easeInOutQuad; dir: alternate`);
                
                setTimeout(() => {
                    obj.removeAttribute('animation');
                    obj.setAttribute('scale', '1 1 1');
                }, 400);
            });
            
            // Add hover effects
            obj.addEventListener('mouseenter', () => {
                obj.setAttribute('animation', `property: scale; to: 1.1 1.1 1.1; dur: 200; easing: easeInOutQuad`);
            });
            
            obj.addEventListener('mouseleave', () => {
                obj.setAttribute('animation', `property: scale; to: 1 1 1; dur: 200; easing: easeInOutQuad`);
            });
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        switch(event.key.toLowerCase()) {
            case 'r':
                // Reset camera position
                const camera = document.querySelector('#camera');
                camera.setAttribute('position', '0 1.6 0');
                camera.setAttribute('rotation', '0 0 0');
                console.log('Camera reset');
                break;
            case 'l':
                // Toggle lighting
                const ambientLight = document.querySelector('a-light[type="ambient"]');
                const currentIntensity = ambientLight.getAttribute('intensity');
                const newIntensity = currentIntensity === 0.4 ? 0.1 : 0.4;
                ambientLight.setAttribute('intensity', newIntensity);
                console.log(`Ambient light intensity: ${newIntensity}`);
                break;
        }
    });
    
    // Add some console instructions
    console.log(`
🎮 Controls:
- WASD: Move around
- Mouse: Look around
- Click: Interact with objects
- R: Reset camera
- L: Toggle lighting
    `);
});

// Export for potential use in other modules
export default {
    version: '1.0.0',
    description: 'A-Frame VR project with Vite'
};
