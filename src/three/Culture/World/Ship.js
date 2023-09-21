import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Ship
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        
        this.setTextures()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()

        this.t = 0;
        this.deltaT = 0.15;
        

    this.path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.75, 3.8, 0),
      new THREE.Vector3(0.75, 3.2, 0),
      new THREE.Vector3(-0.3, 2.8, 0),
      new THREE.Vector3(-0.3, 2.3, 0),
      new THREE.Vector3(1, 1.7, 0),
      new THREE.Vector3(0.75, 1.1, 0),
      new THREE.Vector3(-0.8, 1.2, 0),
      new THREE.Vector3(-1, 0.6, 0),
      new THREE.Vector3(-0.8, 0.3, 0),
      new THREE.Vector3(-0.3, 0.2, 0),
        new THREE.Vector3(0.3, 0, 0),
        new THREE.Vector3(1.1, -0.8, 0),
    ]);

    }

    setGeometry()    {
        this.geometry = new THREE.PlaneGeometry(this.texture.image.width * 0.001, this.texture.image.height * 0.001);
    }

    setTextures()
    {

        this.texture = this.resources.items.paperBoat
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.RepeatWrapping
        this.texture.colorSpace = THREE.SRGBColorSpace
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        })
        this.material.transparent = true
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.scale.set(0.5, 0.5, 0.1)
        this.mesh.position.set(0.75, 3.8, 0)
        this.scene.add(this.mesh)
    }

    update() {
            this.t += 0.0015; 
            this.t = Math.min(this.t, this.deltaT); 
    
            const position = this.path.getPoint(this.t);
            position.y += Math.sin(Date.now() * 0.002) * 0.025; 
            this.mesh.position.copy(position);
      }
    }
    
    
    
    
    
    