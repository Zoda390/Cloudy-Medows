
function start(){
    startButton.hide();
    optionsButton.hide();
    creditsButton.hide();
    clearButton.hide();
    Controls_Interact_button.hide();
    Controls_Eat_button.hide();
    Controls_Up_button.hide();
    Controls_Down_button.hide();
    Controls_Left_button.hide();
    Controls_Right_button.hide();
    Controls_Special_button.hide();
    Controls_Quest_button.hide();
    title_screen = false;
    if(localData.get('Day_curLvl_Dif') == null){
        dificulty_screen = true;
    }
    paused = false;
    levels[currentLevel_y][currentLevel_x].level_name_popup = true;
}

/*
button types   
wasd and <- up v -> down
12345678

interact 
eat secoundary interact 

inventory quick move 

*/


function showTitle(){
    push()
    background(135, 206, 235);
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].update(clouds[i].vel)
        clouds[i].render()
    }
    imageMode(CENTER);
    image(title_screen_img, canvasWidth / 2, (canvasHeight / 2) - 40);
    
    textFont(player_2);
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(13);
    
    startButton.show();
    optionsButton.show();
    creditsButton.show();
    
    pop();

    if(paused){
        showOptions();
    }
    else{
        musicSlider.hide();
        fxSlider.hide();
        clearButton.hide();
        Controls_Interact_button.hide();
        Controls_Eat_button.hide();
        Controls_Up_button.hide();
        Controls_Down_button.hide();
        Controls_Left_button.hide();
        Controls_Right_button.hide();
        Controls_Special_button.hide();
        Controls_Quest_button.hide();

    }
    if(creditsOn){
        showCredits();
    }
    else{}
    if(clear_anim){
        clear_data_render();
    }
}

