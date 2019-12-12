class Enemy extends GameObject {
    constructor() {
        this.radius = radius;
        this.degrees = degrees;
        this.curve_adjust = curve_adjust;
    }
    draw(ctx, radius, degrees, curve_adjust) {
    var angle = degrees * (Math.PI / 180);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
    );
    ctx.moveTo(radius, 0);
    ctx.lineTo(
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
    );
    //ctx.closePath(
    ctx.moveTo( Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius);
    ctx.quadraticCurveTo(0 + curve_adjust, 0, Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    }
}