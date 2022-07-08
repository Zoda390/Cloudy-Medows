class Dialouge {
    constructor(phrase, replies = [], ){
        this.phrase = phrase;
        this.replies = replies;
    }

    render(name){
        push();
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth / 20, canvasHeight - 150, canvasWidth - (canvasWidth/10), 150);
        rect(canvasWidth / 20, canvasHeight - 150, (canvasWidth / 2) - (canvasWidth/10) + 20, 150);
        textFont(player_2);
        textSize(15);
        fill(89, 48, 5);
        stroke(0);
        strokeWeight(4);
        text(name, (canvasWidth / 20) + 10, canvasHeight - 140);
        text('Replies:', (canvasWidth / 2) - 10, canvasHeight - 140);
        textSize(13);
        strokeWeight(2);
        text(this.phrase, (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 10);
        for (let i = 0; i < this.replies.length; i++){
            if(current_reply == i){
                stroke(255);
                text('>' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
            }
            else{
                stroke(0);
                text('-' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
            }
        }
        pop();
    }
}