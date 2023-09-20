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
    
        // Resource
        this.resource = this.resources.items.Tree

        this.setModel()
   
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(100, 100, 100)
        this.model.position.set(-100, 40, 0)
        this.model.rotation.set(0, Math.PI/2, 0)
        this.scene.add(this.model)

        this.mesh = this.model.children[0]
      

        this.mesh.material = new THREE.MeshBasicMaterial({
            color: 0xff0000, // red color
            wireframe: true
        });

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    dispose(){
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();
        this.scene.remove(this.model);
    }

    update()
    {
       
    }
}