var canvas = document.getElementById('canvas01');
var canvasBkg = getComputedStyle(document.documentElement).getPropertyValue('--canvasBackround')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
var c = canvas.getContext('2d');

class Body {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(x, y){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(x, y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

}

class Star extends Body{
    constructor(x, y, radius, color){
        super(x, y, radius, color)
    }

    update(){

    }
}

class Planet extends Body{
    constructor(x, y, radius, color, star, orbitRadius, omega){
        super(x, y, radius, color)
        this.theta = Math.random()*2*Math.PI
        this.omega = omega
        this.star = star
        this.orbitRadius = orbitRadius
    }

    update(){
        this.theta += this.omega
        this.x = this.star.x + this.orbitRadius * Math.sin(this.theta)
        this.y = this.star.y + this.orbitRadius * Math.cos(this.theta)
    }
}

class Satellite extends Planet{

}

function init(){
    
    c.fillStyle = canvasBkg
    c.fillRect(0, 0, canvas.width, canvas.height)
}

function animate() {
    init()

    dx = persp.x - sun.x
    dy = persp.y - sun.y

    bodies.forEach(body => {
        body.update()
        var xcor = body.x - dx
        var ycor = body.y - dy
        body.draw(xcor, ycor)
    });

    requestAnimationFrame(animate);
}

var centre = {
    x:canvas.width/2,
    y:canvas.height/2
}

var re  = Math.min(canvas.width, canvas.height)*0.022  // radius of earth
var Rm  = 5*re  // orbit radius of mercury
var ome = 0.005 // rad/unit time for earth

sun = new Star(x=centre.x, y=centre.y, radius=re*2, color= '#F25C05'/*'#F2CB05'*/)

mercury = new Planet(x=centre.x, y=centre.y, radius=re*0.3824, color='#5B856B', star=sun, orbitRadius=Rm ,       omega=ome*4.1477)
venus   = new Planet(x=centre.x, y=centre.y, radius=re*0.9488, color='#C2D3E5', star=sun, orbitRadius=Rm*1.8687, omega=ome*1.6243)
earth   = new Planet(x=centre.x, y=centre.y, radius=re       , color='#2E84A6', star=sun, orbitRadius=Rm*2.5837, omega=ome)
mars    = new Planet(x=centre.x, y=centre.y, radius=re*0.5324, color='#8C442A', star=sun, orbitRadius=Rm*3.9360, omega=ome*0.5313)

moon = new Satellite(x=centre.x, y=centre.y, radius=re*0.2724,color='grey', star=earth, orbitRadius=1.5*re, omega=ome*13.36)

var bodies = [sun, mercury, venus, earth, mars, moon]

var options = document.getElementById("persp")
options.addEventListener('change', setPerep)

function setPerep(){
    var result = options.options[options.selectedIndex].value;
    persp = bodies[result]
}
persp = sun
animate()