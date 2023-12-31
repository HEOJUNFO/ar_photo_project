import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas,goToNextSceneCallback)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // this.canvas.addEventListener('click', this._checkForModelClick.bind(this), false);

        this.bindMethods()

        this.goToNextSceneCallback = goToNextSceneCallback;

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    bindMethods()
    {
        this.camera.bindMethods()
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    init()
    {
     instance = null;
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        clearInterval(this.world.hailInterval); 
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        // this.camera.controls.dispose()
        this.renderer.instance.dispose()
        this.renderer.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }

    goToNextScene(){
        if(this.goToNextSceneCallback){
            this.goToNextSceneCallback();
        }
    }

    _checkForModelClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
        this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    
        const intersects = this.raycaster.intersectObjects(this.scene.children, true); // recursive search through all children
    
        for (let i = 0; i < intersects.length; i++) {
            if (this._isObjectChildOf(intersects[i].object, this.clickedObject)) {
             
                break;
            }
        }
    }
    
    _isObjectChildOf(child, parent) {
        
        while (child) {
            if (child === parent) return true;
            child = child.parent;
        }
        return false;
    }
}