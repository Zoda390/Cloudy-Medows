class NPC extends GridMoveEntity {

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer, phrase) {
        super(name, png, x, y, inv, hand, facing, under_tile_num, instructions, moving_timer);
        this.phrase = phrase;
        this.class = 'NPC';
    }

    phrase_render() {
        let offsetx = 0;
        let offsety = 0;
        if (player.facing == 0) {
            offsetx = 0;
            offsety = -tileSize;
        }
        else if (player.facing == 1) {
            offsetx = tileSize;
            offsety = -tileSize;
        }
        else if (player.facing == 2) {
            offsetx = 0;
            offsety = -tileSize;
        }
        else if (player.facing == 3) {
            offsetx = -tileSize;
            offsety = -tileSize;
        }

        push()
        stroke(0);
        fill(255);
        rectMode(CENTER);
        rect(player.touching.pos.x + offsetx, player.touching.pos.y + offsety, 100, 100); //figure out math
        textAlign(CENTER, CENTER);
        textSize(15);
        fill(0);
        text(player.looking(currentLevel_x, currentLevel_y).phrase, player.touching.pos.x + offsetx, player.touching.pos.y + offsety, 100, 100);
        pop()

        if (player.looking(currentLevel_x, currentLevel_y).inv[player.looking(currentLevel_x, currentLevel_y).hand] != 0 && player.looking(currentLevel_x, currentLevel_y).inv[player.looking(currentLevel_x, currentLevel_y).hand].amount > 0) {
            addItem(item_name_to_num(player.looking(currentLevel_x, currentLevel_y).inv[player.looking(currentLevel_x, currentLevel_y).hand].name), player.looking(currentLevel_x, currentLevel_y).inv[player.looking(currentLevel_x, currentLevel_y).hand].amount);
            player.looking(currentLevel_x, currentLevel_y).inv[player.looking(currentLevel_x, currentLevel_y).hand] = 0;
        }
    }
}