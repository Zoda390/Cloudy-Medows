class Entity extends Tile {
    constructor(name, png, x, y, inv=[], hand=0, under_tile_num){
        super(name, png, x, y, true, true, -1);
        this.inv = inv;
        for (let i = 0; i < this.inv.length; i++) {
            if (this.inv[i] != 0) {
                this.inv[i] = new_item_from_num(this.inv[i].num, this.inv[i].amount);
            }
        }
        this.hand = hand;
        this.under_tile_num = under_tile_num;
        this.class = "Entity";
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x - tileSize / 2, this.pos.y - tileSize / 2, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(all_tiles[this.under_tile_num - 1].png, this.pos.x, this.pos.y);
        image(this.png, this.pos.x, this.pos.y);
        pop();
    }

    onInteract() {
        if (this.touching.class == 'Plant' && this.touching.age == this.touching.png.length - 2) {
            addItem(levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num, 1);
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(2, this.touching.pos.x, this.touching.pos.y);
        }
        if (this.inv[this.hand].class == 'Placeable') {
            if (tile_name_to_num(this.touching.name) == (this.inv[this.hand].tile_need_num-1)) {
                levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y);
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.touching.name == 'grass') {
            if (this.inv[this.hand].name == 'Hoe') {
                hoe_sound.play();
                levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(2, this.touching.pos.x, this.touching.pos.y);
            }

        }
        else if (this.touching.name == 'plot') {
            if (this.inv[this.hand].class == 'Seed') {
                levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].plant_num, this.touching.pos.x, this.touching.pos.y);
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        else if (this.touching.name == 'cart_s') {
            if (this.inv[this.hand].price != 0 && this.inv[this.hand] != 0) {
                this.coins += this.inv[this.hand].price;
                moneySound.play();
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        else if (this.touching.age == -3) {
            if (this.coins >= this.touching.price) {
                moneySound.play();
                addItem(this.touching.bname, 1);
                this.coins -= this.touching.price;
                moneySound.play();
            }

        }
        else if (this.touching.name == 'compost_bucket') {
            if (this.inv[this.hand].name == 'Junk') {
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
                addItem(9, 1);
            }
            else if (this.inv[this.hand].name == 'Corn Seed') {
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
                addItem(9, 1);
            }
            else if (this.inv[this.hand].name == 'Sweet Potato Seed') {
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
                addItem(9, 1);
            }
            else if (this.inv[this.hand].name == 'Strawberry Seed') {
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
                addItem(9, 1);
            }

        }
        else if (this.touching.name == 'junk') {
            addItem(4, 1);
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(2, this.touching.pos.x, this.touching.pos.y);
        }
    }

    tileTouching(x, y) {
        return levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize]
    }
}