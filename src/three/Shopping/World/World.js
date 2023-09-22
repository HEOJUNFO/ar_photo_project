import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import BroomStick from './BroomStick.js'

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
            // Setup
            this.broomStick = new BroomStick()
            this.environment = new Environment()
        })
    }


    update()
    {
        if(this.broomStick)
            this.broomStick.update()
    }
}