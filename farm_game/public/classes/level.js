class Level {
    constructor(map, fore) {
        this.lights = [];
        this.fore = fore;
        this.map = map;
        this.ladybugs = 0;
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
    }

    fore_render() {
        let last = 0;
        for (let i = 0; i < this.fore.length; i++) {
            for (let j = 0; j < this.fore[i].length; j++) {
                if (this.fore[i][j] == 1) {
                    image(foreground_img, j * tileSize, i * tileSize);
                }
                if (this.fore[i][j] == 2) {
                    image(fore_cloud_img, j * tileSize, i * tileSize);
                }
                if (this.fore[i][j] == 3){
                    image(fore_building_img, j * tileSize, i * tileSize)
                }
                if (this.fore[i][j] == 4){
                    image(fore_red_building_img, j * tileSize, i * tileSize)
                }
                if (this.fore[i][j] == 5){
                    image(fore_red_grown_building_img, j * tileSize, i * tileSize)
                }
            }
        }
        for (let i = 0; i < this.fore.length; i++) {
            for (let j = 0; j < this.fore[i].length; j++) {
                if (last == 1 && this.fore[i][j] == 3) {
                    push();
                    stroke(0);
                    strokeWeight(3);
                    line(j * tileSize, i * tileSize, j * tileSize, canvasHeight);
                    pop();
                }
                if (last == 3 && this.fore[i][j] == 1) {
                    push();
                    stroke(0);
                    strokeWeight(3);
                    line(j * tileSize, i * tileSize, j * tileSize, canvasHeight);
                    pop();
                }
                last = this.fore[i][j];
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
            }
        }
    }

    daily_update() {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j].age >= 0 && this.map[i][j].class != 'Plant') {
                    this.map[i][j].age += 1;
                    if (this.map[i][j].name == 'compost_tile') {
                        if (this.map[i][j].age >= 2) {
                            this.map[i][j] = new_tile_from_num(1, (j * tileSize), (i * tileSize));
                        }
                    }
                    if (this.map[i][j].name == 'plot') {
                        if (this.map[i][j].age >= 5) {
                            this.map[i][j] = new_tile_from_num(6, (j * tileSize), (i * tileSize));
                        }
                    }
                    if (this.map[i][j].name == 'ladybug') {
                        if (this.map[i][j].age >= 20) {
                            this.ladybugs -= 1;
                            this.map[i][j] = new_tile_from_num(1, (j * tileSize), (i * tileSize));
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