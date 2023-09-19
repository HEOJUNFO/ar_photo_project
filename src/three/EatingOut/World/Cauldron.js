import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cauldron
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
       

        // Resource
        this.resource = this.resources.items.cauldronCloseModel
       
        this.setModel()


    
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.set(0, -0.2, 0)
        this.scene.add(this.model)
        console.log(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.experience.clickedObject.push( this.model);
    }

    

    update()
    {
        
    }
}