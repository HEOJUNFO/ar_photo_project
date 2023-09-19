import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Uno
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time


        // Resource
        this.resource = this.resources.items.unoModel1

        
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