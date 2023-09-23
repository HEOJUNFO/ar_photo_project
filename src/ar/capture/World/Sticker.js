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
 
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        // Add event listeners
        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.touchStartPosition = new THREE.Vector2();

        this.setTextures()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()

    }

    onTouchStart(event) {
        if (this.isMoving) {
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        }
    }

    onTouchMove(event) {
        if (this.isMoving) {
          
            const deltaX = event.touches[0].clientX - this.touchStartPosition.x;
            const deltaY = event.touches[0].clientY - this.touchStartPosition.y;

         
            const factor = 0.01; 
            this.mesh.position.x += deltaX * factor;
            this.mesh.position.y -= deltaY * factor; 

         
        }
    }

    onTouchEnd() {  
        this.isMoving = false;
    }

    setGeometry()    {
  
        this.geometry = new THREE.PlaneGeometry(this.texture.image.width * 0.0003, this.texture.image.height * 0.0003);
        
    }
    setTextures() {
        
        this.texture =  this.resources.items.bellNormal
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.colorSpace = THREE.SRGBColorSpace;

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
        this.mesh.scale.set(1, 1, 0.1)
        this.mesh.position.set(0.75, 1.5, 0)
        this.scene.add(this.mesh)
        this.experience.clickedObject.push(this.mesh);
    }

   
    update() {

      }
    }
    
    
    
    
    
    