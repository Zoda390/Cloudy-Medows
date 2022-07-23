class GridMoveEntity extends MoveableEntity{

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer){
        super(name, png, x, y, inv, hand, facing, under_tile_num, moving_timer);
        this.instructions = JSON.parse(JSON.stringify(instructions));
        this.current_instruction = 0;
        this.class = 'GridMoveEntity';
        this.move_bool = true;
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

            this.anim += 1;
            if (this.anim > this.png[this.facing].length) {
                this.anim = 0;
            }
            this.moving_timer = this.max_moving_timer;
        }
    }
}