class Clouds{
    constructor(colour){
        this.colour = colour;
        this.xScale = 0.005;
        this.yScale = 0.07;
        this.gap = 2.5;
        this.offset = 0;
    }

    display(colour=this.colour){
        fill(colour);
        for (let x = this.gap/2; x < width; x += this.gap) {
            for (let y = this.gap/2; y < height; y += this.gap) {
                let noiseValue = noise(x * this.xScale, y * this.yScale);
                let diameter = noiseValue * this.gap;
                circle(x + this.offset, y, diameter);
            }
        }
        this.offset += 0.09;
        // To stop display drifting away from x=0 too much
        if (this.offset > 3){
            this.offset = 0
        }
    }
}
