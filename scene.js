class Scene extends GameObject {
    constructor(img, x, y, dx, dy, timeout, canvas_width, canvas_height) {
    super(x, y, dx, dy, timeout)
    this.img = new Image();
    this.img.src = img;
    console.log("Obrazek sceny: ", this.img.src);
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.dx = -3;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.canvas_width, this.canvas_height);
        ctx.drawImage(this.img, this.x+this.canvas_width, 0, this.canvas_width, this.canvas_height);
    }
    update() {
        if(this.x < -this.canvas_width) {
            this.x = 0;
        }
        else{
            this.x+=this.dx;
        }
    setTimeout(this.update.bind(this),this.timeout);
    }
}