/*
@authors: Whole
@brief: Outputs to canvas
*/

//main stuff starts here

var cloudCount = 8;
var clouds = [];
var tileSize = 32;
var canvasWidth = 23 * tileSize;
var canvasHeight = 19 * tileSize;
var player;
var levels = [];
var currentLevel_y = 1;
var currentLevel_x = 4;
var lastMili = 0;
var maxHunger = 6;
var time = 0;
var timephase = 0;
var lastTimeMili = 0;
var lastHungerMili = 0;
var days = 0;
var title_screen = true;
var dificulty_screen = false;
var dificulty = 0;
var save_anim = 0;
var all_tiles = [];
var all_items = [];
var Dialouge_JSON = 0;
var paused = false;
var mouse_item = 0;
var localData = localDataStorage( 'passphrase.life' )
var musicplayer = {};
var musicSlider;
var fxSlider;
var startButton;
var optionsButton;
var creditsButton;
var dif0button;
var dif1button;
var dif2button;
var creditsOn = false;
var current_reply = 0;
var temp_move_bool = true;
var clear_anim = false;
var clear_movephase = 0;
var clear_ticks = 0;
var clear_y = canvasHeight;
var extraCount = 0;

function draw() {
    musicplayer.update()

    takeInput();
    if (title_screen) {
        showTitle();
        if(save_anim > 0){
            save_anim -= 1;
            push()
            tint(255, save_anim);
            image(save_img, canvasWidth - 128 + 5, canvasHeight - (128));
            pop()
        }
    }
    else if (dificulty_screen){
        showDificulty();
    }
    else {
        clear_anim = false;
        clear_movephase = 0;
        clear_ticks = 0;
        clear_y = canvasHeight;
        clearButton.hide()
        QuitButton.hide()
        startButton.hide();
        optionsButton.hide();
        creditsButton.hide();
        background(135, 206, 235);
        image(background_img, 0, 0);
        levels[currentLevel_y][currentLevel_x].fore_render();
        levels[currentLevel_y][currentLevel_x].render();
        if (!paused){
            for (let y = 0; y < levels.length; y++) {
                for (let x = 0; x < levels[y].length; x++) {
                    if (levels[y][x] != 0 && levels[y][x] != undefined) {
                        levels[y][x].update(x, y);
                    }
                }
            }
        }
        player.render();
        if(!player.dead){
            background(0, 0, 0, time);
            render_ui();
        }
        
        if (!paused){
            if(player.quests[player.current_quest] != undefined){
                player.quests[player.current_quest].update();
            }
            if (millis() - lastTimeMili > 300) { //300 for 2 min 1 day, 150 for 1 min 1 day
                if (timephase == 0) {
                    if (player.touching.name == 'bed') {
                        time += 3;
                    }
                    else {
                        time += 1;
                    }
                }
                if (timephase == 1) {
                    if (player.touching.name == 'bed') {
                        time -= 3;
                    }
                    else {
                        time -= 1;
                    }
                }
                if (time >= 200) {
                    time = 200;
                    timephase = 1;
                    days += 1;
                    if(days >= 100 && level5.map[9][2].name != 'Mr.C'){
                        level5.map[9][2] = new_tile_from_num(98, 2*tileSize, 9*tileSize);
                        if(player.quests[0].done){
                            level5.map[9][2].current_dialouge = 2;
                        }
                        else{
                            level5.map[9][2].current_dialouge = 3;
                        }
                    }
                    for(let i = 0; i < player.quests.length; i++){
                        if(player.quests[i] != undefined){
                            player.quests[i].daily_update();
                        }
                    }
                    saveAll();
                    newDayChime.play();
                }
                if (time <= 0) {
                    time = 0;
                    timephase = 0;
                    for (let y = 0; y < levels.length; y++) {
                        for (let x = 0; x < levels[y].length; x++) {
                            if (levels[y][x] != 0) {
                                levels[y][x].daily_update();
                            }
                        }
                    }
                }
                lastTimeMili = millis();
            }
        }
    }
}

