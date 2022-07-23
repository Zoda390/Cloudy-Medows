class Player extends MoveableEntity {
    constructor(name, png, x, y,inv = [{ num: 1, amount: 2 }, { num: 2, amount: 5 }, { num: 31, amount: 3}, {num: 27, amount: 3}, {num: 19, amount: 4}, {num: 20, amount: 4}, {num: 21, amount: 4}, {num: 22, amount: 4}]) {
        super(name, png, x, y, inv, 0, 3, 0, 0);
        this.quests = [];
        this.current_quest = 0;
        this.hunger = maxHunger;
        this.lastFoodnum = 2;
        this.hunger_timer = all_items[this.lastFoodnum].hunger_timer;
        this.hunger_counter = 0;
        this.coins = 0;
        this.hp = 100;
        this.dead = false;
        this.deaths = 0;
        this.op = 255;
        this.touching = 0;
        this.talking = 0;
        this.oldlooking_name = 0;
        this.lastmoveMili = 0;
        this.lasteatMili = 0;
        this.lastinteractMili = 0;
        this.transphase = 0;
        this.ticks = 0;
        this.a = 0;
        this.done = false;
        this.class = 'Player';

        //load
        if(localData.get('coins') != null ){
            this.coins = localData.get('coins')
        }

        
        if(localData.get('inv') != null){
            
        }

    }
    save(){
        localData.set('coins',this.coins);   
        //localData.set('inv',this.inv);    
    }

    render() {

        this.save()
        if(this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0){
            if(this.oldlooking_name != this.looking(currentLevel_x, currentLevel_y).name && ((this.looking(currentLevel_x, currentLevel_y).class == 'NPC' || this.looking(currentLevel_x, currentLevel_y).class == 'Shop' || this.looking(currentLevel_x, currentLevel_y).class == 'Chest' || this.looking(currentLevel_x, currentLevel_y).class == 'Robot'))){
                this.talking = this.looking(currentLevel_x, currentLevel_y);
            }
        }
        if (this.hunger_counter >= 45) {
            this.hunger -= 1;
            this.hunger_counter = 0;
        }
        if(!paused){
            this.hunger_timer -= 1;
            if(this.touching.name == 'bed'){
                this.hunger_timer -= 1;
            }
        }
        if (this.hunger_timer <= 0) {
            this.hunger -= 1;
            this.hunger_timer = all_items[this.lastFoodnum].hunger_timer;
        }
        push();
        imageMode(CENTER);
        noTint();
        image(player_imgs[this.facing][this.anim], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        if (this.hunger <= 0 && millis() - lastHungerMili > 400 && !paused && !this.dead) {
            hit_sound.play();
            this.hp -= 10;
            if(this.hp < 0){
                this.hp = 0;
            }
            tint(255, 0, 0, 100);
            image(player_imgs[this.facing][this.anim], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
            lastHungerMili = millis();
        }
        else if (this.hunger >= maxHunger && millis() - lastHungerMili > 600 && !paused) {
            this.hp += 2;
            lastHungerMili = millis();
        }
        pop();
        if (this.hp <= 0) { // Player Death
            //turn player death screen on
            if(!this.done){
                push()
                fill(10, this.a);
                rect(0, 0, canvasWidth, canvasHeight);
                tint(255, this.a);
                imageMode(CENTER);
                image(skull_img, canvasWidth/2, canvasHeight/2);
                textSize(90);
                fill(255, 0, 0, this.a);
                textAlign(CENTER, CENTER);
                textFont(player_2);
                text('YOU DIED', canvasWidth/2, canvasHeight/4);
                pop();
                if(!paused){
                    if(this.transphase == 0){
                        if(this.ticks == 0){
                            onDeathSound.play();
                            this.dead = true;
                            this.touching.collide = false;
                        }
                        if(this.ticks >= 51){
                            this.transphase = 1;
                            this.ticks = 0;
                        }
                        this.a += 5;
                    }
                    if(this.transphase == 1){
                        if(this.ticks >= 600){
                            currentLevel_y = 1;
                            currentLevel_x = 1;
                            this.dead = false;
                            this.pos.x = (5 * tileSize);
                            this.pos.y = (5 * tileSize);
                            this.talking = 0;
                            this.hunger = 4;
                            this.hunger_timer = all_items[2].hunger_timer;
                            this.deaths += 1;
                            this.transphase = 2;
                            this.ticks = 0;
                        }
                    }
                    if(this.transphase == 2){
                        this.a -= 5;
                        if(this.ticks >= 51){
                            this.done = true;
                            this.ticks = 0;
                            this.hp = 100;
                        }
                    }
                    
                    this.ticks += 1;
                }
            }
        }
    }

    

    move() {
        if(!this.dead){
            if (keyIsDown(move_right_button)) {
                if (millis() - this.lastmoveMili > 100) {
                    this.facing = 1;
                    if (this.pos.x + tileSize >= canvasWidth) {
                        this.touching.collide = false;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = false;
                        levels[currentLevel_y][currentLevel_x].y = -50;
                        levels[currentLevel_y][currentLevel_x].done = false;
                        levels[currentLevel_y][currentLevel_x].movephase = 0;
                        levels[currentLevel_y][currentLevel_x].ticks = 0;
                        currentLevel_x += 1;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = true;
                        this.pos.x = 0;
                    }
                    else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                        this.oldlooking_name = this.looking(currentLevel_x, currentLevel_y).name;
                        this.touching.collide = false;
                        this.pos.x += tileSize;
                        this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                        this.touching.collide = true;
                        this.hunger_counter += round(random(0, 1));
                        this.anim += 1;
                        if (this.anim > 1) {
                            this.anim = 0;
                        }
                    }
                    this.lastmoveMili = millis();
                }
            }
            if (keyIsDown(move_left_button)) {
                if (millis() - this.lastmoveMili > 100) {
                    this.facing = 3;
                    if (this.pos.x - tileSize < 0) {
                        this.touching.collide = false;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = false;
                        levels[currentLevel_y][currentLevel_x].y = -50;
                        levels[currentLevel_y][currentLevel_x].done = false;
                        levels[currentLevel_y][currentLevel_x].movephase = 0;
                        levels[currentLevel_y][currentLevel_x].ticks = 0;
                        currentLevel_x -= 1;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = true;
                        this.pos.x = canvasWidth - tileSize;
                    }
                    else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                        this.oldlooking_name = this.looking(currentLevel_x, currentLevel_y).name;
                        this.touching.collide = false;
                        this.pos.x -= tileSize;
                        this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                        this.touching.collide = true;
                        this.hunger_counter += round(random(0, 1));
                        this.anim += 1;
                        if (this.anim > 1) {
                            this.anim = 0;
                        }
                    }
                    this.lastmoveMili = millis();
                }
            }
            if (keyIsDown(move_up_button)) {
                if (millis() - this.lastmoveMili > 100) {
                    this.facing = 0;
                    if (this.pos.y - tileSize < 0) {
                        this.touching.collide = false;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = false;
                        levels[currentLevel_y][currentLevel_x].y = -50;
                        levels[currentLevel_y][currentLevel_x].done = false;
                        levels[currentLevel_y][currentLevel_x].movephase = 0;
                        levels[currentLevel_y][currentLevel_x].ticks = 0;
                        currentLevel_y -= 1;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = true;
                        this.pos.y = canvasHeight - tileSize;
                    }
                    else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                        this.oldlooking_name = this.looking(currentLevel_x, currentLevel_y).name;
                        this.touching.collide = false;
                        this.pos.y -= tileSize;
                        this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                        this.touching.collide = true;
                        this.hunger_counter += round(random(0, 1));
                        this.anim += 1;
                        if (this.anim > 1) {
                            this.anim = 0;
                        }
                    }
                    this.lastmoveMili = millis();
                }
            }
            if (keyIsDown(move_down_button)) {
                if (millis() - this.lastmoveMili > 100) {
                    this.facing = 2;
                    if (this.pos.y + tileSize >= canvasHeight) {
                        this.touching.collide = false;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = false;
                        levels[currentLevel_y][currentLevel_x].y = -50;
                        levels[currentLevel_y][currentLevel_x].done = false;
                        levels[currentLevel_y][currentLevel_x].movephase = 0;
                        levels[currentLevel_y][currentLevel_x].ticks = 0;
                        currentLevel_y += 1;
                        levels[currentLevel_y][currentLevel_x].level_name_popup = true;
                        this.pos.y = 0;
                    }
                    else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                        this.oldlooking_name = this.looking(currentLevel_x, currentLevel_y).name;
                        this.touching.collide = false;
                        this.pos.y += tileSize;
                        this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                        this.touching.collide = true;
                        this.hunger_counter += round(random(0, 1));;
                        this.anim += 1;
                        if (this.anim > 1) {
                            this.anim = 0;
                        }
                    }
                    this.lastmoveMili = millis();
                }
    
            }
        }
    }

    eat() {
        if (millis() - this.lasteatMili > 100) {
            if (this.hunger < maxHunger) {  // player only eats when hungry
                if (this.inv[this.hand].class == 'Eat') {
                    this.hunger += this.inv[this.hand].hunger;
                    if (this.hunger > maxHunger) {
                        this.hunger = maxHunger;
                    }
                    this.inv[this.hand].amount -= 1;
                    this.hunger_counter = 0;
                    this.hunger_timer = this.inv[this.hand].hunger_timer;
                    this.lastFoodnum = item_name_to_num(this.inv[this.hand].name);
                    let seed_obj_num = this.inv[this.hand].seed_num;
                    if (this.inv[this.hand].amount == 0) {
                        this.inv[this.hand] = 0;
                    }
                    addItem(this, seed_obj_num, round(random(1, 2)));
                    
                }
            }
        }
        this.lasteatMili = millis();
    }

    interactCall() {
        
            if (millis() - this.lastinteractMili > 100) {
                this.onInteract(currentLevel_x, currentLevel_y);
                this.lastinteractMili = millis();
            }
        
    }

    onInteract(x, y) {
        if (this.touching.class == 'Plant' && this.touching.age == this.touching.png.length - 2) {
            if(checkForSpace(this, levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num)){
                addItem(this, levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize].eat_num, 1 + levels[y][x].ladybugs);
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        if (this.inv[this.hand] != 0 && this.inv[this.hand].class == 'Placeable') {
            if (tile_name_to_num(this.touching.name) == (this.inv[this.hand].tile_need_num-1) || this.inv[this.hand].tile_need_num == 0) {
                if(this.inv[this.hand].name == 'Robot_tier1' || this.inv[this.hand].name == 'Robot_tier2' || this.inv[this.hand].name == 'Robot_tier3'){
                    if(this.looking(x, y) != undefined && this.looking(x, y).collide == false){
                        let temp = this.looking(x, y);
                        this.touching = this.tileTouching(x, y);
                        if (this.touching != 0) {
                            if(this.facing == 0){
                                levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y - 32);
                            }
                            else if(this.facing == 1){
                                levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) + 1] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x + 32, this.touching.pos.y);
                            }
                            else if(this.facing == 2){
                                levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y + 32);
                            }
                            else if(this.facing == 3){
                                levels[y][x].map[(this.touching.pos.y / tileSize)][(this.touching.pos.x / tileSize) - 1] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x - 32, this.touching.pos.y);
                            }
                        }
                        this.looking(x, y).under_tile = temp;
                    }
                    else{
                        return;
                    }
                }
                else{
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.touching.pos.x, this.touching.pos.y);
                    if (this.inv[this.hand].name == 'Ladybugs') {
                        levels[y][x].ladybugs += 1;
                    }
                }
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.looking(x, y) != undefined && this.looking(x, y).name == 'cart_s') {
            if (this.inv[this.hand].price != 0 && this.inv[this.hand] != 0) {
                player.coins += this.inv[this.hand].price;
                moneySound.play();
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.touching.name == 'grass') {
            if (this.inv[this.hand].name == 'Hoe') {
                hoe_sound.play();
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        else if (this.touching.name == 'plot') {
            if (this.inv[this.hand].class == 'Seed') {
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].plant_num, this.touching.pos.x, this.touching.pos.y);
                this.inv[this.hand].amount -= 1;
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        else if (this.touching.name == 'compost_bucket') {
            if (this.inv[this.hand].name == 'Junk' || this.inv[this.hand].class == 'Seed') {
                if(checkForSpace(this, 9)){
                    this.inv[this.hand].amount -= 1;
                    if (this.inv[this.hand].amount == 0) {
                        this.inv[this.hand] = 0;
                    }
                    addItem(this, 9, 1);
                }
            }
        }
        else if (this.touching.name == 'Veggie_Press') {
            if (this.inv[this.hand].class == 'Eat') {
                if(checkForSpace(this, 31)){
                    this.inv[this.hand].amount -= 1;
                    if (this.inv[this.hand].amount == 0) {
                        this.inv[this.hand] = 0;
                    }
                    addItem(this, 31, 1);
                }
            }
        }
        else if (this.touching.name == 'junk') {
            if(checkForSpace(this, 4)){
                addItem(this, 4, 1);
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
    }
}

//keys
var move_right_button = 68;//d
var move_left_button = 65; //a
var move_up_button = 87;   //w
var move_down_button = 83; //s
var interact_button = 69;  //e
var eat_button = 81;       //q
var pause_button = 27;     //esc
function takeInput() {
    if (title_screen) {
        if (keyIsDown(interact_button)) {
            title_screen = false;
        }
    }
    else if(paused){
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = false;
                lastMili = millis();
            }
        }
    }
    else if(player.talking != 0){
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = true;
                lastMili = millis();
            }
        }
        if (keyIsDown(eat_button)) {
            if (millis() - lastMili > 200) {
                if(player.talking.class == 'NPC'){
                    player.talking.move_bool = true;
                    player.talking.current_dialouge = 0;
                    for(let i = 0; i < player.talking.dialouges.length; i++){
                        player.talking.dialouges[i].done = false;
                        player.talking.dialouges[i].phrase = [];
                        if(player.talking.dialouges[i].new_phrase != -1){
                            player.talking.dialouges[i].phrase2 = player.talking.dialouges[i].new_phrase;
                            player.talking.dialouges[i].new_phrase = -1;
                        }
                        if(player.talking.dialouges[i].new_replies != -1){
                            for(let j = 0; j < player.talking.dialouges[i].new_replies.length; j++){
                                player.talking.dialouges[i].replies[j] = player.talking.dialouges[i].new_replies[j];
                            }
                            player.talking.dialouges[i].new_replies = -1;
                        }
                    }
                }
                else if(player.talking.class == 'Chest'){
                    if(mouse_item != 0){
                        if(checkForSpace(player, item_name_to_num(mouse_item.name))){
                            addItem(player, item_name_to_num(mouse_item.name), mouse_item.amount);
                            mouse_item = 0;
                        }
                        else{
                            let dropped = false;
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.talking.inv[i][j] != 0) { // stack items
                                        if (player.talking.inv[i][j].name == mouse_item.name) {
                                            player.talking.inv[i][j].amount += mouse_item.amount;
                                            dropped = true;
                                        }
                                    }
                                }
                            }
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.inv[i] == 0) { // empty space
                                        player.talking.inv[i][j] = mouse_item;
                                        dropped = true;
                                    }
                                }
                            }
                            if(!dropped){
                                return;
                            }
                        }
                    }
                }
                else if (player.talking.class == 'Robot'){
                    player.talking.fuel_timer = player.talking.max_fuel_timer;
                    player.talking.move_bool = true;
                }
                player.oldlooking_name = player.talking.name;
                player.talking = 0;
                current_reply = 0;
                lastMili = millis();
                player.lasteatMili = millis();
            }
        }
        if (keyIsDown(move_up_button)){
            if ((millis() - lastMili > 200) && player.talking.class != 'Chest') {
                current_reply -= 1;
                if (current_reply < 0){
                    current_reply = 0;
                }
                lastMili = millis();
            }
        }
        if (keyIsDown(move_down_button)){
            if (millis() - lastMili > 200) {
                current_reply += 1;
                if (player.talking.class == 'NPC'){
                    if (current_reply > player.talking.dialouges[player.talking.current_dialouge].replies.length-1){
                        current_reply = player.talking.dialouges[player.talking.current_dialouge].replies.length-1;
                    }
                }
                else if (player.talking.class == 'Shop'){
                    if (current_reply > player.talking.inv.length-1){
                        current_reply = player.talking.inv.length-1;
                    }
                }
                lastMili = millis();
            }
        }
        if (keyIsDown(interact_button)){
            if (millis() - lastMili > 200) {
                if (player.talking.class == 'NPC'){
                    if(player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].dialouge_num == -1){
                        player.talking.move_bool = true;
                        player.talking.current_dialouge = 0;
                        for(let i = 0; i < player.talking.dialouges.length; i++){
                            player.talking.dialouges[i].done = false;
                            player.talking.dialouges[i].phrase = [];
                            if(player.talking.dialouges[i].new_phrase != -1){
                                player.talking.dialouges[i].phrase2 = player.talking.dialouges[i].new_phrase;
                                player.talking.dialouges[i].new_phrase = -1;
                            }
                            if(player.talking.dialouges[i].new_replies != -1){
                                for(let j = 0; j < player.talking.dialouges[i].new_replies.length; j++){
                                    player.talking.dialouges[i].replies[j] = player.talking.dialouges[i].new_replies[j];
                                }
                                player.talking.dialouges[i].new_replies = -1;
                            }
                        }
                        player.oldlooking_name = player.talking.name;
                        player.talking = 0;
                        current_reply = 0;
                        player.lastinteractMili = millis();
                    }
                    else{
                        player.talking.current_dialouge = player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].dialouge_num;
                    }
                }
                else if (player.talking.class == 'Shop'){
                    if(player.talking.inv[current_reply].amount >= 1){
                        if(player.coins >= player.talking.inv[current_reply].price){    //check if you have the money
                            addItem(player, item_name_to_num(player.talking.inv[current_reply].name), 1);
                            player.coins -= player.talking.inv[current_reply].price; //reduce money
                            player.talking.inv[current_reply].amount -= 1; //shop.inv -1 amount
                        }
                    }
                }
                lastMili = millis();
            }
            
        }
        if (keyIsDown(80)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(player.touching);
                console.log(player.looking(currentLevel_x, currentLevel_y));
                console.log(all_tiles)
                lastMili = millis();
            }
        }
    }
    else {
        if(keyIsDown(pause_button)){
            if (millis() - lastMili > 200) {
                paused = true;
                lastMili = millis();
            }
        }
        //basic movement  
        player.move();
        if (keyIsDown(eat_button)) {
            player.eat();
        }
        if (keyIsDown(interact_button)) {
        
            player.interactCall();
        }
        /*
        if(keyIsDown(48)){
          player.hand = 9;
        }
        */
        //mc style hotbar
        if (keyIsDown(49)) {
            player.hand = 0;
        }
        if (keyIsDown(50)) {
            player.hand = 1;
        }
        if (keyIsDown(51)) {
            player.hand = 2;
        }
        if (keyIsDown(52)) {
            player.hand = 3;
        }
        if (keyIsDown(53)) {
            player.hand = 4;
        }
        if (keyIsDown(54)) {
            player.hand = 5;
        }
        if (keyIsDown(55)) {
            player.hand = 6;
        }
        if (keyIsDown(56)) {
            player.hand = 7;
        }

        /*
        if(keyIsDown(57)){
          player.hand = 8;
        }
        */
        if (keyIsDown(80)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(player.touching);
                console.log(player.looking(currentLevel_x, currentLevel_y));
                lastMili = millis();
            }
        }
    }
}