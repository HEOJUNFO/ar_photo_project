import * as THREE from 'three'; 
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Model from './Model.js'


import Sticker from './Sticker.js'



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
            this.sticker = new Sticker()
            this.environment = new Environment()
        })
    }

    setSticker(name){
    
        if(!this.sticker){
         this.sticker.setTextures(name)

        }else{
            this.sticker.scene.remove(this.sticker.mesh)
            this.sticker.setTextures(name)
           
        }
    }

    setCharacter(){
        this.model  = new Model('unoModel')
    }

    update() {
       if(this.model){
        this.model.update()
       }
  
    }
    dispose(){
  
        
    }
}