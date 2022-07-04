class Player extends MoveableEntity {
    constructor(name, png, x, y,
        inv = [{ num: 1, amount: 1 }, { num: 2, amount: 1 }, { num: 3, amount: 1 }, { num: 5, amount: 1 }, { num: 7, amount: 1 }, 0, 0, 0]) {
        super(name, png, x, y, inv, 0, 3);
        this.quests = [];
        this.current_quest = 0;
        this.hunger = maxHunger-1;
        this.hunger_timer = 100;
        this.hunger_counter = 0;
        this.lastFoodtype = 'corn';
        this.coins = 0;
        this.hp = 100;
        this.dead = false;
        this.deaths = 0;
        this.op = 255;
        this.touching = 0;
        this.lastmoveMili = 0;
        this.lasteatMili = 0;
        this.lastinteractMili = 0;
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
            this.pos.x = (5 * tileSize);
            this.pos.y = (5 * tileSize);
            this.hunger = 4;
            this.hp = 100;
            this.deaths += 1;
            this.dead = false;
            onDeathSound.play();
        }
        push();
        imageMode(CENTER);
        image(player_imgs[this.facing][this.anim], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
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

    

    move() {
        if (keyIsDown(move_right_button)) {
            if (millis() - this.lastmoveMili > 100) {
                this.facing = 1;
                if (this.pos.x + tileSize >= canvasWidth) {
                    currentLevel_x += 1;
                    this.pos.x = 0;
                }
                else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                    this.touching.collide = false;
                    this.pos.x += tileSize;
                    this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                    this.touching.collide = true;
                    this.hunger_counter += round(random(0, 1));
                    this.anim += 1;
                    if (this.anim > 1) {
                        this.anim = 0;
                    }
                }
                this.lastmoveMili = millis();
            }
        }
        if (keyIsDown(move_left_button)) {
            if (millis() - this.lastmoveMili > 100) {
                this.facing = 3;
                if (this.pos.x - tileSize <= 0) {
                    currentLevel_x -= 1;
                    this.pos.x = canvasWidth - tileSize;
                }
                else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                    this.touching.collide = false;
                    this.pos.x -= tileSize;
                    this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                    this.touching.collide = true;
                    this.hunger_counter += round(random(0, 1));
                    this.anim += 1;
                    if (this.anim > 1) {
                        this.anim = 0;
                    }
                }
                this.lastmoveMili = millis();
            }
        }
        if (keyIsDown(move_up_button)) {
            if (millis() - this.lastmoveMili > 100) {
                this.facing = 0;
                if (this.pos.y - tileSize <= 0) {
                    currentLevel_y -= 1;
                    this.pos.y = canvasHeight - tileSize;
                }
                else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                    this.touching.collide = false;
                    this.pos.y -= tileSize;
                    this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                    this.touching.collide = true;
                    this.hunger_counter += round(random(0, 1));
                    this.anim += 1;
                    if (this.anim > 1) {
                        this.anim = 0;
                    }
                }
                this.lastmoveMili = millis();
            }
        }
        if (keyIsDown(move_down_button)) {
            if (millis() - this.lastmoveMili > 100) {
                this.facing = 2;
                if (this.pos.y + tileSize >= canvasHeight) {
                    currentLevel_y += 1;
                    this.pos.y = 0;
                }
                else if (this.looking(currentLevel_x, currentLevel_y) != undefined && this.looking(currentLevel_x, currentLevel_y) != 0 && this.looking(currentLevel_x, currentLevel_y).collide != true) {
                    this.touching.collide = false;
                    this.pos.y += tileSize;
                    this.touching = this.tileTouching(currentLevel_x, currentLevel_y);
                    this.touching.collide = true;
                    this.hunger_counter += round(random(0, 1));;
                    this.anim += 1;
                    if (this.anim > 1) {
                        this.anim = 0;
                    }
                }
                this.lastmoveMili = millis();
            }

        }
    }

    eat() {
        if (millis() - this.lasteatMili > 100) {
            if (this.hunger < maxHunger) {  // player only eats when hungry
                if (this.inv[this.hand].class == 'Eat') {
                    this.hunger += this.inv[this.hand].hunger;
                    if (this.hunger > maxHunger) {
                        this.hunger = maxHunger;
                    }
                    this.inv[this.hand].amount -= 1;
                    this.hunger_counter = 0;
                    let seed_obj_num = this.inv[this.hand].seed_num;
                    if (this.inv[this.hand].amount == 0) {
                        this.inv[this.hand] = 0;
                    }
                    addItem(seed_obj_num, round(random(1, 2)));
                    
                }
            }
        }
        this.lasteatMili = millis();
    }

    interactCall() {
        
            if (millis() - this.lastinteractMili > 100) {
                this.onInteract();
                this.lastinteractMili = millis();
            }
        
    }
}