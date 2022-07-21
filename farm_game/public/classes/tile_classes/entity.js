class Entity extends Tile {
    constructor(name, png, x, y, age, inv=[], hand=0, under_tile_num){
        super(name, png, x, y, true, true, age);
        this.inv = JSON.parse(JSON.stringify(inv));
        for (let i = 0; i < this.inv.length; i++) {
            if (this.inv[i] != 0) {
                this.inv[i] = new_item_from_num(this.inv[i].num, this.inv[i].amount);
            }
        }
        this.hand = hand;
        if(under_tile_num == 0){
            this.under_tile = 0
        }
        else{
            this.under_tile = new_tile_from_num(under_tile_num, this.pos.x, this.pos.y);
        }
        this.class = "Entity";
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x - tileSize / 2, this.pos.y - tileSize / 2, tileSize, tileSize);
        }
        imageMode(CENTER);
        if(this.under_tile != 0){
            this.under_tile.render();
        }
        /*if (this.under_tile.class == 'Plant') {
            this.under_tile.grow(x,y);
        }*/
        if(paused){
            this.png.pause();
        }
        else{
            this.png.play();
        }
        
        image(this.png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop();
    }

    /*onInteract(x, y) {
        if (this.touching.class == 'Plant' && this.touching.age == this.touching.png.length - 2) {
            if(checkForSpace(levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num)){
                addItem(levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num, 1 + levels[y][x].ladybugs);
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        if (this.inv[this.hand] != 0 && this.inv[this.hand].class == 'Placeable') {
            if (tile_name_to_num(this.touching.name) == (this.inv[this.hand].tile_need_num-1) || this.inv[this.hand].tile_need_num == 0) {
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y);
                if (this.inv[this.hand].name == 'Ladybugs') {
                    levels[y][x].ladybugs += 1;
                }
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
    }*/

    tileTouching(x, y) {
        return levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize]
    }
}