import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox){
            this.fox.update()
        }
    }
}