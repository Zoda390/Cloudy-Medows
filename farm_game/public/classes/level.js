class Foreground {
    constructor(type, x, y){
        this.type = type;
        if(this.type == 1){ // Front of the building
            this.png = [fore_1_img, fore_2_img, fore_4_img, fore_6_img, fore_empty_img];
        }
        if(this.type == 2){ // Clouds
            this.png = [fore_cloud_2_img];
        }
        if(this.type == 3){ // buildings
            this.png = [fore_building_img, fore_red_building_img, fore_red_grown_building_img, fore_gray_building_img];
        }
        this.variant = round(random(0, this.png.length-1));
        this.pos = createVector(x, y);
    }

    render(){
        image(this.png[this.variant], this.pos.x, this.pos.y);
    }
}
class Level {
    constructor(name, map, fore) {
        this.name = name;
        this.lights = [];
        this.fore = fore;
        this.map = map;
        this.ladybugs = 0;
        this.level_name_popup = false;
        this.done = false;
        this.movephase = 0;
        this.ticks = 0;
        this.y = -50;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0) {
                    this.map[i][j] = 0;
                } else {
                    if (map[i][j] <= all_tiles.length) {
                        map[i][j] = new_tile_from_num(map[i][j], j * tileSize, i * tileSize);
                    } else {
                        this.map[i][j] = 0;
                    }
                    if (this.map[i][j].name == 'lamppost') {
                        append(this.lights, new Light(this.map[i][j].pos.x, this.map[i][j].pos.y, (tileSize * 6), 255, 255, 255));
                    }
                    if (this.map[i][j].name == 'satilite') {
                        append(this.lights, new Light(this.map[i][j].pos.x, this.map[i][j].pos.y, (tileSize * 1), 255, 255, 0));
                    }
                }
            }
        }
        for(let i = 0; i < fore.length; i++){
            for(let j = 0; j < fore[i].length; j++){
                if(this.fore[i][j] != 0){
                    this.fore[i][j] = new Foreground(fore[i][j], j * tileSize, i * tileSize);
                }
            }
        }
    }

    //Controls movement for top-left level box when you enter a new level
    name_render() {
        if(!this.done){
            if(!paused){
                if(this.movephase == 0){
                    if(this.ticks >= 50){
                        this.movephase = 1;
                        this.ticks = 0;
                    }
                    this.y += 1;
                }
                if(this.movephase == 1){
                    if(this.ticks >= 70){
                        this.movephase = 2;
                        this.ticks = 0;
                    }
                }
                if(this.movephase == 2){
                    this.y -= 1;
                    if(this.ticks >= 50){
                        this.done = true;
                        this.ticks = 0;
                    }
                }
                
            this.ticks += 1;
        }
            push();
            stroke(149, 108, 65);
            strokeWeight(5);
            fill(187, 132, 75);
            rect(5, this.y, (this.name.length*17)+6, 50);
            textFont(player_2);
            textSize(15);
            fill(255);
            stroke(0);
            strokeWeight(4);
            textAlign(CENTER, CENTER);
            text(this.name, (((this.name.length*17)+6)/2)+5, this.y+25);
            pop();

        }
        else{
            this.level_name_popup = false;
        }
    }
    fore_render() {
        for (let i = 0; i < this.fore.length; i++) {
            for (let j = 0; j < this.fore[i].length; j++) {
                if(this.fore[i][j] != 0){
                    this.fore[i][j].render()
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

    update(x,y) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j].class == 'Plant') {
                    this.map[i][j].grow(x,y);
                }
                if (this.map[i][j].class == 'NPC') {
                    this.map[i][j].move(x,y);
                }
                if (this.map[i][j].class == 'Robot') {
                    this.map[i][j].move(x,y);
                }
                if (this.map[i][j].class == 'FreeMoveEntity'){
                    this.map[i][j].randomMove(x,y);
                }
                if (this.map[i][j].name == 'flower') {
                    if (this.map[i][j].age == 1 && round(random(0,3)) == 2) {
                        this.map[i][j] = new_tile_from_num(49, (j * tileSize), (i * tileSize));
                        this.map[i][j].under_tile = new_tile_from_num(50, (j * tileSize), (i * tileSize));
                    }
                }
            }
        }
    }

    daily_update() {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if(this.map[i][j].class == 'Shop'){
                    this.map[i][j].daily_update();
                }
                if (this.map[i][j].age >= 0 && this.map[i][j].class != 'Plant') {
                    this.map[i][j].age += 1;
                    if (this.map[i][j].name == 'compost_tile') {
                        if (this.map[i][j].age >= 2) {
                            this.map[i][j] = new_tile_from_num(2, (j * tileSize), (i * tileSize));
                        }
                    }
                    if (this.map[i][j].name == 'plot') {
                        if (this.map[i][j].age >= 5) {
                            this.map[i][j] = new_tile_from_num(4, (j * tileSize), (i * tileSize));
                        }
                    }
                    if (this.map[i][j].name == 'ladybug') {
                        if (this.map[i][j].age >= 20) {
                            this.ladybugs -= 1;
                            this.map[i][j] = new_tile_from_num(2, (j * tileSize), (i * tileSize));
                        }
                    }
                    if (this.map[i][j].name == 'Flower_Done'){
                        if (this.map[i][j].age >= 5) {
                            this.map[i][j] = new_tile_from_num(2, (j * tileSize), (i * tileSize));
                        }
                    }
                }
            }
        }
    }
};

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