class Item {
	constructor(name, amount = 0, png, price = 0) {
		this.name = name;
		this.amount = amount;
		this.png = png;
		this.price = price;
		this.class = 'Item';
	}

	render(i) {
		push();
		image(this.png, 112 + (i * 64), canvasHeight - 64);
		fill(255)
		textSize(20);
		textAlign(TOP, LEFT);
		text(this.amount, (canvasWidth / 2) - (512 / 2) + 37 + (64 * i), canvasHeight - 27);
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

class Place_able extends Item {
	constructor(name, amount, png, price, tile_num) {
		super(name, amount, png, price);
		this.class = "Place_able";
		this.tile_num = tile_num; 
	}
}