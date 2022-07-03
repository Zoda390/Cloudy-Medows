class GridMoveEntity extends MoveableEntity{

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer){
        super(name, png, x, y, inv, hand, facing, under_tile_num, moving_timer);
        this.instructions = instructions;
        this.current_instruction = 0;
    }

    move(x, y) {
        this.moving_timer -= 1;
        if (this.moving_timer <= 0) {
            if (this.instructions[this.current_instruction] == 'up') {
                this.facing = 0;
                if (this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.under_tile_num, this.pos.x, this.pos.y);
                    levels[y][x].map[(this.touching.pos.y / tileSize) - 1][this.touching.pos.x / tileSize] = temp;
                    this.pos.y -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction > this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            if (this.instructions[this.current_instruction] == 'right') {
                this.facing = 1;
                if (this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.under_tile_num, this.pos.x, this.pos.y);
                    levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) + 1] = temp;
                    this.pos.x += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction > this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            if (this.instructions[this.current_instruction] == 'down') {
                this.facing = 2;
                if (this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.under_tile_num, this.pos.x, this.pos.y);
                    levels[y][x].map[(this.touching.pos.y / tileSize) + 1][this.touching.pos.x / tileSize] = temp;
                    this.pos.y += tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction > this.instructions.length) {
                        this.current_instruction = 0;
                    }
                }
            }
            if (this.instructions[this.current_instruction] == 'left') {
                this.facing = 3;
                if (this.looking(x, y).collide != true) {
                    let temp = this;
                    levels[y][x].map[this.touching.pos.y / tileSize][this.touching.pos.x / tileSize] = new_tile_from_num(this.under_tile_num, this.pos.x, this.pos.y);
                    levels[y][x].map[this.touching.pos.y / tileSize][(this.touching.pos.x / tileSize) - 1] = temp;
                    this.pos.x -= tileSize;
                    this.current_instruction += 1;
                    if (this.current_instruction > this.instructions.length) {
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