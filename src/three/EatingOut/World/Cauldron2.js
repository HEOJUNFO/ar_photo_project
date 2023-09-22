import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cauldron2
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
       

        // Resource
        this.resource = this.resources.items.cauldronOpenModel
       
        this.setModel()
    this.setAnimation()
      
    
    }

    setVisible(){
        this.model.visible = !this.model.visible;
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, -0.2, 0)
        this.model.rotation.set(0, Math.PI, 0)
        this.scene.add(this.model)
    
        this.model.visible = false;

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.experience.clickedObject.push( this.model);
    }
    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
       
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
    

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}