//Christian's function to make UI more readible, positioning + math stuff
function render_ui() {
    //calendar
    push();
    image(calendar_img, canvasWidth - 70, 6);
    textFont(player_2);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(13);
    text('days', canvasWidth - 39, 30);
    textSize(15);
    text(days, canvasWidth - 40, 50);
    if(days == 69){
        
        text("nice !", canvasWidth - 40, 60);
    }

    pop();

    if(levels[currentLevel_y][currentLevel_x].level_name_popup){
        levels[currentLevel_y][currentLevel_x].name_render();
    }

    if(player.inv_warn_anim > 0){
        let mod = ((player.talking.class == 'NPC' || player.talking.class == 'Shop') ? 182: 0)
        player.inv_warn_anim -= 3;
        push()
        textFont(player_2);
        textSize(10);
        fill(255, 0, 0, player.inv_warn_anim);
        text("Full", 67, canvasHeight - mod - 10)
        tint(255, player.inv_warn_anim);
        image(inv_warn_img, 55, (canvasHeight - 64) - mod);
        pop()
    }

    if(player.quests[player.current_quest] != undefined){
        player.quests[player.current_quest].render(2, levels[currentLevel_y][currentLevel_x].y+52, 0, 0);
    }

    if (player.talking != undefined && player.talking != 0 && player.talking.class != 'Chest' && player.talking.class != 'Robot' && player.talking.class != 'Backpack') {
        if (player.talking.class == 'NPC' ){
            player.talking.move_bool = false;
            player.talking.dialouge_render();
            noStroke();
        }
        else if (player.talking.class == 'Shop'){
            player.talking.shop_render();
        }
        else if (player.talking.class == 'AirBallon'){
            player.talking.tp_render();
        }
        for (let i = 0; i < maxHunger; i++) {
            image(hunger_e, (canvasWidth / 20) + (30 * i), (canvasHeight - 185));
        }
        for (let i = 0; i < player.hunger; i++) {
            image(hunger_f, (canvasWidth / 20) + (30 * i), (canvasHeight - 185));
        }
        textFont(player_2);
        textSize(32.5);
        fill(0);
        textAlign(LEFT, TOP);
        let amountS = str(player.coins)
        if(player.coins > 9999999){
            let amountS = str(round(player.coins/1000000) + 'B')
            image(coin_img, canvasWidth - 130  - (amountS.length > 3 ? ((amountS.length-3)*20):0), (canvasHeight - 185));
            textSize(30 - ((amountS.length-4)*3));
            text(round(player.coins/1000000) + 'B', (canvasWidth / 2) + (512 / 2) - 64  - (amountS.length > 3 ? ((amountS.length-3)*20):0), (canvasHeight - 182.5) + ((amountS.length-4)*2.8));
        }
        else if(player.coins > 9999){
            image(coin_img, canvasWidth - 130 - (amountS.length-3)*20, (canvasHeight - 185));
            textSize(30 - ((amountS.length-4)*3));
            text(player.coins, canvasWidth - 110 - (amountS.length-3)*20, (canvasHeight - 182.5) - ((amountS.length-4)*3));
        }
        else{
            image(coin_img, canvasWidth - 130 - (amountS.length > 3 ? ((amountS.length-3)*25):0), (canvasHeight - 185));
            textSize(30);
            text(player.coins, canvasWidth - 100 - (amountS.length > 3 ? ((amountS.length-3)*25):0), (canvasHeight - 182.5));
        }
    }
    else{
        if(player.talking != undefined && player.talking != 0){
            if (player.talking.class == 'Chest'){
                player.talking.chest_render();
            }
            else if(player.talking.class == 'Backpack'){
                player.talking.bag_render();
            }
            else if(player.talking.class == 'Robot'){
                player.talking.move_bool = false;
                player.talking.render_pc();
            }
        }
        image(inv_img, (canvasWidth / 2) - (512 / 2), canvasHeight - 64);
        image(inv_hand_img, (canvasWidth / 2) - (512 / 2) + (64 * player.hand), canvasHeight - 64);

        for (let i = 0; i < maxHunger; i++) {
            image(hunger_e, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
        }
        for (let i = 0; i < player.hunger; i++) {
            image(hunger_f, (canvasWidth / 2) - (512 / 2) + (30 * i), (canvasHeight - 100));
        }
        textFont(player_2);
        textSize(32.5);
        fill(0);
        textAlign(LEFT, TOP);
        
        let amountS = str(player.coins)
        if(player.coins > 9999999){
            let amountS = str(round(player.coins/1000000) + 'B')
            image(coin_img, (canvasWidth / 2) + (512 / 2) - 130 - (amountS.length > 3 ? ((amountS.length-3)*20):0), (canvasHeight - 95));
            textSize(32.5 - ((amountS.length-4)*3));
            text(round(player.coins/1000000) + 'B', (canvasWidth / 2) + (512 / 2) - 94 - (amountS.length > 3 ? ((amountS.length-3)*20):0), (canvasHeight - 92.5) + ((amountS.length-4)*2.8));
        }
        else if(player.coins > 9999){
            image(coin_img, (canvasWidth / 2) + (512 / 2) - 130 - (amountS.length-3)*20, (canvasHeight - 95));
            textSize(32.5 - ((amountS.length-4)*3));
            text(player.coins, (canvasWidth / 2) + (512 / 2) - 94 - (amountS.length-3)*20, (canvasHeight - 92.5) + ((amountS.length-4)*2.8));
        }
        else{
            image(coin_img, (canvasWidth / 2) + (512 / 2) - 130 - (amountS.length > 3 ? ((amountS.length-3)*25):0), (canvasHeight - 95));
            textSize(32.5);
            text(player.coins, (canvasWidth / 2) + (512 / 2) - 94 - (amountS.length > 3 ? ((amountS.length-3)*25):0), (canvasHeight - 92.5));
        }
        if(player.money_anim > 0 && player.money_anim_amount > 0){
            player.money_anim -= 3;
            push()
            textFont(player_2);
            fill(0, 255, 0, player.money_anim);
            stroke(0, 0, 0, player.money_anim);
            strokeWeight(2);
            
            let amountS = str(player.money_anim_amount)
            if(player.money_anim_amount > 9999999){
                let amountS = str(round(player.money_anim_amount/1000000) + 'B')
                textSize(32.5 - ((amountS.length-4)*3));
                text(round(player.money_anim_amount/1000000) + 'B', (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 92.5) + ((amountS.length-4)*2.8));
            }
            else if(player.money_anim_amount > 9999){
                textSize(32.5 - ((amountS.length-4)*3));
                text('+' + player.money_anim_amount, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 125) - ((amountS.length-4)*3));
            }
            else{
                textSize(32.5);
                text('+' + player.money_anim_amount, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 125));
            }
            pop();
        }
        else{
            player.money_anim_amount = 0;
        }
        if(save_anim > 0){
            save_anim -= 1;
            push()
            tint(255, save_anim);
            image(save_img, canvasWidth - 128 + 5, canvasHeight - (128));
            pop()
        }
        if(player.show_quests){
            showQuests();
        }
        else{
            questSlider.hide();
        }
        if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.looking(currentLevel_x, currentLevel_y).name == "cart_s" && player.talking == 0) {
            push()
            stroke(0)
            stroke(149, 108, 65);
            strokeWeight(5);
            fill(187, 132, 75);
            rectMode(CENTER)
            rect(player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize / 2), player.looking(currentLevel_x, currentLevel_y).pos.y - tileSize, 90, 70);
            textAlign(CENTER, CENTER);
            textSize(15);
            fill(255);
            stroke(0);
            strokeWeight(4);
            text('Sell', player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize / 2), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize * 1.5), 90, 70);
            image(coin_img, player.looking(currentLevel_x, currentLevel_y).pos.x - (tileSize / 2) - 5, player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize * 1));
            if (player.inv[player.hand].price == 0 || player.inv[player.hand] == 0) {
                fill(255, 0, 0);
                text("No", player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize / 2));
            }
            if (player.inv[player.hand].price > 0) {
                fill(255);
                text(player.inv[player.hand].price, player.looking(currentLevel_x, currentLevel_y).pos.x + (tileSize), player.looking(currentLevel_x, currentLevel_y).pos.y - (tileSize / 2));
            }
            pop()
        }
        if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.looking(currentLevel_x, currentLevel_y).class == "PayToMoveEntity" && player.talking == 0){
            player.looking(currentLevel_x, currentLevel_y).price_render();
        }
        for (let i = 0; i < 8; i++) {
            if (player.inv[i] == undefined) {
                player.inv[i] = 0;
            }
            if (player.inv[i] != 0) {
                player.inv[i].render(112 + (i * 64), canvasHeight - 64);
                if (i == player.hand) {
                    push();
                    fill(255);
                    textSize(13);
                    textAlign(CENTER, CENTER);
                    text(player.inv[i].name, (9 * canvasWidth / 16), (canvasHeight - 80));
                    pop();
                }
            }
        }
        if(mouse_item != 0){
            mouse_item.render(mouseX-32, mouseY-32);
        }
    }

    if(paused){
        showPaused();
    }
    else{
        musicSlider.hide();
        fxSlider.hide();
        QuitButton.hide()
        Controls_Interact_button.hide();
        Controls_Eat_button.hide();
        Controls_Up_button.hide();
        Controls_Down_button.hide();
        Controls_Left_button.hide();
        Controls_Right_button.hide();
        Controls_Special_button.hide();
        Controls_Quest_button.hide();
    }
}

