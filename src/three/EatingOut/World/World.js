import Experience from '../Experience.js'
import Environment from './Environment.js'
import Avocado from './Avocado.js'
import BlueBerry from './BlueBerry.js'
import Peach from './Peach.js'
import Cauldron from './Cauldron.js'
import Cauldron2 from './Cauldron2.js'
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
            this.cauldron2 = new Cauldron2()
        })
    }


    update() {
        // 과일 상태 업데이트
        this.updateFruitState(this.avocado);
        this.updateFruitState(this.blueBerry);
        this.updateFruitState(this.peach);

        if (this.cauldron2) {
            this.cauldron2.update();
        }
     
       
     
        if (this.handleAvocadoVisibility() || this.handleBlueBerryVisibility() || this.handlePeachVisibility()) {
            this.cauldron.model.visible = false;
            this.cauldron2.model.visible = true;
        } else if(this.cauldron2, this.cauldron) {
            this.cauldron.model.visible = true;
            this.cauldron2.model.visible = false;
        }
       }
    
    
    updateFruitState(fruit) {
        if (fruit) {
            fruit.update();
        }
    }
    

    handleAvocadoVisibility() {
        if (this.avocado && this.blueBerry && this.peach && this.cauldron2) {
            if (this.avocado.model.position.y < 0 && this.avocado.model.position.x > -0.5 && this.avocado.model.position.x < 0.5) {
               return true;
            }
        }
        return false;
    }
    handleBlueBerryVisibility() {
        if (this.avocado && this.blueBerry && this.peach && this.cauldron2) {
            if (this.blueBerry.model.position.y < 0 && this.blueBerry.model.position.x > -0.5 && this.blueBerry.model.position.x < 0.5) {
                return true
            }
        }
        return false;
    }
    handlePeachVisibility() {
        if (this.avocado && this.blueBerry && this.peach && this.cauldron2) {
            if (this.peach.model.position.y < 0 && this.peach.model.position.x > -0.5 && this.peach.model.position.x < 0.5) { 
                return true
            }
        }
        return false;
    }

  
    setVisible(){
        if(this.cauldron) {
            this.cauldron.setVisible();
        }
        if(this.cauldron2) {
            this.cauldron2.setVisible();
        }
      
    }
   
}

