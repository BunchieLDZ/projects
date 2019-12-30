class AsteroidGenerator {
    constructor(number, generation_interval, update_interval, dx, canvas_height, canvas_width) {
        this.number = number;
        this.generation_interval = generation_interval;
        this.update_interval = update_interval;
        this.dx = dx;
        this.canvas_height = canvas_height;
        this.canvas_width = canvas_width;
        this.asteroids_released = 0;
        this.asteroids = [];
    }
    
    create_asteroid() {
            console.log("Tworze nowa asteroide!");
            var sector = this.roll_sector();
            var x = this.calculate_x(sector);
            var y = this.calculate_y(sector);
            var dx = this.calculate_dx(sector);
            var dy = this.calculate_dy(sector);
            var radius = (Math.random() * 25) + 10;
            var speed = Math.random() * 1 + 1;
            var segments = ((Math.random() * 4) + 6) * 2;
            var noise = (Math.random() * 0.5);
            var interval = this.update_interval;
            var asteroid = new Asteroid(x, y, dx, dy, radius, speed, segments, noise, "res/asteroid.jpg", interval);
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
    
    roll_sector() { // funkcja generuje jeden z wybranych sektorow miedzy 1 a 8
        return parseInt((Math.random() * 8) + 1);
    }
    
    calculate_y(sector) { // wylicza wartosc y nowo wygenerowanej asteroidy na podstawie sektora
        if(sector == 1 || sector == 2 || sector == 3) {
            return 0;
        }
        else if(sector == 6 || sector == 7 || sector == 8) {
            return this.canvas_height;
        }
        else if(sector == 4 || sector == 5) {
            var sector_height = this.canvas_height / 3;
            return ((Math.random() * sector_height) + sector_height);
        }
    }

    calculate_x(sector) {
        var sector_width = this.canvas_width / 3;
        if(sector == 1 || sector == 4 || sector == 6) {
            return 0;
        }
        else if(sector == 3 || sector == 5 || sector == 8) {
            return this.canvas_width;
        }
        else if(sector == 2 || sector == 7) {
            return ((Math.random() * sector_width) + sector_width)
        }
    }
    
    calculate_dy(sector) { // zaleznie od tego w ktorym sektorze znajduje sie asteroida wartoc jej dy powinna byc rozna
        if(sector == 1 || sector == 2 || sector == 3) {
            return 1;
            }
        else if (sector == 4 || sector == 5) {
            return 0;
            }
        else if (sector == 6 || sector == 7 || sector == 8) {
          return -1;
        }
    }

    calculate_dx(sector) { // zaleznie od tego w ktorym sektorze znajduje sie asteroida wartoc jej dx powinna byc rozna
        if(sector == 1 || sector == 4 || sector == 6) {
            return 1;
            }
        else if (sector == 2 || sector == 7) {
            return 0;
            }
        else if (sector == 3 || sector == 5 || sector == 8) {
          return -1;
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
        this.asteroids_released++;
    }
}