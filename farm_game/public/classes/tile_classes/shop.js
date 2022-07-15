class Shop extends Entity {
	constructor(name, png, x, y, inv) {
		super(name, png, x, y, -1, inv, 0, 1);
        for(let i = 0; i < this.inv.length; i++){
            this.inv[i].price += round(random(0, 3));
        }
        this.class = 'Shop';
	}

    render() {
        push()
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        image(all_tiles[this.under_tile_num - 1].png[0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        image(this.png[this.variant], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop()
    }

    shop_render() {
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth / 20, canvasHeight - 150, canvasWidth - (canvasWidth/10), 150);
        textFont(player_2);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(this.name, (canvasWidth / 20) + 10, canvasHeight - 140);
        textSize(13);
        strokeWeight(2);
        text('Q to leave', ((3*canvasWidth) / 4) + 10, canvasHeight - 140);
        text('Item,             cost,    quantity in store', (canvasWidth / 20) + 42, canvasHeight - 115);
        for(let i = 0; i < this.inv.length; i++){
            if(this.inv[i].amount <= 0){
                fill(0, 0, 255);
            }
            else{
                if(player.coins >= this.inv[i].price){
                    fill(0, 255, 0);
                }
                else{
                    fill(255, 0, 0)
                }
            }
            if(current_reply == i){
                stroke(255);
            }
            else{
                stroke(0);
            }
            image(this.inv[i].png, (canvasWidth / 20) + 10, (canvasHeight - 100) + (i * 32), 32, 32);
            text(this.inv[i].name, (canvasWidth / 20) + 42, (canvasHeight - 100) + (i * 32) + 8);
            text(this.inv[i].price, (canvasWidth / 20) + 282, (canvasHeight - 100) + (i * 32) + 8);
            text(this.inv[i].amount, (canvasWidth / 20) + 442, (canvasHeight - 100) + (i * 32) + 8);
        }
        pop()
    }

    daily_update(){
        for(let i = 0; i < this.inv.length; i++){
            if(this.inv[i].amount < 50){
                this.inv[i].amount += round(random(0, 3));
            }
            
        }
    }
}