class Robot extends GridMoveEntity{
    constructor(name, png, x, y, inv, under_tile_num, instructions, moving_timer){
        super(name, png, x, y, inv, 0, 2, under_tile_num, instructions, moving_timer);
        this.class = 'Robot';
        this.fuel = 100;
    }

    render_pc(){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/16, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 17), canvasWidth - (canvasWidth/8), (canvasHeight/8)+ 7);
        stroke(100);
        strokeWeight(6);
        fill(50);
        rect(canvasWidth/16, canvasHeight/8, canvasWidth - (canvasWidth/8), canvasHeight - (canvasWidth/3) - 17);
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/16, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 40), canvasWidth/11, (canvasHeight/24)-1);
        noStroke();
        rect((canvasWidth/16) + 2, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 35), (canvasWidth/11) - 4, canvasHeight/25)
        textFont(player_2);
        textSize(15);
        fill(0, 255, 0);
        stroke(0);
        strokeWeight(4);
        text(this.name, (canvasWidth/16)+10, (canvasHeight/8)+10);
        text('Inst->', (canvasWidth/16)+10, (canvasHeight/8)+30);
        text('Fuel', (canvasWidth/16)+25, (canvasHeight/8)+65);
        fill(255);
        text('Inv', (canvasWidth/16)+10, canvasHeight/8 + (canvasHeight - (canvasWidth/3) - 32))
        let y = 0;
        let x = 0;
        for(let i = 0; i < this.instructions.length; i++){
            if(i%6 == 0){
                y+=86;
                x = 0;
            }
            stroke(0, 255, 0);
            strokeWeight(5);
            fill(0);
            if(this.current_instruction == i){
                stroke(255);
            }
            rect((x*90)+160, y, 64, 64);
            if(this.instructions[i] != 0){
                this.instructions[i].render();
            }
            x += 1;
        }
        stroke(255);
        rect((canvasWidth/16)+45, (canvasHeight/8)+90, 20, 200);
        stroke(0);
        strokeWeight(2);
        fill(0, 255, 0);
        rect((canvasWidth/16)+45+5, (canvasHeight/8)+90+200-this.fuel-5, 10, this.fuel);
        for(let i = 0; i < this.inv.length; i++){
            stroke(255, 255, 0);
            strokeWeight(5);
            fill(149, 108, 65);
            rect((i*90)+70, 432, 64, 64);
            if(this.inv[i] != 0){
                this.inv[i].render((i*90)+70, 432);
            }
        }
        pop()
    }
}