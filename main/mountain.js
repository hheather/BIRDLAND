class Mountain{
    constructor(yPointMin, yPointMax, strokeColour, smoothness){
        this.yPointMin = yPointMin;
        this.yPointMax = yPointMax;
        this.strokeColour = strokeColour;
        this.rockiness = random(.008, .1);
        this.smoothness = smoothness;
    }

    // Will always draw from bottom of canvas
    display(){
        stroke(this.strokeColour);
        strokeWeight(2);
        for (let x = 0; x < width; x++) {
            let noiseVal = noise(x * this.rockiness) * this.smoothness;
            let yPoint = map(noiseVal, 0, 1, this.yPointMin, this.yPointMax);
            line(x, height, x, yPoint);
        }
    }
}

class MountainRange{
    constructor(yTop, count, shades){
        this.yTop = yTop;
        this.count = count;
        this.shades = shades;
        this.mountains = [];

        let spacing = ((height - yTop) / count) * 0.3;
        let yPointMax = yTop;
        let yPointMin = yTop + spacing;
        
        for (let i=0; i < count; i++){
            let multiplier = i * 0.6;
            yPointMax = yPointMax + (spacing * multiplier);
            yPointMin = yPointMin + (spacing * multiplier);
            // Spacing increases as mountains get closer to bottom of page
            let mountainColour = this.shades[i]
            let smoothness = map(i, 0, count, .5, 2.5);
            let myMountain = new Mountain(
                yPointMin, yPointMax, mountainColour, smoothness
            );
            this.mountains.push(myMountain);
        }
    }

    display(){
        for (let i=0; i<this.mountains.length; i++) {
            let mountain = this.mountains[i];
            mountain.display();
        }
    }
    
}
