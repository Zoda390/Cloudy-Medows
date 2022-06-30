class Plant extends Tile {
    constructor(name, png, x, y, border, collide, seed_num, waterneeded, growthTime) {
        super(name, png, x, y, border, collide, 0);
        this.seed_num = seed_num;
        this.waterneeded = waterneeded;
        this.deathAttempts = 3;
        this.growTimer = 0;
        this.growthTime = growthTime;
    }


    render() {
        this.growTimer++;
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(all_tiles[2 - 1].png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        image(this.png[this.age], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop();
    }

    grow() {
        if (growTimer > growthTime) {
            let water_found = 0;
            //look at surrounding tiles to find sprinklers;
            if (water_found >= this.waterneeded) {
                this.age += 1;
                if (this.age > this.png.length - 2 && this.deathAttempts > 0) {
                    this.age = this.png.length - 2;
                    this.deathAttempts -= 1;
                }
                if (this.age > this.png.length - 1 && this.deathAttempts <= 0) {
                    this.age = this.png.length - 1;
                    //new junk tile;
                }
            }
            else {
                this.deathAttempts -= 1;
                if (this.deathAttempts <= 0) {
                    this.age = this.png.length - 1;
                    //new junk tile;
                }
            }
        }
    }
}