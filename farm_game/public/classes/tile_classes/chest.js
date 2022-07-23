class Chest extends Entity{
    constructor(name, png, x, y, inv, under_tile_num){
        super(name, png, x, y, -1, inv, 0, under_tile_num);
        this.inv = [[this.inv[0], this.inv[1], this.inv[2], this.inv[3]], [this.inv[4], this.inv[5], this.inv[6], this.inv[7]], [this.inv[8], this.inv[9], this.inv[10], this.inv[11]]];
        this.class = 'Chest';
    }

    chest_render(){
        push()
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2);
        textFont(player_2);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(this.name, (canvasWidth / 4) + 10, (canvasHeight/4) + 10);
        textSize(13);
        strokeWeight(2);
        text( String.fromCharCode(eat_button) + ' to leave', ((2*canvasWidth) / 4) + 45, (canvasHeight/4) + 10);
        stroke(255, 255, 0);
        strokeWeight(5);
        fill(149, 108, 65);
        for(let i = 0; i < this.inv.length; i++){
            for(let j = 0; j < this.inv[i].length; j++){
                rect((canvasWidth/4)+10+(j*90), (canvasHeight/4)+40+(i*90), 74, 74)
                if(this.inv[i][j] != 0){
                    this.inv[i][j].render((j * 90)+(canvasWidth/4)+15, (i * 90)+(canvasWidth/4)+10);
                }
            }
        }
        pop()
    }
}