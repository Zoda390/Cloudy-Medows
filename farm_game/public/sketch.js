/*
@authors: Whole team
@brief: Outputs to canvas
*/

/*
Matrix/Tile Key:

1 = grass
2 = plot
3 = corn
4 = wall
5 = concrete1
5 = dirt
7 = bed
8 = cart_s
9 = corn cart
10 = bridge
11 = junk
12 = concrete2
13 = satilite
14 = solar panel
15 = compost bucket
16 = compost
17 = sweet potato
18 = sprinkler
19 = lampost
20 = strawberry
21 = flower
22 = deb
23 = cowboy rick
24 = ladybug
25 = bee
26 = meb
27 = cart b
28 = cart b lady
29 = cart b sp
30 = cart b sprinkler
31 = cart b straw
32 = bridge2
33 = mario
34 = garry
35 = mira
36 = old man j
37 = brandon
38 = brent
39 = blind pete
40 = james

*/

var cloudCount = 8;
var clouds = [];

class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}

class Circle {
    constructor() {
        this.size = random(50, 100)
        this.xOfset = random(-this.size / 2, this.size / 2)
        this.yOfset = random(-this.size / 2, this.size / 2)
        this.color = random(200, 255);
    }

    update(vel) {
        this.pos.x += vel.x;
    }

    render(cloudPos) {
        noStroke();
        fill(this.color)
        circle(cloudPos.x + this.xOfset, cloudPos.y + this.yOfset, this.size)
    }
}
class Cloud {
    constructor() {
        this.pos = createVector(random(0, canvasWidth), random(0, canvasHeight))
        this.vel = createVector(random(-3, 3), 0)
        this.circleCount = random(3, 20)
        this.circles = []
        for (let i = 0; i < this.circleCount; i++) {
            this.circles[i] = new Circle()
        }
    }

    update(vel) {
        this.pos.x += this.vel.x
        if (this.pos.x > canvasWidth + 210) {
            this.vel.x = random(-3, 3)
            this.pos.x = -200;
        }
        if (this.pos.x < -210) {
            this.vel.x = random(-3, 3)
            this.pos.x = canvasWidth + 200
        }
    }

    render() {
        push()
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].render(this.pos)
        }
        pop()
    }
}

class Light {
    constructor(x, y, size, r, g, b) {
        this.pos = createVector(x, y);
        this.size = size;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    render() {
        noStroke();
        fill(this.r, this.g, this.b, time / 1.5);
        circle(this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2), this.size);
    }
}

class Level {
    constructor(map, x, y) {
        this.startingpos = createVector(x, y);
        this.lights = [];
        this.map = map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0) {
                    this.map[i][j] = 0;
                } else {
                    this.map[i][j] = new Tile(map[i][j], (j * tileSize), i * tileSize);
                    if (this.map[i][j].type == 'lamppost') {
                        append(this.lights, new Light(this.map[i][j].pos.x, this.map[i][j].pos.y, (tileSize * 6), 255, 255, 255));
                    }
                    if (this.map[i][j].type == 'satilite') {
                        append(this.lights, new Light(this.map[i][j].pos.x, this.map[i][j].pos.y, (tileSize * 1), 255, 255, 0));
                    }
                }
            }
        }
    }

    render() {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] != 0) {
                    this.map[i][j].render();
                }
            }
        }
        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].render();
        }
    }

    coliding(other) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] != 0) {
                    if (this.map[i][j].coliding(other)) {
                        touching = this.map[i][j];
                        if (touching.type == 'coin') {
                            other.coins += 1;
                            this.map[i][j] = 0;
                            console.log(other.coins);
                        }
                        return;
                    }
                }
            }
        }
        touching = 0;
    }
};

