class NPC extends GridMoveEntity {

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer, phrase) {
        super(name, png, x, y, inv, hand, facing, under_tile_num, instructions, moving_timer);
        this.phrase = phrase;
        this.class = 'NPC';
    }

}