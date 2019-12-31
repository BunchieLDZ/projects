class Ufo extends GameObject {
    constructor(x, y, dx, dy, width, height, health, image, timeout) {
        super(x, y, dx, dy, timeout);
        this.radiusX = 20;
        this.radiusY = 75;
        this.health = health;
        this.width = width;
        this.height = height;
        this.image = new Image(this.width, this.height);   
        this.image.src = image;

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
        ctx.stroke(); */
        ctx.drawImage(this.image, this.x - this.width /2 , this.y - this.height / 2 , this.width, this.height);
        ctx.restore();
    }
    shields_up() {

    }
    update() {
        this.x+=this.dx;
        this.y+=this.dy;
        //console.log("Obecne wspolrzedne: ", this.x, this.y);
        if ((this.x - this.height / 2) >= 800)
        {
            this.x = 0;
        }
        if ((this.y + this.height / 2) >= 400)
        {
            console.log("Jestem w warunku y");
           this.y = 0;
        }
        if((this.x) <= 0 )
        {
            this.x = 800;
        }
        if ((this.y - this.height / 2) <= 0 )
        {
            this.y = 400;
        } 
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
}