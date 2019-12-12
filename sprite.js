class Sprite extends GameObject {
    constructor(img, x, y, frames_in_row, rows, timeout)
    {
        super(img,x,y,timeout);
        this.width = img.width;
        this.height = img.height;
        this.frames = frames;
        this.rows = rows;
        this.frames_in_a_row = frames_in_row;
        this.frame = 0;
        this.frames = (frames_in_row * rows) - 1;
        this.row = 1;
    }
    update() {
        console.log("Wszedlem do funkcji update");
        console.log(this.frames);
        this.frame = (this.frame+1)%this.frames; 
        this.row = (this.frame % (this.frames_in_a_row - 1)) + 1;
        //console.log(this.frame);
        this.x+=this.vx;
        this.y+=this.vy;
        setTimeout(this.update.bind(this),this.timeout);
    }

    draw(ctx) {
       console.log("rysuje obiekt",
            this.image, 
            this.row,
            this.frame,
            (this.frame * this.image.width) / this.frames_in_a_row,
            this.image.height / this.rows,  
            this.image.width / this.frames_in_a_row,
            this.image.height / this.rows, 
            this.x, 
            this.y);
        ctx.save();
        if(this.row == 1) {
        ctx.drawImage(this.image, 
            (this.frame * this.image.width * this.row) / this.frames_in_a_row, 
            0,
            this.image.width / this.frames_in_a_row, 
            this.image.height / this.rows, 
            this.x, 
            this.y, 
            this.image.width / this.frames_in_a_row,
            this.image.height / this.rows);
        }
        else if(this.row == 2) {
            ctx.drawImage(this.image, 
                (this.frame * this.image.width / this.row) / this.frames_in_a_row, 
                this.image.height / this.rows,
                this.image.width / this.frames_in_a_row, 
                this.image.height / this.rows, 
                this.x, 
                this.y, 
                this.image.width / this.frames_in_a_row,
                this.image.height / this.rows);
            }
        ctx.restore();
        }          
    }
