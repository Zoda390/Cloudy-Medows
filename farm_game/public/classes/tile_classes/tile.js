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
            rect(this.pos.x - tileSize / 2, this.pos.y - tileSize / 2, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(this.png, this.pos.x, this.pos.y);
        pop()
    }     
};