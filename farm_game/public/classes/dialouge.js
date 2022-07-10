class Dialouge {
    constructor(phrase, replies = [], hand_num){
        this.phrase = phrase;
        this.phrase2 = [];
        for(let i = 0; i < this.phrase.length; i++){
          this.phrase2[i] = this.phrase[i];
        }
        this.phrase = [];
        this.replies = replies;
        this.hand_num = hand_num;
        this.done = false;
    }

    async render(name, inv){
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
        if (this.done == false){
            for(let i = 0; i < this.phrase2.length; i++){
                this.phrase[i] = this.phrase2[i];
                text(this.phrase.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
                if (i == this.phrase2.length - 1){
                    this.done = true;
                    if(this.hand_num != -1 && inv[this.hand_num] != 0 && inv[this.hand_num].amount > 0){
                        addItem(item_name_to_num(inv[this.hand_num].name), inv[this.hand_num].amount);
                        inv[this.hand_num] = 0;
                    }
                }
                await sleep(2);
            }
        }
        else{
            text(this.phrase.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
        }
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