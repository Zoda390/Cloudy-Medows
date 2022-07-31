class Plant extends Tile {
    constructor(name, png, x, y, collide, eat_num, waterneeded, growthTime) {
        super(name, png, x, y, collide, 0);
        this.eat_num = eat_num;
        this.waterneeded = waterneeded;
        this.watermet = false;
        this.deathAttempts = 3;
        this.growTimer = 0;
        this.growthTime = growthTime;
        this.class = 'Plant';
    }


    render() {
        push();
        imageMode(CENTER);
        if(this.waterneeded > 0 && this.watermet){
            image(all_imgs[93][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        }
        else{
            image(all_imgs[2][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        }
        image(all_imgs[this.png][this.age], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        if(this.age == all_imgs[this.png].length - 2){
            image(done_dot, this.pos.x + (tileSize/2), this.pos.y - (tileSize/4));
        }
        pop();
    }

    grow(x, y) {
        this.growTimer++;
        if (player.touching.name == 'bed') {
            this.growTimer += 2;
        }
        let water_found = 0;
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(levels[y][x].map[(this.pos.y/tileSize)+i][(this.pos.x/tileSize)+j].name == 'sprinkler'){
                    water_found += 1;
                }
                else if(levels[y][x].map[(this.pos.y/tileSize)+i][(this.pos.x/tileSize)+j].under_tile != undefined && levels[y][x].map[(this.pos.y/tileSize)+i][(this.pos.x/tileSize)+j].under_tile.name == 'sprinkler'){
                    water_found += 1;
                }
            }
        }
        this.watermet = (water_found >= this.waterneeded)
        if (this.growTimer >= this.growthTime) {
            if (this.watermet) {
                this.age += 1;
                if(this.age == all_imgs[this.png].length - 2){
                    if(this.name == 'carrot'){
                        let rand = random(0, 100);
                        if(rand <= 0.1){
                            levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = new_tile_from_num(91, this.pos.x, this.pos.y);
                        }
                    }
                }
                if (this.age > all_imgs[this.png].length - 2 && this.deathAttempts > 0) {
                    this.age = all_imgs[this.png].length - 2;
                    this.deathAttempts -= 1;
                }
                if (this.age > all_imgs[this.png].length - 1 && this.deathAttempts <= 0) {
                    this.age = all_imgs[this.png].length - 1;
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

    load(obj){
        this.age = obj.age;
        this.variant = obj.variant;
        this.watermet = obj.watermet;
        this.deathAttempts = obj.deathAttempts;
        this.growTimer = obj.growTimer;
    }
}