import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Hail {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.geometry = new THREE.SphereGeometry(0.1, 16, 16);
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // White color
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.mesh.position.y = 10;
        this.mesh.position.x = Math.random() * 3 - 1.5;
    }

    update() {
        this.mesh.position.y -= 0.05;

        if (this.mesh.position.y < -10) {
            this.scene.remove(this.mesh);
        }
    }
}