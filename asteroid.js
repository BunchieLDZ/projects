class Asteroid extends GameObject {
    constructor(x, y, dx, dy, radius, speed, segments, noise, pattern, timeout) {
        super(x, y, dx, dy, timeout);
        this.image = new Image();
        this.image.src = pattern;
        this.radius = radius;
        this.noise = noise;
        this.segments = segments;  
        this.speed = speed;
        this.exists = false;
    }
    draw(ctx) {
    var pattern = ctx.createPattern(this.image, "repeat");
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = pattern;
    for(let i = 0; i < this.segments; i++) {
    ctx.rotate(2 * Math.PI / this.segments);
    ctx.lineTo(this.radius + this.radius * this.noise * (Math.random() - 0.5), 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    }

    update() {
        //console.log("Wywoluje funkcje update asteroidy!");
        this.x+=this.dx * this.speed;
        this.y+=this.dy * this.speed;
        setTimeout(this.update.bind(this),this.timeout);
    }
}