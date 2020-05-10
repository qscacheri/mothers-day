
let particles = []
function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
    clear()
    drawConfetti()
}

function drawConfetti() {
    textSize(height / 5);
    fill(255);
    text("YOU WON", width / 2, height / 5);

    if (particles.length < 150)
        particles.push(new Particle(random(width), random(-50, 0), this));

    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();

        //disgard particles that are off screen
        if (particles[i].isDone()) {
            particles.splice(i, 1);
            i--;
        }
    }
}

class Particle {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.color = color(random(100, 255), random(100, 255), random(100, 255));
        this.ySpeed = random(-2, 2);
        this.size = random(5, 25);

        //pick random starting point on curve
        this.noiseOffsetX = random(0, 1000);
        noiseDetail(24);
    }

    //disgard particles that go off screen
    isDone() {
        if (this.x < 0 || this.x > width)
            return true;
        else if (this.y > height)
            return true;
        return false;
    }

    draw() {
        var xMovement = map(noise(this.noiseOffsetX), 0, 1, -2, 2);
        this.x += xMovement;
        this.y += 5;
        this.noiseOffsetX += 0.01;

        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }
}
