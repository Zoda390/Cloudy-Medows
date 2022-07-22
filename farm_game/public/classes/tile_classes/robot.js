class Robot extends GridMoveEntity{
    constructor(name, png, x, y, inv, under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 2, under_tile_num, instructions, moving_timer);
        this.class = 'Robot';
        this.fuel = 100;
    }

    render_pc(){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/16, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 17), canvasWidth - (canvasWidth/8), (canvasHeight/8)+ 7);
        stroke(100);
        strokeWeight(6);
        fill(50);
        rect(canvasWidth/16, canvasHeight/8, canvasWidth - (canvasWidth/8), canvasHeight - (canvasWidth/3) - 17);
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/16, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 40), canvasWidth/11, (canvasHeight/24)-1);
        noStroke();
        rect((canvasWidth/16) + 2, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 35), (canvasWidth/11) - 4, canvasHeight/25)
        textFont(player_2);
        textSize(15);
        fill(0, 255, 0);
        stroke(0);
        strokeWeight(4);
        text(this.name, (canvasWidth/16)+10, (canvasHeight/8)+10);
        text('Inst->', (canvasWidth/16)+10, (canvasHeight/8)+30);
        text('Fuel', (canvasWidth/16)+25, (canvasHeight/8)+65);
        fill(255);
        text('Inv', (canvasWidth/16)+10, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 32))
        let y = 0;
        let x = 0;
        for(let i = 0; i < this.instructions.length; i++){
            if(i%6 == 0){
                y+=86;
                x = 0;
            }
            stroke(0, 255, 0);
            strokeWeight(5);
            fill(0);
            if(this.current_instruction == i){
                stroke(255);
            }
            rect((x*90)+160, y, 64, 64);
            if(this.instructions[i] != 0){
                this.instructions[i].render((x*90)+160, y);
            }
            x += 1;
        }
        stroke(255);
        rect((canvasWidth/16)+45, (canvasHeight/8)+90, 20, 200);
        stroke(0);
        strokeWeight(2);
        fill(0, 255, 0);
        rect((canvasWidth/16)+45+5, (canvasHeight/8)+90+200-this.fuel-5, 10, this.fuel);
        for(let i = 0; i < this.inv.length; i++){
            stroke(255, 255, 0);
            strokeWeight(5);
            fill(149, 108, 65);
            rect((i*90)+70, 432, 64, 64);
            if(this.inv[i] != 0){
                this.inv[i].render((i*90)+70, 432);
            }
        }
        pop()
    }

    move(x, y) {
        this.moving_timer -= 1;
        if(player.touching.name == 'bed'){
            this.moving_timer -= 1;
        }
        if (this.moving_timer <= 0 && this.move_bool) {
            if(this.instructions[this.current_instruction] == 0 || this.instructions[this.current_instruction].command == undefined){
                this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
            }
            else if (this.instructions[this.current_instruction].command == 'up') {
                this.facing = 0;
                if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize];
                    levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize] = temp;
                    this.pos.y -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction].command == 'right') {
                this.facing = 1;
                if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) + 1];
                    levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) + 1] = temp;
                    this.pos.x += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction].command == 'down') {
                this.facing = 2;
                if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize];
                    levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize] = temp;
                    this.pos.y += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction].command == 'left') {
                this.facing = 3;
                if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) - 1];
                    levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) - 1] = temp;
                    this.pos.x -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction].command == 'interact'){
                for(let i = 0; i < this.inv.length; i++){
                    if(this.instructions[this.current_instruction + 1].name == this.inv[i].name){
                        this.hand = i;
                    }
                }
                this.onInteract(x, y);
                this.current_instruction += 1;
                if (this.current_instruction >= this.instructions.length) {
                    this.current_instruction = 0;
                }
            }
            else if (this.instructions[this.current_instruction].command == 'restart'){
                this.current_instruction = 0;
            }
            else if (this.instructions[this.current_instruction].command == 'add_to_chest'){
                for(let i = 0; i < this.inv.length; i++){
                    if(this.instructions[this.current_instruction + 1].name == this.inv[i].name){
                        this.hand = i;
                    }
                }
                if(this.looking(x, y).class == 'Chest'){
                    for (let i = 0; i < this.looking(x, y).inv.length; i++) {
                        for(let j = 0; j < this.looking(x, y).inv[i].length; j++){
                            if (this.looking(x, y).inv[i][j] != 0) { // stack items
                                if (this.looking(x, y).inv[i][j].name == this.inv[this.hand].name) {
                                    this.looking(x, y).inv[i][j].amount += this.inv[this.hand].amount;
                                    this.inv[this.hand] = 0;
                                }
                            }
                        }
                    }
                    for (let i = 0; i < this.looking(x, y).inv.length; i++) {
                        for(let j = 0; j < this.looking(x, y).inv[i].length; j++){
                            if (this.inv[i] == 0) { // empty space
                                this.looking(x, y).inv[i][j] = new_item_from_num(item_name_to_num(this.inv[this.hand].name), this.inv[this.hand].amount);
                                this.inv[this.hand] = 0;
                            }
                        }
                    }
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction].command == 'add_from_chest'){
                if(this.looking(x, y).class == 'Chest'){
                    for (let i = 0; i < this.looking(x, y).inv.length; i++) {
                        for(let j = 0; j < this.looking(x, y).inv[i].length; j++){
                            if (this.looking(x, y).inv[i][j].name == this.instructions[this.current_instruction + 1].name) {
                                if(checkForSpace(this, item_name_to_num(this.instructions[this.current_instruction + 1].name))){
                                    addItem(this, item_name_to_num(this.looking(x, y).inv[i][j].name), this.looking(x, y).inv[i][j].amount)
                                    this.looking(x, y).inv[i][j] = 0;
                                }
                            }
                        }
                    }
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            this.anim += 1;
            if (this.anim > this.png[this.facing].length) {
                this.anim = 0;
            }
            this.moving_timer = this.max_moving_timer;
        }
    }
}