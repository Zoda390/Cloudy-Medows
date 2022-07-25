class Tile {
    constructor(name, png, x, y, border, collide, age) {
        this.name = name;
        this.png = png;
        this.pos = createVector(x, y);
        this.border = border;
        this.collide = collide;
        this.age = age;
        this.variant = round(random(0, all_imgs[this.png].length-1));
        this.class = "Tile";
    }

    render() {
        push()
        imageMode(CENTER);
        if (this.name == 'bed' || this.name == 'lamppost' || this.name == 'compost_bucket' || this.name == 'cart_s' || this.name == "bush" || this.name == 'Veggie_Press') {
            image(all_imgs[0][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //concrete under
        }
        if (this.name == 'sprinkler' || this.name == 'Flower_Done'){
            image(all_imgs[1][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //grass under
        }
        if (this.name == 'junk') {
            image(all_imgs[2][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //plot under
        }
        if (this.name == 'compost_tile') {
            image(all_imgs[3][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //dirt under
        }
        if (this.name == 'hori_fence' || this.name == 'vert_fence' || this.name == 'top_right_corner_fence') {
            image(all_imgs[94][0], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2)); //park grass under
        }
        image(all_imgs[this.png][this.variant], this.pos.x + (tileSize / 2), this.pos.y + (tileSize / 2));
        pop()
    }

    getReadyForSave(){
        if(this.touching != null && this.touching != undefined){
            this.touching = 0;
        }
    }

    load(obj){
        this.age = obj.age;
        this.variant = obj.variant;
    }
};