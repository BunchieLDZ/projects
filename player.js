class Player extends GameObject {
    constructor(x, y, dx, dy, speed, width, height, image, timeout) {
        super(x, y, dx, dy, timeout);
        this.radiusX = 20;
        this.radiusY = 75;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.radius = this.width / 2;
        this.bbx1 = this.x;
        this.bby1 = this.y;
        this.bbx2 = this.x + this.width;
        this.bby2 = this.y + this.height;
        this.health = 100;
        this.image = new Image(this.width, this.height);   
        this.image.src = image;
        this.image.crossOrigin = 'anonymous'; 
        this.on_hit_sound = new Audio();
        this.on_hit_sound.src = "audio/hit.wav"
        this.on_hit_sound.muted = true;
        this.on_hit_sound.autoplay = true;
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
     

      /*  ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke(); */ // bounding circle for collision detection

       /* ctx.beginPath();
        ctx.strokeStyle="white";
        ctx.rect(this.bbx1, this.bby1, this.width, this.height);
        ctx.stroke();
        ctx.restore(); */
    }
    convert_data_to_image(imagedata) {
        var tmp_canvas = document.createElement("canvas");
      //  console.log(tmp_canvas);
        var ctx = tmp_canvas.getContext("2d");
        tmp_canvas.width = imagedata.width;
        tmp_canvas.height = imagedata.height;
        ctx.putImageData(imagedata, 0, 0);
        var image = new Image();
        image.src = tmp_canvas.toDataURL();
       // console.log("PO PRZEKAZANIU: ", imagedata);
        return image;
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
        this.x+=this.dx * this.speed;
        this.y+=this.dy * this.speed;
        this.bbx1 = this.x - this.width / 2 ;
        this.bby1 = this.y - this.height / 2;
        this.bbx2 = this.bbx1 + this.width;
        this.bby2 = this.bby1 + this.height;
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
    on_hit() {
        if(this.is_immune == false) {
        this.health = this.health - 10; 
        this.is_immune = true;
        this.image.src = "res/ufo_damaged.png";
        //this.on_hit_sound.play();
        }
    }
    back_to_mortality() {
        setInterval(this.make_immune_again.bind(this), 2500);
    }
    make_immune_again() {
        if(this.is_immune == true) {
        this.image.src = "res/ufo.png";
        this.is_immune = false;
        }
    }
}