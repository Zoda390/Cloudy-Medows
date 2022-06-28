
class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}

class Circle {
    constructor() {
        this.size = random(50, 100)
        this.xOfset = random(-this.size / 2, this.size / 2)
        this.yOfset = random(-this.size / 2, this.size / 2)
        this.color = random(200, 255);
    }

    update(vel) {
        this.pos.x += vel.x;
    }

    render(cloudPos) {
        noStroke();
        fill(this.color)
        circle(cloudPos.x + this.xOfset, cloudPos.y + this.yOfset, this.size)
    }
}