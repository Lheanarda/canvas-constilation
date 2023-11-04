import { canvas, ctx } from "../canvas"
import { GRAVITY } from "../constants"
import { randomIntFromInterval } from "../utils"

class Particle{
    constructor({x, y, radius, effect}){
        this.x = x 
        this.y = y
        this.effect = effect
        this.radius = radius
        this.vx = Math.random() * 1 - 0.5
        this.vy = Math.random() * 1 - 0.5

        this.pushX = 0
        this.pushY = 0
        this.friction = 0.95
    }

    draw(){
        ctx.beginPath()
        // ctx.fillStyle = `hsl(${this.x * 0.5}, 100%, 50%)`
        ctx.arc(this.x, this.y, this.radius, 0 , 2*Math.PI)
        ctx.fill()
        ctx.stroke()
    }

    update(){
       this.draw()

       if(this.effect.mouse.pressed){
            const dx = this.x - this.effect.mouse.x
            const dy = this.y - this.effect.mouse.y
            const distance = Math.hypot(dx, dy)

            //touch / click radius formula
            const force = this.effect.mouse.radius / distance
            if(distance< this.effect.mouse.radius){
                const angle = Math.atan2(dy, dx)
                this.pushX += Math.cos(angle) * force
                this.pushY += Math.sin(angle) * force
            }
       }

       this.x += (this.pushX *= this.friction) + this.vx
       this.y += (this.pushY *= this.friction) + this.vy

       /*this.x += this.vx
       if(this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1

       this.y += this.vy 
       if(this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1 */

       //not push particles out of canvas
       if(this.x < this.radius){
            this.x = this.radius
            this.vx *= -1
       }else if(this.x> this.effect.width- this.radius){
            this.x = this.effect.width - this.radius
            this.vx *= -1
       }

       if(this.y < this.radius){
            this.y = this.radius
            this.vy *= -1
        }else if(this.y> this.effect.height- this.radius){
            this.y = this.effect.height - this.radius
            this.vy *= -1
        }

       

    }

    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
    }
}

export default Particle