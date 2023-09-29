import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(name)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items[name]
        
        this.isMoving = false

        this.initialPinchDistance = 0;
        this.initialScale = new THREE.Vector3();

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);

        // Add event listeners
        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.touchStartPosition = new THREE.Vector2();

        
        this.setModel()
        this.setAnimation()
      
    }

    setModel()
    {
        this.model = this.resource.scene || this.resource.scenes[0]
        this.model.scale.set(2, 2, 2)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.name = 'model'
                child.material.depthWrite = !child.material.transparent
                this.experience.clickedObject.push(child);
            }
            if(child.isMesh && child.morphTargetInfluences)
            {
               console.log(child.morphTargetDictionary)
            }
        
        })
 this.experience.clickedObject.push(this.model);
    }

    setAnimation()
    {
        this.clips = this.resource.animations || []
        this.mixer = new THREE.AnimationMixer(this.model)
 

        this.clips.forEach((clip) =>{
                this.mixer.timeScale = 1.0;
                 this.mixer.clipAction(clip).reset().play();

        })
    }


    onTouchStart(event) {
        if (this.isMoving) {
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        }
        if (event.touches.length === 2&& this.isMoving) {
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            this.initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
            this.initialScale.copy(this.model.scale);
          }
    }

    onTouchMove(event) {
        if (this.isMoving) {

            const deltaX = event.touches[0].clientX - this.touchStartPosition.x;
            const deltaY = event.touches[0].clientY - this.touchStartPosition.y;

            const factor = 0.01;  
            this.model.position.x += deltaX * factor;
            this.model.position.y -= deltaY * factor; 

            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);

            if (event.touches.length === 2 && this.isMoving) {
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = distance / this.initialPinchDistance;
                this.model.scale.copy(this.initialScale).multiplyScalar(scale);
        }
        }
    }

    onTouchEnd() {
      
        this.isMoving = false;

    }

    update()
    {
       this.mixer && this.mixer.update(this.time.delta * 0.001)
    }
}