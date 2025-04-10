class Bird {
  constructor(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.xSpeed = random(0.3, 0.4);
    this.ySpeed = random(-0.2, 0.2);
    this.displayed = false;
  }

  fly() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }

  display() {
    triangle(this.x, this.y, this.x + 2, this.y - 2, this.x + 4, this.y);
  }
}

class Flock {
  constructor() {
    this.y = random(height);
    this.x = random(width);
    // How densely packed birds are
    this.density = random(10, 40);
    this.count = random(5, 20);
    this.colour = color(0);

    // Create an array of Bird objects
    this.birds = [];
    for (let i = 0; i < this.count; i++) {
      // Spread birds along X axis
      let birdX = this.x + random(this.density * 5);
      // Make birds denser on y axis
      let birdY = this.y + random(-this.density / 4, this.density / 4);
      this.birds.push(new Bird(birdX, birdY));
    }
  }

  update() {
    for (let i = 0; i < this.birds.length; i++) {
      let bird = this.birds[i];
      bird.fly();
    }
    this.checkBoundaries();
  }

  checkBoundaries() {
    for (let i = 0; i < this.birds.length; i++) {
      let bird = this.birds[i];
      // If bird goes off canvas, reverse speed
      if (bird.x < 0 || bird.x > width) {
        bird.xSpeed = -bird.xSpeed;
      }

      // Check bird is within y boundaries based on initialY and density
      if (bird.y < this.y - this.density || bird.y > this.y + this.density) {
        bird.ySpeed = -bird.ySpeed; // Reverse speed if out of bounds
      }
    }
  }

  display() {
    fill(this.colour);
    noStroke();

    for (let i = 0; i < this.birds.length; i++) {
      let bird = this.birds[i];
      bird.display();
    }
  }
}
