import Experience from '../Experience.js'
import Environment from './Environment.js'
import Model from './Model.js'  
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
            this.model = new Model('sorinaModel')
            this.environment = new Environment()
        })
    }

    setHail() {
        this.hailInterval = setInterval(() => { 
            if (this.collisions < 5) { 
                const hail = new Hail();
                this.hails.push(hail);
            } else {
                clearInterval(this.hailInterval); 
            }
        }, 1000);
    }

    update()
    {
        if(this.model){
            this.model.update()
        }
        if(this.hails){
        for (let hail of this.hails) {
            hail.update();

            const foxBox = new THREE.Box3().setFromObject(this.model.model);
            
  
            const originalWidth = foxBox.max.x - foxBox.min.x;
            const reductionAmount = originalWidth * 0.3; 
            foxBox.min.x += reductionAmount;
            foxBox.max.x -= reductionAmount;

                        const hailBox = new THREE.Box3().setFromObject(hail.model);

            if (foxBox.intersectsBox(hailBox)) {
                this.experience.goToNextScene()
                this.scene.remove(hail.model); 
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