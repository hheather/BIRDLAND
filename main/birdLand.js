let flocks = [];
let mountainRange;
let sunriseBg;
let clouds;
let sun;
let colorGen;
let triadic;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Randomise base color
  colorGen = new ColorGenerator();

  // SET UP FLOCKS
  let flockCount = floor(random(2, 8));
  for (let i = 0; i < flockCount; i++) {
    let myFlock = new Flock();
    flocks.push(myFlock);
  }
  // Sort flocks by y axis, for easier display later
  flocks.sort((a, b) => a.y - b.y);

  // SET UP MOUNTAIN RANGE
  let mountainCount = floor(random(4, 9));
  let shades = colorGen.getShades(mountainCount);
  mountainRange = new MountainRange(
    random(height * (1 / 3), height * (2 / 3)),
    mountainCount,
    shades
  );

  // SET UP SKY
  triadic = colorGen.getTriadic();
  sunriseBg = new SunriseBackground(triadic[0], triadic[1], triadic[2]);

  // SET UP CLOUDS
  // Use lightest shade for initial cloud colour
  clouds = new Clouds(shades[0]);

  // SET UP SUN
  sun = new Sun(width / 2, triadic[2]);
}

function draw() {
  // DRAW SKY
  let tallestMountain = mountainRange.mountains[0].yPointMax;
  // Sunrise needs to be aware of sun position and tip of tallest mountain
  sunriseBg.display(sun.yPos, tallestMountain);

  if (sun.yPos < tallestMountain) {
    // When sun rises above mountains, change cloud colour
    clouds.display(triadic[2]);
  } else {
    clouds.display();
  }
  sun.display();

  // DRAW MOUNTAINS
  for (let i = 0; i < mountainRange.mountains.length; i++) {
    let mountain = mountainRange.mountains[i];
    let mountainYMax = mountain.yPointMax;
    let mountainYMin = mountain.yPointMin;

    // For layering of flocks and mountains
    // If a flock is within the mountain range bounds, display
    for (let j = 0; j < flocks.length; j++) {
      let flock = flocks[j];
      flockHeight = flock.y;
      if (flockHeight > mountainYMax && flockHeight < mountainYMin) {
        flock.update();
        flock.display();
        flock.displayed = true;
      }
    }
    mountain.display();
  }

  // DRAW FLOCKS
  for (let i = 0; i < flocks.length; i++) {
    let flock = flocks[i];
    if (!flock.displayed) {
      flock.update();
      flock.display();
    }
  }
}
