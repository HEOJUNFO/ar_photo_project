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
        
       
        this.startX = 0;
        this.minX = -2;
        this.maxX = 2;

        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));

        
        this.setModel()
        this.setAnimation()
      
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1.2, 1.2, 1.2)
        this.model.position.set(0, -1.5, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.name = 'model'
                //this.experience.clickedObject.push(child);
            }
        })
        //this.experience.clickedObject.push(this.model);
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

    onTouchStart(event)
    {
        this.startX = event.touches[0].clientX;
    }

    onTouchMove(event)
    {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - this.startX;

        const potentialNewX = this.model.position.x + deltaX * 0.01;

        if (potentialNewX <= this.maxX && potentialNewX >= this.minX) {
            this.model.position.x = potentialNewX;
        } 

        this.startX = currentX;
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}