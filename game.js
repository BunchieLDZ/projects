class Game {
    constructor(canvas, context, width, height) {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.victory = false;
    }

    start() {

    }
}

//var hero = new Sprite("res/sprite.png", 50, 50, 5, 2, 45);
var game = new Game();
var vjoy = new VJoy(100, 450, 50);
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

function initialize_game() {
    setInterval(evaluate_victory, 3000);
}

function evaluate_victory() {
    console.log("Sprawdzam warunek zwyciestwa");
    if((asteroids.length) == 0)
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

function new_enemies(interval) {
    setInterval(create_enemy, interval);
}

function prepare_enemies(N) {

}

function prepare_asteroids(N, interval) { // inicjalizacja N asteroid
    console.log("Asteroidy zainicjowane");
    for(var i = 0; i < N; i++)
    {
    create_asteroid();
    }
    setInterval(release_asteroid, interval);
}

function create_asteroid() {
        console.log("Tworze nowa asteroide!");
        console.log(asteroids.length);
        var sector = roll_sector();
        console.log("Sektor:" , sector);
        var x = game.canvas.width - 100;
        var y = calculate_y(sector);
        console.log("Wartosc y: ", y);
        var dx = -10;
        var dy = (Math.random() * 2) - 1;
        var radius = (Math.random() * 35) + 20;
        var segments = (Math.random() * 8) + 6;
        var noise = (Math.random() * 0.5);
        console.log(dy);
        var interval = 100;
        var asteroid = new Asteroid(x, y, dx, dy, radius, segments, noise, interval);
        asteroids.push(asteroid);
        console.log(asteroids[0].x);
        console.log(asteroids[0].timeout);
}

function roll_sector() { // funkcja generuje jeden z wybranych sektorow miedzy 1 a 3
    console.log("Wylosowalem sektor!");
    return parseInt((Math.random() * 3) + 1);
}

function calculate_y(sector) { // wylicza wartosc y nowo wygenerowanej asteroidy na podstawie sektora
    var random = Math.random();
    var sector_height = game.canvas.height / 3;
    console.log("Wylosowana liczba: ", random, " wysokosc sektora: ", sector_height, " sektor: ", sector);
    return (random * sector_height) * sector;
}

function calculate_dy() { // zaleznie od tego w ktorym sektorze znajduje sie asteroida wartoc jej dy powinna byc rozna
    //if()
}

function release_asteroid() {
    var rand = parseInt(Math.random() * calculate_number_of_objects(asteroids));
    console.log("Wylosowana liczba: ", rand);
    console.log("Rozmiar tablicy", calculate_number_of_objects(asteroids));
    asteroids[rand].exists = true;
    asteroids[rand].update();
    //asteroids.splice(rand, 1);
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

    for(var i = 0; i < calculate_number_of_objects(asteroids); i++) {
        if(asteroids[i].exists == true){
        asteroids[i].draw(game.context);
        }
        if(asteroids[i].x < 0) {
        asteroids[i].exists = false;
        asteroids.splice(i, 1);
        }
    }
    playerobject.draw(game.context);
    //game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    requestAnimationFrame(animation);
}

function update() {
    scene.update();
    console.log("Liczba asteroid: ", calculate_number_of_objects(asteroids));
    for(var i = 0; i < calculate_number_of_objects(gameobjects); i++) {
        gameobjects[i].update();
    }
    release_asteroid(1000);
    playerobject.update();
}

window.onload = function() {
    initialize_UI();
    initialize_game();
    prepare_asteroids(50, 3000);
    prepare_enemies(20);
    animation();
    update();
}

