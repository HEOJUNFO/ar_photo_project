import * as THREE from 'three'
import Experience from '../Experience.js'

const TAIL_GAP = 30;
export default class Uno
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items.unoModel1
        this.resource2 = this.resources.items.tailModel


        this.clockwise = true;
        this.angle = 2;
        this.array = [new THREE.Vector3(0,1.5,0), new THREE.Vector3(0.01,1.5,0)];

        this.xRange = { min: -1.3, max: 1.3}; 
        this.yRange = { min: -0.7, max: 4}; 

        this.movementPath = [];

        this.tail = [];
    }

    grow() {
        const tailSegment = this.createTailSegment();
        if (this.tail.length === 0) {
            tailSegment.position.copy(this.model.position); 
        } else {
            tailSegment.position.copy(this.tail[this.tail.length - 1].position);
        }
        this.scene.add(tailSegment); 
        this.tail.push(tailSegment); 
    }

    checkHeadTailCollision() {
        const headPosition = this.model.position;
    
        for (let i = 0; i < this.tail.length; i++) {
            const segmentPosition = this.tail[i].position;
    
            if (headPosition.distanceToSquared(segmentPosition) < 0.1) {
                return true;
            }
        }
    
        return false;
    }

    createTailSegment() {
        const tailModel = this.resource2.scene.clone();
        tailModel.scale.set(0.2, 0.2, 0.2);
        tailModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
        return tailModel;
    }

    updateTail() {
        if (this.tail.length === 0) return;
    
        for (let i = 0; i < this.tail.length; i++) {
            const targetIndex = this.movementPath.length - 30 - (i * TAIL_GAP);
            if (this.movementPath[targetIndex]) {
                this.tail[i].position.lerp(this.movementPath[targetIndex], 0.05);
            }
        }
    
        // movementPath의 크기를 관리해서 너무 길어지지 않게 합니다.
        if (this.movementPath.length > this.tail.length * TAIL_GAP) {
            this.movementPath.shift();
        }
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

        this.movementPath.push(this.model.position.clone());
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
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
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
    }

    handleHeadTailCollision() {
        if(this.tail.length <5){
            return;}
            this.end
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.01)

        this.updateTail();

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

        if (this.checkHeadTailCollision()) {
            this.handleHeadTailCollision();
        }
    }
}