class Plant extends Tile {
    constructor(name, png, x, y, border, collide, eat_num, waterneeded, growthTime) {
        super(name, png, x, y, border, collide, 0);
        this.eat_num = eat_num;
        this.waterneeded = waterneeded;
        this.deathAttempts = 3;
        this.growTimer = 0;
        this.growthTime = growthTime;
        this.class = 'Plant';
    }


    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(all_tiles[3 - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        image(this.png[this.age], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        if(this.age == this.png.length - 2){
            image(done_dot, this.pos.x + (tileSize/2), this.pos.y - (tileSize/4));
        }
        pop();
    }

    grow(x, y) {
        this.growTimer++;
        if (player.touching.name == 'bed') {
            this.growTimer++;
        }
        if (this.growTimer >= this.growthTime) {
            let water_found = 0;
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    if(levels[y][x].map[(this.pos.y/tileSize)+i][(this.pos.x/tileSize)+j].name == 'sprinkler'){
                        water_found += 1;
                    }
                }
            }
            if (water_found >= this.waterneeded) {
                this.age += 1;
                if (this.age > this.png.length - 2 && this.deathAttempts > 0) {
                    this.age = this.png.length - 2;
                    this.deathAttempts -= 1;
                }
                if (this.age > this.png.length - 1 && this.deathAttempts <= 0) {
                    this.age = this.png.length - 1;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = new_tile_from_num(5, this.pos.x, this.pos.y);
                }
            }
            else {
                this.deathAttempts -= 1;
                if (this.deathAttempts <= 0) {
                    this.age = this.png.length - 1;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = new_tile_from_num(5, this.pos.x, this.pos.y);
                }
            }
            this.growTimer = 0;
        }
    }
}