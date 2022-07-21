class MoveableEntity extends Entity {
    constructor(name, png, x, y, inv = [], hand = 0, facing, under_tile_num, moving_timer) {
        super(name, png, x, y, -1, inv, hand, under_tile_num);
        this.anim = 0;
        this.facing = facing;
        this.touching = 0;
        this.moving_timer = moving_timer;
        this.max_moving_timer = this.moving_timer;
        this.class = "MovableEntity";
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        if(this.under_tile != 0){
            this.under_tile.render();
        }
        if (this.under_tile.class == 'Plant') {
            this.under_tile.grow(x,y);
        }
        image(this.png[this.facing][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //[this.anim]
        pop();
    }

    looking(x, y) {
        this.touching = this.tileTouching(x, y);
        if (this.touching != 0) {
            if ((this.touching.pos.y / tileSize == 0 && this.facing == 0) || (this.touching.pos.y / tileSize == 18 && this.facing == 2)) {
                return undefined;
            }
            switch (this.facing) {
                case 0:
                    return levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize];
                case 1:
                    return levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) + 1];
                case 2:
                    return levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize];
                case 3:
                    return levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) - 1];
                default:
                    console.log("facing not understood");
            }
        }
    }
}