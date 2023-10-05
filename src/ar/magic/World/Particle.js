import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Particles {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time

        this.textures = [
            this.resources.items.redcircle,
            this.resources.items.redcircle2,
            this.resources.items.redstar,
            this.resources.items.redstar2
        ];

        this.particlesCount = 10000;
        this.particlesPerFrame = 10;
        this.isCreating = false;  
        this.speed = 0.01;
        this.currentParticleIndex = 0;
        this.particleAngles = [];  
        this.particleDirections = [];
        this.currentRadius = 1;   
        this.rotationSpeed = 0.02; 

        this.setGeometry();
        this.setMaterial();
        this.setPoints();
    }

    pause() {
        this.isCreating = false;  // Stop particle creation
    }
    
    start() {
        this.isCreating = true;   // Start particle creation
    }
    
    update() {
        const positions = this.geometry.attributes.position.array;
    
        for (let j = 0; j < this.particlesPerFrame; j++) {
            if (this.isCreating && this.currentParticleIndex < this.particlesCount) {
                const theta = this.particleAngles[this.currentParticleIndex];
                const x = this.currentRadius * Math.cos(theta);
                const y = this.currentRadius * Math.sin(theta);
    
                const index = this.currentParticleIndex * 3;
                positions[index] = x;
                positions[index + 1] = y;
                positions[index + 2] = 0;
    
                const textureIndex = this.currentParticleIndex % 4;
                this.geometry.attributes.uvIndex.array[this.currentParticleIndex] = textureIndex;
    
                this.currentParticleIndex++;
            }
        }
    
        for (let i = 0; i < this.currentParticleIndex; i++) {
            const index = i * 3;
    
            // Compute rotation
            const cosTheta = Math.cos(this.rotationSpeed);
            const sinTheta = Math.sin(this.rotationSpeed);
            const x = positions[index];
            const y = positions[index + 1];
            
            // Apply rotation
            positions[index] = x * cosTheta - y * sinTheta;
            positions[index + 1] = x * sinTheta + y * cosTheta;
    
            const direction = this.particleDirections[i];
    
            // Update position
            positions[index] += direction.x * this.speed;
            positions[index + 1] += direction.y * this.speed;
        }
    
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.uvIndex.needsUpdate = true;
    }
    
    setGeometry() {
        this.geometry = new THREE.BufferGeometry();
    
        const vertices = [];
        const uvs = [];
        this.directions = [];
 
    
        for (let i = 0; i < this.particlesCount; i++) {
            vertices.push(0, 0, 0);  // Initial positions will be at the center
            
            const textureIndex = i % 4;
            uvs.push(textureIndex * 1.0);
        
            const theta = 2 * Math.PI * Math.random();  // Generate a random angle for each particle
            this.particleAngles.push(theta);

            const direction = new THREE.Vector2(Math.cos(theta), Math.sin(theta));
        this.particleDirections.push(direction);
        }
    
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setAttribute('uvIndex', new THREE.Float32BufferAttribute(uvs, 1));
    }
    
    setMaterial() {
        const vertexShader = `
            attribute float uvIndex;
            varying float vUvIndex;
            void main() {
                vUvIndex = uvIndex;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = 0.6 * ( 300.0 / -mvPosition.z );
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
    
        const fragmentShader = `
            uniform sampler2D textures[4];
            varying float vUvIndex;
            void main() {
                if (vUvIndex < 0.5) {
                    gl_FragColor = texture2D(textures[0], gl_PointCoord);
                } else if (vUvIndex < 1.5) {
                    gl_FragColor = texture2D(textures[1], gl_PointCoord);
                } else if (vUvIndex < 2.5) {
                    gl_FragColor = texture2D(textures[2], gl_PointCoord);
                } else {
                    gl_FragColor = texture2D(textures[3], gl_PointCoord);
                }
    
                if (gl_FragColor.a < 0.5) discard;
            }
        `;
    
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                textures: { value: this.textures }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false
        });
    }

    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material);
        this.points.position.set(0, 2.2, 0);
        this.scene.add(this.points);
    }

}
    
    
    
    
    
    