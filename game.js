class Game {
    constructor() {
        this.game_canvas = document.getElementById("myCanvas");
        this.ui_canvas = document.getElementById("uiCanvas");
        this.game_ctx = this.game_canvas.getContext("2d");
        this.ui_ctx = this.ui_canvas.getContext("2d");
        //this.canvas.focus();
        this.victory = false;
        this.defeat = false;
        this.score = 0;
        this.uiobjects = [];
        this.playerobject = new Player(this.game_canvas.width / 2, this.game_canvas.height / 2, 0, 0, 128, 64, "res/ufo.png", 120);
        this.scene = new Scene("res/background.jpg", 0, 0, 0, 0, 100, 800, 400);
        this.asteroids_generator = new AsteroidGenerator(500, 1200, 33, -10, this.game_canvas.height, this.game_canvas.width);
        console.log("Generator: ", this.asteroids_generator);
        this.vjoy = new VJoy(50, 50, 50, this.ui_canvas, "green");
        this.gameobjects = [];
        this.ongoingTouches = [];
        window.requestAnimationFrame(this.animation.bind(this));
    }

    start() {
        this.initialize_UI();   
        this.initialize_asteroids() 
        this.initialize_game();
        this.playerobject.back_to_mortality();
        //this.animation();
        this.update();
    }
    initialize_UI() {
        //this.vjoy.initialize();
        this.initialize_touch();
        this.uiobjects.push(this.vjoy);
    }
    start_touch(evt) {
        evt.preventDefault();
        console.log("Touch event: ", this);
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(touches[i]);
            var x = touches[i].clientX - evt.srcElement.offsetLeft;
            var y = touches[i].clientY - evt.srcElement.offsetTop;
            if(this.vjoy.isTouchInCircle(x, y, this.vjoy.x, this.vjoy.y, this.vjoy.radius)) {
                var coord_diffx = x - this.vjoy.x;
                var coord_diffy = y - this.vjoy.y;
                this.playerobject.set_dx(coord_diffx);
                this.playerobject.set_dy(coord_diffy);
            }
        }
    }
    move_touch(evt) {
        evt.preventDefault();
        console.log("Touch event: ", this);
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(touches[i]);
            var x = touches[i].clientX - evt.srcElement.offsetLeft;
            var y = touches[i].clientY - evt.srcElement.offsetTop;
            if(this.vjoy.isTouchInCircle(x, y, this.vjoy.x, this.vjoy.y, this.vjoy.radius)) {
                var coord_diffx = x - this.vjoy.x;
                var coord_diffy = y - this.vjoy.y;
                this.playerobject.set_dx(coord_diffx);
                this.playerobject.set_dy(coord_diffy);
            }
        }
    }
    initialize_touch() {
        console.log("Inicjaliacja touch", this);
        console.log("VJOY", this.vjoy);
       // console.log("START W GRZE", this.start_touch(evt));
        //this.canvas.addEventListener("touchstart", this.vjoy.start.bind(this), false);
        this.ui_canvas.addEventListener("touchend", this.start_touch.bind(this), false);
        this.ui_canvas.addEventListener("touchend", this.end_touch, false);
        this.ui_canvas.addEventListener("touchcancel", this.cancel_touch, false);
        this.ui_canvas.addEventListener("touchmove", this.move_touch.bind(this), false);
    }
    calculate_number_of_objects(gameobjects) {
        return gameobjects.length;
    }
    fire_asteroid() {
        console.log("Moj generator asteroid: ", this.asteroids_generator);
        this.asteroids_generator.release_asteroid();
    }
    victory() {
        console.log("Zwyciestwo!");
        this.game_ctx.font = "30px Comic Sans MS";
        this.game_ctx.fillStyle = "red";
        this.game_ctx.textAlign = "center";
        this.game_ctx.fillText("Przetrwales!", this.game_canvas.width/2, this.game_canvas.height/2);
    }
    evaluate_victory() {
        console.log("Sprawdzam warunek zwyciestwa");
        console.log("Liczba asteroid: ", this.asteroids_generator.calculate_number_of_asteroids())
        if((this.asteroids_generator.calculate_number_of_asteroids()) == this.asteroids_generator.asteroids_released)
        {
            this.victory();
        }
    }
    draw_defeat() {
        console.log(this.game_ctx);
        console.log("Jeste, w funkcju przegranej!");
        this.game_ctx.font = "30px Arial";
        this.game_ctx.fillStyle = "red";
        this.game_ctx.fillText("You lose!", (this.game_canvas.width / 2) - 30, this.game_canvas.height / 2);  
        this.game_ctx.fillStyle = "white"; 
        this.game_ctx.fillText("Your score: ", (this.game_canvas.width / 2) - 60, this.game_canvas.height / 2 + 40);
        this.game_ctx.fillText(this.score, (this.game_canvas.width / 2) + 95, this.game_canvas.height / 2 + 40);
        //this.game_ctx.fillText("You lose!", 400, 200); 
    }
    evaluate_defeat() {
        if(this.playerobject.health == 0) {
            console.log("Jestem w warunku przegranej!")
            this.defeat = true;
        }
    }
    prepare_asteroids() { // inicjalizacja N asteroid
        console.log("Asteroidy zainicjowane");
        console.log("Interal wywolywania asteroidy: ", this.asteroids_generator.generation_interval);
        this.asteroids_generator.add_asteroids();
    }
    initialize_game() {        
        setInterval(this.evaluate_victory, 3000);
        setInterval(this.evaluate_defeat.bind(this), 2000);
        setInterval(this.add_score.bind(this), 1000);
    }
    initialize_asteroids() {
        this.prepare_asteroids();
        setInterval(this.fire_asteroid.bind(this), this.asteroids_generator.generation_interval);
    }
    distance_between(obj1, obj2) {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) +Math.pow(obj1.y - obj2.y, 2));
    }
    box_collision(object1, object2) {
        if (object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.y + object1.height > object2.y) {
            console.log("Pozycja asteroidy: ", object1.x, object1.y, "Pozycja gracza: ", object2.x, object2.y);
            console.log("Szerokosc i wysokosc statku: ", object2.width, object2.height);
            console.log("Szerokosc i wysokosc asteroidy: ", object1.width, object1.height)
             this.on_player_hit();
            }
    }  
    circle_collision(object1, object2) {
        var dx = object1.x - object2.x;
        var dy = object1.y - object2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < object1.radius + object2.radius) {
        this.on_player_hit(this.game_ctx);
        }
    }
    intersect_collision(circle, rect) {
    var circleDistancex = Math.abs(circle.x - rect.x);
    var circleDistancey = Math.abs(circle.y - rect.y);

    if (circleDistancex > (rect.width/2 + circle.radius)) { return false; }
    if (circleDistancey > (rect.height/2 + circle.radius)) { return false; }

    if (circleDistancex <= (rect.width/2)) { this.playerobject.on_hit(this.game_ctx); } 
    if (circleDistancey <= (rect.height/2)) { this.playerobject.on_hit(this.game_ctx); }

    var cornerDistance_sq = (circleDistancex - rect.width/2)^2 +
                         (circleDistancey - rect.height/2)^2;

    if((cornerDistance_sq <= (circle.r^2))) {
        this.playerobject.on_hit(this.game_ctx);
        }
    console.log(this.playerobject.health);
    }
    on_player_hit() {
        this.game_ctx.font = "30px Arial";
        this.game_ctx.fillStyle = "white";
        this.game_ctx.fillText("You lose!", (this.game_canvas.width / 2) - 30, this.game_canvas.height / 2);  
        console.log("PRZEGRANA");  
    }
    draw_score() {
        this.ui_ctx.font= "30px Arial";
        this.ui_ctx.fillStyle = "black";
        this.ui_ctx.fillText("SCORE", this.ui_canvas.width * 0.80, 30);
        this.ui_ctx.fillText(this.score, this.ui_canvas.width * 0.85, 65);
    }
    add_score() {
        console.log("Score: ", this);
        this.score+=10;
    }
    animation() {
        this.game_ctx.clearRect(0, 0, this.game_canvas.width, this.game_canvas.height);
        this.ui_ctx.clearRect(0, 0, this.ui_canvas.width, this.ui_canvas.height);
        this.scene.draw(this.game_ctx);
        this.draw_score();
        if(this.defeat == true) {
            this.draw_defeat();
            return;
        }
        for(var i = 0; i < this.calculate_number_of_objects(this.gameobjects); i++) {
            this.gameobjects[i].draw(this.game_ctx);
            //console.log(gameobjects[i].width);
        }
        for(var i = 0; i < this.calculate_number_of_objects(this.uiobjects); i++) {
            this.uiobjects[i].draw(this.ui_ctx);
        }
    
        for(var i = 0; i < this.asteroids_generator.calculate_number_of_asteroids(); i++) {
            if(this.asteroids_generator.asteroids[i].exists == true){
                this.asteroids_generator.asteroids[i].draw(this.game_ctx);
                //this.box_collision(this.asteroids_generator.asteroids[i], this.playerobject);
                this.intersect_collision(this.asteroids_generator.asteroids[i], this.playerobject);
            }
            if(this.asteroids_generator.asteroids[i].x < 0) {
                this.asteroids_generator.asteroids[i].exists = false;
                //this.asteroids_generator.asteroids.splice(i, 1);
            }
        }
        this.playerobject.draw(this.game_ctx);
        this.playerobject.draw_health_bar(this.ui_ctx);
        //game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        window.requestAnimationFrame(this.animation.bind(this));
    }
    update() {
        this.scene.update();
        console.log("Liczba asteroid: ", this.asteroids_generator.calculate_number_of_asteroids());
        for(var i = 0; i < this.calculate_number_of_objects(this.gameobjects); i++) {
            this.gameobjects[i].update();
        }
        /*for(var i = 0; i < asteroids_generator.calculate_number_of_asteroids(); i++) {
            asteroids_generator.asteroids[i].update();
        }*/
        this.playerobject.update();
    }
}

window.onload = function() {
    var game = new Game();
    game.start();
}

