class Cloud {
    constructor() {
        this.pos = createVector(random(0, canvasWidth), random(0, canvasHeight))
        this.vel = createVector(random(-3, 3), 0)
        this.circleCount = random(3, 20)
        this.circles = []
        for (let i = 0; i < this.circleCount; i++) {
            this.circles[i] = new Circle()
        }
    }

    update(vel) {
        this.pos.x += this.vel.x
        if (this.pos.x > canvasWidth + 210) {
            this.vel.x = random(-3, 3)
            this.pos.x = -200;
        }
        if (this.pos.x < -210) {
            this.vel.x = random(-3, 3)
            this.pos.x = canvasWidth + 200
        }
    }

    render() {
        push()
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].render(this.pos)
        }
        pop()
    }
}