let beerImg;
let loremImg;

function preload(){
    loremImg = loadImage("./images/loremipsum.png")
  beerImg = loadImage("./images/beer.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 249, 191);


  // Green lines
  stroke(164, 255, 145);
  strokeWeight(3);
  for (let y = 0; y <= height; y += 90) {
    for (let x = 0; x <= width; x += 100) {
      line(x + 180, y + 0, x + 0, y + 0);
    }
  }

 
  for (let y = 0; y <= height; y += 90) {
    for (let x = 0; x <= width; x += 100) {
      line(x + 60, y + 85, x + 150, y + 3);
    }
  }

  // Dot grid
  stroke(255, 191, 251);
  strokeWeight(0.5);
  fill(255, 183, 173);
  for (let y = 0; y <= height; y += 20) {
    for (let x = 0; x <= width; x += 20) {
      ellipse(x, y, 5, 5);
    }
  }
  // Beer image pattern
  for (let y = 0; y <= height; y += 200) {
    for (let x = 0; x <= width; x += 100) {
      image(beerImg, x, y, 180, 170);
    }
  }
image(loremImg, mouseX - loremImg.width / 2, mouseY - loremImg.height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