function showDificulty(){
    push();
    background(135, 206, 235);
    musicSlider.hide();
    fxSlider.hide();
    clearButton.hide();
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].update(clouds[i].vel)
        clouds[i].render()
    }
    stroke(149, 108, 65);
    strokeWeight(5);
    fill(187, 132, 75);
    image(dif_background_img, -20, (canvasHeight/4));
    image(dif_background_img, canvasWidth - 236, (canvasHeight/4));
    image(dif_background_img, (canvasWidth/2)-(256/2), (canvasHeight/4));
    image(dif_background_img, (canvasWidth/2)-(256/2), 10);
    rect((canvasWidth/2)-220, (canvasWidth/2)-300, 440, 100);
    textFont(player_2);
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(20);
    stroke(255);
    strokeWeight(3);
    text('Select Your Dificulty', (canvasWidth/2)-10, (canvasWidth/2)-250);

    fill(100, 255, 100);
    stroke(0, 200, 0);
    strokeWeight(5);
    rect((canvasWidth/4)-90-13, (canvasWidth/2)-150-13, 170, 290);
    fill(0, 255, 0);
    stroke(0);
    strokeWeight(3);
    textSize(20);
    text('Easy', (canvasWidth/4)-90-13+(170/2), (canvasWidth/2)-150-13+20);
    textSize(14);
    text('Money Loss', (canvasWidth/4)-90-13+(170/2), (canvasWidth/2)-150-13+70);
    text('Food Rot', (canvasWidth/4)-90-13+(170/2), (canvasWidth/2)-150-13+140);
    text('Perma Death', (canvasWidth/4)-90-13+(170/2), (canvasWidth/2)-150-13+210);
    image(check_img, (canvasWidth/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+90)
    image(x_img, (canvasWidth/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+160)
    image(x_img, (canvasWidth/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+230)

    fill(100, 100, 255);
    stroke(0, 0, 200);
    strokeWeight(5);
    rect(((2*canvasWidth)/4)-90-13, (canvasWidth/2)-150-13, 170, 290);
    fill(0, 0, 255);
    stroke(0);
    strokeWeight(3);
    textSize(20);
    text('Medium', ((2*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+20);
    textSize(14);
    text('Money Loss', ((2*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+70);
    text('Food Rot', ((2*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+140);
    text('Perma Death', ((2*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+210);
    image(check_img, ((2*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+90)
    image(check_img, ((2*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+160)
    image(x_img, ((2*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+230)

    fill(255, 100, 100);
    stroke(200, 0, 0);
    strokeWeight(5);
    rect(((3*canvasWidth)/4)-90-13, (canvasWidth/2)-150-13, 170, 290);
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(3);
    textSize(20);
    text('Hard', ((3*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+20);
    textSize(14);
    text('Money Loss', ((3*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+70);
    text('Food Rot', ((3*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+140);
    text('Perma Death', ((3*canvasWidth)/4)-90-13+(170/2), (canvasWidth/2)-150-13+210);
    image(x_img, ((3*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+90)
    image(x_img, ((3*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+160)
    image(check_img, ((3*canvasWidth)/4)-90-13+(170/2)-8, (canvasWidth/2)-150-13+230)

    dif0button.show()
    dif1button.show()
    dif2button.show()

    pop();
}

function showOptions(){
    push()
    stroke(149, 108, 65);
    strokeWeight(5);
    fill(187, 132, 75);
    rectMode(CENTER);
    rect(((4*canvasWidth)/5)+50, canvasHeight/2, 300, canvasHeight);
    fill(255);
    stroke(0);
    strokeWeight(2);
    textFont(player_2);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('Option', ((4*canvasWidth)/5)+40, 30);
    musicSlider.show();
    fxSlider.show();
    musicSlider.position(((4*canvasWidth)/5)-30, (canvasHeight/6)-25);
    fxSlider.position(((4*canvasWidth)/5)-30, (canvasHeight/6)+15);
    Controls_Interact_button.show();
    Controls_Eat_button.show();
    Controls_Up_button.show();
    Controls_Down_button.show();
    Controls_Left_button.show();
    Controls_Right_button.show();
    Controls_Special_button.show();
    Controls_Quest_button.show();;
    Controls_Interact_button.position(((4*canvasWidth)/5)+70, canvasHeight/2-120);
    Controls_Eat_button.position(((4*canvasWidth)/5)+70, canvasHeight/2-95);
    Controls_Up_button.position(((4*canvasWidth)/5)+70, canvasHeight/2-70);
    Controls_Left_button.position(((4*canvasWidth)/5)+70, canvasHeight/2-45);
    Controls_Down_button.position(((4*canvasWidth)/5)+70, canvasHeight/2-20);
    Controls_Right_button.position(((4*canvasWidth)/5)+70, canvasHeight/2+5);
    Controls_Special_button.position(((4*canvasWidth)/5)+70, canvasHeight/2 + 30);
    Controls_Quest_button.position(((4*canvasWidth)/5)+70, canvasHeight/2 + 55);
    if(control_set != 0){
        fill(255, 255, 0);
        rect(((4*canvasWidth)/5)+97, ((canvasHeight/2)-127) + (25*(control_set-1)), 90, 20);
    }
    textSize(15);
    fill(0);
    noStroke();
    text('Interact:', ((4*canvasWidth)/5)-12, canvasHeight/2-127);
    text('Eat:', ((4*canvasWidth)/5)-12, canvasHeight/2-102);
    text('Up:', ((4*canvasWidth)/5)-12, canvasHeight/2-77);
    text('Left:', ((4*canvasWidth)/5)-12, canvasHeight/2-52);
    text('Down:', ((4*canvasWidth)/5)-12, canvasHeight/2-27);
    text('Right:', ((4*canvasWidth)/5)-12, canvasHeight/2-2);
    text('Special:', ((4*canvasWidth)/5)-12, canvasHeight/2+23);
    text('Quest:', ((4*canvasWidth)/5)-12, canvasHeight/2+48);

    let button_key_array = [Controls_Interact_button_key, Controls_Eat_button_key, Controls_Up_button_key, Controls_Left_button_key, Controls_Down_button_key, Controls_Right_button_key, Controls_Special_button_key, Controls_Quest_button_key];
    for(let i = 0; i < button_key_array.length; i++){
        textSize(15 - (button_key_array[i].length > 5 ? ((button_key_array[i].length-5) * 1.5):0));
        text(button_key_array[i], ((4*canvasWidth)/5)+97, (canvasHeight/2-127) + (i*25));
    }
    

    clearButton.show();
    //deleate data button
    image(music_note_img, ((4*canvasWidth)/5)-80, (canvasHeight/6)-50);
    image(fx_img, ((4*canvasWidth)/5)-80, (canvasHeight/6)-10);
    pop()
}

function showPaused(){
    push()
    stroke(149, 108, 65);
    strokeWeight(5);
    fill(187, 132, 75);
    rectMode(CENTER);
    rect(canvasWidth/2, (canvasHeight/2)-30, 400, 400);
    fill(255);
    stroke(0);
    strokeWeight(2);
    textFont(player_2);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('Paused', canvasWidth/2, (canvasHeight/5)-20);
    musicSlider.show();
    fxSlider.show();
    QuitButton.show();
    musicSlider.position((canvasWidth/2)-10, (canvasHeight/5)+25);
    fxSlider.position((canvasWidth/2)-10, (canvasHeight/5)+65);

    image(music_note_img, (canvasWidth/2)-65, (canvasHeight/5));
    image(fx_img, (canvasWidth/2)-65, (canvasHeight/5)+40);

    Controls_Interact_button.show();
    Controls_Eat_button.show();
    Controls_Up_button.show();
    Controls_Down_button.show();
    Controls_Left_button.show();
    Controls_Right_button.show();
    Controls_Special_button.show();
    Controls_Quest_button.show();;
    Controls_Interact_button.position(((2*canvasWidth)/5)+102, canvasHeight/2-95);
    Controls_Eat_button.position(((2*canvasWidth)/5)+102, canvasHeight/2-70);
    Controls_Up_button.position(((2*canvasWidth)/5)+102, canvasHeight/2-45);
    Controls_Left_button.position(((2*canvasWidth)/5)+102, canvasHeight/2-20);
    Controls_Down_button.position(((2*canvasWidth)/5)+102, canvasHeight/2+5);
    Controls_Right_button.position(((2*canvasWidth)/5)+102, canvasHeight/2+30);
    Controls_Special_button.position(((2*canvasWidth)/5)+102, canvasHeight/2+55);
    Controls_Quest_button.position(((2*canvasWidth)/5)+102, canvasHeight/2 + 80);
    
    if(control_set != 0){
        fill(255, 255, 0);
        rect(((2*canvasWidth)/5)+129, ((canvasHeight/2)-102) + (25*(control_set-1)), 90, 20);
    }
    textSize(15);
    fill(0);
    noStroke();
    text('Interact:', ((2*canvasWidth)/5)+20, canvasHeight/2-102);
    text('Eat:', ((2*canvasWidth)/5)+20, canvasHeight/2-77);
    text('Up:', ((2*canvasWidth)/5)+20, canvasHeight/2-52);
    text('Left:', ((2*canvasWidth)/5)+20, canvasHeight/2-27);
    text('Down:', ((2*canvasWidth)/5)+20, canvasHeight/2-2);
    text('Right:', ((2*canvasWidth)/5)+20, canvasHeight/2+23);
    text('Special:', ((2*canvasWidth)/5)+20, canvasHeight/2+48);
    text('Quest:', ((2*canvasWidth)/5)+20, canvasHeight/2+73);

    let button_key_array = [Controls_Interact_button_key, Controls_Eat_button_key, Controls_Up_button_key, Controls_Left_button_key, Controls_Down_button_key, Controls_Right_button_key, Controls_Special_button_key, Controls_Quest_button_key];
    for(let i = 0; i < button_key_array.length; i++){
        textSize(15 - (button_key_array[i].length > 5 ? ((button_key_array[i].length-5) * 1.5):0));
        text(button_key_array[i], ((2*canvasWidth)/5)+129, (canvasHeight/2-102) + (i*25));
    }

    pop()
}

function showCredits(){
    push()
    stroke(149, 108, 65);
    strokeWeight(5);
    fill(187, 132, 75);
    rectMode(CENTER);
    rect(canvasWidth/2 + 120, 150/2, 490, 150 );
    fill(255);
    stroke(0);
    strokeWeight(2);
    textFont(player_2);
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Credits', canvasWidth/2 + 120, 20);
    text('Christian Rodriguez - Lead programmer \n David Kozdra - Code Art and sound \n Patrick Mayer - Misc \n Christian “Sealand” Rodriguez - Music \n Ethan Davis - Dialogue and Testing \n and thanks to our play testers ', (canvasWidth/2)+120, 80);
    pop()
}

function showQuests(){
    let width = 10*22;
    for(let i = questSlider.value(); i < (player.quests.length > 6 ? 6 + questSlider.value(): player.quests.length); i++){
        width = max(width, (player.quests[i].name.length*17)+10);
        if(!player.quests[i].done){
            width = max(width, (player.quests[i].goals[player.quests[i].current_Goal].name.length*12)+10);
        }
    }
    push()
    stroke(149, 108, 65);
    strokeWeight(5);
    fill(187, 132, 75);
    rect((canvasWidth/2) - (width/2), canvasHeight/8, width, (65*6)+35);
    textFont(player_2);
    textSize(20);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('All Quests', (canvasWidth/2) - (width/2)+7, (canvasHeight/8)+7)
    
    text(String.fromCharCode(quest_key)+ ' To leave', (canvasWidth/2) - (width/2)+370, (canvasHeight/8)+7)

    pop()
    questSlider.show()
    questSlider.position((canvasWidth/2)+(width/2)-190, (canvasHeight/8)+220);
    questSlider.attribute('max', player.quests.length-6);
    for(let i = questSlider.value(); i < (player.quests.length > 6 ? 6 + questSlider.value(): player.quests.length); i++){
        if(player.current_quest == i){
            player.quests[i].render((canvasWidth/2) - (width/2)+5, (canvasHeight/8)+35+((i-questSlider.value())*65), 'yellow', width-10);
        }
        else{
            player.quests[i].render((canvasWidth/2) - (width/2)+5, (canvasHeight/8)+35+((i-questSlider.value())*65), 0, width-10);
        }
    }
}

function clear_data_render() {
    if(clear_movephase == 0){
        if(clear_ticks >= 50){
            clear_movephase = 1;
            clear_ticks = 0;
        }
        clear_y -= 1;
    }
    if(clear_movephase == 1){
        if(clear_ticks >= 70){
            clear_movephase = 2;
            clear_ticks = 0;
        }
    }
    if(clear_movephase == 2){
        clear_y += 1;
        if(clear_ticks >= 50){
            clear_anim = false;
            clear_ticks = 0;
            clear_movephase = 0;
        }
    }
    clear_ticks += 1;
    push();
    stroke(0);
    strokeWeight(5);
    fill(255, 255, 0);
    rect(canvasWidth-(('Clearing Data'.length*17)+6), clear_y, ('Clearing Data'.length*17)+6, 50);
    textFont(player_2);
    textSize(15);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    text('Clearing Data', canvasWidth-((('Clearing Data'.length*17)+6)/2)+2, clear_y+25);
    pop();
}

function addItem(to, item_obj_num, amount) {
    for (let i = 0; i < to.inv.length; i++) {
        if (to.inv[i] != 0) { // stack items
            if (to.inv[i].name == all_items[item_obj_num].name) {
                to.inv[i].amount += amount;
                return;
            }
        }
    }
    if (to.inv[to.hand] == 0) { // air
        to.inv[to.hand] = new_item_from_num(item_obj_num, amount);
        return;
    }

    for (let i = 0; i < 8; i++) {
        if (to.inv[i] == 0) { // find space
            to.inv[i] = new_item_from_num(item_obj_num, amount);
            return;
        }
    }
}

function checkForSpace(to, item_obj_num){
    var check = false;
    if(item_obj_num == 0){
        check = true;
        return check;
    }
    for (let i = 0; i < to.inv.length; i++) {
        if (to.inv[i] != 0) { // stack items
            if (to.inv[i].name == all_items[item_obj_num].name) {
                check = true;
                return check;
            }
        }
    }
    if (to.inv[to.hand] == 0) { // air in hand
        check = true;
        return check;
    }

    for (let i = 0; i < 8; i++) {
        if (to.inv[i] == 0) { // find space
            check = true;
            return check;
        }
    }
    if(!check){
        to.inv_warn_anim = 255;
        ErrorSound.play();
    }
    return check;
}

function item_name_to_num(item_name) {
    for (let i = 0; i < all_items.length; i++) {
        if (item_name == all_items[i].name) {
            return i;
        }
    }
}

function tile_name_to_num(tile_name) {
    for (let i = 0; i < all_tiles.length; i++) {
        if (tile_name == all_tiles[i].name) {
            return i+1;
        }
    }
}

function new_tile_from_num(num, x, y) {
    if (num-1 <= all_tiles.length) {
        if (all_tiles[num - 1].class == 'Tile') {
            return new Tile(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].collide, all_tiles[num - 1].age);
        }
        else if (all_tiles[num - 1].class == 'Shop') {
            return new Shop(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num - 1].class == 'Plant') {
            return new Plant(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].collide, all_tiles[num - 1].eat_num, all_tiles[num - 1].waterneed, all_tiles[num - 1].growthTime);
        }
        else if (all_tiles[num - 1].class == 'Entity') {
            return new Entity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].age, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num - 1].class == 'FreeMoveEntity') {
            return new FreeMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'MovableEntity') {
            return new MoveableEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'GridMoveEntity') {
            return new GridMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'NPC') {
            return new NPC(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].hand, all_tiles[num - 1].facing, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'Chest'){
            return new Chest(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num - 1].class == 'Robot'){
            return new Robot(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num - 1].class == 'AirBallon'){
            return new AirBallon(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].under_tile_num);
        }
        else if (all_tiles[num-1].class == 'LightMoveEntity'){
            return new LightMoveEntity(all_tiles[num - 1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].inv, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].instructions, all_tiles[num - 1].moving_timer);
        }
        else if (all_tiles[num-1].class == 'PayToMoveEntity'){
            return new PayToMoveEntity(all_tiles[num-1].name, all_tiles[num - 1].png, x, y, all_tiles[num - 1].age, all_tiles[num - 1].under_tile_num, all_tiles[num - 1].price)
        }
    }
    else {
        console.error('tile created from ' + num + ' doesnt exist');
    }
}

function new_item_from_num(num, amount) {
    if (num <= all_items.length) {
        if (all_items[num].class == 'Item') {
            return new Item(all_items[num].name, amount, all_items[num].png, all_items[num].price);
        }
        else if (all_items[num].class == 'Tool') {
            return new Tool(all_items[num].name, amount, all_items[num].png);
        }
        else if (all_items[num].class == 'Eat') {
            return new Eat(all_items[num].name, amount, all_items[num].png, all_items[num].price, all_items[num].hunger, all_items[num].hunger_timer, all_items[num].seed_num);
        }
        else if (all_items[num].class == 'Seed') {
            return new Seed(all_items[num].name, amount, all_items[num].png, all_items[num].plant_num);
        }
        else if (all_items[num].class == 'Placeable') {
            return new Placeable(all_items[num].name, amount, all_items[num].png, all_items[num].price, all_items[num].tile_num, all_items[num].tile_need_num);
        }
        else if(all_items[num].class == 'Command'){
            return new Command(all_items[num].name, amount, all_items[num].png, all_items[num].command);
        }
        else if(all_items[num].class == 'Backpack'){
            return new Backpack(all_items[num].name, amount, all_items[num].png, all_items[num].inv);
        }
    }
    else {
        console.error('item created from ' + num + ' doesnt exist');
    }
}

function saveAll(){
    save_anim = 255;
    if(player.talking == 0){
        player.save()
    }
    localData.set('Day_curLvl_Dif', {days: days, currentLevel_x: currentLevel_x, currentLevel_y: currentLevel_y, dificulty: dificulty});
    let lvlLength = 0;
    for(let i = 0; i < levels.length; i++){
        for(let j = 0; j < levels[i].length; j++){
            if(levels[i][j] != 0 && levels[i][j] != undefined){
                for(let y = 0; y < levels[i][j].map.length; y++){
                    for(let x = 0; x < levels[i][j].map[y].length; x++){
                        if (levels[i][j].map[y][x] != 0){
                            levels[i][j].map[y][x].getReadyForSave();
                        }
                    }
                }
                localData.set(levels[i][j].name, levels[i][j]);
                if(j > lvlLength){
                    lvlLength = j
                }
            }
        }
    }
    localData.set('extralvlStuff', {extraCount: extraCount, lvlLength: lvlLength});
}

function saveOptions(){
    localData.set('Options', {musicVolume: musicSlider.value(), fxVolume: fxSlider.value()});
    localData.set('Controls', {
        Controls_Interact_button_key: Controls_Interact_button_key,
        Controls_Eat_button_key: Controls_Eat_button_key,
        Controls_Up_button_key: Controls_Up_button_key,
        Controls_Down_button_key: Controls_Down_button_key,
        Controls_Left_button_key: Controls_Left_button_key,
        Controls_Right_button_key: Controls_Right_button_key,
        Controls_Special_button_key: Controls_Special_button_key,
        Controls_Quest_button_key: Controls_Quest_button_key,
        move_right_button: move_right_button,
        move_left_button: move_left_button,
        move_up_button: move_up_button,
        move_down_button: move_down_button,
        interact_button: interact_button,
        eat_button: eat_button,
        pause_button: pause_button,
        special_key: special_key,
        quest_key: quest_key
    })
}

function loadAll(){
    if(localData.get('player') != null ){
        player.load(localData.get('player'));
    }
    if(localData.get('Day_curLvl_Dif') != null){
        days = localData.get('Day_curLvl_Dif').days;
        currentLevel_x = localData.get('Day_curLvl_Dif').currentLevel_x;
        currentLevel_y = localData.get('Day_curLvl_Dif').currentLevel_y;
        dificulty = localData.get('Day_curLvl_Dif').dificulty;
    }
    if(localData.get('Controls') != null){
        Controls_Interact_button_key = localData.get('Controls').Controls_Interact_button_key
        Controls_Eat_button_key = localData.get('Controls').Controls_Eat_button_key
        Controls_Up_button_key = localData.get('Controls').Controls_Up_button_key
        Controls_Down_button_key = localData.get('Controls').Controls_Down_button_key
        Controls_Left_button_key = localData.get('Controls').Controls_Left_button_key
        Controls_Right_button_key = localData.get('Controls').Controls_Right_button_key
        Controls_Special_button_key = localData.get('Controls').Controls_Special_button_key
        Controls_Quest_button_key = localData.get('Controls').Controls_Quest_button_key
        move_right_button = localData.get('Controls').move_right_button
        move_left_button = localData.get('Controls').move_left_button
        move_up_button = localData.get('Controls').move_up_button
        move_down_button = localData.get('Controls').move_down_button
        interact_button = localData.get('Controls').interact_button
        eat_button = localData.get('Controls').eat_button
        pause_button = localData.get('Controls').pause_button
        special_key = localData.get('Controls').special_key
        quest_key = localData.get('Controls').quest_key
    }
    if(localData.get('extralvlStuff') != null){
        extraCount = localData.get('extralvlStuff').extraCount
        let lvlLength = localData.get('extralvlStuff').lvlLength;
        for(let i = 0; i < levels.length; i++){
            for(let j = 0; j < lvlLength+1; j++){
                if(levels[i][j] != 0){
                    loadLevel(levels[i][j], j, i);
                }
            }
        }
    }
    else{
        for(let i = 0; i < levels.length; i++){
            for(let j = 0; j < levels[i].length; j++){
                if(levels[i][j] != 0){
                    loadLevel(levels[i][j]);
                }
            }
        }
    }
}

function loadLevel(level, lvlx = 0, lvly = 0){
    let newLvl = 0;
    if(level === undefined){
        newLvl = localData.get('Extra y:'+ lvly + ' x:' + (lvlx-6));
        if(newLvl == undefined){
            return;
        }
        let fore = JSON.parse(JSON.stringify(newLvl.fore));
        for(let i = 0; i < fore.length; i++){
            for(let j = 0; j < fore[i].length; j++){
                if(fore[i][j] != 0){
                    fore[i][j] = fore[i][j].type;
                }
            }
        }
        let map = JSON.parse(JSON.stringify(newLvl.map));
        for(let i = 0; i < map.length; i++){
            for(let j = 0; j < map[i].length; j++){
                if(map[i][j] != 0){
                    map[i][j] = tile_name_to_num(map[i][j].name);
                }
            }
        }
        levels[lvly][lvlx] = new Level(newLvl.name, map, fore);
        level = levels[lvly][lvlx];
        for(let i = 0; i < levels[lvly][lvlx].fore.length; i++){
            for(let j = 0; j < levels[lvly][lvlx].fore[i].length; j++){
                levels[lvly][lvlx].fore[i][j].variant = newLvl.fore[i][j].variant;
            }
        }
    }else{
        newLvl = localData.get(level.name)
    }
    if(newLvl != null){
        level.lights = [];
        level.ladybugs = newLvl.ladybugs;
        for(let i = 0; i < newLvl.map.length; i++){
            for(let j = 0; j < newLvl.map[i].length; j++){
                if(newLvl.map[i][j] != 0 && level.map[i][j] != 0){
                    level.map[i][j] = new_tile_from_num(tile_name_to_num(newLvl.map[i][j].name), newLvl.map[i][j].pos.x, newLvl.map[i][j].pos.y);
                    level.map[i][j].load(newLvl.map[i][j]);
                    if (newLvl.map[i][j].name == 'lamppost') {
                        append(level.lights, new Light(level.map[i][j].pos.x, level.map[i][j].pos.y, (tileSize * 6), 255, 255, 255));
                    }
                    if (newLvl.map[i][j].name == 'satilite') {
                        append(level.lights, new Light(level.map[i][j].pos.x, level.map[i][j].pos.y, (tileSize * 1)+5, 255, 255, 0));
                    }
                    if (newLvl.map[i][j].name == 'LightBug'){
                        let light = new Light(level.map[i][j].pos.x, level.map[i][j].pos.y, (tileSize * 1)-5, 150, 255, 0);
                        append(level.lights, light);
                        level.map[i][j].light = light;
                        level.map[i][j].lightI = level.lights.length - 1;
                    }
                }
            }
        }
    }
}

function deleteWorld(){
    localData.remove('player');
    localData.remove('Day_curLvl_Dif');
    for(let i = 0; i < levels.length; i++){
        for(let j = 0; j < levels[i].length; j++){
            if(levels[i][j] != 0){
                localData.remove(levels[i][j].name);
            }
        }
    }
}
