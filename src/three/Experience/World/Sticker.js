import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Sticker
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.currentTextureIndex = 0;
        
        
        

        this.isMoving = false
        this.minimalMoveDistance = 5; 
    this.totalMoveDistance = 0;

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
        if (this.isMoving && this.totalMoveDistance <= this.minimalMoveDistance) {
            this.swapTexture();
        }
        this.isMoving = false;
        this.totalMoveDistance = 0;
    }

    setGeometry()    {
  
        this.geometry = new THREE.PlaneGeometry(this.texture.image.width * 0.0003, this.texture.image.height * 0.0003);
        
    }

    setTextures() {
        
        if(this.experience.textureKeys.length > 0){
        const currentKey = this.experience.textureKeys[this.currentTextureIndex];
        this.texture = this.resources.items[currentKey];
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.colorSpace = THREE.SRGBColorSpace;
        } else {
            this.texture = this.resources.items['bellBody'];
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.colorSpace = THREE.SRGBColorSpace;

        }

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
        this.mesh.scale.set(1, 2, 0.1)
        this.mesh.position.set(0.75, 1.5, 0)
        this.scene.add(this.mesh)
        this.experience.clickedObject.push(this.mesh);
    }

    pushBellTexture(){
       
        this.experience.textureKeys.push('bellBody');
        this.experience.textureKeys.push('bellNormal');
        this.experience.textureKeys.push('bellHappy');
        this.experience.textureKeys.push('bellWelcome');
        this.experience.textureKeys.push('bellSad');
      

       
    }

    pushSorinaTexture(){    
        this.experience.textureKeys.push('sorinaBody');
        this.experience.textureKeys.push('sorinaNormal');
        this.experience.textureKeys.push('sorinaHappy');
        this.experience.textureKeys.push('sorinaWelcome');
        this.experience.textureKeys.push('sorinaSad');
    
        
    }
    pushUnoTexture(){
        this.experience.textureKeys.push('unoBody');
        this.experience.textureKeys.push('unoNormal');
        this.experience.textureKeys.push('unoHappy');
        this.experience.textureKeys.push('unoWelcome');
        this.experience.textureKeys.push('unoSad');
    
 
    }

    swapTexture() {
        this.currentTextureIndex++;
        if (this.currentTextureIndex >= this.experience.textureKeys.length) {
            this.currentTextureIndex = 0; 
        }

 
        this.setTextures(); 
        this.material.map = this.texture;
        this.material.toneMapped = false;
        this.material.needsUpdate = true; 
   
    }

    update() {

      }
    }
    
    
    
    
    
    