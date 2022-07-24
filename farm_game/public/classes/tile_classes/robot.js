class Robot extends GridMoveEntity{
    constructor(name, png, x, y, inv, under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 2, under_tile_num, instructions, moving_timer);
        this.class = 'Robot';
        this.fuel = 190;
        this.max_fuel = 190;
        this.fuel_timer = moving_timer;
        this.max_fuel_timer = this.fuel_timer;
        this.day_pause = false;
        this.day_paused = 0;
    }

    render() {
        push();
        if (this.border == true) {
            noFill();
            rect(this.pos.x, this.pos.y, tileSize, tileSize);
        }
        imageMode(CENTER);
        if(this.under_tile != 0){
            this.under_tile.render();
        }
        if(this.fuel < 10){
            image(battery_low_img, this.pos.x + tileSize - 5, this.pos.y + tileSize/4)
        }
        image(this.png[this.facing][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //[this.anim]
        pop();
    }

    render_pc(){
        robotPlayButton.show();
        robotPauseButton.show();
        robotBoomButton.show();
        if(temp_move_bool){
            robotPlayButton.style('background-color','rgb(255, 255, 255)');
            robotPauseButton.style('background-color','rgb(50, 50, 50)');
        }
        else{
            robotPauseButton.style('background-color','rgb(255, 255, 255)');
            robotPlayButton.style('background-color','rgb(50, 50, 50)');
        }
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
        this.fuel_timer -= 1;
        if(player.touching.name == 'bed'){
            this.moving_timer -= 2;
            this.fuel_timer -= 2;
        }
        if(this.fuel_timer <= 0 && this.fuel < this.max_fuel - 10){ //change 10 when adding efficentcy
            let fueled = false;
            if(this.name == 'Robot1'){
                for (let i = 0; i < this.inv.length; i++){
                    if(this.inv[i].name == 'Veggy Oil' && this.fuel < this.max_fuel - 10){
                        this.fuel += 10;
                        fueled = true;
                        this.inv[i].amount -= 1;
                        if(this.inv[i].amount == 0){
                            this.inv[i] = 0;
                        }
                    }
                }
            }
            else if(this.name == 'Robot2'){
                if(this.under_tile.name == 'sprinkler'){
                    this.fuel += 10;
                    fueled = true;
                }
            }
            else if(this.name == 'Robot3'){
                if(time <= 100){
                    this.fuel += 10;
                    fueled = true;
                }
            }
            if (fueled){
                this.fuel_timer = this.max_fuel_timer;
            }
        }
        if(this.day_pause == true && days > this.day_paused){
            this.move_bool = true;
            this.day_pause = false;
        }
        if (this.moving_timer <= 0 && this.move_bool && this.fuel > 0) {
            if(this.instructions[this.current_instruction] == 0 || this.instructions[this.current_instruction].command == undefined){
                //if we need special stuff
            }
            else if (this.instructions[this.current_instruction].command == 'up') {
                this.facing = 0;
                this.collide = true;
                if (this.pos.y - tileSize < 0) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y-1][x].map[18][this.pos.x / tileSize];
                    levels[y-1][x].map[18][this.pos.x / tileSize] = temp;
                    this.pos.y = canvasHeight - tileSize;
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.pos.y / tileSize) - 1][this.pos.x / tileSize];
                    levels[y][x].map[(this.pos.y / tileSize) - 1][this.pos.x / tileSize] = temp;
                    this.pos.y -= tileSize;
                }
            }
            else if (this.instructions[this.current_instruction].command == 'right') {
                this.facing = 1;
                this.collide = true;
                if (this.pos.x + tileSize >= canvasWidth) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x+1].map[this.pos.y / tileSize][0];
                    levels[y][x+1].map[this.pos.y / tileSize][0] = temp;
                    this.pos.x = 0;
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) + 1];
                    levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) + 1] = temp;
                    this.pos.x += tileSize;
                }
            }
            else if (this.instructions[this.current_instruction].command == 'down') {
                this.facing = 2;
                this.collide = true;
                if (this.pos.y + tileSize >= canvasHeight) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y+1][x].map[0][this.pos.x / tileSize];
                    levels[y+1][x].map[0][this.pos.x / tileSize] = temp;
                    this.pos.y = 0;
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.pos.y / tileSize) + 1][this.pos.x / tileSize];
                    levels[y][x].map[(this.pos.y / tileSize) + 1][this.pos.x / tileSize] = temp;
                    this.pos.y += tileSize;
                }
            }
            else if (this.instructions[this.current_instruction].command == 'left') {
                this.facing = 3;
                this.collide = true;
                if (this.pos.x - tileSize < 0) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x-1].map[this.pos.y / tileSize][22];
                    levels[y][x-1].map[this.pos.y / tileSize][22] = temp;
                    this.pos.x = canvasWidth - tileSize;
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) - 1];
                    levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) - 1] = temp;
                    this.pos.x -= tileSize;
                }
            }
            else if (this.instructions[this.current_instruction].command == 'interact'){
                for(let i = 0; i < this.inv.length; i++){
                    if(this.instructions[this.current_instruction + 1].name == this.inv[i].name){
                        this.hand = i;
                    }
                }
                this.onInteract(x, y);
            }
            else if (this.instructions[this.current_instruction].command == 'restart'){
                this.current_instruction = -1;
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
                    if(this.inv[this.hand] != 0){
                        for (let i = 0; i < this.looking(x, y).inv.length; i++) {
                            for(let j = 0; j < this.looking(x, y).inv[i].length; j++){
                                if (this.inv[this.hand] != 0 && this.looking(x, y).inv[i][j] == 0) { // empty space
                                    this.looking(x, y).inv[i][j] = new_item_from_num(item_name_to_num(this.inv[this.hand].name), this.inv[this.hand].amount);
                                    this.inv[this.hand] = 0;
                                }
                            }
                        }
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
                }
            }
            else if (this.instructions[this.current_instruction].command == '1day_pause'){
                this.day_pause = true;
                this.day_paused = days;
                this.move_bool = false;
            }
            this.fuel-=1;
            this.current_instruction += 1;
            if (this.current_instruction >= this.instructions.length) {
                this.current_instruction = 0;
            }
            this.anim += 1;
            if (this.anim > this.png[this.facing].length) {
                this.anim = 0;
            }
            this.moving_timer = this.max_moving_timer;
        }
    }
}