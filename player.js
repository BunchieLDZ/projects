class Player extends GameObject {
    constructor(x, y, dx, dy, width, height, image, timeout) {
        super(x, y, dx, dy, timeout);
        this.radiusX = 20;
        this.radiusY = 75;
        this.width = width;
        this.height = height;
        this.radius = this.width / 2;
        this.health = 100;
        this.image = new Image(this.width, this.height);   
        this.image.src = image;
        this.is_immune = false;
    }
    draw(ctx) {
        ctx.save();

      /*   ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, Math.PI / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(this.x, this.y-20, this.radiusX + 20, this.radiusY - 35, Math.PI, 0, Math.PI);
        ctx.stroke(); */ // old version of UFO

        ctx.drawImage(this.image, this.x - this.width /2 , this.y - this.height / 2 , this.width, this.height);

      /*  ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke(); */ // bounding circle for collision detection

        ctx.beginPath();
        ctx.strokeStyle="white";
        ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.stroke();

        ctx.restore();
    }
    update() {
        this.x+=this.dx;
        this.y+=this.dy;
        //console.log("Obecne wspolrzedne: ", this.x, this.y);
    
        setTimeout(this.update.bind(this),this.timeout);
    }
    set_dx(number) {
        this.dx = number;
    }
    set_dy(number) {
        this.dy = number;
    }
    collision_with_borders() {

    }
    on_hit() {
        this.health = this.health - 10;
    }
}