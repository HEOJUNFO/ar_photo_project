import * as THREE from 'three'; 
import Experience from '../Experience.js'
import Environment from './Environment.js'






export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance

      
        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.environment = new Environment()
        })
    }


   

    update() {
      
  
    }
    dispose(){
  
        
    }
}