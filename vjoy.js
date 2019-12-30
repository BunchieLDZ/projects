class VJoy {
    constructor(x, y, radius, canvas, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.start = false;
        this.end = false;
        this.cancel = false;
        this.move = false;
        this.currentTouches = [];
        this.canvas = canvas;
        this.color = color;
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.strokeStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        context.stroke();
    }
    start(evt) {
        evt.preventDefault();
        console.log("touchstart");
        var touches = evt.changedTouches;

        for(var i = 0;  i < touches.lenght; i++) {
            console.log(touches.pageX);
        }

    }
    move() {

    }
    cancel() {

    }
    end() {

    }
    initialize() {
        console.log(this.canvas);   
        this.canvas.addEventListener("touchstart", this.start(), false);
        this.canvas.addEventListener("touchend", this.end(), false);
        this.canvas.addEventListener("touchcancel", this.cancel(), false);
        this.canvas.addEventListener("touchmove", this.move(), false);
    }
    isTouchInCircle(mx,my,shape_x, shape_y, shape_radius) {
        if(shape_radius){
            // this is a circle
            var dx=mx-shape_x;
            var dy=my-shape_y;
            // math test to see if mouse is inside circle
            if(dx*dx+dy*dy<shape_radius*shape_radius){
            // yes, mouse is inside this circle
            return(true);
                }
        }
    }
}