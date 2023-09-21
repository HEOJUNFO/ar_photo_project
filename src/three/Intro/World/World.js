import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Bell from './Bell.js'
import Sorina from './Sorina.js'
import Uno from './Uno.js'
import Tree from './Tree.js'

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

        // Wait for resources
        this.resources.on('ready', () =>
        {
   
            this.floor = new Floor()

            this.bell = new Bell()
            this.sorina = new Sorina()
            this.uno = new Uno()
            this.tree = new Tree()

            this.environment = new Environment()
        })
    }

    setUno(){
        if(this.uno){
            this.uno.setModel()
            this.uno.setAnimation()

            this.isUno = true
        }
    }

    setBell(){
        if(this.bell){
            this.bell.setModel()
            this.bell.setAnimation()

            this.isBell = true
        }
    }

    setSorina(){
        if(this.sorina){
            this.sorina.setModel()
            this.sorina.setAnimation()

            this.isSorina = true
        }
    }
    update()
    {
        if(this.isUno){
            this.uno.update()
        }
        if(this.isBell){
            this.bell.update()
        }
        if(this.isSorina){
            this.sorina.update()
        }
    }
}