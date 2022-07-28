class Player extends MoveableEntity {
    constructor(name, png, x, y, inv = [{ num: 1, amount: 2 }, { num: 2, amount: 5 }, { num: 33, amount: 1}, { num: 11, amount: 10}, 0, 0, 0, 0]) {
        super(name, png, x, y, inv, 0, 3, 0, 0);
        this.quests = [];
        this.current_quest = 0;
        this.show_quests = false;
        this.questsDone = 0;
        this.hunger = maxHunger;
        this.lastFoodnum = 2;
        this.hunger_timer = all_items[this.lastFoodnum].hunger_timer;
        this.hunger_counter = 0;
        this.coins = 100;
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
        this.money_anim = 0;
        this.money_anim_amount = 0;
        this.inv_warn_anim = 0;
        this.class = 'Player';
    }

    load(obj){
        this.pos.x = obj.pos.x;
        this.pos.y = obj.pos.y;
        this.facing = obj.facing;
        for(let i = 0; i < obj.quests.length; i++){
            this.quests[i] = new Quest(obj.quests[i].og_name, obj.quests[i].goals, obj.quests[i].days, (obj.quests[i].reward_item == 0 ? 0 : {num: item_name_to_num(obj.quests[i].reward_item.name), amount: obj.quests[i].reward_item.amount}), obj.quests[i].reward_coins);
            console.log(obj.quests[i].done)
            this.quests[i].load(obj.quests[i]);
        }
        this.current_quest = obj.current_quest;
        this.hunger = obj.hunger;
        if(this.hunger < 0){
            this.hunger = 0;
        }
        this.lastFoodnum = obj.lastFoodnum;
        this.hunger_timer = all_items[this.lastFoodnum].hunger_timer;
        this.hunger_counter = obj.hunger_counter;
        this.coins = obj.coins;
        this.hp = obj.hp;
        if (this.hp < 30){
            this.hp = 30;
        }
        this.deaths = obj.deaths;
        this.touching = 0;
        this.oldlooking_name = obj.oldlooking_name;
        for(let i = 0; i < obj.inv.length; i++){
            if(obj.inv[i] != 0 && this.inv[i] != 0){
                this.inv[i] = new_item_from_num(item_name_to_num(obj.inv[i].name), obj.inv[i].amount);
                if(this.inv[i].class == 'Backpack'){
                    this.inv[i].load(obj.inv[i])
                }
            }
            else if (obj.inv[i] != 0 && this.inv[i] == 0){
                this.inv[i] = new_item_from_num(item_name_to_num(obj.inv[i].name), obj.inv[i].amount);
                if(this.inv[i].class == 'Backpack'){
                    this.inv[i].load(obj.inv[i])
                }
            }
            else if (obj.inv[i] == 0 && this.inv[i] != 0){
                this.inv[i] = 0;
            }
        }
    }

    save(){
        localData.set('player', this);
    }

    render() {
        if(this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0){
            if(this.oldlooking_name != this.looking(currentLevel_x, currentLevel_y).name && ((this.looking(currentLevel_x, currentLevel_y).class == 'NPC' || this.looking(currentLevel_x, currentLevel_y).class == 'Shop' || this.looking(currentLevel_x, currentLevel_y).class == 'Chest' || this.looking(currentLevel_x, currentLevel_y).class == 'Robot'))){
                temp_move_bool = this.looking(currentLevel_x, currentLevel_y).move_bool;
                this.talking = this.looking(currentLevel_x, currentLevel_y);
                this.oldlooking_name = this.looking(currentLevel_x, currentLevel_y).name
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
            if(this.hunger < 0){
                this.hunger = 0;
            }
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
                push();
                
                robotPlayButton.hide();
                robotPauseButton.hide();
                robotBoomButton.hide();

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
                textSize(20);
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
                        text('Respawn in 9', canvasWidth/2, (3*canvasHeight)/4);
                    }
                    if(this.transphase == 1){
                        if(this.ticks >= 600){                                         
                            currentLevel_y = 1;
                            currentLevel_x = 4;
                            this.dead = false;
                            this.pos.x = (5 * tileSize);
                            this.pos.y = (5 * tileSize);
                            this.talking = 0;
                            this.hunger = 4;
                            this.hunger_timer = all_items[2].hunger_timer;
                            this.deaths += 1;
                            this.transphase = 2;
                            this.ticks = 0;
                            this.deathConsequence(dificulty)
                        }
                        text('Respawn in ' + floor((600-this.ticks)/60), canvasWidth/2, (3*canvasHeight)/4);
                    }
                    if(this.transphase == 2){
                        this.a -= 5;
                        if(this.ticks >= 51){
                            this.done = true;
                            this.ticks = 0;
                            this.hp = 100;
                        }
                        text('Respawn in 0', canvasWidth/2, (3*canvasHeight)/4);
                    }
                    
                    this.ticks += 1;
                }
                pop();
            }
        }
    }

    deathConsequence(dif){
        if(dif == 0){
            this.coins -= ceil(this.coins * 0.1);
        }
        else if(dif == 1){
            this.coins -= ceil(this.coins * 0.1);
            for(let i = 0; i < this.inv.length; i++){
                if(this.inv[i].class == 'Eat'){
                    let random = round(0, this.inv[i].amount-2);
                    console.log(random);
                    if (random > 0){
                        this.inv[i].amount -= random;
                        if(checkForSpace(this, 4)){
                            addItem(this, 4, random);
                        }
                    }
                }
            }
        }
        else if(dif == 2){
            title_screen = true;
            localStorage.clear();
            newWorld();
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
                if (this.inv[this.hand].class == 'Eat' && checkForSpace(this, this.inv[this.hand].seed_num)) {
                    EatSound.play();
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
        if(this.inv[this.hand] != 0 && this.inv[this.hand].class == 'Backpack'){
            this.talking = this.inv[this.hand];
            return;
        }
        if (this.touching.class == 'Plant') {
            if(this.touching.age == all_imgs[this.touching.png].length - 2){
                if(checkForSpace(this, this.touching.eat_num)){
                    addItem(this, this.touching.eat_num, 1 + levels[y][x].ladybugs);
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
                }
            }
            else if(this.inv[this.hand].name == 'Shovel'){
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        if (this.looking(x, y) != undefined && this.looking(x, y).name == 'cart_s') {
            var current_amount = 1
            if (this.inv[this.hand].price != 0 && this.inv[this.hand] != 0) {
                if(keyIsDown(special_key)){
                    current_amount = this.inv[this.hand].amount;
                }
                player.coins += this.inv[this.hand].price * current_amount;
                moneySound.play();
                this.money_anim = 255;
                this.money_anim_amount += this.inv[this.hand].price*current_amount;
                this.inv[this.hand].amount -= current_amount;
                if(this.quests != undefined && this.quests.length > 0){
                if(this.quests[this.current_quest].goals[this.quests[this.current_quest].current_Goal] != undefined){
                    if(this.quests[this.current_quest].goals[this.quests[this.current_quest].current_Goal].class == 'SellGoal'){
                        if(this.quests[this.current_quest].goals[this.quests[this.current_quest].current_Goal].item_name == this.inv[this.hand].name){
                            this.quests[this.current_quest].goals[this.quests[this.current_quest].current_Goal].amount -= current_amount;
                        }
                    }
                }
                }
                if (this.inv[this.hand].amount == 0) {
                    this.inv[this.hand] = 0;
                }
            }
        }
        if (this.inv[this.hand] != 0 && this.inv[this.hand].class == 'Placeable') {
            if (tile_name_to_num(this.touching.name) == this.inv[this.hand].tile_need_num || this.inv[this.hand].tile_need_num == 0) {
                if(this.inv[this.hand].name == 'Robot1' || this.inv[this.hand].name == 'Robot2' || this.inv[this.hand].name == 'Robot3'){
                    if(this.looking(x, y) != undefined && this.looking(x, y).collide == false){
                        let temp = this.looking(x, y);
                        this.touching = this.tileTouching(x, y);
                        if (this.touching != 0) {
                            levels[currentLevel_y][currentLevel_x].map[(player.looking(currentLevel_x, currentLevel_y).pos.y / tileSize)][player.looking(currentLevel_x, currentLevel_y).pos.x / tileSize] = new_tile_from_num(this.inv[this.hand].tile_num, this.looking(currentLevel_x, currentLevel_y).pos.x, this.looking(currentLevel_x, currentLevel_y).pos.y);
                        }
                        this.looking(x, y).under_tile = temp;
                        this.looking(x, y).move_bool = false;
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
        if (this.touching.name == 'grass') {
            if (this.inv[this.hand].name == 'Hoe') {
                hoe_sound.play();
                levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(3, this.touching.pos.x, this.touching.pos.y);
            }
        }
        else if (this.touching.name == 'sprinkler'){
            if (this.inv[this.hand].name == 'Shovel'){
                if(checkForSpace(this, 12)){
                    addItem(this, 12, 1);
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(2, this.touching.pos.x, this.touching.pos.y);
                }
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

    quests_render(){

    }
}

var Controls_Interact_button_key = 'e';
var Controls_Eat_button_key = 'q';
var Controls_Up_button_key = 'w';
var Controls_Down_button_key = 's';
var Controls_Left_button_key = 'a';
var Controls_Right_button_key = 'd';
var Controls_Special_button_key = 'Shift';
var Controls_Quest_button_key = 'P';

//keys
var move_right_button = 68;//d
var move_left_button = 65; //a
var move_up_button = 87;   //w
var move_down_button = 83; //s
var interact_button = 69;  //e
var eat_button = 81;       //q
var pause_button = 27;     //esc
var special_key = 16;
var quest_key = 80;
var control_set = 0;
var lastKey = '!';
function takeInput() {
    if (title_screen) {
        if(control_set == 1 && key != lastKey){
            interact_button = keyCode;
            Controls_Interact_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 2 && key != lastKey){
            eat_button = keyCode;
            Controls_Eat_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 3 && key != lastKey){
            move_up_button = keyCode;
            Controls_Up_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 4 && key != lastKey){
            move_left_button = keyCode;
            Controls_Left_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 5 && key != lastKey){
            move_down_button = keyCode;
            Controls_Down_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 6 && key != lastKey){
            move_right_button = keyCode;
            Controls_Right_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 7 && key != lastKey){
            special_key = keyCode;
            Controls_Special_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 8 && key != lastKey){
            quest_key = keyCode;
            Controls_Quest_button_key = key;
            control_set = 0;
            saveOptions();
        }
        else if (control_set == 0){
            if (keyIsDown(interact_button) && !showOptions) {
                title_screen = false;
            }
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
            if (millis() - lastMili > 200 && !player.dead) {
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
                        player.talking.dialouges[i].text_i = 0;
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
                else if(player.talking.class == 'Chest' || player.talking.class == 'Backpack'){
                    if(mouse_item != 0){
                        if(checkForSpace(player, item_name_to_num(mouse_item.name))){
                            addItem(player, item_name_to_num(mouse_item.name), mouse_item.amount);
                            mouse_item = 0;
                        }
                        else{
                            let dropped = false;
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.talking.inv[i][j] != 0 && mouse_item != 0) { // stack items
                                        if (player.talking.inv[i][j].name == mouse_item.name) {
                                            player.talking.inv[i][j].amount += mouse_item.amount;
                                            mouse_item = 0;
                                            dropped = true;
                                        }
                                    }
                                }
                            }
                            for (let i = 0; i < player.talking.inv.length; i++) {
                                for(let j = 0; j < player.talking.inv[i].length; j++){
                                    if (player.talking.inv[i][j] == 0 && mouse_item != 0) { // empty space
                                        player.talking.inv[i][j] = new_item_from_num(item_name_to_num(mouse_item.name), mouse_item.amount);
                                        mouse_item = 0;
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
                    player.talking.move_bool = temp_move_bool;
                    robotPlayButton.hide();
                    robotPauseButton.hide();
                    robotBoomButton.hide();
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
                    if(player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].quest != -1){
                        player.quests.push(player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].quest);
                        player.current_quest = player.quests.length - 1;
                        player.talking.dialouges[player.talking.current_dialouge].new_phrase = [];
                        let phrase = "You already helped me with this.";
                        for(let i = 0; i < phrase.length; i++){
                            player.talking.dialouges[player.talking.current_dialouge].new_phrase[i] = phrase[i];
                        }
                        player.talking.dialouges[player.talking.current_dialouge].new_replies = [{phrase: 'Oh ok', dialouge_num: -1, quest: -1}];
                    }
                    if(player.talking.dialouges[player.talking.current_dialouge].replies[current_reply].dialouge_num == -1){
                        player.talking.move_bool = true;
                        player.talking.current_dialouge = 0;
                        for(let i = 0; i < player.talking.dialouges.length; i++){
                            player.talking.dialouges[i].done = false;
                            player.talking.dialouges[i].text_i = 0;
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
                        if(player.coins >= player.talking.inv[current_reply].price && checkForSpace(player, item_name_to_num(player.talking.inv[current_reply].name))){    //check if you have the money
                            moneySound.play()
                            addItem(player, item_name_to_num(player.talking.inv[current_reply].name), 1);
                            player.coins -= player.talking.inv[current_reply].price; //reduce money
                            player.talking.inv[current_reply].amount -= 1; //shop.inv -1 amount
                        }
                    }
                }
                lastMili = millis();
            }
            
        }
        if (keyIsDown(quest_key)) { //p
            if (millis() - lastMili > 100) {
                console.log(player);
                console.log(player.touching);
                console.log(player.looking(currentLevel_x, currentLevel_y));
                console.log(temp_move_bool)
                lastMili = millis();
            }
        }
    }
    else{
        if(!player.show_quests){
            if(keyIsDown(pause_button)){
                if (millis() - lastMili > 200 && !player.dead) {
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
        }

        /*
        if(keyIsDown(57)){
          player.hand = 8;
        }
        */
        if (keyIsDown(quest_key)) { //p
            if (millis() - lastMili > 100) {
                player.show_quests = !player.show_quests;
                console.log(player);
                console.log(player.touching);
                console.log(player.looking(currentLevel_x, currentLevel_y));
                console.log(temp_move_bool)
                lastMili = millis();
            }
        }
        if (keyIsDown(90)){  //z
            if(millis() - lastMili > 200){
                if(player.facing == 0){
                    console.log(levels[currentLevel_y-1][currentLevel_x])
                    if(levels[currentLevel_y-1][currentLevel_x] != null){
                        currentLevel_y -= 1;
                    }
                }
                else if(player.facing == 1){
                    console.log(levels[currentLevel_y][currentLevel_x+1])
                    if(levels[currentLevel_y][currentLevel_x+1] != null){
                        currentLevel_x += 1;
                    }
                }
                else if(player.facing == 2){
                    console.log(levels[currentLevel_y+1][currentLevel_x])
                    if(levels[currentLevel_y+1][currentLevel_x] != null){
                        currentLevel_y += 1;
                    }
                }
                else if(player.facing == 3){
                    console.log(levels[currentLevel_y][currentLevel_x-1])
                    if(levels[currentLevel_y][currentLevel_x-1] != null){
                        currentLevel_x -= 1;
                    }
                }
                lastMili = millis();
            }
        }
    }
}