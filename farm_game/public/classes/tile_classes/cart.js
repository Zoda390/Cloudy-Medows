class Cart extends Tile {
	constructor(name, png, x, y, price, item_num) {
		super(name, png, x, y, true, false, -1);
		this.price = price;
        this.item_num = item_num;
        this.class = 'Cart';
	}

    render() {
        push()
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(all_tiles[5 - 1].png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        image(this.png, this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop()
    }

    phrase_render() {
        push()
        stroke(0)
        fill(255)
        rectMode(CENTER)
        rect(player.touching.pos.x + (tileSize / 2), player.touching.pos.y - tileSize, 70, 50);
        textAlign(CENTER, CENTER);
        textSize(15);
        fill(0);
        text(player.touching.price, player.touching.pos.x + (tileSize), player.touching.pos.y - tileSize, 70, 50);
        image(coin_img, player.touching.pos.x - (tileSize / 2), player.touching.pos.y - (tileSize * 1.5));
        pop()
    }
}