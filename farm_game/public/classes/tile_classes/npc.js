class NPC extends GridMoveEntity {

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer) {
        super(name, png, x, y, inv, hand, facing, under_tile_num, instructions, moving_timer);
        this.class = 'NPC';
        if(this.name == 'Mr.C'){
            this.move_bool = false;
        }
        this.dialouges = JSON.parse(JSON.stringify(Dialouge_JSON[this.name]));
        for(let i = 0; i < this.dialouges.length; i++){
            this.dialouges[i] = new Dialouge(this.dialouges[i].phrase, this.dialouges[i].replies, this.dialouges[i].hand_num, this.dialouges[i].amount);
        }
        this.current_dialouge = 0;
    }

    dialouge_render() {
        this.dialouges[this.current_dialouge].render(this.name, this.inv);
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
        
        for(let i = 0; i < obj.dialouges.length; i++){
            this.dialouges[i].phrase2 = obj.dialouges[i].phrase2;
            this.dialouges[i].amount = obj.dialouges[i].amount;
            this.dialouges[i].replies = obj.dialouges[i].replies;
            for(let j = 0; j < obj.dialouges[i].replies.length; j++){
                if(obj.dialouges[i].replies[j].quest != -1){
                    this.dialouges[i].replies[j].quest = new Quest(obj.dialouges[i].replies[j].quest.og_name, obj.dialouges[i].replies[j].quest.goals, obj.dialouges[i].replies[j].quest.days, (obj.dialouges[i].replies[j].quest.reward_item == 0 ? 0 : {num: item_name_to_num(obj.dialouges[i].replies[j].quest.reward_item.name), amount: obj.dialouges[i].replies[j].quest.reward_item.amount}), obj.dialouges[i].replies[j].quest.reward_coins);
                    this.dialouges[i].replies[j].quest.load(obj.dialouges[i].replies[j].quest);
                }
            }
        }
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