import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Hail from './Hail.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.hails = [];
        this.collisions = 0;

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.fox = new Fox()
            this.hailInterval = setInterval(() => { 
                if (this.collisions < 5) { 
                    const hail = new Hail();
                    this.hails.push(hail);
                } else {
                    clearInterval(this.hailInterval); 
                }
            }, 500);
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox){
            this.fox.update()
        }
        if(this.hails){
        for (let hail of this.hails) {
            hail.update();

            const foxBox = new THREE.Box3().setFromObject(this.fox.model);
            const hailBox = new THREE.Box3().setFromObject(hail.mesh);

            if (foxBox.intersectsBox(hailBox)) {
                this.experience.goToNextScene()
                this.scene.remove(hail.mesh); 
                const index = this.hails.indexOf(hail);
                if (index > -1) this.hails.splice(index, 1); 

                this.collisions++;
                if (this.collisions >= 5) {
                    clearInterval(this.hailInterval); 
                }
            }
        }
    }
    }
}