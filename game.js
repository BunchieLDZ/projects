class Game {
    constructor() {
        this.game_canvas = document.getElementById("myCanvas");
        this.ui_canvas = document.getElementById("uiCanvas");
        this.game_ctx = this.game_canvas.getContext("2d");
        this.ui_ctx = this.ui_canvas.getContext("2d");
        this.icanvas = document.createElement("canvas");
        this.icanvas.width = this.game_canvas.width;
        this.icanvas.height = this.game_canvas.height;
        this.ictx = this.icanvas.getContext("2d");
        //this.canvas.focus();
        this.victory = false;
        this.defeat = false;
        this.score = 0;
        this.uiobjects = [];
        this.playerobject = new Player(this.game_canvas.width / 2, this.game_canvas.height / 2, 0, 0, 0.5, 112, 96, "res/ufo.png", 120);
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
       // console.log("Touch event: ", this);
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
        this.asteroids_generator.release_asteroid();
    }
    victory() {
        this.game_ctx.font = "30px Comic Sans MS";
        this.game_ctx.fillStyle = "red";
        this.game_ctx.textAlign = "center";
        this.game_ctx.fillText("Przetrwales!", this.game_canvas.width/2, this.game_canvas.height/2);
    }
    evaluate_victory() {
        if((this.asteroids_generator.calculate_number_of_asteroids().bind(this)) == this.asteroids_generator.asteroids_released)
        {
            this.victory();
        }
    }
    draw_defeat() {
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
    overlapping_area(obj1, obj2) { // obliczenie obszaru wspolnego nachodzacych na siebie boxow w kolizji
        var coordinates = [];
        var clx;
        var cbx;
        var cly;
        var cby;
        if(obj1.bbx1 < obj2.bbx1) {
            clx = obj2.bbx1;
        }
        if(obj1.bbx1 > obj2.bbx1) {
        //else {
            clx = obj1.bbx1;
        }
        if(obj1.bby1 < obj2.bby1) {
            cly = obj2.bby1;
        }
        if(obj1.bby1 > obj2.bby1) {
        //else {
            cly = obj1.bby1;
        }
        if(obj1.bbx2 < obj2.bbx2) {
            cbx = obj1.bbx2;
        }
        if(obj1.bbx2 > obj2.bbx2) {
        //else {
            cbx = obj2.bbx2;
        }
        if(obj1.bby2 < obj2.bby2) {
            cby = obj1.bby2;
        }
        if(obj1.bby2 > obj2.bby2) {
        //else {
            cby = obj2.bby2;
        }
    
        //console.log("bbx1: ", obj1.bbx1, obj2.bbx1);
        //console.log("Ustalone wartosci: ", clx, cly, cbx, cby);
    
        coordinates[0] = clx;
        coordinates[1] = cly;
        coordinates[2] = cbx;
        coordinates[3] = cby;
    
        //console.log("WSPOLRZEDNE OBSZARU WSPOLNEGO: ", clx, cly, cbx, cby);
    
        return coordinates;
    
    }
    box_collision(obj1, obj2) { // kolizja typu box - malo dokladna ale szybka w obliczeniach
        console.log("Sprawdzam kolizje!");
        return !(obj1.bbx2 < obj2.bbx1 || obj2.bbx2 < obj1.bbx1 || obj1.bby2 < obj2.bby1 || obj2.bby2 < obj1.bby1);
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

    if (circleDistancex <= (rect.width/2)) { return true } 
    if (circleDistancey <= (rect.height/2)) { return true }

    var cornerDistance_sq = (circleDistancex - rect.width/2)^2 +
                         (circleDistancey - rect.height/2)^2;

    if((cornerDistance_sq <= (circle.r^2))) {
        return true;
        }
    //console.log(this.playerobject.health);
    }
    pixel_collision(obj1, obj2) { // dokladniejsza kolizja per pixel
        this.ictx.clearRect(0, 0, this.ictx.width, this.ictx.height);
        // wyznaczamy 4 koordynaty dwoch punktow ktore stanowia krance nachodzacego prostokata
        var clx = this.overlapping_area(obj1, obj2)[0]; 
        var cly = this.overlapping_area(obj1, obj2)[1];
        var cbx = this.overlapping_area(obj1, obj2)[2];
        var cby = this.overlapping_area(obj1, obj2)[3];
        console.log("Koordynaty obszaru wspolnego: ", clx, cly, cbx, cby);
        console.log("Wielkosc obszaru wspolnego: ", (cbx - clx) * (cby - cly), " px");
        //console.log(ictx);
        // jesli szerokosc i wysokosc tego prostokata jest wieksza/rowna 1
        if((cbx-clx) >= 1 && (cby - cly) >= 1) { // jesli wielkosc obszaru wspolnego jest wieksza od 1 to sprawdzamy pixel po pixelu
        this.ictx.clearRect(clx, cly, cbx - clx, cby - cly); // czyszczenie tymczasowej kanwy
        obj1.draw(this.ictx); // rysowanie pierwszego obiektu
        var imgdata1 = this.ictx.getImageData(clx, cly, cbx - clx, cby - cly); // wyciagniecie imgdata tego obiektu
        this.ictx.clearRect(clx, cly, cbx - clx, cby - cly); // to samo dla drugiego obiektu
        obj2.draw(this.ictx);
        var imgdata2 = this.ictx.getImageData(clx, cly, cbx - clx, cby - cly);
        var resolution = 32; // dla poprawy performesu sprawdzamy tylko co ktorys pixel
        //console.log(imgdata1);
        for (var j = 0; j < imgdata1.data.length; j+= resolution) {
            for (var i = 3; i < imgdata1.data.length; i += 4) // sprawdzanie kanalu alpha obiektow
            {
               // console.log("Wielkosc tablicy 1:", imgdata1.data.length);
               // console.log("Wielkosc tablicy 2:", imgdata2.data.length);
                //if(!imgdata1.data[i] && !imgdata2.data[i]) // jesli pixele sa przezroczyste to sprawdzamy dalej
                if (imgdata1.data[i] == 0 || (imgdata2.data[i] == 0)) {
                    continue;
                }
                else { // jesli nie jest to mamy do czynienia z kolizja
                    console.log("Numer pixela: ", i);
                    console.log("Nieprzezroczysty pixel", imgdata1.data[i], imgdata2.data[i]);
                    return true;
                    }
                }
            }
        //else { // jesli wielkosc obszaru wspolnego jest mniejsza w trakcie box collision to obiekty nachodza na siebie bezposrednio
          //  return true;
        //}
        }
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
                if(this.box_collision(this.playerobject, this.asteroids_generator.asteroids[i]) && this.playerobject.is_immune == false){
                    if(this.pixel_collision(this.playerobject, this.asteroids_generator.asteroids[i])) {
                        this.playerobject.on_hit();
                    }
                }
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
        console.log("UPDATE", this);
        this.playerobject.update(this.game_canvas.width);
    }
}

window.onload = function() {
    var game = new Game();
    game.start();
}

