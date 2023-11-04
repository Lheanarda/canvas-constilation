import { canvas, ctx } from "./canvas"
import Effect from "./class/Effect"


const effect = new Effect()



function animate(){
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
    requestAnimationFrame(animate)
    effect.handleParticles()
    
    
}

animate()

