class GridMoveEntity extends MoveableEntity{

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer){
        super(name, png, x, y, inv, hand, facing, under_tile_num, moving_timer);
        this.instructions = JSON.parse(JSON.stringify(instructions));
        this.current_instruction = 0;
        this.move_bool = true;
        this.class = 'GridMoveEntity';
    }

    move(x, y) {
        this.moving_timer -= 1;
        if(player.touching.name == 'bed'){
            this.moving_timer -= 2;
        }
        if (this.moving_timer <= 0 && this.move_bool) {
            if (this.instructions[this.current_instruction] == 'up') {
                this.facing = 0;
                if (this.pos.y - tileSize < 0) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y-1][x].map[18][this.pos.x / tileSize];
                    levels[y-1][x].map[18][this.pos.x / tileSize] = temp;
                    this.pos.y = canvasHeight - tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.pos.y / tileSize) - 1][this.pos.x / tileSize];
                    levels[y][x].map[(this.pos.y / tileSize) - 1][this.pos.x / tileSize] = temp;
                    this.pos.y -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction] == 'right') {
                this.facing = 1;
                if (this.pos.x + tileSize >= canvasWidth) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x+1].map[this.pos.y / tileSize][0];
                    levels[y][x+1].map[this.pos.y / tileSize][0] = temp;
                    this.pos.x = 0;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) + 1];
                    levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) + 1] = temp;
                    this.pos.x += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction] == 'down') {
                this.facing = 2;
                if (this.pos.y + tileSize >= canvasHeight) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y+1][x].map[0][this.pos.x / tileSize];
                    levels[y+1][x].map[0][this.pos.x / tileSize] = temp;
                    this.pos.y = 0;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[(this.pos.y / tileSize) + 1][this.pos.x / tileSize];
                    levels[y][x].map[(this.pos.y / tileSize) + 1][this.pos.x / tileSize] = temp;
                    this.pos.y += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction] == 'left') {
                this.facing = 3;
                if (this.pos.x - tileSize < 0) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x-1].map[this.pos.y / tileSize][22];
                    levels[y][x-1].map[this.pos.y / tileSize][22] = temp;
                    this.pos.x = canvasWidth - tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
                else if (this.looking(x, y) != 0 && this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
                    temp.under_tile = levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) - 1];
                    levels[y][x].map[this.pos.y / tileSize][(this.pos.x / tileSize) - 1] = temp;
                    this.pos.x -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction >= this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            else if (this.instructions[this.current_instruction] == 'disappear') {
                levels[y][x].map[this.pos.y / tileSize][this.pos.x / tileSize] = this.under_tile;
            }

            this.anim += 1;
            if (this.anim > all_imgs[this.png][this.facing].length) {
                this.anim = 0;
            }
            this.moving_timer = this.max_moving_timer;
        }
    }

    load(obj){
        this.age = obj.age;
        this.hand = obj.hand;
        this.under_tile = new_tile_from_num(tile_name_to_num(obj.under_tile.name), obj.under_tile.pos.x, obj.under_tile.pos.y);
        this.under_tile.load(obj.under_tile);
        this.anim = obj.anim;
        this.facing = obj.facing;
        this.moving_timer = obj.moving_timer;
        this.instructions = obj.instructions;
        this.current_instruction = obj.current_instruction;
        this.move_bool = obj.move_bool;
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
}