import * as THREE from 'three'; 
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Tree from './Tree.js'
import Grasshopper from './Grasshopper.js'
import GreenBee from './GreenBee.js'
import RedBee from './RedBee.js'
import MagicCircle from './MagicCircle.js'
import Ship from './Ship.js'
import Floor from './Floor.js'
import AudioClass from './AudioClass.js'

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
            this.setCommonFour()
           
     
            this.environment = new Environment()
        })
    }

    setCommonFour(){
        this.tree = new Tree()
        this.floor  = new Floor()
        this.grasshopper = new Grasshopper()
        this.greenBee = new GreenBee()
        this.redBee = new RedBee()
        this.magicCircle = new MagicCircle()
        this.audioClass = new AudioClass('common4')
        this.audioClass.play() 
        this.audioClass.setVolume(2) 
        this.audioClass2 = new AudioClass('insect');
        this.audioClass2.play()
        this.audioClass2.setVolume(0.1)
        this.audioClass3 = new AudioClass('bee');
        this.audioClass3.play()
        this.audioClass3.setVolume(0.1)
        this.audioClass4 = new AudioClass('magicfigure');
        this.audioClass4.play()
        this.audioClass4.setVolume(0.1)
    }

    
    getCameraDirection() {
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        return direction;
    }

    checkAudioPlay(targetDirection, audio) {
        const cameraDirection = this.getCameraDirection();
        const angle = cameraDirection.angleTo(targetDirection);
        const threshold = Math.PI / 36;
        if(audio){
        if (angle < threshold) {
            audio.play();
            audio.setVolume(2);
        } else {
            audio.setVolume(0.1);
        }
    }
    }
    checkCameraPosition() {
        const directions = [
            { vector: new THREE.Vector3(-0.9, 0.3, -0.4), audio: this.audioClass2 },
            { vector: new THREE.Vector3(-0.8,0.5,0.4), audio: this.audioClass3 }, 
            { vector: new THREE.Vector3(-0.8,-0.6,-0.1), audio: this.audioClass4 },
        ];

        for (const dir of directions) {
            this.checkAudioPlay(dir.vector, dir.audio);
        }
    }

    update() {
        this.checkCameraPosition();
    }
}