// Inspired by: https://editor.p5js.org/pippinbarr/sketches/B09AFYsGQ

class Sun {
  constructor(xPos, colour) {
    this.xPos = xPos;
    this.colour = colour;
    this.strokeWeight = (0.5, 1);
    this.tRays = 0;
    this.sunRays = 100;
    this.yPos = height;
  }

  display() {
    push();
    translate(this.xPos, this.yPos);
    stroke(this.colour, 10);
    strokeWeight(this.strokeWeight);
    fill(this.colour);
    let ellipseSize = map(this.yPos, height, 0, 0, 100);
    ellipse(0, 0, ellipseSize);

    for (let sunRay = 0; sunRay < this.sunRays; sunRay++) {
      rotate(TWO_PI / this.sunRays);
      let t = this.tRays + sunRay * 1000;
      let baseLength = map(noise(t), 0, 1, 50, 100);
      let lengthMultiplier = map(this.yPos, 0, height, 2, 5); // Inverse relationship
      let length = baseLength * lengthMultiplier;
      line(0, 0, length, 0);
    }

    this.tRays += 0.3;

    this.yPos -= 15;
    // Reset sunYPos when goes off-screen
    if (this.yPos < 0) {
      this.yPos = height;
    }
    pop();
  }
}
