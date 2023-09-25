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

        this.initialPinchDistance = 0;
        this.initialScale = new THREE.Vector3();

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);

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
            this.animation.actions[actionName].play()
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

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }

    onTouchStart(event) {
        if (this.isMoving) {
            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        }
        if (event.touches.length === 2&& this.isMoving) {
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            this.initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
            this.initialScale.copy(this.model.scale);
          }
    }

    onTouchMove(event) {
        if (this.isMoving) {

            const deltaX = event.touches[0].clientX - this.touchStartPosition.x;
            const deltaY = event.touches[0].clientY - this.touchStartPosition.y;

            const factor = 0.01;  
            this.model.position.x += deltaX * factor;
            this.model.position.y -= deltaY * factor; 

            this.touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);

            if (event.touches.length === 2 && this.isMoving) {
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = distance / this.initialPinchDistance;
                this.model.scale.copy(this.initialScale).multiplyScalar(scale);
        }
        }
    }

    onTouchEnd() {
      
        this.isMoving = false;

    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}