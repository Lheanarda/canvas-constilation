import { canvas, ctx } from "../canvas"
import { randomIntFromInterval } from "../utils"
import Particle from "./Particle"



class Effect{
    constructor(){
        this.width = canvas.width
        this.height = canvas.height
        this.particles = []
        this.numberOfParticles = 300
        this.createParticles()

        const gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height)
        gradient.addColorStop(0,'white')
        gradient.addColorStop(0.5,'gold')
        gradient.addColorStop(1,'orangered')
        ctx.fillStyle = gradient
        ctx.strokeStyle = 'white'

        this.mouse = {
            x:0,
            y:0,
            pressed:false,
            radius:200
        }

        window.addEventListener('resize',e=>{
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
            
        })

        window.addEventListener('mousemove',e=>{
            if(this.mouse.pressed){
                this.mouse.x = e.x 
                this.mouse.y = e.y
            }
        })

        window.addEventListener('mousedown',e=>{
            this.mouse.pressed = true
        })

        window.addEventListener('mouseup',e=>{
            this.mouse.pressed = false 
        })

    }

    createParticles(){
        for(let i=0; i<this.numberOfParticles; i++){
            // const radius = Math.random() * 12 + 1
            const radius = Math.floor(Math.random()*10 + 1)
            this.particles.push(new Particle({
                x: radius + Math.random() * (this.width - radius * 2), // make sure the particle is inside effect
                y: radius + Math.random() * (this.height - radius * 2),
                radius,
                effect:this
            }))
        }
    }
    
    handleParticles(){
        
        this.particles.forEach(p=> p.update())
        this.connectParticles()
    }

    connectParticles(){
        const maxDistance = 80 
        for(let a = 0; a < this.particles.length; a++){
            for(let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x 
                const dy = this.particles[a].y - this.particles[b].y
                const distance = Math.hypot(dx,dy)
                if(distance < maxDistance){
                    ctx.save()
                    const opacity = 1 - (distance / maxDistance)
                    ctx.globalAlpha = opacity
                    ctx.beginPath()
                    ctx.moveTo(this.particles[a].x, this.particles[a].y)
                    ctx.lineTo(this.particles[b].x, this.particles[b].y)
                    ctx.stroke()
                    ctx.restore()
                }
            }
        }


    }

    resize(width, height){
        canvas.width = width
        canvas.height = height
        this.width = canvas.width
        this.height = canvas.height

        const gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height)
        gradient.addColorStop(0,'white')
        gradient.addColorStop(0.5,'gold')
        gradient.addColorStop(1,'orangered')
        ctx.fillStyle = gradient
        ctx.strokeStyle = 'white'

        this.particles.forEach(p=>p.reset())
    }
}

export default Effect