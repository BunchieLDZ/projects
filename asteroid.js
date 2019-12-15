class Asteroid extends GameObject {
    constructor(x, y, dx, dy, radius, segments, noise, timeout) {
        super(x, y, dx, dy, timeout);
        this.radius = radius;
        this.noise = noise;
        this.segments = segments;  
        this.exists = false;
    }
    draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.strokeStyle = "white";
    for(let i = 0; i < this.segments; i++) {
    ctx.rotate(2 * Math.PI / this.segments);
    ctx.lineTo(this.radius + this.radius * this.noise * (Math.random() - 0.5), 0);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    }

    update() {
        //console.log("Wywoluje funkcje update asteroidy!");
        this.x+=this.dx;
        this.y+=this.dy;
        setTimeout(this.update.bind(this),this.timeout);
    }
}