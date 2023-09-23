import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(name)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Resource
        this.resource = this.resources.items[name]
        
        this.isMoving = false

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        // Add event listeners
        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.touchStartPosition = new THREE.Vector2();

        
        this.setModel()
        this.setAnimation()
      
    }

    setModel()
    {
        this.model = this.resource.scene
        console.log(this.model)
        this.model.scale.set(2, 2, 2)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.name = 'model'
                this.experience.clickedObject.push(child);
            }
        })
        this.experience.clickedObject.push(this.model);
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        // 모든 애니메이션 클립에 대해 Action을 생성합니다.
        this.resource.animations.forEach((clip, index) => {
            const actionName = `action${index}`;
            this.animation.actions[actionName] = this.animation.mixer.clipAction(clip);
        });
    
        let currentActionIndex = 0;
        const actionKeys = Object.keys(this.animation.actions);
        this.animation.actions.current = this.animation.actions[actionKeys[currentActionIndex]];
        this.animation.actions.current.play();
    
        // Play the next action
        this.animation.playNext = () =>
        {
            const oldAction = this.animation.actions.current;
            
            currentActionIndex = (currentActionIndex + 1) % actionKeys.length;
            const newAction = this.animation.actions[actionKeys[currentActionIndex]];
    
            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(oldAction, 1);
    
            this.animation.actions.current = newAction;
        }
    }

    onTouchStart(event) {
        if (this.isMoving) {
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        }
    }

    onTouchMove(event) {
        if (this.isMoving) {
            // Calculate touch move delta
            const deltaX = event.touches[0].clientX - this.touchStartPosition.x;
            const deltaY = event.touches[0].clientY - this.touchStartPosition.y;

            // Convert screen movement to world units (This may need adjustment based on your camera setup)
            const factor = 0.01;  // Adjust this based on the sensitivity you want.
            this.model.position.x += deltaX * factor;
            this.model.position.y -= deltaY * factor; // Y is inverted in the screen coordinates.

            // Update the starting position
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
            this.totalMoveDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        }
    }

    onTouchEnd() {
      
        this.isMoving = false;
        this.totalMoveDistance = 0;
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}