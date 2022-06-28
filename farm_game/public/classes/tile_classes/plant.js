class Plant extends Tile {
    constructor(name, png, x, y, border, collide, seed, eat, waterneeded, growthTime) {
        super(name, png, x, y, border, collide, 0)
        this.seed = seed; //might change to the seed item having a connection to the tile
        this.eat = eat; //object
        this.waterneeded = waterneeded;
        this.deathAttempts = 3;
        this.growTimer = 0;
        this.growthTime = growthTime;
    }


    render() {
        this.growTimer++;
        image(this.png[this.age], 10, 10);
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