class Tile {
    constructor(type, x, y) {
        this.size = { x: tileSize, y: tileSize };
        this.pos = createVector(x, y);
        switch (type) {
            // case # corresponds to matrix #, AKA '3' in a matrix places corn tile
            case 1:
                this.type = 'grass';
                this.age = -1;
                this.border = true;      //border detirmines if the tile will have a border drawn around it
                this.colide = false;     //colide detirmines if the tile will stop the player
                return;
            case 2:
                this.type = 'plot';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 3:
                this.type = 'corn';
                this.age = 0;
                this.dead_counter = 3;
                this.border = true;
                this.colide = false;
                return;
            case 4:
                this.type = 'wall';
                this.age = -1;
                this.border = true;
                this.colide = true;
                return;
            case 5:
                this.type = 'concrete';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 6:
                this.type = 'dirt';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 7:
                this.type = 'bed';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 8:
                this.type = 'cart_s';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 9:
                this.type = 'cart_b_corn';
                this.age = -3;
                this.price = 5;
                this.btype = 'corn';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 10:
                this.type = 'bridge';
                this.age = -1;
                this.border = false;
                this.colide = false;
                return;
            case 11:
                this.type = 'junk';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 12:
                this.type = 'concrete2';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 13:
                this.type = 'satilite';
                this.age = -1;
                this.border = true;
                this.colide = true;
                return;
            case 14:
                this.type = 'solarpanel';
                this.age = -1;
                this.border = true;
                this.colide = true;
                return;
            case 15:
                this.type = 'compost_bucket';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 16:
                this.type = 'compost';
                this.age = 0;
                this.border = true;
                this.colide = false;
                return;
            case 17:
                this.type = 'sweet_potato';
                this.age = 0;
                this.dead_counter = 3;
                this.border = true;
                this.colide = false;
                return;
            case 18:
                this.type = 'sprinkler';
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 19:
                this.type = 'lamppost';
                this.age = -1;
                this.border = true;
                this.colide = true;
                return;
            case 20:
                this.type = 'strawberry';
                this.age = 0;
                this.dead_counter = 4;
                this.border = true;
                this.colide = false;
                return;
            case 21:
                this.type = 'flower';
                this.age = 0;
                this.border = true;
                this.colide = false;
                return;
            case 22:
                this.type = 'deb'
                this.age = -2;
                this.htype = 'junk';
                this.ammount = 2;
                this.phrase = 'hi, im Deb, junk like this can be composted in this here bucket';
                this.phraseWidth = 300;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;
            case 23:
                this.type = 'cowboy rick'
                this.age = -2;
                this.htype = 'strawberry';
                //! Magic # DO NOT CHANGE!!!!!
                this.ammount = 0;
                this.phrase = 'hi, im Rick and I like StrawBerries, Strawberries need water from sprinklers';
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;
            case 24:
                this.type = 'ladybug'
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 25:
                this.type = 'bee'
                this.age = -1;
                this.border = true;
                this.colide = false;
                return;
            case 26:
                this.type = 'meb'
                this.age = -2;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = 'hi, im Meb, She got the better name, anyways compost can turn dirt into grass';
                this.phraseWidth = 300;
                this.phraseHeight = 95;
                this.border = true;
                this.colide = true;
                return;
            case 27:
                this.type = 'cart_b_flow';
                this.age = -3;
                this.price = 20;
                this.btype = 'flower_seed';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 28:
                this.type = 'cart_b_lady';
                this.age = -3;
                this.price = 50;
                this.btype = 'ladybug';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 29:
                this.type = 'cart_b_sp';
                this.age = -3;
                this.price = 3;
                this.btype = 'sweet_potato';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 30:
                this.type = 'cart_b_sprinkler';
                this.age = -3;
                this.price = 15;
                this.btype = 'sprinkler';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 31:
                this.type = 'cart_b_straw';
                this.age = -3;
                this.price = 5;
                this.btype = 'strawberry';
                this.phraseWidth = 70;
                this.phraseHeight = 40;
                this.border = true;
                this.colide = false;
                return;
            case 32:
                this.type = 'bridge2';
                this.age = -1;
                this.border = false;
                this.colide = false;
                return;

            case 33:
                this.type = 'mario'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'sprinkler';
                this.ammount = 1;
                this.phrase = "I may be the local plummer, but I don't take crap from anybody";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 34:
                this.type = 'garry'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I sleep so much the time flies by";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 35:
                this.type = 'mira'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I feel way over dressed today, why on earth did I wear this";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 36:
                this.type = 'old_man_j'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I have a simple life , hoe the grass plant the seed, wait. When you see a fruit interact with it right away ";
                this.phraseWidth = 400;
                this.phraseHeight = 100;
                this.border = true;
                this.colide = true;
                return;


            case 37:
                this.type = 'brandon'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I am putting together a really cool event for my school please try to come and attend";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 37:
                this.type = 'liam'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I forget to eat some time I always forget its q to eat not e";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 38:
                this.type = 'brent'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "Hi Im Brent, Blind pete is my best friend";
                this.phraseWidth = 350;
                this.phraseHeight = 60;
                this.border = true;
                this.colide = true;
                return;

            case 39:
                this.type = 'blind_pette'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I met a guy name Bret yesterday seemed like a cool guy";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            case 40:
                this.type = 'james'
                this.age = -2;
                this.ammount = 1;
                this.htype = 'air';
                this.ammount = 0;
                this.phrase = "I love love lady bugs I have made so much more corn thanks to them";
                this.phraseWidth = 350;
                this.phraseHeight = 80;
                this.border = true;
                this.colide = true;
                return;

            default:
                console.log("Tile made without type");
                console.log(this.pos);
                return;
        }
    }

