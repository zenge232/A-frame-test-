// Simplified A-Frame test - Main JavaScript Entry Point

console.log('Simple A-Frame test script loaded!');

// Wait for A-Frame to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Simple version');
    
    // Get the scene element
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('Scene element not found!');
        return;
    }
    
    // Add event listeners for scene events
    scene.addEventListener('loaded', () => {
        console.log('A-Frame scene loaded successfully!');
        
        // Update status
        const status = document.querySelector('#loading-status');
        if (status) {
            status.textContent = 'Scene loaded successfully!';
            status.style.color = '#4caf50';
        }
    });
    
    // Simple interaction test
    const cube = document.querySelector('a-box');
    if (cube) {
        cube.addEventListener('click', () => {
            console.log('Cube clicked!');
            
            // Change color on click
            const colors = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4', '#EC407A'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            cube.setAttribute('color', randomColor);
            
            console.log(`Cube color changed to: ${randomColor}`);
        });
        
        // Add hover effect
        cube.addEventListener('mouseenter', () => {
            cube.setAttribute('scale', '1.1 1.1 1.1');
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.setAttribute('scale', '1 1 1');
        });
    }
});

// Export for potential use in other modules
export default {
    version: '1.0.0',
    description: 'Simple A-Frame test'
};
