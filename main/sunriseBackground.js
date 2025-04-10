// Inspired by: https://editor.p5js.org/jeffThompson/sketches/ta7msUszJ

class SunriseBackground {
  constructor(darkCol, lightCol) {
    this.darkCol = darkCol;
    this.lightCol = lightCol;
    this.g;
  }

  display(sunPos, tallestMountain) {
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = height;
    this.g = drawingContext.createLinearGradient(x1, y1, x2, y2);

    let darkColStart = map(tallestMountain, 0, height, 0, 1);
    // Start dark colour above tallest mountain
    let lightColPos = map(sunPos, height, 0, 0, darkColStart);
    let darkColPos = map(sunPos, height, 0, darkColStart, 1);

    this.g.addColorStop(lightColPos, this.lightCol.toString());
    this.g.addColorStop(darkColPos, this.darkCol.toString());

    drawingContext.fillStyle = this.g;
    noStroke();
    rect(0, 0, width, height);
    drawingContext.fillStyle = "black";
  }
}
