let col1;
let col2;
let img;
let img2;

function preload() {
  img = loadImage("./images/self.jpg");
  img2 =loadImage("./images/food.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  col1 = new Riso("cornflower"); // create pink layer
  col2 = new Riso("black"); // create sunflower layer
}

function draw() {
  background(255);
  clearRiso();

  let halftoned1 = halftoneImage(img, "cross", 9, 45, 77);
  // LINE SQUARE CIRCLE ELLIPSE CROSS
  // line dots, frequency 3, angle 45, intensity 90.
  col1.image(halftoned1, 0, 0); // draw halftoned image

  let halftoned2 = halftoneImage(img2, "square", 6, 0, 100);
  col2.image(halftoned2, 0, 0); // draw halftoned image

  drawRiso();
}