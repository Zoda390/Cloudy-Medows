class Quest {

    constructor(name, goals, days, reward_item, reward_coins){
        this.name = name;
        this.days = days;
        this.reward_item = new_item_from_num(reward_item.num, reward_item.amount);
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
                if(this.goals.class == 'TalkingGoal'){
                    this.goals[i] = new TalkingGoal() //add random parameters
                }
                else if (this.goals.class == 'FundingGoal'){
                    this.goals[i] = new FundingGoal() //add random parameters
                }
                else if (this.goals.class == 'LocationGoal'){
                    this.goals[i] = new LocationGoal() //add random parameters
                }
                else if (this.goals.class == 'SellGoal'){
                    this.goals[i] = new SellGoal() //add random parameters
                }
                else if (this.goals.class == 'HaveGoal'){
                    this.goals[i] = new HaveGoal() //add random parameters
                }
            }
        }
    }

    render(){
        
    }

}





class Goal {
    constructor(name){
        this.name = name;
        this.done = false;
    }

    render(x, y){
        push()
        fill(255)
        stroke(0)
        strokeWeight(3);
        textFont(player_2);
        textSize(10)
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
        if(player.looking() != undefined && player.looking().name == this.npc_name){
            if(this.item_name != 0){
                for(let i = 0; i < player.inv.length; i++){
                    if(player.inv[i].name == this.item_name && player.inv[i].amount >= this.amount){
                        this.done = true;
                    }
                }
            }
        }
    }
}

class FundingGoal extends Goal{  //Get _(amount) coins, take those coins

    constructor(amount){
        super('Get ' + amount + ' coins')
        this.amount = amount;
    }

    update(){
        if(player.coins == this.amount){
            this.done = true;
            player.coins -= this.amount;
        }
    }
}

class LocationGoal extends Goal{ // Go to _(level_name)

    constructor(level_name){
        super('Go to ' + level_name)
        this.level_name = level_name
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
        this.amount = amount
    }

    update(){
        if(this.amount == 0){
            this.done = true;
        }
    }
}

class HaveGoal extends Goal{ // Have _(amount) of _(item_name)
    constructor(item_name, amount){
        super('Have ' + amount + ' of ' + item_name);
        this.item_name = item_name;
        this.amount = amount;
    }

    update(){
        for(let i = 0; i < player.inv.length; i++){
            if(player.inv[i].name == this.item_name && player.inv[i].amount >= this.amount){
                this.done = true;
            }
        }
    }
}






























