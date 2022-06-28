class MoveableEntity extends Entity {
    constructor(name, png, x, y, inv = [], hand = 0, under_tile_png, facing) {
        super(name, png, x, y, inv, hand, under_tile_png);
        this.anim = 0;
        this.facing = facing;
        this.class = "MovableEntity";
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x - tileSize / 2, this.pos.y - tileSize / 2, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(this.under_tile_png, this.pos.x, this.pos.y);
        image(this.png[facing][anim], this.pos.x, this.pos.y);
        pop();
    }

    move() {
        /*
        if (move) {
            if (up) {
                this.facing = 0;
            }
            if (right) {
                this.facing = 1;
            }
            if (down) {
                this.facing = 2;
            }
            if (left) {
                this.facing = 3;
            }
            
            this.anim += 1;
            if (this.anim > this.png[this.facing].length) {
                this.anim = 0;
            }
        }
        */
    }
}