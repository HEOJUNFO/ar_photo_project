import * as THREE from 'three'
import Experience from '../Experience.js'

export default class BlueBerry
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
      
        // Resource
        this.resource = this.resources.items.blueBerryModel

        this.setModel()

        this.startX = 0;
        this.startY = 0;

        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));

        this.moveDirection = -1; // 1: 오른쪽으로, -1: 왼쪽으로
        this.maxX = 2;
        this.minX = -2;

        this.isAutoMoving = true;
        this.moving = false;
    }


    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.6, 0.6, 0.6)
        this.model.position.set(Math.random() * 3 - 1.5, 2, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.experience.clickedObject.push( this.model);

    }

    onTouchStart(event)
    {
        if(!this.moving) return;
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    }

    onTouchMove(event)
    {
        if(!this.moving) return;
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - this.startX;

        const currentY = event.touches[0].clientY;
        const deltaY = currentY - this.startY;

        this.model.position.x += deltaX * 0.01;  
        this.model.position.y -= deltaY * 0.01;

        this.startX = currentX;
        this.startY = currentY;
    }
    onTouchEnd()
    {
        this.moving = false;
        if (this.model.position.y < 0 && this.model.position.x > -0.5 && this.model.position.x < 0.5) {
            this.scene.remove(this.model);
            this.model.position.set(0, 2, 0);
            this.experience.goToNextScene();
        }
    }

    update()
    {
        this.model.rotation.z += 0.01;
        if(this.isAutoMoving) {
            this.model.position.x += this.moveDirection * 0.02;
    
            if (this.model.position.x <= this.minX) {
                this.model.position.x = this.maxX;
            }
        }
    }
}