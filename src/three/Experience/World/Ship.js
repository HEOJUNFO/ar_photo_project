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
          
      }
    }
    
    
    
    
    
    