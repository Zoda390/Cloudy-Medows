class Item {
	constructor(name, amount = 0, png, price = 0) {
		this.name = name;
		this.amount = amount;
		this.png = png;
		this.price = price;
	}

	render(i) {
		push();
		image(this.png, 100 + (i * 64), canvasHeight - 64); //replace the 100
		//text for amount
		pop();
	}
}

class Seed extends Item {
	constructor(name, amount, png) {
		super(name, amount, png, 1);
		this.class = "Seed";
	}
}

class Eat extends Item {
	constructor(name, amount, png, price, hunger, hunger_timer) {
		super(name, amount, png, price);
		this.class = "Eat";
		this.hunger = hunger;
		this.hunger_timer = hunger_timer;
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