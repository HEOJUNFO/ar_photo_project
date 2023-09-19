import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Sorina
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
    
        // Resource
        this.resource = this.resources.items.sorinaModel1

        // this.setModel()
        // this.setAnimation()

    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, 0.7, 0)
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
        
        Object.values(this.animation.actions).forEach(action => action.play())

        this.animation.play = (name) =>
        {
            if (name === "all") {
                Object.values(this.animation.actions).forEach(action => {
                    action.reset()
                    action.play()
                });
            } else {
                const action = this.animation.actions[name]
                action.reset()
                action.play()
            }
        }

    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}