class Entity extends Tile {
    constructor(name, png, x, y, inv=[], hand=0, under_tile_png){
        super(name, png, x, y, true, true, -1);
        this.inv = inv; //Item array
        this.hand = hand;
        this.under_tile_png = under_tile_png;
        this.class = "Entity";
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x - tileSize / 2, this.pos.y - tileSize / 2, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(this.under_tile_png, this.pos.x, this.pos.y);
        image(this.png, this.pos.x, this.pos.y);
        pop();
    }

    onInteract() {
        if (this.touching.name == 'grass') {
            if (this.inv[this.hand].name == 'hoe') {
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
        else if (this.touching.name == 'corn' && this.touching.age == 6) {
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new Tile(2, this.touching.pos.x, this.touching.pos.y);
            addItem('corn', 1);
        }
        else if (this.touching.name == 'sweet_potato' && this.touching.age == 3) {
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new Tile(2, this.touching.pos.x, this.touching.pos.y);
            addItem('sweet_potato', 1);
        }
        else if (this.touching.name == 'strawberry' && this.touching.age == 4) {
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new Tile(2, this.touching.pos.x, this.touching.pos.y);
            addItem('strawberry', 1);
        }
        else if (this.touching.name == 'cart_s') {
            if (this.inv[this.hand].price != 0 && this.inv[this.hand].name != "air") {
                this.coins += this.inv[this.hand].price;
                moneySound.play();
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                    this.inv[this.hand].ammount = 0;
                    this.inv[this.hand].price = 0;
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
            if (this.inv[this.hand].name == 'junk') {
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                }
                addItem('compost', 1);
            }
            else if (this.inv[this.hand].name == 'corn_seed') {
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                }
                addItem('compost', 1);
            }
            else if (this.inv[this.hand].name == 'sweet_potato_seed') {
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                }
                addItem('compost', 1);
            }
            else if (this.inv[this.hand].name == 'strawberry_seed') {
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                }
                addItem('compost', 1);
            }

        }
        else if (this.touching.name == 'dirt') {
            if (this.inv[this.hand].name == 'compost') {
                this.inv[this.hand].ammount -= 1;
                if (this.inv[this.hand].ammount == 0) {
                    this.inv[this.hand].name = 'air';
                }
                levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new Tile(16, this.touching.pos.x, this.touching.pos.y);
            }

        }
        else if (this.touching.name == 'junk') {
            addItem(this.touching.name, 1);
            levels[currentLevel_y][currentLevel_x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new Tile(2, this.touching.pos.x, this.touching.pos.y);
        }
    }

    tileTouching() {
        return levels[currentLevel_y][currentLevel_x].map[this.pos.y / tileSize][this.pos.x / tileSize]
    }
}