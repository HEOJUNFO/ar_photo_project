import * as THREE from 'three'
import Experience from '../Experience.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';


export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunLight()
        // // this.setEnvironmentMap()
        this.setEnvironmentMap2()
    }

    setSunLight()
    {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)
        this.sunLight = new THREE.DirectionalLight('#ffffff',  0.8 * Math.PI)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0.5, 0, 0.866)
        this.scene.add(this.sunLight)

    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

    }
    setEnvironmentMap2(){
        this.pmremGenerator = new THREE.PMREMGenerator( this.experience.renderer.instance );
        this.pmremGenerator.compileEquirectangularShader();
    
        this.neutralEnvironment = this.pmremGenerator.fromScene( new RoomEnvironment() ).texture;
        this.scene.environment = this.neutralEnvironment;

    }
}