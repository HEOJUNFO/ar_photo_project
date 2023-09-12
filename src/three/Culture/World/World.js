import Experience from '../Experience.js'
import Environment from './Environment.js'

import Ship from './Ship.js'

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
            this.ship = new Ship()
            this.environment = new Environment()
        })
    }


    update()
    {
    
        if(this.ship){
            this.ship.update()
        }
    }
}