    render() {
        push()
        if (this.type == 'grass') { fill(0, 170, 120) }
        if (this.type == 'plot') { fill(139, 69, 19) }
        if (this.type == 'corn') { fill(139, 69, 19) }
        if (this.type == 'wall') { fill(120, 50, 0) }
        if (this.type == 'concrete') { fill(120, 120, 120) }
        if (this.type == 'dirt') { fill(120, 120, 120) }
        if (this.type == 'bed') { fill(120, 120, 120) }
        if (this.type == 'cart_s') { fill(255, 0, 0) }
        if (this.type == 'cart_b_corn') { fill(0, 0, 255) }
        if (this.type == 'bridge') { noFill() }
        if (this.type == 'junk') { fill(139, 69, 19) }
        if (this.type == 'concrete2') { fill(120, 120, 120) }
        if (this.type == 'satilite') { fill(120, 120, 120) }
        if (this.type == 'solarpanel') { fill(120, 120, 120) }
        if (this.type == 'compost_bucket') { fill(120, 120, 120) }
        if (this.type == 'compost') { fill(120, 120, 120) }
        if (this.type == 'sweet_potato') { fill(139, 69, 19) }
        if (this.type == 'sprinkler') { fill(0, 170, 120) }
        if (this.type == 'lamppost') { fill(120, 120, 120) }
        if (this.type == 'bridge2') { noFill() }

        if (this.border) {
            stroke(0);
            strokeWeight(2);
        } else { noStroke() }

        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

        if (this.type == 'grass') {
            image(grass_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'plot') {
            image(plot_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'corn') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(corn_tile_imgs[this.age], this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'wall') {
            image(wall_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'concrete') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'dirt') {
            image(dirt_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'bed') {
            image(bed_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_s') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_s_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_corn') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'bridge') {
            image(bridge_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'junk') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(junk_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'concrete2') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'satilite') {
            image(satilite_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'solarpanel') {
            image(solarpanel_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'compost_bucket') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(compost_bucket_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'compost') {
            image(dirt_tile_img, this.pos.x, this.pos.y);
            image(compost_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'sweet_potato') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(sweet_potato_tile_imgs[this.age], this.pos.x, this.pos.y);
        }
        if (this.type == 'strawberry') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(strawberry_tile_imgs[this.age], this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'flower') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(flower_tile_imgs[this.age], this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'ladybug') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(ladybug_img, this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'sprinkler') {
            image(grass_tile_img, this.pos.x, this.pos.y);
            image(sprinkler_tile_img, this.pos.x + (tileSize / 4), this.pos.y + (tileSize / 6));
        }
        if (this.type == 'lamppost') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(lamppost_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'deb') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(deb_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cowboy rick') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(rick_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'meb') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(meb_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_sp') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_sp_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_straw') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_straw_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_flow') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_flower_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_lady') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_ladybug_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'cart_b_sprinkler') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(cart_sprinkler_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'bridge2') {
            image(bridge_tile_2_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'old_man_j'){ 
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(old_man_j_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'mario') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(mario_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'garry') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(garry_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'mira') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(mira_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'brandon') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(brandon_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'liam') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(liam_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'brent') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(brent_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'blind_pette') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(blind_pette_tile_img, this.pos.x, this.pos.y);
        }
        if (this.type == 'james') {
            image(concrete_tile_2_img, this.pos.x, this.pos.y);
            image(james_tile_img, this.pos.x, this.pos.y);
        }
        pop();
    }

    coliding(other) {
        //if I keep moving in my current Y direction, will I collide with a tile?
        if (other.pos.x + other.size.x / 2 > this.pos.x &&
            other.pos.x < this.pos.x + this.size.x + other.size.x / 2 &&
            other.pos.y + 1 + other.size.y / 2 + other.vel.y > this.pos.y &&
            other.pos.y + 1 + other.vel.y < this.pos.y + this.size.y + other.size.y / 2) {
            return true;
        }

        //if I keep moving in my current X direction, will I collide with the a tile?
        if (other.pos.x + other.size.x / 2 + other.vel.x > this.pos.x &&
            other.pos.x + other.vel.x < this.pos.x + this.size.x + other.size.x / 2 &&
            other.pos.y + other.size.y / 2 > this.pos.y &&
            other.pos.y < this.pos.y + this.size.y + other.size.y / 2) {
            return true;
        }
    }
};

class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxvel = 2;
        this.size = { x: 16, y: 16 };
        this.coins = 0;
        this.hp = 100;
        this.dead = false;
        this.deaths = 0;
        this.op = 255;
        this.inv = [new Item('hoe', 1), new Item('corn_seed', 3), new Item('junk', 1), new Item('corn', 1), new Item('compost', 1), new Item('sweet_potato', 1), new Item('sweet_potato_seed',3), new Item('air')];
        this.hand = 0;
        this.facing = 3;
        this.anim = 0;
        this.hunger = maxHunger;
        this.lastFoodtype = 'sweet_potato';
        this.hunger_counter = 0;
    }

    update() {
        if (this.hunger_counter >= 30) {
            this.hunger -= 1;
            this.hunger_counter = 0;
        }
        if (this.hp <= 0) {
            this.dead = true;
            currentLevel_y = 1;
            currentLevel_x = 1;
            this.pos.x = (6 * tileSize) - (tileSize / 2);
            this.pos.y = (6 * tileSize) - (tileSize / 2);
            this.hunger = 4;
            this.hp = 100;
            this.deaths += 1;
            this.dead = false;
            onDeathSound.play();
        }
    }

    render() {
        push();
        imageMode(CENTER);
        image(player_imgs[this.facing][this.anim], this.pos.x, this.pos.y);
        if (this.hunger <= 0 && millis() - lastHungerMili > 400) {
            hit_sound.play();
            this.hp -= 10;
            fill(255, 0, 0, 100);
            circle(this.pos.x, this.pos.y, tileSize);
            lastHungerMili = millis();
        }
        else if (this.hunger >= maxHunger && millis() - lastHungerMili > 600) {
            this.hp += 2;
            lastHungerMili = millis();
        }
        pop();
    }
};

class Item {
    constructor(type, ammount) {
        this.type = type;
        this.ammount = ammount;

    }

    render(i) {
        textSize(20);
        textAlign(LEFT, TOP);
        switch (this.type) {
            case 'air':
                return;
            case 'hoe':
                image(hoe_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'corn_seed':
                image(corn_seed_bag_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'corn':
                image(corn_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'sweet_potato_seed':
                image(sweet_potato_seed_bag_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'sweet_potato':
                image(sweet_potato_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'strawberry_seed':
                image(strawberry_seed_bag_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'strawberry':
                image(straw_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'flower_seed':
                image(flower_bag_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'ladybug':
                image(ladybug_bag_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'sprinkler':
                image(sprinkler_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'junk':
                image(junk_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;
            case 'compost':
                image(compost_img, (canvasWidth / 2) - (512 / 2) + (64 * i), canvasHeight - 64, 64, 64);
                fill(255);
                text(this.ammount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
                return;

            default:
                console.log('item render without img');
                return;
        }
    }
}

//main stuff starts here

var tileSize = 32;
var canvasWidth = 23 * tileSize;
var canvasHeight = 19 * tileSize;
var player;
var levels = [];
var currentLevel_y = 1;
var currentLevel_x = 1;
var touching = 0;
var lastMili = 0;
var maxHunger = 6;
var time = 0;
var timephase = 0;
var lastTimeMili = 0;
var lastHungerMili = 0;
var days = 0;
var title_screen = true;


function preload() {
    //Items
    corn_img = loadImage('corn_item.png');
    corn_seed_bag_img = loadImage('corn_seed_bag.png');
    sweet_potato_seed_bag_img = loadImage('seedbag_sp.png');
    sweet_potato_img = loadImage('sweetpotato.png');

    straw_img = loadImage('stawberry.png');
    strawberry_seed_bag_img = loadImage('seedbag_stawberry.png');

    hoe_img = loadImage('hoe.png');
    junk_img = loadImage('junk.png');
    compost_img = loadImage('compost.png');
    sprinkler_img = loadImage('sprinkler.png');

    //Tile                                                  Tile Num.
    grass_tile_img = loadImage('grass.png');                //1
    plot_tile_img = loadImage('plot.png');                  //2
    wall_tile_img = loadImage('wood.png');                  //4
    concrete_tile_img = loadImage('concrete_1.png');        //5
    dirt_tile_img = loadImage('dirt.png');                  //6
    bed_tile_img = loadImage('bed.png');                    //7
    cart_s_tile_img = loadImage('cart_s.png');              //8
    cart_tile_img = loadImage('cart.png');                  //9
    bridge_tile_img = loadImage('bridge.png');              //10
    junk_tile_img = loadImage('junk_tile.png');             //11
    concrete_tile_2_img = loadImage('concrete2.png');       //12
    satilite_tile_img = loadImage('satilite.png');          //13
    solarpanel_tile_img = loadImage('solarpanel.png');      //14
    compost_bucket_tile_img = loadImage('worm_bucket.png'); //15
    compost_tile_img = loadImage('compost_tile.png');       //16
    sprinkler_tile_img = loadImage('sprinkler.gif');        //18
    lamppost_tile_img = loadImage('light.png');             //19
    deb_tile_img = loadImage('deb.gif');                    //22
    rick_tile_img = loadImage('cowboy_rick.gif');           //23
    meb_tile_img = loadImage('meb.png');                    //26
    cart_sp_tile_img = loadImage('sp_cart.png');
    cart_straw_tile_img = loadImage('strawcart.png');
    cart_flower_tile_img = loadImage('flowershop.png');
    cart_ladybug_tile_img = loadImage('ladybug_cart.png');
    cart_sprinkler_tile_img = loadImage('sprinkler_cart.png');
    bridge_tile_2_img = loadImage('bridgeflip.png');
    old_man_j_tile_img = loadImage('old_man_jay.gif');
    mira_tile_img = loadImage('mira.png');
    mario_tile_img = loadImage('mario.png');
    liam_tile_img = loadImage('liam.png');
    garry_tile_img = loadImage('garry.png');
    blind_pette_tile_img = loadImage('blind_pete.png');
    brandon_tile_img = loadImage('brandon.png');
    james_tile_img = loadImage('james.png');
    brent_tile_img = loadImage('brent.png');

    //Ui
    player_2 = loadFont('pixelFont.ttf');
    inv_img = loadImage('inventory.png');
    inv_hand_img = loadImage('inventory_Frame.png');
    hunger_e = loadImage('corn_empty.png');
    hunger_f = loadImage('corn_Filled.png');
    calendar_img = loadImage('calender.png');
    background_img = loadImage('skyline.gif');
    foreground_img = loadImage('fore.png');
    coin_img = loadImage('coin.png');
    title_screen_img = loadImage('title_screen.gif');
    button_img = loadImage('button.png');
    button_selected_img = loadImage('buttonselected.png');

    //Player
    up_move_img_1 = loadImage('back_move.png');
    up_move_img_2 = loadImage('backmove_2.png');
    down_move_img_1 = loadImage('front_moving.png');
    down_move_img_2 = loadImage('front_move2.png');
    left_move_img_1 = loadImage('side_move.png');
    left_move_img_2 = loadImage('sidemove2.png');
    right_move_img_1 = loadImage('right_move.png');
    right_move_img_2 = loadImage('rightmove2.png');
    player_imgs = [[up_move_img_1, up_move_img_2],
    [right_move_img_1, right_move_img_2],
    [down_move_img_1, down_move_img_2],
    [left_move_img_1, left_move_img_2]
    ];

    //Plants
    //  Corn 3
    corn_tile_img = loadImage('cornStage_1.png');
    corn_tile_2_img = loadImage('cornstage_2.png');
    corn_tile_3_img = loadImage('cornstage_4.png');
    corn_tile_4_img = loadImage('cornstage5.png');
    corn_tile_5_img = loadImage('cornstage6_1.png');
    corn_tile_6_img = loadImage('cornstage7.png');
    corn_tile_7_img = loadImage('cornstage8.png');
    corn_tile_8_img = loadImage('corndead.png');
    corn_tile_imgs = [corn_tile_img, corn_tile_2_img, corn_tile_3_img, corn_tile_4_img, corn_tile_5_img, corn_tile_6_img, corn_tile_7_img, corn_tile_8_img];
    //  Sweet Potato 17
    sweet_potato_tile_img = loadImage('beets_1.png');
    sweet_potato_tile_2_img = loadImage('beets_2.png');
    sweet_potato_tile_3_img = loadImage('beets_3.png');
    sweet_potato_tile_4_img = loadImage('beets_4.png');
    sweet_potato_tile_5_img = loadImage('beets_5.png');
    sweet_potato_tile_imgs = [sweet_potato_tile_img, sweet_potato_tile_2_img, sweet_potato_tile_3_img, sweet_potato_tile_4_img, sweet_potato_tile_5_img];

    //Strawberry 20
    strawberry_tile_img = loadImage('strawberry_1.png');
    strawberry_tile_2_img = loadImage('strawberry_2.png');
    strawberry_tile_3_img = loadImage('strawberry_3.png');
    strawberry_tile_4_img = loadImage('strawberry_4.png');
    strawberry_tile_5_img = loadImage('strawberry_5.png');
    strawberry_tile_6_img = loadImage('strawberry_6.png');
    strawberry_tile_imgs = [strawberry_tile_img, strawberry_tile_2_img, strawberry_tile_3_img, strawberry_tile_4_img, strawberry_tile_5_img, strawberry_tile_6_img];
    //flower  21
    flower_bag_img = loadImage("seedbagflower.png");
    flower_tile_img = loadImage("flowerstage_1.png");
    flower_tile_img2 = loadImage('flowerstage_2.png');
    flower_tile_imgs = [flower_tile_img, flower_tile_img2, flower_tile_img2];

    // ladybugs
    ladybug_bag_img = loadImage("lady_bug_bag.png");
    ladybug_img = loadImage("ladybugs.gif");

    //bees
    bee_img = loadImage("bees.gif");

    //sounds
    hoe_sound = new Sound('hoe.wav');
    onDeathSound = new Sound('death.wav');
    newDayChime = new Sound('newday.mp3');
    main_theme = new Sound('main_theme.wav');
    hit_sound = new Sound('hit2.wav');
    moneySound = new Sound('money.wav');

    main_theme.play(); //needs to loop
}

function setup() {
    //4-  wood
    //5- concrete
    //7- bed
    //19- lamp
    
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < cloudCount; i++) {
        clouds[i] = new Cloud()
    }
    player = new Player((6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2));
    level1 = new Level([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
            [10, 10, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 13, 5, 0, 0, 0],
            [0, 0, 5, 4, 7, 5, 4, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 4, 5, 5, 4, 5, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 4, 4, 5, 4, 19, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 10, 10, 10],
            [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 5, 1, 1, 1, 5, 12, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
            [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
        );
    level2 = new Level
        ([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 13, 5, 5, 5, 5, 5, 26, 15, 22, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 12, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 12, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 36, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
        );

    level3 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 23, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    //village
    level4 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 7, 34, 4, 5, 5, 4, 7, 5, 4, 5, 5, 4, 7, 5, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 4, 5, 4, 5, 0, 0, 0],
        [0, 0, 5, 4, 4, 5, 4, 5, 19, 4, 4, 5, 4, 19, 4, 5, 4, 4, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 4, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 4, 4, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 5, 5, 4, 7, 5, 4, 5, 5, 5, 4, 5, 5, 4, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 5, 4, 4, 4, 4, 4, 4, 5, 5, 5, 4, 7, 5, 4, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 19, 5, 4, 4, 4, 4, 0, 0, 0],
        [0, 0, 5, 5, 19, 4, 7, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level5 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 19, 6, 6, 6, 6, 11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 6, 6, 6, 6, 10, 10, 10, 10],
        [0, 5, 5, 19, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level6 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 5, 5, 5, 38, 5, 5, 5, 28, 5, 40, 5, 5, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [10, 10, 5, 5, 5, 5, 5, 29, 5, 5, 5, 5, 35, 5, 5, 5, 19, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 37, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 30, 5, 5, 5, 5, 5, 5, 5, 27, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 31, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 8, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level7 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 0, 32, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 5, 32, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 13, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 12, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 12, 5, 19, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 12, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 12, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
        [0, 0, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 5, 12, 5, 5, 5, 5, 10, 10, 10],
        [0, 0, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level8 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
        [10, 10, 5, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 5, 1, 1, 1, 5, 10, 10, 10, 10, 10, 10, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 0, 0, 32, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 5, 5, 5, 5, 5, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 5, 1, 1, 1, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
        [0, 0, 0, 32, 0, 0, 19, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0],
        [0, 0, 0, 32, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0],
        [10, 10, 10, 1, 10, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 33, 0, 0, 0, 32, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 1, 5, 0, 0, 5, 1, 1, 1, 1, 5, 10, 10, 10, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level9 = new Level([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 6, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
        [0, 0, 5, 19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 19, 5, 0, 0, 0],
        [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
        );
    levels = [[level5, level4, level6],
    [level3, level1, level2],
    [level7, level8, level9]
    ];
}

function draw() {
    takeInput();
    if (title_screen) {
        background(135, 206, 235);
        push()
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].update(clouds[i].vel)
            clouds[i].render()
        }
        imageMode(CENTER);
        image(title_screen_img, canvasWidth / 2, (canvasHeight / 2) - 40);

        textFont(player_2);
        fill('black');
        textAlign(CENTER, CENTER);
        textSize(13);
        text('Press E to start.', canvasWidth/2, (canvasHeight*4)/5);
        
        pop();
    }
    else {
        background(135, 206, 235);
        image(background_img, 0, 0);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 2; j++) {
                image(foreground_img, (2 * tileSize) + (i * 64), (15 * tileSize) + (j * 64));
            }
        }
        levels[currentLevel_y][currentLevel_x].render();
        if (!player.dead) {
            levels[currentLevel_y][currentLevel_x].coliding(player);
        }
        player.render();
        player.update();
        background(0, 0, 0, time);
        render_ui();
        if (millis() - lastTimeMili > 150) { //300 for normal time
            if (timephase == 0) {
                if (touching.type == 'bed') {
                    time += 4;
                }
                else {
                    time += 1;
                }
            }
            if (timephase == 1) {
                if (touching.type == 'bed') {
                    time -= 3;
                }
                else {
                    time -= 1;
                }
            }
            if (time >= 200) {
                timephase = 1;
                days += 1;
                player.hunger -= 1;
                newDayChime.play();
            }
            if (time <= 0) {
                timephase = 0;
                for (let y = 0; y < levels.length; y++) {
                    for (let x = 0; x < levels[y].length; x++) {
                        if (levels[y][x] != 0) {
                            for (let i = 0; i < levels[y][x].map.length; i++) {
                                for (let j = 0; j < levels[y][x].map[i].length; j++) {
                                    if (levels[y][x].map[i][j].age >= 0) {
                                        if (levels[y][x].map[i][j].type == 'corn') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age > 6 && levels[y][x].map[i][j].dead_counter > 0) {
                                                levels[y][x].map[i][j].age = 6;
                                                levels[y][x].map[i][j].dead_counter -= 1
                                            }
                                            if (levels[y][x].map[i][j].age > 7 && levels[y][x].map[i][j].dead_counter <= 0) {
                                                levels[y][x].map[i][j].age = 7;
                                                levels[y][x].map[i][j] = new Tile(11, (j * tileSize), (i * tileSize));
                                            }
                                        }
                                        if (levels[y][x].map[i][j].type == 'sweet_potato') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age > 4 && levels[y][x].map[i][j].dead_counter > 0) {
                                                levels[y][x].map[i][j].age = 4;
                                                levels[y][x].map[i][j].dead_counter -= 1
                                            }
                                            if (levels[y][x].map[i][j].age > 4 && levels[y][x].map[i][j].dead_counter <= 0) {
                                                levels[y][x].map[i][j].age = 4;
                                                levels[y][x].map[i][j] = new Tile(11, (j * tileSize), (i * tileSize));
                                            }
                                        }
                                        if (levels[y][x].map[i][j].type == 'strawberry') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age > 4 && levels[y][x].map[i][j].dead_counter > 0) {
                                                levels[y][x].map[i][j].age = 4;
                                                levels[y][x].map[i][j].dead_counter -= 1
                                            }
                                            if (levels[y][x].map[i][j].age > 4 && levels[y][x].map[i][j].dead_counter <= 0) {
                                                levels[y][x].map[i][j].age = 4;
                                                levels[y][x].map[i][j] = new Tile(11, (j * tileSize), (i * tileSize));
                                            }
                                        }
                                        if (levels[y][x].map[i][j].type == 'flower') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age == 1) {
                                                //Spawn a bee
                                            }
                                            if (levels[y][x].map[i][j].age > 2) {
                                                levels[y][x].map[i][j].age = 2;
                                            }
                                        }
                                        if (levels[y][x].map[i][j].type == 'ladybug') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age == 1) {
                                                //Spawn a bee
                                            }
                                            if (levels[y][x].map[i][j].age > 2) {
                                                levels[y][x].map[i][j].age = 2;
                                            }
                                        }
                                        if (levels[y][x].map[i][j].type == 'compost') {
                                            levels[y][x].map[i][j].age += 1;
                                            if (levels[y][x].map[i][j].age > 2) {
                                                levels[y][x].map[i][j] = new Tile(1, (j * tileSize), (i * tileSize));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            lastTimeMili = millis();
        }
    }
}

function addItem(ntype, ammount) {
    for (let i = 0; i < 8; i++) {
        if (player.inv[i].type == ntype) {
            player.inv[i].ammount += ammount;
            return;
        }
    }
    if (player.inv[player.hand].type == 'air') {
        player.inv[player.hand].type = ntype;
        player.inv[player.hand].ammount = ammount;
        return;
    }

    for (let i = 0; i < 8; i++) {
        if (player.inv[i].type == 'air') {
            player.inv[i].type = ntype;
            player.inv[i].ammount = ammount;
            return;
        }
    }
}



//keys
var move_right_button = 68;//d
var move_left_button = 65; //a
var move_up_button = 87;   //w
var move_down_button = 83; //s
var interact_button = 69;  //e
var eat_button = 81;       //q
function takeInput() {
    if (title_screen) {
        if (keyIsDown(interact_button)) {
            title_screen = false;
        }
    }
    else {
        //basic movement  
        if (keyIsDown(move_right_button)) {
            if (millis() - lastMili > 100) {
                player.facing = 1;

                if (levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) + 1] != 0 &&
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) + 1].colide != true) {
                    player.pos.x += tileSize;
                    player.hunger_counter += round(random(0, 1));
                    player.anim += 1;
                    if (player.anim > 1) {
                        player.anim = 0;
                    }
                    lastMili = millis();
                }
                if (player.pos.x + tileSize > canvasWidth) {
                    currentLevel_x += 1;
                    player.pos.x = tileSize / 2;
                }
            }
        }
        if (keyIsDown(move_left_button)) {
            if (millis() - lastMili > 100) {
                player.facing = 3;

                if (levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) - 1] != 0 &&
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) - 1].colide != true) {
                    player.pos.x -= tileSize;
                    player.hunger_counter += round(random(0, 1));
                    player.anim += 1;
                    if (player.anim > 1) {
                        player.anim = 0;
                    }
                    lastMili = millis();
                }
                if (player.pos.x - tileSize < 0) {
                    currentLevel_x -= 1;
                    player.pos.x = canvasWidth - (tileSize / 2);
                }
            }
        }
        if (keyIsDown(move_up_button)) {
            if (millis() - lastMili > 100) {
                player.facing = 0;

                if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize] != 0 &&
                    levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].colide != true) {
                    player.pos.y -= tileSize;
                    player.hunger_counter += round(random(0, 1));
                    player.anim += 1;
                    if (player.anim > 1) {
                        player.anim = 0;
                    }
                    lastMili = millis();
                }
                if (player.pos.y - tileSize < 0) {
                    currentLevel_y -= 1;
                    player.pos.y = canvasHeight - (tileSize / 2);
                }
            }
        }
        if (keyIsDown(move_down_button)) {
            if (millis() - lastMili > 100) {
                player.facing = 2;

                if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize] != 0 &&
                    levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].colide != true) {
                    player.pos.y += tileSize;
                    player.hunger_counter += round(random(0, 1));;
                    player.anim += 1;
                    if (player.anim > 1) {
                        player.anim = 0;
                    }
                    lastMili = millis();
                }
                if (player.pos.y + tileSize > canvasHeight) {
                    currentLevel_y += 1;
                    player.pos.y = tileSize / 2;
                }
            }
        }
        if (keyIsDown(eat_button)) {
            if (millis() - lastMili > 100) {
                if (player.hunger < maxHunger) {  // player only eats when hungry
                    if (player.inv[player.hand].type == 'corn') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('corn_seed', round(random(1, 2)));
                        player.hunger += 2;
                        if (player.hunger > maxHunger) {
                            player.hunger = maxHunger;
                        }
                    }
                    else if (player.inv[player.hand].type == 'sweet_potato') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('sweet_potato_seed', round(random(1, 2)));
                        player.hunger += 2;
                        if (player.hunger > maxHunger) {
                            player.hunger = maxHunger;
                        }
                    }
                    else if (player.inv[player.hand].type == 'strawberry') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('strawberry_seed', round(random(1, 2)));
                        player.hunger += 1;
                        if (player.hunger > maxHunger) {
                            player.hunger = maxHunger;
                        }
                    }
                }
            }
            lastMili = millis();
        }
        if (keyIsDown(interact_button)) {
            if (millis() - lastMili > 100) {
                if (touching.type == 'grass') {

                    // need interactable class to make this work more efficently 
                    if (player.inv[player.hand].type == 'hoe') {
                        hoe_sound.play();
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(2, touching.pos.x, touching.pos.y);
                    }

                }
                else if (touching.type == 'plot') {
                    if (player.inv[player.hand].type == 'corn_seed') {
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(3, touching.pos.x, touching.pos.y);
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                    }
                    else if (player.inv[player.hand].type == 'sweet_potato_seed') {
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(17, touching.pos.x, touching.pos.y);
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                    }
                    else if (player.inv[player.hand].type == 'strawberry_seed') {
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(20, touching.pos.x, touching.pos.y);
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                    }
                    else if (player.inv[player.hand].type == 'flower_seed') {
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(21, touching.pos.x, touching.pos.y);
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                    }
                    else if (player.inv[player.hand].type == 'ladybug') {
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(24, touching.pos.x, touching.pos.y);
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                    }

                }
                else if (touching.type == 'corn' && touching.age == 6) {
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(2, touching.pos.x, touching.pos.y);
                    addItem('corn', 1);
                }
                else if (touching.type == 'sweet_potato' && touching.age == 3) {
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(2, touching.pos.x, touching.pos.y);
                    addItem('sweet_potato', 1);
                }
                else if (touching.type == 'strawberry' && touching.age == 4) {
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(2, touching.pos.x, touching.pos.y);
                    addItem('strawberry', 1);
                }
                else if (touching.type == 'cart_s') {
                    if (player.inv[player.hand].type == 'corn') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        player.coins += round(random(1, 2));
                    }
                    else if (player.inv[player.hand].type == 'sweet_potato') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        player.coins += round(random(1, 2));
                    }
                }
                else if (touching.age == -3) {
                    if (player.coins >= touching.price) {
                        moneySound.play();
                        addItem(touching.btype, 1);
                        player.coins -= touching.price;
                    }

                }
                else if (touching.type == 'compost_bucket') {
                    if (player.inv[player.hand].type == 'junk') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('compost', 1);
                    }
                    else if (player.inv[player.hand].type == 'corn_seed') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('compost', 1);
                    }
                    else if (player.inv[player.hand].type == 'sweet_potato_seed') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('compost', 1);
                    }
                    else if (player.inv[player.hand].type == 'strawberry_seed') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        addItem('compost', 1);
                    }

                }
                else if (touching.type == 'dirt') {
                    if (player.inv[player.hand].type == 'compost') {
                        player.inv[player.hand].ammount -= 1;
                        if (player.inv[player.hand].ammount == 0) {
                            player.inv[player.hand].type = 'air';
                        }
                        levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(16, touching.pos.x, touching.pos.y);
                    }

                }
                else if (touching.type == 'junk') {
                    addItem(touching.type, 1);
                    levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][touching.pos.x / tileSize] = new Tile(2, touching.pos.x, touching.pos.y);
                }

                lastMili = millis();
            }
        }
        /*
        if(keyIsDown(48)){
          player.hand = 9;
        }
        */
        //mc style hotbar
        if (keyIsDown(49)) {
            player.hand = 0;
        }
        if (keyIsDown(50)) {
            player.hand = 1;
        }
        if (keyIsDown(51)) {
            player.hand = 2;
        }
        if (keyIsDown(52)) {
            player.hand = 3;
        }
        if (keyIsDown(53)) {
            player.hand = 4;
        }
        if (keyIsDown(54)) {
            player.hand = 5;
        }
        if (keyIsDown(55)) {
            player.hand = 6;
        }
        if (keyIsDown(56)) {
            player.hand = 7;
        }

        /*
        if(keyIsDown(57)){
          player.hand = 8;
        }
        */
        if (keyIsDown(80)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(touching);
                lastMili = millis();
            }
        }
    }
}

    //Christian's function to make UI more readible, positioning + math stuff
    function render_ui() {
        image(inv_img, (canvasWidth / 2) - (512 / 2), canvasHeight - 64);
        image(inv_hand_img, (canvasWidth / 2) - (512 / 2) + (64 * player.hand), canvasHeight - 64);
        image(calendar_img, canvasWidth - 70, 6);

        //calendar text
        textFont(player_2);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(13);
        text('days', canvasWidth - 39, 30);
        textSize(15);
        text(days, canvasWidth - 40, 50);

        for (let i = 0; i < 8; i++) {
            if (player.inv[i].type != 'air') {
                player.inv[i].render(i);
                if (i == player.hand) {
                    push();
                    fill(255)
                    textSize(13);
                    textAlign(CENTER, CENTER);
                    text(player.inv[i].type, (9 * canvasWidth / 16), (canvasHeight - 80));
                    pop()
                }
            }
        }
        for (let i = 0; i < maxHunger; i++) {
            image(hunger_e, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
        }
        for (let i = 0; i < player.hunger; i++) {
            image(hunger_f, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
        }
        textSize(32.5);
        fill(0);
        textAlign(LEFT, TOP);
        image(coin_img, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 95));
        text(player.coins, (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 92.5));

        //draw line for clock, happens 1/12
        if (player.facing == 0) {
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].age == -2) {
                push()
                stroke(0);
                fill(255);
                rectMode(CENTER);
                rect(touching.pos.x, touching.pos.y - (tileSize * 2), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].phraseHeight);
                textAlign(CENTER, CENTER);
                textSize(15);
                fill(0);
                text(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].phrase, touching.pos.x, touching.pos.y - (tileSize * 2), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].phraseHeight);
                pop()
                if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].htype != 'air' && levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].ammount > 0) {
                    addItem(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].htype, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].ammount);
                    levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize].ammount = 0;
                }
            }
        }
        if (player.facing == 1) {
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].age == -2) {
                push()
                stroke(0);
                fill(255);
                rectMode(CENTER);
                rect(touching.pos.x + (tileSize), touching.pos.y - (tileSize), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].phraseHeight);
                textAlign(CENTER, CENTER);
                textSize(15);
                fill(0);
                text(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].phrase, touching.pos.x + tileSize, touching.pos.y - (tileSize), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].phraseHeight);
                pop()
            }
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].htype != 'air' && levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].ammount > 0) {
                addItem(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].htype, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].ammount);
                levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1].ammount = 0;
            }
        }
        if (player.facing == 2) {
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].age == -2) {
                push()
                stroke(0);
                fill(255);
                rectMode(CENTER);
                rect(touching.pos.x, touching.pos.y, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].phraseHeight);
                textAlign(CENTER, CENTER);
                textSize(15);
                fill(0);
                text(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].phrase, touching.pos.x, touching.pos.y, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].phraseHeight);
                pop()
            }
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].htype != 'air' && levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].ammount > 0) {
                addItem(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].htype, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].ammount);
                levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize].ammount = 0;
            }
        }
        if (player.facing == 3) {
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].age == -2) {
                push()
                stroke(0);
                fill(255);
                rectMode(CENTER);
                rect(touching.pos.x - (tileSize), touching.pos.y - (tileSize), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].phraseHeight);
                textAlign(CENTER, CENTER);
                textSize(15);
                fill(0);
                text(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].phrase, touching.pos.x - tileSize, touching.pos.y - (tileSize), levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].phraseWidth, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].phraseHeight);
                pop()
            }
            if (levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].htype != 'air' && levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].ammount > 0) {
                addItem(levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].htype, levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].ammount);
                levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1].ammonut = 0;
            }
        }
        if (touching.age == -3) {
            push()
            stroke(0)
            fill(255)
            rectMode(CENTER)
            rect(touching.pos.x + (tileSize / 2), touching.pos.y - tileSize, touching.phraseWidth, touching.phraseHeight);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(0);
            text(touching.price, touching.pos.x + (tileSize), touching.pos.y - tileSize, touching.phraseWidth, touching.phraseHeight);
            image(coin_img, touching.pos.x - (tileSize / 2), touching.pos.y - (tileSize * 1.5))

            pop()
        }
    }