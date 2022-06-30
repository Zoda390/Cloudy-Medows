class Level {
    constructor(map, fore) {
        this.lights = [];
        this.fore = fore;
        this.map = map;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 0) {
                    this.map[i][j] = 0;
                } else {
                    if (map[i][j] <= all_tiles.length) {
                        if (all_tiles[map[i][j] - 1].class == 'Tile') {
                            this.map[i][j] = new Tile(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'Plant') {
                            this.map[i][j] = new Plant(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'Entity') {
                            this.map[i][j] = new Entity(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'FreeMoveEntity') {
                            this.map[i][j] = new FreeMoveEntity(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'MovableEntity') {
                            this.map[i][j] = new MovableEntity(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'GridMoveEntity') {
                            this.map[i][j] = new GridMoveEntity(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                        else if (all_tiles[map[i][j] - 1].class == 'NPC') {
                            this.map[i][j] = new NPC(all_tiles[map[i][j] - 1].name, all_tiles[map[i][j] - 1].png, j * tileSize, i * tileSize, all_tiles[map[i][j] - 1].border, all_tiles[map[i][j] - 1].collide, all_tiles[map[i][j] - 1].age);
                        }
                    } else {
                        this.map[i][j] = 0;
                    }
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

    fore_render() {
        let last = 0;
        for (let i = 0; i < this.fore.length; i++) {
            for (let j = 0; j < this.fore[i].length; j++) {
                if (this.fore[i][j] == 1) {
                    image(foreground_img, j * tileSize, i * tileSize);
                }
            }
        }
        for (let i = 0; i < this.fore.length; i++) {
            for (let j = 0; j < this.fore[i].length; j++) {
                if (last == 1 && this.fore[i][j] == 0) {
                    push();
                    stroke(0);
                    strokeWeight(3);
                    line(j * tileSize, i * tileSize, j * tileSize, canvasHeight);
                    pop();
                }
                if (last == 0 && this.fore[i][j] == 1) {
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
            }
        }
    }

    daily_update() {
        if (this.map[i][j].age >= 0 && this.map[i][j].class != 'Plant') {
            this.map[i][j].age += 1;
            if (this.map[i][j].name == 'flower') {
                if (this.map[i][j].age == 1) {
                    //Spawn a bee
                }
                if (this.map[i][j].age > 2) {
                    this.map[i][j].age = 2;
                }
            }
            if (this.map[i][j].name == 'compost') {
                if (this.map[i][j].age == 2) {
                    this.map[i][j] = new Tile(1, (j * tileSize), (i * tileSize));
                }
            }
            if (this.map[i][j].name == 'plot') {
                if (this.map[i][j].age == 5) {
                    this.map[i][j] = new Tile(6, (j * tileSize), (i * tileSize));
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