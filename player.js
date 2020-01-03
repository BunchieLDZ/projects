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
        this.image.crossOrigin = 'anonymous'; 
        this.is_immune = false;
        this.canvas_width = document.getElementById("myCanvas").width;
        this.canvas_height = document.getElementById("myCanvas").height;
    }
    draw(ctx) {
        ctx.save();
        //ctx.fillStyle="red";
      /*   ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, Math.PI / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(this.x, this.y-20, this.radiusX + 20, this.radiusY - 35, Math.PI, 0, Math.PI);
        ctx.stroke(); */ // old version of UFO
        //ctx.globalAlpha=0.62;

        ctx.drawImage(this.image, this.x - this.width /2 , this.y - this.height / 2 , this.width, this.height);
        //ctx.fill();

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
    draw_health_bar(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(ctx.canvas.width / 4, 40, this.health * 4, 30);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.x > this.canvas_width)
        {
            this.x = 0;
        }
        else if(this.x < 0) {
            this.x = this.canvas_width;
        }
        else if(this.y > this.canvas_height) {
            this.y = 0;
        }
        else if(this.y < 0) {
            this.y = this.canvas_height;
        }
        //console.log("Obecne wspolrzedne: ", this.x, this.y);
    
        setTimeout(this.update.bind(this),this.timeout);
    }
    set_dx(number) {
        this.dx = number;
    }
    set_dy(number) {
        this.dy = number;
    }
    on_hit(ctx) {
        var imageData = ctx.getImageData(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        var data = imageData.data;
        if(this.is_immune == false){ 
            console.log("ZMIENIAM KOLORKI!");
            for(var i = 0; i < data.lenght; i+=4) {
                data[i] = 255;
            }
        //ctx.putImageData(imageData, this.x - this.width / 2, this.y - this.height / 2); 
        ctx.putImageData(imageData, 0, 0); 

        this.health = this.health - 10;
        this.is_immune = true;
        }
    }
    back_to_mortality() {
        setInterval(this.make_immune_again.bind(this), 2000);
    }
    make_immune_again() {
        if(this.is_immune == true) {
        this.is_immune = false;
        }
    }
}