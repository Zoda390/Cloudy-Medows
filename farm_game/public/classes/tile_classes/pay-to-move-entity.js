class PayToMoveEntity extends Tile{
    constructor(name, png, x, y, age, under_tile_num, price){
        super(name, png, x, y, true, age)
        if(under_tile_num == 0){
            this.under_tile = 0
        }
        else{
            this.under_tile = new_tile_from_num(under_tile_num, this.pos.x, this.pos.y);
        }
        this.price = price;
        if(this.name == 'brigde_hori_move' || this.name == 'brigde_vert_move'){
            this.price += (500*extraCount);
        }
        this.class = 'PayToMoveEntity';
    }

    render() {
        push();
        imageMode(CENTER);
        if(this.under_tile != 0){
            this.under_tile.render();
        }
        image(all_imgs[this.png][this.variant], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop();
    }

    price_render(){
        push()
        stroke(0)
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rectMode(CENTER)
        
        rect(this.pos.x + (tileSize / 2) - (this.pos.x >= (22*tileSize) ? (70/2): 0) + (this.pos.x < tileSize ? (70/2): 0), this.pos.y - tileSize + (this.pos.y < tileSize ? tileSize:0), 90, 70);
        textAlign(CENTER, CENTER);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text('Move', this.pos.x + (tileSize / 2) - (this.pos.x >= (22*tileSize) ? (70/2): 0) + (this.pos.x < tileSize ? (70/2): 0), this.pos.y - (tileSize * 1.5) + (this.pos.y < tileSize ? tileSize:0), 90, 70);
        image(coin_img, (this.pos.x - (tileSize / 2) - 10) - (this.pos.x >= (22*tileSize) ? (70/2): 0) + (this.pos.x < tileSize ? (70/2): 0), this.pos.y - (tileSize * 1) + (this.pos.y < tileSize ? tileSize:0));
        if (player.coins >= this.price) {
            fill(255);
        }
        else if (player.coins < this.price) {
            fill(255, 0, 0);
        }
        let amountS = str(this.price)
		textSize(15 -(amountS.length > 3 ? ((amountS.length-3)*2):0));
        text(this.price, this.pos.x + (tileSize) - (this.pos.x >= (22*tileSize) ? (70/2): 0) + (this.pos.x < tileSize ? (70/2): 0), this.pos.y - (tileSize / 2) + (this.pos.y < tileSize ? tileSize:0));
        pop()
    }

    load(obj){
        this.age = obj.age;
        this.variant = obj.variant;
    }
}