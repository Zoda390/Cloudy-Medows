class FreeMoveEntity extends GridMoveEntity{

    constructor(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num,moving_timer){
        this.instructions=[];
        super(name, png, x, y, inv = [], hand = 0, facing = 3, under_tile_num, instructions = [], moving_timer)
        this.options=['up','down','left','right']
    }

    newInstructions(){
        this.instructions.push(random(this.options))
        this.move()
    }
}