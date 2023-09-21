import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Tree
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Resource
        this.resource = this.resources.items.treeModel

        this.setModel()


       
    }

   

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(2, 2, 2)
        this.model.position.set(0, 2.2, -2)
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

   

    update()
    {
        
    }
}