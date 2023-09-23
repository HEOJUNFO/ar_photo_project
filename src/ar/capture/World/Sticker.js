import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Sticker
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.isMoving = false
        
        this.setTextures('bellBody')

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        // Add event listeners
        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.touchStartPosition = new THREE.Vector2();

    }

    setGeometry()    {
        this.geometry = new THREE.PlaneGeometry(this.texture.image.width * 0.0003, this.texture.image.height * 0.0003);
        
    }
    setTextures(name) {
        
        this.texture =  this.resources.items[name]
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.colorSpace = THREE.SRGBColorSpace;
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        })
        this.material.transparent = true
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.scale.set(2, 2, 0.1)
        this.mesh.position.set(0.75, 1.5, 0)
        this.scene.add(this.mesh)
        this.experience.clickedObject.push(this.mesh);
        
    }
    onTouchStart(event) {
        if (this.isMoving) {
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        }
    }

    onTouchMove(event) {
        if (this.isMoving) {
            // Calculate touch move delta
            const deltaX = event.touches[0].clientX - this.touchStartPosition.x;
            const deltaY = event.touches[0].clientY - this.touchStartPosition.y;

            // Convert screen movement to world units (This may need adjustment based on your camera setup)
            const factor = 0.01;  // Adjust this based on the sensitivity you want.
            this.mesh.position.x += deltaX * factor;
            this.mesh.position.y -= deltaY * factor; // Y is inverted in the screen coordinates.

            // Update the starting position
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
            this.totalMoveDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        }
    }

    onTouchEnd() {
      
        this.isMoving = false;
        this.totalMoveDistance = 0;
    }
   
    update() {

      }
    }
    
    
    
    
    
    