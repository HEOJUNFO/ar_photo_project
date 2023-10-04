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

        this.particlesCount = 1000;
        this.speed = 0.02;
        this.lifetime = 1000; // 이 값을 조절하여 파티클이 사라지는 시간을 설정
        this.startTime = 0;
        this.someInterval = 1;
        this.emitted = new Array(this.particlesCount).fill(true);

        this.startTimes = [];


        this.setGeometry();
        this.setMaterial();
        this.setPoints();
    }

    pause() {
        for (let i = 0; i < this.particlesCount; i++) {
            this.emitted[i] = false;
        }
    }

    start() {
        let currentTime = this.time.elapsed * 0.1;
        for (let i = 0; i < this.particlesCount; i++) {
            this.emitted[i] = true;
            this.startTimes[i] = currentTime + i * this.someInterval;
        }
    }
    

    setGeometry() {
        this.geometry = new THREE.BufferGeometry();
    
        const vertices = [];
        const uvs = [];
        this.directions = []; 
    
        for (let i = 0; i < this.particlesCount; i++) {
            vertices.push(0, 0, 0);
    
            const textureIndex = i % 4;
            uvs.push(textureIndex * 1.0);
    
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            
            const dir = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi)
            );
            this.directions.push(dir);

            this.startTimes.push(this.startTime + i * this.someInterval);
        }
    
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setAttribute('uvIndex', new THREE.Float32BufferAttribute(uvs, 1));
    }

    update() {
        let currentTime = this.time.elapsed * 0.1;
        const positions = this.geometry.attributes.position.array;
    
        for (let i = 0; i < this.particlesCount; i++) {
            const index = i * 3;
    
            if (currentTime - this.startTimes[i] >= this.lifetime) {
                positions[index] = 0;
                positions[index + 1] = 0;
                positions[index + 2] = 0;
                this.startTimes[i] += this.lifetime;
                continue;
            } else if (currentTime < this.startTimes[i] || !this.emitted[i]) {
                continue; // Particle hasn't started yet or is not allowed to be emitted
            }
    
            const dir = this.directions[i];
            positions[index] += dir.x * this.speed;
            positions[index + 1] += dir.y * this.speed;
            positions[index + 2] += dir.z * this.speed;
        }
    
        this.geometry.attributes.position.needsUpdate = true;
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
        // this.scene.add(this.points);
  
    }

}
    
    
    
    
    
    