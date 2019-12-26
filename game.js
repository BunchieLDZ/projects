class Game {
    constructor() {
        this.game_canvas = document.getElementById("myCanvas");
        this.ui_canvas = document.getElementById("uiCanvas");
        this.game_ctx = this.game_canvas.getContext("2d");
        this.ui_ctx = this.ui_canvas.getContext("2d");
        //this.canvas.focus();
        this.victory = false;
        this.uiobjects = [];
        this.playerobject = new Ufo(200, 200, 0, 0, 5, 120);
        this.scene = new Scene("res/background.jpg", 0, 0, 0, 0, 100, 800, 400);
        this.asteroids_generator = new AsteroidGenerator(50, 2000, -10, this.game_canvas.height, this.game_canvas.width);
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
        console.log("touchstart");
        var touches = evt.changedTouches;
        console.log("Wielkosc tablicy touches: ", touches.length);
        console.log(touches);

        for (var i = 0; i < touches.length; i++) {
            console.log("Jestem w petli touches");
            console.log("Touch: ", touches[i]);
            this.ongoingTouches.push(touches[i]);
            var x = touches[i].clientX - evt.srcElement.offsetLeft;
            var y = touches[i].clientY - evt.srcElement.offsetTop;
            console.log("x ", x, " y ", y);
            if(this.vjoy.isTouchInCircle(x, y, this.vjoy.x, this.vjoy.y, this.vjoy.radius)) {
                var distance =  Math.sqrt(Math.pow(x - this.vjoy.x,2) + Math.pow(y - this.vjoy.y, 2));
                var coord_diffx = x - this.vjoy.x;
                var coord_diffy = y - this.vjoy.y;
                console.log(distance);
                this.playerobject.set_dx(coord_diffx);
                this.playerobject.set_dy(coord_diffy);
                console.log(coord_diffx * this.vjoy.speed);
                console.log(coord_diffy * this.vjoy.speed);
            }
        }
    }
    initialize_touch() {
        //this.canvas.addEventListener("touchstart", this.vjoy.start.bind(this), false);
        this.ui_canvas.addEventListener("touchend", this.start_touch.bind(this), false);
        this.ui_canvas.addEventListener("touchend", this.end_touch, false);
        this.ui_canvas.addEventListener("touchcancel", this.cancel_touch, false);
        this.ui_canvas.addEventListener("touchmove", this.move_touch, false);
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
        if((this.asteroids_generator.calculate_number_of_asteroids()) == 0)
        {
            this.victory();
        }
    }
    prepare_asteroids() { // inicjalizacja N asteroid
        console.log("Asteroidy zainicjowane");
        console.log("Interal wywolywania asteroidy: ", this.asteroids_generator.interval);
        this.asteroids_generator.add_asteroids();
    }
    initialize_game() {        
        setInterval(this.evaluate_victory, 3000);
    }
    initialize_asteroids() {
        this.prepare_asteroids();
        setInterval(this.fire_asteroid.bind(this), this.asteroids_generator.interval);
    }
    animation() {
        this.game_ctx.clearRect(0, 0, this.game_canvas.width, this.game_canvas.height);
        this.scene.draw(this.game_ctx);
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
            }
            if(this.asteroids_generator.asteroids[i].x < 0) {
                this.asteroids_generator.asteroids[i].exists = false;
                this.asteroids_generator.asteroids.splice(i, 1);
            }
        }
        this.playerobject.draw(this.game_ctx);
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

