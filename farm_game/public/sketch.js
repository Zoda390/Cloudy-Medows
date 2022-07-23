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
var currentLevel_x = 1;
var lastMili = 0;
var maxHunger = 6;
var time = 0;
var timephase = 0;
var lastTimeMili = 0;
var lastHungerMili = 0;
var days = 0;
var title_screen = true;
var all_tiles = [];
var all_items = [];
var Dialouge_JSON = 0;
var paused = false;
var musicSlider = 0;
var fxSlider = 0;
var mouse_item = 0;
var localData = localDataStorage( 'passphrase.life' )
var musicplayer = {};
var startButton;
var optionsButton;
var creditsButton;
var creditsOn = false;
var current_reply = 0;

function draw() {
    musicplayer.update()

    takeInput();
    if (title_screen) {
        background(135, 206, 235);
        push()
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
        
        pop();

        if(paused){
            showOptions();
        }
        else{
            musicSlider.hide();
            fxSlider.hide();
        }
        if(creditsOn){
            showCredits();
        }
    }
    else {

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
                    if (levels[y][x] != 0) {
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

            if (millis() - lastTimeMili > 300) { //300 for 2 min 1 day, 150 for 1 min 1 day
                if (timephase == 0) {
                    if (player.touching.name == 'bed') {
                        time += 5;
                    }
                    else {
                        time += 1;
                    }
                }
                if (timephase == 1) {
                    if (player.touching.name == 'bed') {
                        time -= 5;
                    }
                    else {
                        time -= 1;
                    }
                }
                if (time >= 200) {
                    timephase = 1;
                    days += 1;
                    newDayChime.play();
                }
                if (time <= 0) {
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
    pop();

    if(levels[currentLevel_y][currentLevel_x].level_name_popup){
        levels[currentLevel_y][currentLevel_x].name_render();
    }

    if (player.talking != undefined && player.talking != 0 && player.talking.class != 'Chest' && player.talking.class != 'Robot' && player.talking.class != 'Backpack') {
        if (player.talking.class == 'NPC' ){
            player.talking.move_bool = false;
            player.talking.dialouge_render();
        }
        else if (player.talking.class == 'Shop'){
            player.talking.shop_render();
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
        image(coin_img, canvasWidth - 140, (canvasHeight - 185));
        text(player.coins, canvasWidth - 110, (canvasHeight - 182.5));
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
        image(coin_img, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 95));
        text(player.coins, (canvasWidth / 2) + (512 / 2) - 64, (canvasHeight - 92.5));
        if(mouse_item != 0){
            mouse_item.render(mouseX-32, mouseY-32);
        }
        if(player.money_anim > 0 && player.money_anim_amount > 0){
            player.money_anim -= 3;
            push()
            textFont(player_2);
            textSize(32.5);
            fill(0, 255, 0, player.money_anim);
            stroke(0, 0, 0, player.money_anim);
            strokeWeight(2);
            text('+' + player.money_anim_amount, (canvasWidth / 2) + (512 / 2) - 100, (canvasHeight - 125));
            pop();
        }
        else{
            player.money_anim_amount = 0;
        }
        if (player.looking(currentLevel_x, currentLevel_y) != undefined && player.looking(currentLevel_x, currentLevel_y).name == "cart_s") {
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
    }
    if(paused){
        showPaused();
    }
    else{
        musicSlider.hide();
        fxSlider.hide();
    }
}

function mouseReleased() {
    if(!title_screen){
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
                        let temp = mouse_item;
                        mouse_item = player.talking.inv[currentY][currentX]
                        player.talking.inv[currentY][currentX] = temp;
                    }
                    else if(player.talking.inv[currentY][currentX].name == mouse_item.name){
                        player.talking.inv[currentY][currentX].amount += mouse_item.amount;
                        mouse_item = 0;
                    }
                    else{
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