import Experience from '../Experience.js'
import Environment from './Environment.js'
import Bell from './Bell.js'
import Sorina from './Sorina.js'
import Uno from './Uno.js'
import Fox from './Fox.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.isUno = false
        this.isBell = false
        this.isSorina = false

        this.food = null
        this.foodActive = true;

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.bell = new Bell()
            this.sorina = new Sorina()
            this.uno = new Uno()

            this.environment = new Environment()
            this.spawnFood();
        })
    }

    setUno(){
        if(this.uno){
            this.uno.setModel()
            this.uno.setAnimation()
            this.uno._setupEventListeners()

            this.isUno = true
        }
    }

    setBell(){
        if(this.bell){
            this.bell.setModel()
            this.bell.setAnimation()
            this.bell._setupEventListeners()

            this.isBell = true
        }
    }

    setSorina(){
        if(this.sorina){
            this.sorina.setModel()
            this.sorina.setAnimation()
            this.sorina._setupEventListeners()

            this.isSorina = true
        }
    }

    spawnFood() {
 
        let xmin = -1.3;  
        let xmax = 1.3; 
        
        let ymin = -0.9;
        let ymax = 3.5;


        let x = Math.random() * (xmax - xmin) + xmin;
        let y = Math.random() * (ymax - ymin) + ymin;
    
       
            let geometry = new THREE.SphereGeometry(0.1, 32, 32);  
            let material = new THREE.MeshBasicMaterial({color: 0xff0000});  
            this.foodMesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.foodMesh);
        
        this.foodMesh.position.set(x, y, 0);
        this.foodActive = true; 
    }

    handleFoodCollision() {
        this.foodActive = false;
       
        this.uno.grow();
    
        this.scene.remove(this.foodMesh);

    
        this.spawnFood();
      
    }

    update()
    {
        if(this.isBell){
            this.bell.update()
        }
        if(this.isSorina){
            this.sorina.update()
        }
        if(this.isUno){
            this.uno.update()
            if (this.uno.model.position.distanceTo(this.foodMesh.position) < 0.3) { 
                if (this.foodActive) {
                    this.foodActive = false;
                    this.handleFoodCollision();
                 
                }
            }
        }
    }
}