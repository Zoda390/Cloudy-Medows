class Quest {

    constructor(name, goals, days, reward_item, reward_coins){
        this.name = name;
        this.done = false;
        this.failed = false;
        this.days = days;
        this.maxDays = this.days;
        this.og_name = this.name;
        if(this.maxDays > 0){
            this.name = this.og_name + ' ' + this.days + ' days left';
        }
        if(reward_item == 0){
            this.reward_item = 0;
        }
        else{
            this.reward_item = new_item_from_num(reward_item.num, reward_item.amount);
        }
        this.reward_coins = reward_coins;
        this.current_Goal = 0;
        this.goals = goals;
        for(let i = 0; i < this.goals.length; i++){
            if (this.goals[i] == 0){
                let rand = ceil(random(0, 4))
                if(rand == 0){
                    this.goals[i] = new TalkingGoal() //add random parameters
                }
                else if (rand == 1){
                    this.goals[i] = new fundingGoal() //add random parameters
                }
                else if (rand == 2){
                    this.goals[i] = new LocationGoal() //add random parameters
                }
                else if (rand == 3){
                    this.goals[i] = new SellGoal() //add random parameters
                }
                else if (rand == 4){
                    this.goals[i] = new HaveGoal() //add random parameters
                }
            }
            else{
                if(this.goals[i].class == 'TalkingGoal'){
                    this.goals[i] = new TalkingGoal(this.goals[i].npc_name, this.goals[i].item_name, this.goals[i].amount)
                }
                else if (this.goals[i].class == 'FundingGoal'){
                    this.goals[i] = new FundingGoal(this.goals[i].amount)
                }
                else if (this.goals[i].class == 'LocationGoal'){
                    this.goals[i] = new LocationGoal(this.goals[i].level_name)
                }
                else if (this.goals[i].class == 'SellGoal'){
                    this.goals[i] = new SellGoal(this.goals[i].item_name, this.goals[i].amount)
                }
                else if (this.goals[i].class == 'HaveGoal'){
                    this.goals[i] = new HaveGoal(this.goals[i].item_name, this.goals[i].amount)
                }
                else if (this.goals[i].class == 'OneTileCheck'){
                    this.goals[i] = new OneTileCheck(this.goals[i].tile_name, this.goals[i].x, this.goals[i].y, this.goals[i].level_name)
                }
            }
        }
    }
    load(obj){
        this.done = obj.done;
        this.failed = obj.failed;
        this.days = obj.days;
        this.maxDays = obj.maxDays;
        this.current_Goal = obj.current_Goal;
    }
    render(x, y, strokeC, width){
        push()
        if(strokeC == 'yellow'){
            stroke(255, 255, 0);
        }else{
            stroke(139, 98, 55);
        }
        strokeWeight(5);
        fill(187, 132, 75);
        if(width > 0){
            rect(x, y, width, 60);
        }
        else{
            if(this.goals[this.current_Goal] != undefined){
                rect(x, y, max((this.name.length*17), (this.goals[this.current_Goal].name.length*12)), 60);
            }
            else{
                rect(x, y, (this.name.length*17), 60);
            }
        }
        textFont(player_2);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER);
        text(this.name, x+((this.name.length*17)/2), y+(60/4));
        if(this.failed){
            fill(255, 0, 0);
            text('Failed', x+max(((this.name.length*17)/2), (('Failed'.length*17)/2)), y+((3*60)/4)-3);
            fill(255)
            noStroke()
            rect(x+5, y+((3*60)/4)+7, (width > 0 ? width:max((this.name.length*17), ('Failed'.length*12)))-10, 5);
            fill(255, 0, 0);
            rect(x+5, y+((3*60)/4)+7, (this.current_Goal)*(((width > 0 ? width:max((this.name.length*17), ('Failed'.length*12)))-10)/this.goals.length), 5)
            fill(0);
            for(let i = 0; i < this.goals.length; i++){
                rect(x+5+((i+1)*((width > 0 ? width:max((this.name.length*17), ('Failed'.length*12)))-10)/this.goals.length), y+((3*60)/4)+6, 3, 8)
            }
        }
        else if(this.goals[this.current_Goal] != undefined){
            this.goals[this.current_Goal].render(x+(this.goals[this.current_Goal].name.length*12)/2, y+((3*60)/4)-3)
            fill(255)
            noStroke()
            rect(x+5, y+((3*60)/4)+7, (width > 0 ? width:max((this.name.length*17), (this.goals[this.current_Goal].name.length*12)))-10, 5)
            fill(255, 255, 0);
            rect(x+5, y+((3*60)/4)+7, (this.current_Goal)*(((width > 0 ? width:max((this.name.length*17), (this.goals[this.current_Goal].name.length*12)))-10)/this.goals.length), 5)
            fill(0);
            for(let i = 0; i < this.goals.length; i++){
                rect(x+5+((i+1)*((width > 0 ? width:max((this.name.length*17), (this.goals[this.current_Goal].name.length*12)))-10)/this.goals.length), y+((3*60)/4)+6, 3, 8)
            }
        }
        else{
            if(this.reward_item == 0 && this.reward_coins == 0){
                fill(0, 255, 0);
                text('Done', x+max(((this.name.length*17)/2), (('Done'.length*17)/2)), y+((3*60)/4)-3);
            }
            else{
                fill(255, 255, 0)
                if(this.reward_item != 0 && this.reward_coins != 0){
                    let maxX = max((this.name.length*17), ('Done'.length*17))
                    image(all_imgs[this.reward_item.png], x+((maxX)/3)-20, y+(60/2)-3, 20, 20);
                    let stringI = str(this.reward_item.amount);
                    text(this.reward_item.amount, x+((maxX)/3)+10+((stringI.length-1)*5), y+((3*60)/4)-7);
                    image(coin_img, x+((2*maxX)/3)-20, y+(60/2)-3, 20, 20);
                    let stringC = str(this.reward_coins);
                    text(this.reward_coins, x+((2*maxX)/3)+10+((stringC.length-1)*5), y+((3*60)/4)-7);
                }
                else if(this.reward_item != 0){
                    image(all_imgs[this.reward_item.png], x+(maxX/2)-20, y+(60/2)-3, 20, 20);
                    let stringI = str(this.reward_item.amount);
                    text(this.reward_item.amount, x+(maxX/2)+10+((stringI.length-1)*5), y+((3*60)/4)-7);
                }
                else if(this.reward_coins != 0){
                    image(coin_img, x+(maxX/2)-20, y+(60/2)-3, 16, 16);
                    let stringC = str(this.reward_coins);
                    text(this.reward_coins, x+(maxX/2)+10+((stringC.length-1)*5), y+((3*60)/4)-7);
                }
            }
            fill(255)
            noStroke()
            rect(x+5, y+((3*60)/4)+7, (width > 0 ? width:max((this.name.length*17), ('Done'.length*12)))-10, 5)
            fill(0, 255, 0);
            rect(x+5, y+((3*60)/4)+7, (this.current_Goal)*(((width > 0 ? width:max((this.name.length*17), ('Done'.length*12)))-10)/this.goals.length), 5)
            fill(0);
            for(let i = 0; i < this.goals.length; i++){
                rect(x+5+((i+1)*((width > 0 ? width:max((this.name.length*17), ('Done'.length*12)))-10)/this.goals.length), y+((3*60)/4)+6, 3, 8)
            }
        }
        pop()
        
    }

    daily_update(){
        if(this.maxDays > 0){
            this.days -= 1;
            if(this.days < 0){
                this.days = 0;
            }
            this.name = this.og_name + ' ' + this.days + ' days left';
            if(this.days <= 0 && !this.done){
                this.days = 0;
                this.failed = true;
            }
        }
    }
    update(){
        if(!this.failed){
            if(this.goals[this.current_Goal] != undefined){
                this.goals[this.current_Goal].update()
                if(this.goals[this.current_Goal].done){
                    this.current_Goal += 1;
                    if(this.current_Goal > this.goals.length-1 && !this.done){
                        this.done = true;
                        if(this.reward_item != 0){
                            if(checkForSpace(player, item_name_to_num(this.reward_item.name))){
                                addItem(player, item_name_to_num(this.reward_item.name), this.reward_item.amount)
                                this.reward_item = 0;
                                if(this.reward_coins > 0){
                                    player.coins += this.reward_coins;
                                    player.money_anim = 255;
                                    player.money_anim_amount += this.reward_coins;
                                    this.reward_coins = 0;
                                }
                            }
                        }
                        else{
                            if(this.reward_coins > 0){
                                player.coins += this.reward_coins;
                                player.money_anim = 255;
                                player.money_anim_amount += this.reward_coins;
                                this.reward_coins = 0;
                            }
                        }
                    }
                }
            }
        }
    }

}





