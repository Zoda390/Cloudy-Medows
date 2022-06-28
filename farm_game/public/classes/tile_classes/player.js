class Player extends MoveableEntity {
    constructor(name, png, x, y, inv = []) {
        super(name, png, x, y, inv, 0, 0, 3);
        this.quests = [];
        this.current_quest = 0;
        this.hunger = maxHunger;
        this.hunger_timer = 100;
        this.hunger_counter = 0;
        this.lastFoodtype = 'corn';
        this.coins = 0;
        this.hp = 100;
        this.dead = false;
        this.deaths = 0;
        this.op = 255;
    }

    render() {
        if (this.hunger_counter >= 45) {
            this.hunger -= 1;
            this.hunger_counter = 0;
        }
        if (this.hp <= 0) {
            this.dead = true;
            currentLevel_y = 1;
            currentLevel_x = 1;
            this.pos.x = (6 * tileSize) - (tileSize / 2);
            this.pos.y = (6 * tileSize) - (tileSize / 2);
            this.hunger = 4;
            this.hp = 100;
            this.deaths += 1;
            this.dead = false;
            onDeathSound.play();
        }
        this.hunger_timer -= 1;
        if (this.hunger_timer <= 0) {
            this.hunger -= 1;
            this.hunger_timer = 100;
        }
        push();
        imageMode(CENTER);
        image(player_imgs[this.facing][this.anim], this.pos.x, this.pos.y);
        if (this.hunger <= 0 && millis() - lastHungerMili > 400) {
            hit_sound.play();
            this.hp -= 10;
            fill(255, 0, 0, 100);
            circle(this.pos.x, this.pos.y, tileSize);
            lastHungerMili = millis();
        }
        else if (this.hunger >= maxHunger && millis() - lastHungerMili > 600) {
            this.hp += 2;
            lastHungerMili = millis();
        }
        pop();
    }

    looking() {
        if ((touching.pos.y / tileSize == 0 && this.facing == 0) || (touching.pos.y / tileSize == 18 && this.facing == 2)) {
            return undefined;
        }
        switch (this.facing) {
            case 0:
                return levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) - 1][touching.pos.x / tileSize];
            case 1:
                return levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) + 1];
            case 2:
                return levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize) + 1][touching.pos.x / tileSize];
            case 3:
                return levels[currentLevel_y][currentLevel_x].map[(touching.pos.y / tileSize)][(touching.pos.x / tileSize) - 1];
            default:
                console.log("facing not understood");
        }
    }

}