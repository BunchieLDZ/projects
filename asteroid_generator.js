class AsteroidGenerator {
    constructor(number, interval, dx, canvas_width) {
        this.number = number;
        this.interval = interval;
        this.dx = dx;
        this.canvas_width = canvas_width;
        this.asteroids = [];
    }
    
    create_asteroid() {
            console.log("Tworze nowa asteroide!");
            var sector = this.roll_sector();
            var x = this.canvas_width - 100;
            var y = this.calculate_y(sector);
            var dx = this.dx;
            var dy = this.calculate_dy(sector);
            var radius = (Math.random() * 35) + 20;
            var segments = (Math.random() * 8) + 6;
            var noise = (Math.random() * 0.5);
            var interval = 100;
            var asteroid = new Asteroid(x, y, dx, dy, radius, segments, noise, interval);
            this.asteroids.push(asteroid);
            console.log(this.asteroids[0].x);
            console.log(this.asteroids[0].timeout);           
            console.log(this.asteroids.length);
    }

    add_asteroids() {
        for(var i = 0; i < this.number; i++) {
            this.create_asteroid();
            }
    }
    
    roll_sector() { // funkcja generuje jeden z wybranych sektorow miedzy 1 a 3
        return parseInt((Math.random() * 3) + 1);
    }
    
    calculate_y(sector) { // wylicza wartosc y nowo wygenerowanej asteroidy na podstawie sektora
        var random = Math.random();
        var sector_height = game.canvas.height / 3;
        return (random * sector_height) * sector;
    }
    
    calculate_dy(sector) { // zaleznie od tego w ktorym sektorze znajduje sie asteroida wartoc jej dy powinna byc rozna
        if(sector == 1) {
            return (Math.random() * 0.2) - 0.5;
        }
        else if (sector == 2) {
            return (Math.random() * 0.2) - 0.1
        }
        else {
            return (Math.random() * 0.2) + 0.5;
        }
    }

    calculate_number_of_asteroids() {
        return this.asteroids.length;
    }
    
    release_asteroid() {
        var number_of_asteroids = this.calculate_number_of_asteroids();
        var rand = parseInt(Math.random() * number_of_asteroids);
        console.log("Wylosowana liczba: ", rand);
        console.log("Rozmiar tablicy", this.calculate_number_of_asteroids());
        this.asteroids[rand].exists = true;
        console.log("DY asteroidy: ", this.asteroids[rand].dy);
        this.asteroids[rand].update();
        //this.asteroids.splice(rand, 1);
    }
}