class Tile {
    constructor(name, png, x, y, border, collide, age) {
        this.name = name;
        this.png = png;
        this.pos = createVector(x, y);
        this.border = border;
        this.collide = collide;
        this.age = age;
        this.class = "Tile";
    }

    render() {
        push()
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        if (this.name == 'bed' || this.name == 'lamppost' || this.name == 'compost_bucket') {
            image(all_tiles[5 - 1].png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //concrete 1 under
        }
        if (this.name == 'junk') {
            image(all_tiles[2 - 1].png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //plot under
        }
        if (this.name == 'compost_tile') {
            image(all_tiles[6 - 1].png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //dirt under
        }
        image(this.png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop()
    }     
};