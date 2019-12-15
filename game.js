class Game {
    constructor(canvas, context, width, height) {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.victory = false;
    }

    start() {

    }
}

var game = new Game();
var vjoy = new VJoy(100, 450, 50);
var asteroids_generator = new AsteroidGenerator(50, 2000, -10, game.canvas.width);
var gameobjects = [];
var asteroids = [];
var uiobjects = [];
var playerobject = new Ufo(200, 200, 0, 0, 120);
var number_of_objects = gameobjects.length;
var scene = new Scene("res/background.jpg", 0, 0, 0, 0, 100, 800, 400);
console.log(scene.timeout);

function calculate_number_of_objects(gameobjects) {
    return gameobjects.length;
}

function initialize_UI() {
    uiobjects.push(vjoy);
}

function fire_asteroid() {
    asteroids_generator.release_asteroid();
}

function initialize_game() {
    setInterval(evaluate_victory, 3000);
    prepare_asteroids();
    setInterval(fire_asteroid, asteroids_generator.interval);
}

function evaluate_victory() {
    console.log("Sprawdzam warunek zwyciestwa");
    console.log("Liczba asteroid: ", asteroids_generator.calculate_number_of_asteroids())
    if((asteroids_generator.calculate_number_of_asteroids()) == 0)
    {
        victory();
    }
}

function victory() {
    var ctx = game.context;
    console.log("Zwyciestwo!");
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Przetrwales!", game.canvas.width/2, game.canvas.height/2);
}

function prepare_asteroids() { // inicjalizacja N asteroid
    console.log("Asteroidy zainicjowane");
    console.log("Interal wywolywania asteroidy: ", asteroids_generator.interval);
    asteroids_generator.add_asteroids();
}

function new_enemies(interval) {
    setInterval(create_enemy, interval);
}

function prepare_enemies(N) {

}

function animation() {
    //console.log(gameobjects[0].width);
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    scene.draw(game.context);
    for(var i = 0; i < calculate_number_of_objects(gameobjects); i++) {
        gameobjects[i].draw(game.context);
        //console.log(gameobjects[i].width);
    }
    for(var i = 0; i < calculate_number_of_objects(uiobjects); i++) {
        uiobjects[i].draw(game.context);
    }

    for(var i = 0; i < asteroids_generator.calculate_number_of_asteroids(); i++) {
        if(asteroids_generator.asteroids[i].exists == true){
        asteroids_generator.asteroids[i].draw(game.context);
        }
        if(asteroids_generator.asteroids[i].x < 0) {
        asteroids_generator.asteroids[i].exists = false;
        asteroids_generator.asteroids.splice(i, 1);
        }
    }
    playerobject.draw(game.context);
    //game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    requestAnimationFrame(animation);
}

function update() {
    scene.update();
    console.log("Liczba asteroid: ", asteroids_generator.calculate_number_of_asteroids());
    for(var i = 0; i < calculate_number_of_objects(gameobjects); i++) {
        gameobjects[i].update();
    }
    /*for(var i = 0; i < asteroids_generator.calculate_number_of_asteroids(); i++) {
        asteroids_generator.asteroids[i].update();
    }*/
    playerobject.update();
}

window.onload = function() {
    initialize_UI();
    initialize_game();
    //prepare_enemies(20);
    animation();
    update();
}

