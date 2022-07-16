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
		image(this.png, x, y);
		fill(255)
		let amountS = str(this.amount)
		textSize(25 - ((amountS.length-1)*8));
		textAlign(CENTER, CENTER);
		textFont(player_2);
		noStroke();
		text(this.amount, x + 47, y + 47 + (amountS.length*2));
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