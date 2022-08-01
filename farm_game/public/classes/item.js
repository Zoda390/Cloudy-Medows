class Item {
	constructor(name, amount = 0, png, price = 0) {
		this.name = name;
		this.amount = amount;
		this.png = png;
		this.price = price;
		this.class = 'Item';
	}

	render(x, y) {
		push();
		image(all_imgs[this.png], x, y);
		fill(255);
		let amountS = str(this.amount)
		textSize(20 - ((amountS.length-1)*5));
		if(amountS.length > 3){
			amountS = (round(this.amount/100)/10)+'K';
			textSize(20 - ((amountS.length-2)*4));
		}
		textAlign(CENTER, CENTER);
		textFont(player_2);
		stroke(0)
		strokeWeight(1);
		text(amountS, x + 51 - (amountS.length*2), y + 51 + (amountS.length));

		if(mouseX >= x && mouseX <= x+64 && mouseY >= y && mouseY <= y+64){
			fill(0);
			amountS = str(this.name)
			rectMode(CENTER)
			rect(x+32,y-7,((amountS.length)*((amountS.length > 5) ? 8:6)),7);
			textSize(8);
			textFont(player_2);
			fill(255);
			text(this.name, x+32, y-7);
		}

		pop();
	}
}

class Seed extends Item {
	constructor(name, amount, png, plant_num) {
		super(name, amount, png, 1);
		this.class = "Seed";
		this.plant_num = plant_num;
	}
}

class Eat extends Item {
	constructor(name, amount, png, price, hunger, hunger_timer, seed_num) {
		super(name, amount, png, price);
		this.class = "Eat";
		this.hunger = hunger;
		this.hunger_timer = hunger_timer;
		this.seed_num = seed_num;
	}
}

class Tool extends Item {
	constructor(name, amount, png) {
		super(name, amount, png, 0);
		this.class = "Tool";
	}
}

class Placeable extends Item {
	constructor(name, amount, png, price, tile_num, tile_need_num) {
		super(name, amount, png, price);
		this.class = "Placeable";
		this.tile_num = tile_num;
		this.tile_need_num = tile_need_num;
	}
}

class Command extends Item {
	constructor(name, amount, png, command){
		super(name, amount, png, 10)
		this.command = command;
		this.class = 'Command';
	}
}

class Backpack extends Item {
	constructor(name, amount, png, inv){
		super(name, amount, png, 0)
		this.inv = JSON.parse(JSON.stringify(inv));
		for (let i = 0; i < this.inv.length; i++) {
            if (this.inv[i] != 0) {
                this.inv[i] = new_item_from_num(this.inv[i].num, this.inv[i].amount);
            }
        }
		this.inv = [[this.inv[0], this.inv[1], this.inv[2], this.inv[3]], [this.inv[4], this.inv[5], this.inv[6], this.inv[7]], [this.inv[8], this.inv[9], this.inv[10], this.inv[11]]];
		this.class = 'Backpack';
	}

	bag_render(){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2);
        textFont(player_2);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(this.name, (canvasWidth / 4) + 10, (canvasHeight/4) + 10);
        textSize(13);
        strokeWeight(2);
        text(String.fromCharCode(eat_button) +' to leave', ((2*canvasWidth) / 4) + 45, (canvasHeight/4) + 10);
        stroke(255, 255, 0);
        strokeWeight(5);
        fill(149, 108, 65);
        for(let i = 0; i < this.inv.length; i++){
            for(let j = 0; j < this.inv[i].length; j++){
                rect((canvasWidth/4)+10+(j*90), (canvasHeight/4)+40+(i*90), 74, 74)
                if(this.inv[i][j] != 0){
                    this.inv[i][j].render((j * 90)+(canvasWidth/4)+15, (i * 90)+(canvasWidth/4)+10);
                }
            }
        }
        pop()
    }

	load(obj){
		for(let i = 0; i < obj.inv.length; i++){
			for(let j = 0; j < obj.inv[i].length; j++){
				if(obj.inv[i][j] != 0 && this.inv[i][j] != 0){
					this.inv[i][j] = new_item_from_num(item_name_to_num(obj.inv[i][j].name), obj.inv[i][j].amount);
				}
				else if (obj.inv[i][j] != 0 && this.inv[i][j] == 0){
					this.inv[i][j] = new_item_from_num(item_name_to_num(obj.inv[i][j].name), obj.inv[i][j].amount);
				}
				else if (obj.inv[i][j] == 0 && this.inv[i][j] != 0){
					this.inv[i][j] = 0;
				}
			}
		}
	}
}