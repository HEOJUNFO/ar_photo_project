import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Hail {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resource = this.resources.items.iceHailA;

        this.setModel();
    }

    setModel()
    {
        this.model = this.resource.scene.clone()
        this.model.scale.set(0.7, 0.7, 0.7)
        this.model.position.set(Math.random() * 3 - 1.5, 5, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }


    update() {
        this.model.position.y -= 0.03

        if (this.model.position.y < -100) {
            this.scene.remove(this.mesh);
        }
    }
}