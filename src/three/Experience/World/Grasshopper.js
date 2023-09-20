import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Grasshopper
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items.grasshopper

        this.setModel()
        this.setBoundingBoxMesh()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(5, 5, 5)
        this.model.position.set(-100, 59, -40)
        this.model.rotation.set(0, Math.PI/2, 0)
        this.scene.add(this.model)
        

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    
    }
    setBoundingBoxMesh()
    {
       
        this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set(-100, 59, -40)
        this.scene.add( this.mesh );


    }

    

    update()
    {
     
    }
}