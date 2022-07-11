class NPC extends GridMoveEntity {

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer) {
        super(name, png, x, y, inv, hand, facing, under_tile_num, instructions, moving_timer);
        this.class = 'NPC';
        this.dialouges = Dialouge_JSON[this.name];
        for(let i = 0; i < this.dialouges.length; i++){
            this.dialouges[i] = new Dialouge(this.dialouges[i].phrase, this.dialouges[i].replies, this.dialouges[i].hand_num, this.dialouges[i].amount);
        }
        this.current_dialouge = 0;
    }

    dialouge_render() {
        this.dialouges[this.current_dialouge].render(this.name, this.inv);
    }
}