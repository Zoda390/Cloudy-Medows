class Tile {
    constructor(name, png, x, y, border, collide, age) {
        this.name = name;
        this.png = png;
        this.pos = createVector(x, y);
        this.border = border;
        this.collide = collide;
        this.age = age;
        this.variant = round(random(0, this.png.length-1));
        this.class = "Tile";
    }

    render() {
        push()
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        if (this.name == 'bed' || this.name == 'lamppost' || this.name == 'compost_bucket' || this.name == 'cart_s' || this.name == "bush") {
            image(all_tiles[1 - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //concrete under
        }
        if (this.name == 'sprinkler'){
            image(all_tiles[2 - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //grass under
        }
        if (this.name == 'junk') {
            image(all_tiles[3 - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //plot under
        }
        if (this.name == 'compost_tile') {
            image(all_tiles[4 - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //dirt under
        }
        image(this.png[this.variant], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop()
    }     
};