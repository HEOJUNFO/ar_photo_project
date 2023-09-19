import Experience from '../Experience.js'
import Environment from './Environment.js'
import Avocado from './Avocado.js'
import BlueBerry from './BlueBerry.js'
import Peach from './Peach.js'
import Cauldron from './Cauldron.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.wasIntersecting = false; 
    

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.avocado = new Avocado()
            this.blueBerry = new BlueBerry()
            this.peach = new Peach()
            this.environment = new Environment()
            this.cauldron = new Cauldron()
        })
    }


    update()
    {
        if(this.avocado){
            this.avocado.update()}
       if(this.blueBerry){
            this.blueBerry.update()}
         if(this.peach){
            this.peach.update()}

        if(this.cauldron && this.avocado && this.blueBerry && this.peach){
            const isCurrentlyIntersecting = 
            this.isIntersecting(this.cauldron.model, this.avocado.model) ||
            this.isIntersecting(this.cauldron.model, this.blueBerry.model) ||
            this.isIntersecting(this.cauldron.model, this.peach.model);

       
        if (this.wasIntersecting !== isCurrentlyIntersecting) {
            this.cauldron.changeModel();
            this.wasIntersecting = isCurrentlyIntersecting; 
        }
        }
     }
    
    getBoundingBox(object) {
        const boundingBox = new THREE.Box3().setFromObject(object);
        return boundingBox;
    }
    intersects(box1, box2) {
        return (
          box1.max.x >= box2.min.x &&
          box1.min.x <= box2.max.x &&
          box1.max.y >= box2.min.y &&
          box1.min.y <= box2.max.y &&
          box1.max.z >= box2.min.z &&
          box1.min.z <= box2.max.z
        );
      }
    isIntersecting(obj1, obj2) {
        const boundingBox1 = this.getBoundingBox(obj1);
        const boundingBox2 = this.getBoundingBox(obj2);
    
        return this.intersects(boundingBox1, boundingBox2); 
    }
   
}

