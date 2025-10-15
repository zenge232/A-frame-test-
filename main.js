// A-Frame Vite Project - Main JavaScript Entry Point

// Wait for A-Frame to be fully loaded before registering components
document.addEventListener('DOMContentLoaded', () => {
    // Register gradient shader for beautiful skybox
    AFRAME.registerShader('gradient', {
        schema: {
            topColor: { type: 'color', default: '#FF5F6D' },
            bottomColor: { type: 'color', default: '#FFC371' },
            offset: { type: 'number', default: 33 },
            exponent: { type: 'number', default: 0.6 }
        },
        init: function () {
            const data = this.data;
            const geometry = this.el.getObject3D('mesh').geometry;
            const material = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec3 vWorldPosition;
                    void main() {
                        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                        vWorldPosition = worldPosition.xyz;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 topColor;
                    uniform vec3 bottomColor;
                    uniform float offset;
                    uniform float exponent;
                    varying vec3 vWorldPosition;
                    void main() {
                        float h = normalize(vWorldPosition + offset).y;
                        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                    }
                `,
                uniforms: {
                    topColor: { type: 'c', value: new THREE.Color(data.topColor) },
                    bottomColor: { type: 'c', value: new THREE.Color(data.bottomColor) },
                    offset: { type: 'f', value: data.offset },
                    exponent: { type: 'f', value: data.exponent }
                },
                side: THREE.BackSide
            });
            this.el.getObject3D('mesh').material = material;
        }
    });

    console.log('A-Frame Vite project loaded successfully!');
    
    // Get the scene element
    const scene = document.querySelector('a-scene');
    
    // Add event listeners for scene events
    scene.addEventListener('loaded', () => {
        console.log('A-Frame scene loaded');
        
        // Check if GLB model loaded successfully
        checkModelLoading();
        
        // Add some interactive functionality
        addInteractionListeners();
    });

    // Function to check if the GLB models loaded successfully
    function checkModelLoading() {
        const alarmClock = document.querySelector('#retro-alarm-clock');
        const fallbackClock = document.querySelector('#fallback-clock');
        const newModel = document.querySelector('#model-7-22-2025');
        const fallbackNewModel = document.querySelector('#fallback-model');
        const shellModel = document.querySelector('#shell-model');
        const fallbackShell = document.querySelector('#fallback-shell');
        const loadingStatus = document.querySelector('#loading-status');
        
        let modelsLoaded = 0;
        let totalModels = 3;
        
        // Check alarm clock model
        setTimeout(() => {
            const alarmModel = alarmClock.getObject3D('mesh');
            
            if (!alarmModel || !alarmModel.children || alarmModel.children.length === 0) {
                console.warn('Alarm clock GLB model failed to load, showing fallback geometry');
                fallbackClock.setAttribute('visible', 'true');
                alarmClock.setAttribute('gltf-model', '');
            } else {
                console.log('Alarm clock GLB model loaded successfully!');
                console.log('Alarm clock model children:', alarmModel.children.length);
                
                // Auto-scale if needed
                const boundingBox = new THREE.Box3().setFromObject(alarmModel);
                const size = boundingBox.getSize(new THREE.Vector3());
                console.log('Alarm clock model size:', size);
                
                if (size.length() < 0.5) {
                    alarmClock.setAttribute('scale', '1.6 1.6 1.6');
                    console.log('Alarm clock model scaled up (was too small)');
                } else if (size.length() > 5) {
                    alarmClock.setAttribute('scale', '0.4 0.4 0.4');
                    console.log('Alarm clock model scaled down (was too large)');
                }
            }
            modelsLoaded++;
            updateLoadingStatus();
        }, 2000);
        
        // Check new model
        setTimeout(() => {
            const newModelMesh = newModel.getObject3D('mesh');
            
            if (!newModelMesh || !newModelMesh.children || newModelMesh.children.length === 0) {
                console.warn('New GLB model failed to load, showing fallback geometry');
                fallbackNewModel.setAttribute('visible', 'true');
                newModel.setAttribute('gltf-model', '');
            } else {
                console.log('New GLB model loaded successfully!');
                console.log('New model children:', newModelMesh.children.length);
                
                // Auto-scale if needed
                const boundingBox = new THREE.Box3().setFromObject(newModelMesh);
                const size = boundingBox.getSize(new THREE.Vector3());
                console.log('New model size:', size);
                
                if (size.length() < 0.5) {
                    newModel.setAttribute('scale', '2 2 2');
                    console.log('New model scaled up (was too small)');
                } else if (size.length() > 5) {
                    newModel.setAttribute('scale', '0.3 0.3 0.3');
                    console.log('New model scaled down (was too large)');
                }
            }
            modelsLoaded++;
            updateLoadingStatus();
        }, 3000);
        
        // Check shell model
        setTimeout(() => {
            const shellModelMesh = shellModel.getObject3D('mesh');
            
            if (!shellModelMesh || !shellModelMesh.children || shellModelMesh.children.length === 0) {
                console.warn('Shell GLB model failed to load, showing fallback geometry');
                fallbackShell.setAttribute('visible', 'true');
                shellModel.setAttribute('gltf-model', '');
            } else {
                console.log('Shell GLB model loaded successfully!');
                console.log('Shell model children:', shellModelMesh.children.length);
                
                // Auto-scale if needed
                const boundingBox = new THREE.Box3().setFromObject(shellModelMesh);
                const size = boundingBox.getSize(new THREE.Vector3());
                console.log('Shell model size:', size);
                
                if (size.length() < 0.3) {
                    shellModel.setAttribute('scale', '4 4 4');
                    console.log('Shell model scaled up (was too small)');
                } else if (size.length() > 3) {
                    shellModel.setAttribute('scale', '0.4 0.4 0.4');
                    console.log('Shell model scaled down (was too large)');
                }
            }
            modelsLoaded++;
            updateLoadingStatus();
        }, 4000);
        
        function updateLoadingStatus() {
            if (modelsLoaded === totalModels) {
                loadingStatus.textContent = 'All models loaded successfully!';
                loadingStatus.style.color = '#4caf50';
            } else {
                loadingStatus.textContent = `Loading models... ${modelsLoaded}/${totalModels}`;
            }
        }
    }
    
    // Function to add interaction listeners
    function addInteractionListeners() {
        // Add special interaction for the alarm clock
        const alarmClock = document.querySelector('#retro-alarm-clock');
        if (alarmClock) {
            alarmClock.addEventListener('click', () => {
                console.log('Clicked on Retro Sony Alarm Clock!');
                
                // Toggle rotation animation
                const currentAnimation = alarmClock.getAttribute('animation');
                if (currentAnimation) {
                    alarmClock.removeAttribute('animation');
                    console.log('Alarm clock rotation stopped');
                } else {
                    alarmClock.setAttribute('animation', 'property: rotation; to: 0 375 0; loop: true; dur: 15000; easing: linear');
                    console.log('Alarm clock rotation started');
                }
                
                // Add click feedback animation
                alarmClock.setAttribute('animation__click', 'property: scale; to: 0.9 0.9 0.9; dur: 200; easing: easeInOutQuad; dir: alternate');
                
                setTimeout(() => {
                    alarmClock.removeAttribute('animation__click');
                }, 400);
            });
            
            // Add hover effect for alarm clock
            alarmClock.addEventListener('mouseenter', () => {
                alarmClock.setAttribute('animation__hover', 'property: scale; to: 0.85 0.85 0.85; dur: 200; easing: easeInOutQuad');
            });
            
            alarmClock.addEventListener('mouseleave', () => {
                alarmClock.removeAttribute('animation__hover');
            });
        }
        
        // Add special interaction for the new model
        const newModel = document.querySelector('#model-7-22-2025');
        if (newModel) {
            newModel.addEventListener('click', () => {
                console.log('Clicked on 7/22/2025 Model!');
                
                // Toggle rotation animation
                const currentAnimation = newModel.getAttribute('animation');
                if (currentAnimation) {
                    newModel.removeAttribute('animation');
                    console.log('New model rotation stopped');
                } else {
                    newModel.setAttribute('animation', 'property: rotation; to: 0 -345 0; loop: true; dur: 18000; easing: linear');
                    console.log('New model rotation started');
                }
                
                // Add click feedback animation
                newModel.setAttribute('animation__click', 'property: scale; to: 1.1 1.1 1.1; dur: 200; easing: easeInOutQuad; dir: alternate');
                
                setTimeout(() => {
                    newModel.removeAttribute('animation__click');
                }, 400);
            });
            
            // Add hover effect for new model
            newModel.addEventListener('mouseenter', () => {
                newModel.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; dur: 200; easing: easeInOutQuad');
            });
            
            newModel.addEventListener('mouseleave', () => {
                newModel.removeAttribute('animation__hover');
            });
        }
        
        // Add special interaction for the shell model
        const shellModelEntity = document.querySelector('#shell-model');
        if (shellModelEntity) {
            shellModelEntity.addEventListener('click', () => {
                console.log('Clicked on Large Shell!');
                
                // Toggle rotation animation
                const currentAnimation = shellModelEntity.getAttribute('animation');
                if (currentAnimation) {
                    shellModelEntity.removeAttribute('animation');
                    console.log('Shell rotation stopped');
                } else {
                    shellModelEntity.setAttribute('animation', 'property: rotation; to: 0 405 0; loop: true; dur: 12000; easing: linear');
                    console.log('Shell rotation started');
                }
                
                // Add click feedback animation
                shellModelEntity.setAttribute('animation__click', 'property: scale; to: 2.2 2.2 2.2; dur: 200; easing: easeInOutQuad; dir: alternate');
                
                setTimeout(() => {
                    shellModelEntity.removeAttribute('animation__click');
                }, 400);
            });
            
            // Add hover effect for shell
            shellModelEntity.addEventListener('mouseenter', () => {
                shellModelEntity.setAttribute('animation__hover', 'property: scale; to: 2.1 2.1 2.1; dur: 200; easing: easeInOutQuad');
            });
            
            shellModelEntity.addEventListener('mouseleave', () => {
                shellModelEntity.removeAttribute('animation__hover');
            });
        }
        
        // All three models now have interactive features
    }
    
    // Beach sky colors for cycling
    const skyColors = [
        '#87CEEB', // Sky blue (default beach)
        '#FFB347', // Peach sunset
        '#FF6B6B', // Coral red
        '#4ECDC4', // Teal ocean
        '#45B7D1', // Deep blue
        '#FFE4B5', // Sandy beige
        '#FFD700', // Golden hour
        '#FFA07A'  // Light salmon
    ];
    
    let currentColorIndex = 0;
    
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
            case 'g':
                // Cycle through beach sky colors
                currentColorIndex = (currentColorIndex + 1) % skyColors.length;
                const color = skyColors[currentColorIndex];
                const sky = document.querySelector('#beach-sky');
                sky.setAttribute('color', color);
                console.log(`Beach sky color changed to: ${color}`);
                break;
        }
    });
    
    // Add some console instructions
    console.log(`
🎮 Controls:
- WASD: Move around
- Mouse: Look around
- Click Alarm Clock: Toggle rotation animation
- Click 7/22/2025 Model: Toggle rotation animation
- Click Large Shell: Toggle rotation animation
- R: Reset camera
- L: Toggle lighting
- G: Cycle through sky colors

🌊 Beach Sky Colors:
- Sky Blue (default beach)
- Peach Sunset
- Coral Red
- Teal Ocean
- Deep Blue
- Sandy Beige
- Golden Hour
- Light Salmon

🏖️ Beach Scene Features:
- Retro Sony Alarm Clock on sandy beach
- 7/22/2025 GLB Model on sandy beach
- Large Shell model (4x bigger!)
- Animated ocean waves with foam
- Swaying palm trees
- Beach rocks and seashells
- Floating clouds and rotating sun
- Interactive rotation control for all models
- Smooth hover effects
- Shadow casting and receiving
- Tropical beach atmosphere
    `);
});

// Export for potential use in other modules
export default {
    version: '1.0.0',
    description: 'A-Frame VR project with Vite'
};