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

    onInteract(x, y) {
        if (this.touching.class == 'Plant' && this.touching.age == this.touching.png.length - 2) {
            if(checkForSpace(levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num)){
                addItem(levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num, 1 + levels[y][x].ladybugs);
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        if (this.inv[this.hand] != 0 && this.inv[this.hand].class == 'Placeable') {
            if (tile_name_to_num(this.touching.name) == (this.inv[this.hand].tile_need_num-1) || this.inv[this.hand].tile_need_num == 0) {
                if(this.inv[this.hand].name == 'Robot'){
                    if(this.looking(x, y) != undefined && this.looking(x, y).collide == false){
                        let temp = this.looking(x, y);
                        this.touching = this.tileTouching(x, y);
                        if (this.touching != 0) {
                            if(this.facing == 0){
                                levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y - 32);
                            }
                            else if(this.facing == 1){
                                levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) + 1] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x + 32, this.touching.pos.y);
                            }
                            else if(this.facing == 2){
                                levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y + 32);
                            }
                            else if(this.facing == 3){
                                levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) - 1] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x - 32, this.touching.pos.y);
                            }
                        }
                        this.looking(x, y).under_tile = temp;
                    }
                    else{
                        return;
                    }
                }
                else{
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y);
                    if (this.inv[this.hand].name == 'Ladybugs') {
                        levels[y][x].ladybugs += 1;
                    }
                }
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.class == 'Player' && this.looking(x, y) != undefined && this.looking(x, y).name == 'cart_s') {
            if (this.inv[this.hand].price != 0 && this.inv[this.hand] != 0) {
                this.coins += this.inv[this.hand].price;
                moneySound.play();
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.touching.name == 'grass') {
            if (this.inv[this.hand].name == 'Hoe') {
                hoe_sound.play();
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }

        }
        else if (this.touching.name == 'plot') {
            if (this.inv[this.hand].class == 'Seed') {
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].plant_num, this.touching.pos.x, this.touching.pos.y);
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        else if (this.touching.name == 'compost_bucket') {
            if (this.inv[this.hand].name == 'Junk' || this.inv[this.hand].name == 'Corn Seed' || this.inv[this.hand].name == 'Sweet Potato Seed' || this.inv[this.hand].name == 'Strawberry Seed') {
                if(checkForSpace(9)){
                    this.inv[this.hand].amount -= 1;
                    if (this.inv[this.hand].amount == 0) {
                        this.inv[this.hand] = 0;
                    }
                    addItem(9, 1);
                }
            }
        }
        else if (this.touching.name == 'junk') {
            if(checkForSpace(4)){
                addItem(4, 1);
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
    }
}