class GameObject {
    constructor(x , y, dx, dy, timeout){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.timeout = timeout;
    }

    update(){
        /*
        this.x+=this.vx;
        this.y+=this.vy;
        setTimeout(this.update,this.timeout);
        */
    }

    draw(ctx){
        //ctx.drawImage(this.img, this.x, this.y);
    }
    box_collision() {
        
    }   
}