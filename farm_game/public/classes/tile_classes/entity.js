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
        //chris will do this
    }

    tileTouched(){

    }
}