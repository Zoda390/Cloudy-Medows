class FreeMoveEntity extends GridMoveEntity{

    constructor(name, png, x, y, inv = [], under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 3, under_tile_num, instructions, moving_timer)
        this.options=['up','down','left','right'];
        this.class = 'FreeMoveEntity';
        this.grow_timer = 100;
    }

    randomMove(x, y){
        if (this.name == 'bee'){
            this.grow_timer -= 1;
        }
        if(player.touching.name == 'bed'){
            this.grow_timer -= 2;
        }
        if(this.instructions.length < 1){
            this.instructions.push(random(this.options));
        }
        this.move(x, y);
        if(this.under_tile.class == 'Plant' && this.grow_timer <= 0){
            this.under_tile.grow_timer -= 10;
            this.grow_timer = 100;
        }
        this.instructions = [];
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
        this.grow_timer = obj.grow_timer;
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