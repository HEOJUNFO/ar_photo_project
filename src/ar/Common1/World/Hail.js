import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Hail {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resource = this.resources.items.iceHailA;
        this.resource2 = this.resources.items.iceHailB;
        this.setModel();
    }

    setModel()
    {
        const randomResource = Math.random() < 0.5 ? this.resource : this.resource2;

        this.model = randomResource.scene.clone();
        this.model.scale.set(0.3, 0.3, 0.3)
        this.model.position.set(Math.random() * 4.5 - 2.25, 5, 0)
        this.model.rotation.x = Math.random() * 2 * Math.PI;
        this.model.rotation.y = Math.random() * 2 * Math.PI;
        this.model.rotation.z = Math.random() * 2 * Math.PI;
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
   
                // child.material.roughness = 0
                // child.material.metalness = 0.3
            }
           
        })
    }


    update() {
        this.model.position.y -= 0.08

        if (this.model.position.y < -100) {
            this.scene.remove(this.mesh);
        }
    }
}