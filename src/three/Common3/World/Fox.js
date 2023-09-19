import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
     
        // Resource
        this.resource = this.resources.items.foxModel


        this.setModel()
        this.setAnimation()

        this.path = [];
        this.isFollowingPath = false;
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.005, 0.005, 0.005)
        this.model.position.set(Math.random() * 3 - 1.5, 0, 0)
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

    followPath(path) {
        this.path = path;
        this.isFollowingPath = true;
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)

        if(this.isFollowingPath) {
            if(this.path && this.path.length > 0) {
                const nextPosition = this.path[this.path.length - 1]; 
                this.model.position.lerp(nextPosition, 0.02); 
        
                if(this.model.position.distanceToSquared(nextPosition) < 0.01) {
                    this.path.shift(); 
                }
            }
        }
    }
}