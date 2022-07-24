class Dialouge {
    constructor(phrase, replies = [], hand_num, amount, textSpeed){
        this.phrase = phrase;
        this.phrase2 = [];
        for(let i = 0; i < this.phrase.length; i++){
          this.phrase2[i] = this.phrase[i];
        }
        this.phrase = [];
        this.new_phrase = -1;
        this.replies = replies;
        this.new_replies = -1;
        this.hand_num = hand_num;
        this.amount = amount;
        this.textSpeed = textSpeed;
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
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(name, (canvasWidth / 20) + 10, canvasHeight - 140);
        text('Replies:', (canvasWidth / 2) - 10, canvasHeight - 140);
        textSize(13);
        strokeWeight(2);
        text(String.fromCharCode(eat_button) + ' to leave', ((3*canvasWidth) / 4) + 10, canvasHeight - 140);
        if (this.done == false){
            for(let i = 0; i < this.phrase2.length; i++){
                this.phrase[i] = this.phrase2[i];
                text(this.phrase.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
                if (i == this.phrase2.length - 1){
                    this.done = true;
                    if(this.hand_num != -1 && inv[this.hand_num] != 0 && inv[this.hand_num].amount > 0){
                        if (this.amount >= inv[this.hand_num].amount){
                            if(checkForSpace(player, item_name_to_num(inv[this.hand_num].name))){
                                addItem(player, item_name_to_num(inv[this.hand_num].name), inv[this.hand_num].amount);
                                inv[this.hand_num].amount = 0;
                                this.new_phrase = [];
                                let phrase = "Sorry I dont have any more " + inv[this.hand_num].name;
                                for(let i = 0; i < phrase.length; i++){
                                    this.new_phrase[i] = phrase[i];
                                }
                                this.new_replies = [];
                                this.new_replies[0] = {phrase: 'Oh ok', dialouge_num: -1};
                            }else{
                                // no space in inventory 
                            }
                        }
                        else {
                            if(checkForSpace(player, item_name_to_num(inv[this.hand_num].name))){
                                addItem(player, item_name_to_num(inv[this.hand_num].name), this.amount);
                                inv[this.hand_num].amount -= this.amount;
                            }
                        }
                    }
                }
                await sleep(this.textSpeed);
            }
        }
        else{
            text(this.phrase2.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
        }
        for (let i = 0; i < this.replies.length; i++){
            if(current_reply == i){
                stroke(255, 255, 0);
                if (this.replies[i].phrase == '1'){
                    text('>' + this.replies[i].phrase + ' ' + inv[this.hand_num].price, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else if (this.replies[i].phrase == '2'){
                    text('>' + this.replies[i].phrase + ' ' + (inv[this.hand_num].price*2), (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else{
                    text('>' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
            }
            else{
                stroke(0);
                if (this.replies[i].phrase == '1'){
                    text('-' + this.replies[i].phrase + ' ' + inv[this.hand_num].price, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else if (this.replies[i].phrase == '2'){
                    text('-' + this.replies[i].phrase + ' ' + (inv[this.hand_num].price*2), (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else{
                    text('-' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + (i*17), (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
            }
        }
        pop();
    }
}