class Goal {
    constructor(name){
        this.name = name;
        this.done = false;
    }

    render(x, y){
        push()
        textFont(player_2);
        textSize(11);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER, CENTER);
        text(this.name, x, y);
        pop()
    }

}

class TalkingGoal extends Goal{  // Talk to _(npc_name)  and Give _(amount) _(item_name) to _(npc_name)

    constructor(npc_name, item_name, amount){
        if(item_name != 0){
            super('Give ' + amount + ' ' + item_name + ' to ' + npc_name);
        }
        else{
            super('Talk to ' + npc_name);
        }
        this.npc_name = npc_name;
        this.item_name = item_name;
        this.amount = amount;
        this.class = 'TalkingGoal';
    }

    update(){
        if(player.looking(currentLevel_x, currentLevel_y) != undefined && player.talking.name === this.npc_name){
            if(this.item_name != 0){
                for(let i = 0; i < player.inv.length; i++){
                    if(!this.done && player.inv[i].name == this.item_name && player.inv[i].amount >= this.amount){
                        player.inv[i].amount -= this.amount;
                        if(player.inv[i].amount <= 0){
                            player.inv[i] = 0;
                        }
                        this.done = true;
                    }
                }
            }
            else if (!this.done){
                this.done = true;
            }
        }
    }
}

