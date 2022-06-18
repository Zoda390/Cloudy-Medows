/*
@authors: Whole
@brief: Outputs to canvas
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
    play(){
      this.sound.play();
    }
    stop(){
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
                this.age = -1;
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
            image(sweet_potato_tile_imgs[this.age], this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'strawberry') {
            image(plot_tile_img, this.pos.x, this.pos.y);
            image(strawberry_tile_imgs[this.age], this.pos.x + (tileSize / 4), this.pos.y);
        }
        if (this.type == 'sprinkler') {
            image(grass_tile_img, this.pos.x, this.pos.y);
            image(sprinkler_tile_img, this.pos.x + (tileSize / 4), this.pos.y + (tileSize / 6));
        }
        if (this.type == 'lamppost') {
            image(concrete_tile_img, this.pos.x, this.pos.y);
            image(lamppost_tile_img, this.pos.x, this.pos.y);
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
        this.inv = [new Item('hoe', 1), new Item('corn_seed', 3), new Item('junk', 1), new Item('corn',1), new Item('compost',1), new Item('sweet_potato',1), new Item('strawberry_seed',1), new Item('air')];
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
            this.hp -= 5;
            fill(255, 0, 0, 100);
            circle(this.pos.x, this.pos.y, tileSize);
            lastHungerMili = millis();
        }
        else if (this.hunger >= maxHunger && millis() - lastHungerMili > 600) {
            this.hp += 5;
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
var title_button_exist = false;
var title_screen = false;


function preload() {
    //Items
    corn_img = loadImage('Corn_item.png');
    corn_seed_bag_img = loadImage('Corn_Seed_bag.png');
    sweet_potato_seed_bag_img = loadImage('seedbag_sp.png');
    sweet_potato_img = loadImage('SweetPotato.png');

    straw_img = loadImage('Stawberry.png');
    strawberry_seed_bag_img = loadImage('SeedBag_Stawberry.png');

    hoe_img = loadImage('Hoe.png');
    junk_img = loadImage('junk.png');
    compost_img = loadImage('compost.png');
    sprinkler_img = loadImage('Sprinkler.png');

    //Tile                                                  Tile Num.
    grass_tile_img = loadImage('Grass.png');                //1
    plot_tile_img = loadImage('Plot.png');                  //2
    wall_tile_img = loadImage('Wood.png');                  //4
    concrete_tile_img = loadImage('Concrete_1.png');        //5
    dirt_tile_img = loadImage('dirt.png');                  //6
    bed_tile_img = loadImage('Bed.png');                    //7
    cart_s_tile_img = loadImage('Cart_s.png');              //8
    cart_tile_img = loadImage('Cart.png');                  //9
    bridge_tile_img = loadImage('Bridge.png');              //10
    junk_tile_img = loadImage('junk_tile.png');             //11
    concrete_tile_2_img = loadImage('Concrete2.png');       //12
    satilite_tile_img = loadImage('Satilite.png');          //13
    solarpanel_tile_img = loadImage('SolarPanel.png');      //14
    compost_bucket_tile_img = loadImage('Worm_Bucket.png'); //15
    compost_tile_img = loadImage('compost_tile.png');       //16
    sprinkler_tile_img = loadImage('Sprinkler.gif');        //18
    lamppost_tile_img = loadImage('Light.png');             //19

    //Ui
    player_2 = loadFont('pixelFont.ttf');
    inv_img = loadImage('Inventory.png');
    inv_hand_img = loadImage('Inventory_Frame.png');
    hunger_e = loadImage('Corn_empty.png');
    hunger_f = loadImage('Corn_Filled.png');
    calendar_img = loadImage('Calender.png');
    background_img = loadImage('Skyline.gif');
    foreground_img = loadImage('Fore.png');
    coin_img = loadImage('coin.png');
    title_screen_img = loadImage('Title_Screen.gif');
    button_img = loadImage('Button.png');
    button_selected_img = loadImage('ButtonSelected.png');

    //Player
    up_move_img_1 = loadImage('Back_Move.png');
    up_move_img_2 = loadImage('BackMove_2.png');
    down_move_img_1 = loadImage('Front_moving.png');
    down_move_img_2 = loadImage('Front_Move2.png');
    left_move_img_1 = loadImage('Side_Move.png');
    left_move_img_2 = loadImage('SideMove2.png');
    right_move_img_1 = loadImage('Right_Move.png');
    right_move_img_2 = loadImage('RightMove2.png');
    player_imgs = [[up_move_img_1, up_move_img_2],
        [right_move_img_1, right_move_img_2],
        [down_move_img_1, down_move_img_2],
        [left_move_img_1, left_move_img_2]
    ];

    //Plants
    //  Corn 3
    corn_tile_img = loadImage('CornStage_1.png');
    corn_tile_2_img = loadImage('CornStage_2.png');
    corn_tile_3_img = loadImage('CornStage_4.png');
    corn_tile_4_img = loadImage('CornStage5.png');
    corn_tile_5_img = loadImage('CornStage6_1.png');
    corn_tile_6_img = loadImage('CornStage7.png');
    corn_tile_7_img = loadImage('CornStage8.png');
    corn_tile_8_img = loadImage('CornDead.png');
    corn_tile_imgs = [corn_tile_img, corn_tile_2_img, corn_tile_3_img, corn_tile_4_img, corn_tile_5_img, corn_tile_6_img, corn_tile_7_img, corn_tile_8_img];
    //  Sweet Potato 17
    sweet_potato_tile_img = loadImage('beets_1.png');
    sweet_potato_tile_2_img = loadImage('beets_2.png');
    sweet_potato_tile_3_img = loadImage('beets_3.png');
    sweet_potato_tile_4_img = loadImage('beets_4.png');
    sweet_potato_tile_5_img = loadImage('beets_5.png');
    sweet_potato_tile_imgs = [sweet_potato_tile_img, sweet_potato_tile_2_img, sweet_potato_tile_3_img, sweet_potato_tile_4_img, sweet_potato_tile_5_img];

    //Strawberry
    strawberry_tile_img = loadImage('strawberry_1.png');
    strawberry_tile_2_img = loadImage('strawberry_2.png');
    strawberry_tile_3_img = loadImage('strawberry_3.png');
    strawberry_tile_4_img = loadImage('strawberry_4.png');
    strawberry_tile_5_img = loadImage('strawberry_5.png');
    strawberry_tile_6_img = loadImage('strawberry_6.png');
    strawberry_tile_imgs = [strawberry_tile_img, strawberry_tile_2_img, strawberry_tile_3_img, strawberry_tile_4_img, strawberry_tile_5_img, strawberry_tile_6_img];

    //sounds
    hoe_sound = new Sound('Hoe.wav');
    onDeathSound = new Sound('Death.wav');
    newDayChime = new Sound('NewDay.mp3');
    main_theme = new Sound('Main_theme.wav');

    main_theme.play(); //needs to loop
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < cloudCount; i++) {
        clouds[i] = new Cloud()
    }
    player = new Player((6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2));
    level1 = new Level([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 13, 5, 0, 0, 0],
    [0, 0, 5, 4, 7, 5, 4, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 4, 5, 5, 4, 5, 5, 12, 5, 1, 1, 1, 17, 18, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 4, 4, 5, 4, 19, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 10, 10, 10],
    [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 5, 12, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 5, 12, 5, 5, 8, 9, 5, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 14, 14, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    level2 = new Level([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 13, 5, 5, 5, 5, 5, 5, 15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 12, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 12, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 12, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 12, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0],
    [0, 0, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], (6 * tileSize) - (tileSize / 2), (6 * tileSize) - (tileSize / 2)
    );
    levels = [[0, 0, 0],
    [0, level1, level2],
    [0, 0, 0]
    ];
}

function draw() {
    if (title_screen) {
        createTitleButton();
        background(135, 206, 235);
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].update(clouds[i].vel)
            clouds[i].render()
        }
        imageMode(CENTER);
        image(title_screen_img, canvasWidth / 2, (canvasHeight/2)-40);
    }
    else {
        deleteTitleButton();
        background(135, 206, 235);
        image(background_img, 0, 0);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 2; j++) {
                image(foreground_img, (2 * tileSize) + (i * 64), (15 * tileSize) + (j * 64));
            }
        }
        takeInput();
        levels[currentLevel_y][currentLevel_x].render();
        if (!player.dead) {
            levels[currentLevel_y][currentLevel_x].coliding(player);
        }
        player.render();
        player.update();
        background(0, 0, 0, time);
        render_ui();
        if (millis() - lastTimeMili > 10) { //300 for normal time
            if (timephase == 0) {
                if (touching.type == 'bed') {
                    time += 3;
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

    //basic movement  
    if (keyIsDown(move_right_button)) {
        if (millis() - lastMili > 100) {
            player.facing = 1;
            
            if (levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) + 1] != 0 &&
                levels[currentLevel_y][currentLevel_x].map[touching.pos.y / tileSize][(touching.pos.x / tileSize) + 1].colide != true) {
                player.pos.x += tileSize;
                player.hunger_counter += 1;
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
                player.hunger_counter += 1;
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
                player.hunger_counter += 1;
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
                player.hunger_counter += 1;
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
            if(player.hunger_counter > 0){  // player only eats when hungry
            if (player.inv[player.hand].type == 'corn') {
                player.inv[player.hand].ammount -= 1;
                if (player.inv[player.hand].ammount == 0) {
                    player.inv[player.hand].type = 'air';
                }
                addItem('corn_seed', round(random(1,2)));
                if (player.hunger < maxHunger) {
                    player.hunger += 2;
                    if (player.hunger > maxHunger) {
                        player.hunger = maxHunger;
                    }
                }
            }
            else if (player.inv[player.hand].type == 'sweet_potato') {
                player.inv[player.hand].ammount -= 1;
                if (player.inv[player.hand].ammount == 0) {
                    player.inv[player.hand].type = 'air';
                }
                addItem('sweet_potato_seed',  round(random(1,2)));
                if (player.hunger < maxHunger) {
                    player.hunger += 2;
                    if (player.hunger > maxHunger) {
                        player.hunger = maxHunger;
                    }
                }
            }
            else if (player.inv[player.hand].type == 'strawberry') {
                player.inv[player.hand].ammount -= 1;
                if (player.inv[player.hand].ammount == 0) {
                    player.inv[player.hand].type = 'air';
                }
                addItem('strawberry_seed',  round(random(1,2)));
                if (player.hunger < maxHunger) {
                    player.hunger += 1;
                    if (player.hunger > maxHunger) {
                        player.hunger = maxHunger;
                    }
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
            else if (touching.type == 'cart_b_corn') {
                if (player.coins >= 1) {
                    addItem('corn_seed', 1);
                    player.coins -= 1;
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
                text(player.inv[i].type, (9*canvasWidth / 16), (canvasHeight - 80));
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
    image(coin_img, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 100));
    text(player.coins, (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 97.5));

    //draw line for clock, happens 1/12

}

//Patrick's title-screen functions
function createTitleButton() {
    if (!title_button_exist) {
        //Craig's Hive Mind Code
        menuDiv = createDiv();
	    menuDiv.class("title-button-container");
	    menuDiv.position(width/2 - 200, (height*3)/4 - 20);

        b1 = createButton("Start")
	    b1.class("normal-button")
	    b1.parent(menuDiv)

        b1Element = createImg("Button.png", 'button')
	    b1Element.class("button-image-element")
	    b1Element.parent(b1)
        
        title_button_exist = true;

        b1.mouseClicked(() => {title_screen = false;})

    //somehwere here having something like b1.mouseHover(()) and swap with hover img, hopefully you don't need to create other button
        
    }
}
function deleteTitleButton() {
    if (title_button_exist) {
        //delete button
        title_button_exist = false;
    }
}

//button.mouseHover?