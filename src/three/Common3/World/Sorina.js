import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Sorina
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items.sorinaModel1

        // this.setModel()
        // this.setAnimation()

        this.clockwise = true;
        this.angle = 2;
        this.array = [new THREE.Vector3(0,1.5,0), new THREE.Vector3(0.01,1.5,0)];

        this.xRange = { min: -1.3, max: 1.3}; 
        this.yRange = { min: -0.7, max: 4}; 


        // this._setupEventListeners();
    }

    move(angle) {
        const a = this.array[this.array.length - 2];
        const b = this.array[this.array.length - 1];
        
        const vectorx = b.x - a.x;
        const vectory = b.y - a.y;
    
        const x = vectorx * Math.cos(angle) - vectory * Math.sin(angle);
        const y = vectorx * Math.sin(angle) + vectory * Math.cos(angle);
    
        const new_x = b.x + x;
        const new_y = b.y + y;
    
        this.array.push(new THREE.Vector3(new_x, new_y, b.z));
        
        this.model.position.set(new_x, new_y, b.z);
    
        // Make the model look in the direction of movement
        let direction = new THREE.Vector3(x, y, 0);
        let lookAtPosition = new THREE.Vector3().addVectors(this.model.position, direction.normalize());
        this.model.up.set(0, 0, 1);
        this.model.lookAt(lookAtPosition);
    }

    _setupEventListeners() {
        window.addEventListener('touchstart', () => {
            this.clockwise = !this.clockwise;
        });
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.3, 0.3, 0.3)
        this.scene.add(this.model)
      
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.experience.clickedObject = this.model;
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }
    }

    end(){
       this.experience.goToNextScene();
       console.log("end")
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.01)

        if (this.clockwise) {
            this.move(-this.angle * Math.PI / 180);
        } else {
            this.move(this.angle * Math.PI / 180);
        }

        const currentPosition = this.model.position;
        if (currentPosition.x < this.xRange.min || currentPosition.x > this.xRange.max ||
            currentPosition.y < this.yRange.min || currentPosition.y > this.yRange.max) {
            this.end();
        }
    }
}