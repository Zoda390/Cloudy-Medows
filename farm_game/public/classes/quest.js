class Quest {

    constructor(name,goals){
        this.name = name
        this.goals = []
        this.current_Goal = 0 
        this.description
        this.orgin
    }

    render(){
        for(i in goals){
            if(i.check){
                //draw with opacity 
                //move current goal
            }else{
                
            }
        }

    }

}





class Goal {
    
    constructor(name){
    
    }

}

class talkingGoal extends Goal{

    constructor(name,npc_tile){
        super(name)
        this.npc_tile = npc_tile
        
    }

    render(){

        if(player.looking() == this.npc_tile){
           check = true; 
        }
    }
}

class fundingGoal extends Goal{

    constructor(name,amount){
        super(name)
        this.amount = amount
        this.check = false
    }

    render(){
        if(player.coins == this.amount){
            check = true;
        }
        
    }
}

class LocationGoal extends Goal{

    constructor(name,level_number){
        super(name)
        this.level_number = level_number
        this.check = false
    }

    render(){
        if(player.level_number_x == this.level_number.x && player.level_number_y == this.level_number.y){
           check = true 
        }
        
    }
}

class SellGoal extends Goal{

    constructor(name,Item,amount,npc_tile){
        super(name)
        this.item = Item
        this.amount = amount
        this.npc_tile = npc_tile
        this.check = false
    }

    render(){
        if(this.amount == 0){
            check = true;
        }
        
    }
}






























