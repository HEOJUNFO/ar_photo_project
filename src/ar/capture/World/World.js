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
            
            this.model  = new Model('unoModel')
            this.sticker = new Sticker()
            this.environment = new Environment()
        })
    }

    setSticker(name){
        this.resources.on('ready', () =>
        {
        if(!this.sticker){
        this.sticker = new Sticker()
        }
        console.log(name)
        if(name === 'bell'){
            this.sticker.pushBellTexture()
        }
        if(name ==='sorina'){
            this.sticker.pushSorinaTexture()
        }
        if(name === 'uno'){
            this.sticker.pushUnoTexture()
        }
        })
    
    }

    update() {
       if(this.model){
        this.model.update()
       }
  
    }
    dispose(){
  
        
    }
}