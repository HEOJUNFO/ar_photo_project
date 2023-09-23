import * as THREE from 'three'; 
import Experience from '../Experience.js'
import Environment from './Environment.js'

import GreenBee from './GreenBee.js'
import RedBee from './RedBee.js'

import Sticker from './Sticker.js'
import Floor from './Floor.js'


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
       
  
    }
    dispose(){
  
        
    }
}