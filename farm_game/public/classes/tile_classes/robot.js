class Robot extends GridMoveEntity{
    constructor(name, png, x, y, inv, under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 2, under_tile_num, instructions, moving_timer)
    }

    render_pc(){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(250, 1, width-252, height-2);
        textSize(20);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(LEFT, TOP);
        text('Instructions', 260, 10);
        text('Pause', 580, 10);
        text('Play', 650, 10);
        let y = -40;
        let x = 0;
        for(let i = 0; i < this.instructions.length; i++){
        if(i%5 == 0){
            y+=90;
            x = 0;
        }
        stroke(255, 255, 0);
        strokeWeight(5);
        fill(149, 108, 65);
        if(this.current_inst == i){
            stroke(255);
        }
        rect((x*90)+260, y, 64, 64);
        fill(255);
        stroke(0);
        strokeWeight(3);
        textAlign(CENTER, CENTER);
        if(this.instructions[i] != 0){
            textSize(15);
            text(this.instructions[i], (x*90)+260+35, y+35);
        }
        x += 1;
        }
        pop()
    }
}