class FundingGoal extends Goal{  //Get _(amount) coins, take those coins

    constructor(amount){
        super('Get ' + amount + ' more coins')
        this.amount = amount;
        this.class = 'FundingGoal';
    }

    update(){
        if(player.coins >= this.amount){
            this.done = true;
            player.coins -= this.amount;
        }
        if(!this.done){
            this.name = 'Get ' + (this.amount-player.coins) + ' more coins';
        }
        else{
            this.name = 'Get ' + 0 + ' more coins';
        }
    }
}

class LocationGoal extends Goal{ // Go to _(level_name)

    constructor(level_name){
        super('Go to ' + level_name)
        this.level_name = level_name;
        this.class = 'LocationGoal';
    }

    update(){
        if(levels[currentLevel_y][currentLevel_x].name == this.level_name){
            this.done = true ;
        }
    }
}

class SellGoal extends Goal{ // Sell _(amount) more of _(item)

    constructor(item_name, amount){
        super('Sell ' + amount + ' more of ' + item_name)
        this.item_name = item_name;
        this.amount = amount;
        this.class = 'SellGoal';
    }

    update(){
        if(this.amount == 0){
            this.done = true;
        }
        if(!this.done){
            this.name = 'Sell ' + this.amount + ' more of ' + this.item_name;
        }
        else{
            this.name = 'Sell ' + 0 + ' more of ' + this.item_name;
        }
    }
}

class HaveGoal extends Goal{ // Have _(amount) of _(item_name)
    constructor(item_name, amount){
        super('Have ' + amount + ' of ' + item_name);
        this.item_name = item_name;
        this.amount = amount;
        this.class = 'HaveGoal';
    }

    update(){
        for(let i = 0; i < player.inv.length; i++){
            if(player.inv[i].name == this.item_name && player.inv[i].amount >= this.amount){
                this.done = true;
            }
        }
    }
}

class OneTileCheck extends Goal{
    constructor(tile_name, x, y, level_name){
        super('Make x:' + x + ' y:' + y + ' into ' + tile_name + ' at ' + level_name);
        this.level_name = level_name;
        this.tile_name = tile_name;
        this.x = x;
        this.y = y;
        this.class = 'OneTileCheck';
    }

    update(){
        for(let i = 0; i < levels.length; i++){
            for(let j = 0; j < levels[i].length; j++){
                if(this.level_name == levels[i][j].name){
                    if(levels[i][j].map[this.y][this.x].name == this.tile_name){
                        this.done = true;
                    }
                }
            }
        }
    }
}






