function mouseReleased() {
    if(!title_screen){
        if(mouseButton == LEFT){
            if(player.show_quests){
                if(mouseY >= (canvasHeight/8)+30 && mouseY <= (canvasHeight/8)+(60*6)+35){
                    let width = 6*22;
                    for(let i = questSlider.value(); i < (player.quests.length > 6 ? 6 + questSlider.value(): player.quests.length); i++){
                        width = max(width, (player.quests[i].name.length*17));
                        if(!player.quests[i].done){
                            width = max(width, (player.quests[i].goals[player.quests[i].current_Goal].name.length*12));
                        }
                    }
                    if(mouseX >= (canvasWidth/2)-(width/2) && mouseX <= (canvasWidth/2)+(width/2)){
                        let currentX = min((player.quests.length > 5 ? 5:player.quests.length-1), round((mouseY-((canvasHeight/8)+30)-30)/60))+questSlider.value()
                        if(currentX == player.current_quest){
                            player.current_quest = undefined;
                        }
                        else{
                            player.current_quest = currentX;
                        }
                        if(player.quests[player.current_quest] != undefined && player.quests[player.current_quest].done){
                            if(player.quests[player.current_quest].reward_item != 0){
                                if(checkForSpace(player, item_name_to_num(player.quests[player.current_quest].reward_item.name))){
                                    addItem(player, item_name_to_num(player.quests[player.current_quest].reward_item.name), player.quests[player.current_quest].reward_item.amount)
                                    player.quests[player.current_quest].reward_item = 0;
                                    if(player.quests[player.current_quest].reward_coins > 0){
                                        player.coins += player.quests[player.current_quest].reward_coins;
                                        player.money_anim = 255;
                                        player.money_anim_amount += player.quests[player.current_quest].reward_coins;
                                        player.quests[player.current_quest].reward_coins = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                if(keyIsDown(special_key)){ //16 == shift
                    if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && (player.talking.class == 'Chest' || player.talking.class == 'Backpack' )){
                        if(mouseY >= canvasHeight - 64 && mouseY <= canvasHeight){
                            if(mouseX >= 113 && mouseX <= 622){
                                let currentX = min(player.inv.length-1, round((mouseX-113-32)/64))
                                if(player.inv[currentX] != 0){
                                    if(player.talking.class == 'Chest' || (player.talking.class == 'Backpack' && player.inv[currentX].class != 'Backpack')){
                                        for (let i = 0; i < player.talking.inv.length; i++) {
                                            for(let j = 0; j < player.talking.inv[i].length; j++){
                                                if (player.talking.inv[i][j] != 0 && player.inv[currentX] != 0) { // stack items
                                                    if (player.talking.inv[i][j].name == player.inv[currentX].name) {
                                                        player.talking.inv[i][j].amount += player.inv[currentX].amount;
                                                        player.inv[currentX] = 0;
                                                    }
                                                }
                                            }
                                        }
                                        for (let i = 0; i < player.talking.inv.length; i++) {
                                            for(let j = 0; j < player.talking.inv[i].length; j++){
                                                if (player.talking.inv[i][j] == 0 && player.inv[currentX] != 0) { // empty space
                                                    player.talking.inv[i][j] = new_item_from_num(item_name_to_num(player.inv[currentX].name), player.inv[currentX].amount);
                                                    player.inv[currentX] = 0;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if(mouseY >= 189 && mouseY <= 457){
                            if(mouseX >= 184 && mouseX <= 552){
                                let currentX = min(player.talking.inv[0].length-1, round((mouseX-229)/90))
                                let currentY = min(player.talking.inv.length-1, round((mouseY-234)/90))
                                if(checkForSpace(player, item_name_to_num(player.talking.inv[currentY][currentX].name))){
                                    addItem(player, item_name_to_num(player.talking.inv[currentY][currentX].name), player.talking.inv[currentY][currentX].amount);
                                    player.talking.inv[currentY][currentX] = 0;
                                }
                            }
                        }
                    }
                    if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Robot'){
                        if(mouseY >= canvasHeight - 64 && mouseY <= canvasHeight){
                            if(mouseX >= 113 && mouseX <= 622){
                                let currentX = min(player.inv.length-1, round((mouseX-113-32)/64))
                                if(player.inv[currentX] != 0){
                                    if(checkForSpace(player.talking, item_name_to_num(player.inv[currentX].name))){
                                        addItem(player.talking, item_name_to_num(player.inv[currentX].name), player.inv[currentX].amount);
                                        player.inv[currentX] = 0;
                                    }
                                }
                            }
                        }
                        else if(mouseY >= 435 && mouseY <= 500){
                            if(mouseX >= 70 && mouseX <= 678){
                                let currentX = min(player.talking.inv.length-1, round((mouseX-70-45)/90))
                                if(checkForSpace(player, item_name_to_num(player.talking.inv[currentX].name))){
                                    addItem(player, item_name_to_num(player.talking.inv[currentX].name), player.talking.inv[currentX].amount);
                                    player.talking.inv[currentX] = 0;
                                }
                            }
                        }
                    }
                }
                else{
                    if(mouseY >= canvasHeight - 64 && mouseY <= canvasHeight){
                        if(mouseX >= 113 && mouseX <= 622){
                            let currentX = min(player.inv.length-1, round((mouseX-113-32)/64))
                            if(mouse_item == 0 || player.inv[currentX] == 0){
                                let temp = mouse_item;
                                mouse_item = player.inv[currentX]
                                player.inv[currentX] = temp;
                            }
                            else if(player.inv[currentX].name == mouse_item.name){
                                player.inv[currentX].amount += mouse_item.amount;
                                mouse_item = 0;
                            }
                            else{
                                let temp = mouse_item;
                                mouse_item = player.inv[currentX]
                                player.inv[currentX] = temp;
                            }
                        }
                    }
                    if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && (player.talking.class == 'Chest' || player.talking.class == 'Backpack' )){
                        if(mouseY >= 189 && mouseY <= 457){
                            if(mouseX >= 184 && mouseX <= 552){
                                let currentX = min(player.talking.inv[0].length-1, round((mouseX-229)/90))
                                let currentY = min(player.talking.inv.length-1, round((mouseY-234)/90))
                                if(mouse_item == 0 || player.talking.inv[currentY][currentX] == 0){
                                    if(mouse_item.class == 'Backpack' && player.talking.class == 'Backpack'){
                                        return;
                                    }
                                    let temp = mouse_item;
                                    mouse_item = player.talking.inv[currentY][currentX]
                                    player.talking.inv[currentY][currentX] = temp;
                                }
                                else if(player.talking.inv[currentY][currentX].name == mouse_item.name){
                                    player.talking.inv[currentY][currentX].amount += mouse_item.amount;
                                    mouse_item = 0;
                                }
                                else{
                                    if(mouse_item.class == 'Backpack' && player.talking.class == 'Backpack'){
                                        return;
                                    }
                                    let temp = mouse_item;
                                    mouse_item = player.talking.inv[currentY][currentX]
                                    player.talking.inv[currentY][currentX] = temp;
                                }
                            }
                        }
                    }
                    if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Robot'){
                        if(mouseY >= 78 && mouseY <= (ceil(player.talking.instructions.length/6)*86)+78){
                            if(mouseX >= 152 && mouseX <= 682){
                                let currentX = (min(player.talking.instructions.length/6, round((mouseY - 78-(86/2))/86))*6) + min(5, round((mouseX - 152-45)/90))
                                if(mouse_item == 0){
                                    mouse_item = player.talking.instructions[currentX];
                                    player.talking.instructions[currentX] = 0;
                                }
                                else if(player.talking.instructions[currentX] == 0){
                                    player.talking.instructions[currentX] = new_item_from_num(item_name_to_num(mouse_item.name), 1);
                                    mouse_item.amount -= 1;
                                    if(mouse_item.amount == 0){
                                    mouse_item = 0;
                                    }
                                }
                                else if (player.talking.instructions[currentX].name == mouse_item.name){
                                    mouse_item.amount += 1;
                                    player.talking.instructions[currentX] = 0;
                                }
                                else{
                                    let temp = mouse_item;
                                    mouse_item = player.talking.instructions[currentX];
                                    player.talking.instructions[currentX] = temp;
                                }
                            }
                        }
                        if(mouseY >= 435 && mouseY <= 500){
                            if(mouseX >= 70 && mouseX <= 678){
                                let currentX = min(player.talking.inv.length-1, round((mouseX-70-45)/90))
                                if(mouse_item == 0 || player.talking.inv[currentX] == 0){
                                    let temp = mouse_item;
                                    mouse_item = player.talking.inv[currentX]
                                    player.talking.inv[currentX] = temp;
                                }
                                else if(player.talking.inv[currentX].name == mouse_item.name){
                                    player.talking.inv[currentX].amount += mouse_item.amount;
                                    mouse_item = 0;
                                }
                                else{
                                    let temp = mouse_item;
                                    mouse_item = player.talking.inv[currentX]
                                    player.talking.inv[currentX] = temp;
                                }
                            }
                        }
                    }
                }
            }
        }
        if(mouseButton == RIGHT){
            if(mouseY >= canvasHeight - 64 && mouseY <= canvasHeight){
                if(mouseX >= 113 && mouseX <= 622){
                    let currentX = min(player.inv.length-1, round((mouseX-113-32)/64))
                    if(mouse_item == 0 && player.inv[currentX] != 0){
                        mouse_item = new_item_from_num(item_name_to_num(player.inv[currentX].name), ceil(player.inv[currentX].amount/2));
                        player.inv[currentX].amount -= ceil(player.inv[currentX].amount/2)
                        if (player.inv[currentX].amount <= 0){
                            player.inv[currentX] = 0;
                        }
                    }
                    else if(mouse_item.name == player.inv[currentX].name){
                        mouse_item.amount += ceil(player.inv[currentX].amount/2);
                        player.inv[currentX].amount -= ceil(player.inv[currentX].amount/2)
                        if (player.inv[currentX].amount <= 0){
                            player.inv[currentX] = 0;
                        }
                    }
                }
            }
            if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && (player.talking.class == 'Chest' || player.talking.class == 'Backpack' )){
                if(mouseY >= 189 && mouseY <= 457){
                    if(mouseX >= 184 && mouseX <= 552){
                        let currentX = min(player.talking.inv[0].length-1, round((mouseX-229)/90))
                        let currentY = min(player.talking.inv.length-1, round((mouseY-234)/90))
                        if(mouse_item == 0 && player.talking.inv[currentY][currentX] != 0){
                            mouse_item = new_item_from_num(item_name_to_num(player.talking.inv[currentY][currentX].name), ceil(player.talking.inv[currentY][currentX].amount/2));
                            player.talking.inv[currentY][currentX].amount -= ceil(player.talking.inv[currentY][currentX].amount/2)
                            if (player.talking.inv[currentY][currentX].amount <= 0){
                                player.talking.inv[currentY][currentX] = 0;
                            }
                        }
                        else if(mouse_item.name == player.talking.inv[currentY][currentX].name){
                            mouse_item.amount += ceil(player.talking.inv[currentY][currentX].amount/2);
                            player.talking.inv[currentY][currentX].amount -= ceil(player.talking.inv[currentY][currentX].amount/2)
                            if (player.talking.inv[currentY][currentX].amount <= 0){
                                player.talking.inv[currentY][currentX] = 0;
                            }
                        }
                    }
                }
            }
            if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking != 0 && player.looking(currentLevel_x, currentLevel_y).class == 'Robot'){
                if(mouseY >= 435 && mouseY <= 500){
                    if(mouseX >= 70 && mouseX <= 678){
                        let currentX = min(player.talking.inv.length-1, round((mouseX-70-45)/90))
                        if(mouse_item == 0 && player.talking.inv[currentX] != 0){
                            mouse_item = new_item_from_num(item_name_to_num(player.talking.inv[currentX].name), ceil(player.talking.inv[currentX].amount/2));
                            player.talking.inv[currentX].amount -= ceil(player.talking.inv[currentX].amount/2)
                            if (player.talking.inv[currentX].amount <= 0){
                                player.talking.inv[currentX] = 0;
                            }
                        }
                        else if(mouse_item.name == player.talking.inv[currentX].name){
                            mouse_item.amount += ceil(player.talking.inv[currentX].amount/2);
                            player.talking.inv[currentX].amount -= ceil(player.talking.inv[currentX].amount/2)
                            if (player.talking.inv[currentX].amount <= 0){
                                player.talking.inv[currentX] = 0;
                            }
                        }
                    }
                }
            }
        }
    }
  }