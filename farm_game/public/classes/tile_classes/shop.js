class Shop extends Entity {
	constructor(name, png, x, y, inv, under_tile) {
		super(name, png, x, y, -1, inv, 0, under_tile);
        for(let i = 0; i < this.inv.length; i++){
            this.inv[i].price += random([1, 1, 2, 2, 2, 3, 3, 3]);
        }
        this.class = 'Shop';
	}

    render() {
        push()
        imageMode(CENTER);
        this.under_tile.render()
        if(this.name == 'Hotdog Stand'){
            image(all_imgs[this.png][this.variant], this.pos.x + (tileSize / 2)-9, this.pos.y + (tileSize / 2));
        }
        else{
            image(all_imgs[this.png][this.variant], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        }
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
        text(String.fromCharCode(eat_button) + ' to leave', ((3*canvasWidth) / 4) + 10, canvasHeight - 140);
        text('Item,                cost,   quantity in store', (canvasWidth / 20) + 42, canvasHeight - 115);
        if(current_reply < 1 || this.inv.length <= 3){
            for(let i = 0; i < min(this.inv.length, 3); i++){
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
                image(all_imgs[this.inv[i].png], (canvasWidth / 20) + 10, (canvasHeight - 100) + (i * 32), 32, 32);
                text(this.inv[i].name, (canvasWidth / 20) + 42, (canvasHeight - 100) + (i * 32) + 8);
                text(this.inv[i].price, (canvasWidth / 20) + 332, (canvasHeight - 100) + (i * 32) + 8);
                text(this.inv[i].amount, (canvasWidth / 20) + 492, (canvasHeight - 100) + (i * 32) + 8);
            }
        }
        else{
            for(let i = current_reply - 1; i < min(current_reply + 2, this.inv.length); i++){
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
                image(all_imgs[this.inv[i].png], (canvasWidth / 20) + 10, (canvasHeight - 100) + ((i-(current_reply)+1) * 32), 32, 32);
                text(this.inv[i].name, (canvasWidth / 20) + 42, (canvasHeight - 100) + ((i-(current_reply)+1) * 32) + 8);
                text(this.inv[i].price, (canvasWidth / 20) + 332, (canvasHeight - 100) + ((i-(current_reply)+1) * 32) + 8);
                text(this.inv[i].amount, (canvasWidth / 20) + 492, (canvasHeight - 100) + ((i-(current_reply)+1) * 32) + 8);
            }
        }
        if(current_reply < this.inv.length - 2){
            image(done_dot, (canvasWidth / 20) + 512, (canvasHeight - 90) + (2 * 32) + 8);
        }
        if(current_reply > this.inv.length-3 && this.inv.length > 3){
            image(up_dot, (canvasWidth / 20) + 512, (canvasHeight - 100));
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

    load(obj){
        this.age = obj.age;
        this.hand = obj.hand;
        this.under_tile = new_tile_from_num(tile_name_to_num(obj.under_tile.name), obj.under_tile.pos.x, obj.under_tile.pos.y);
        this.under_tile.load(obj.under_tile);
        for(let i = 0; i < obj.inv.length; i++){
            if(obj.inv[i] != 0 && this.inv[i] != 0){
                this.inv[i] = new_item_from_num(item_name_to_num(obj.inv[i].name), obj.inv[i].amount);
                this.inv[i].price = obj.inv[i].price;
                if(this.inv[i].class == 'Backpack'){
                    this.inv[i].load(obj.inv[i])
                }
            }
            else if (obj.inv[i] != 0 && this.inv[i] == 0){
                this.inv[i] = new_item_from_num(item_name_to_num(obj.inv[i].name), obj.inv[i].amount);
                this.inv[i].price = obj.inv[i].price;
                if(this.inv[i].class == 'Backpack'){
                    this.inv[i].load(obj.inv[i])
                }
            }
            else if (obj.inv[i] == 0 && this.inv[i] != 0){
                this.inv[i] = 0;
            }
        }
    }
}