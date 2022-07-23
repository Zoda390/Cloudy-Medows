class FreeMoveEntity extends GridMoveEntity{

    constructor(name, png, x, y, inv = [], under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 3, under_tile_num, instructions, moving_timer)
        this.options=['up','down','left','right'];
        this.class = 'FreeMoveEntity';
        this.grow_timer = 100;
    }

    randomMove(x, y){
        this.grow_timer -= 1;
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
}