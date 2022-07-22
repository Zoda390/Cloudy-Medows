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

    tileTouching(x, y) {
        return levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize]
    }
}