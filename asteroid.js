class Asteroid extends GameObject {
    constructor(x, y, dx, dy, radius, speed, segments, noise, pattern, timeout) {
        super(x, y, dx, dy, timeout);
        this.image = new Image();
        this.image.src = pattern;
        this.radius = radius;
        this.noise = noise;
        this.segments = segments;  
        this.speed = speed;
        this.height = this.radius * 2;
        this.width = this.radius * 2;
        this.bbx1 = this.x - this.radius;
        this.bby1 = this.y - this.radius;
        this.bbx2 = this.bbx1 + this.width;
        this.bby2 = this.bby1 + this.height;
        this.exists = false;
    }
    draw(ctx) {
    var pattern = ctx.createPattern(this.image, "repeat");
  /*  ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = pattern;
    for(let i = 0; i < this.segments; i++) {
    ctx.rotate(2 * Math.PI / this.segments);
    ctx.lineTo(this.radius + this.radius * this.noise *  (Math.random() - 0.5), 0);
    //ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }
    ctx.closePath();

    //ctx.fill();
    ctx.stroke();
    ctx.restore(); */
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math. PI);
    ctx.stroke();
  /* ctx.beginPath();
    ctx.strokeStyle = "white"; 
    ctx.rect(this.bbx1, this.bby1, this.radius * 2, this.radius * 2);
    ctx.stroke(); */
    }

    update() {
        //console.log("Wywoluje funkcje update asteroidy!");
        this.x+=this.dx * this.speed;
        this.y+=this.dy * this.speed;
        this.bbx1 = this.x - this.radius;
        this.bby1 = this.y - this.radius;
        this.bbx2 = this.bbx1 + this.width;
        this.bby2 = this.bby1 + this.height;
        setTimeout(this.update.bind(this),this.timeout);
    }
}
