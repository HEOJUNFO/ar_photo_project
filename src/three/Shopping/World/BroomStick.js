import * as THREE from 'three'
import Experience from '../Experience.js'

export default class BroomStick
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
      

        // Resource
        this.resource = this.resources.items.stickModel

        this.setModel()
        this.setAnimation()

        this.movementDuration = 0;
        this.startX = 0;

        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
    }


    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, 1, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.experience.clickedObject = this.model;
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

    }

    onTouchStart(event)
    {
        this.startX = event.touches[0].clientX;
    }

    onTouchMove(event)
    {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - this.startX;

        this.model.position.x += deltaX * 0.01;  

        this.startX = currentX;
        this.hasMoved = true;
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)

        if (this.hasMoved) {
            this.movementDuration += this.time.delta * 0.001;  
        }
        if (this.movementDuration >= 6) {
            this.experience.goToNextScene();
            this.movementDuration = 0; 
        }

    
        this.hasMoved = false;
    }
}