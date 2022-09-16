let img;

function preload() {
  img = loadImage('../img/flashlight.svg')
}


function Mirror() {
  this.height = 80;
  this.width = 20;
  this.position = { x: 250, y: 90 }

  this.draw = () => {
    fill(255, 0, 0)
    rect(this.position.x, this.position.y, this.width, this.height)
    // rect(width / 2, 390, 20, 80)
  }
}

function Slab() {
  this.height = 80;
  this.width = 40;
  this.position = { x: 400, y: 90 }

  this.draw = () => {
    noFill()
    strokeWeight(5)
    stroke(255, 0, 0)
    rect(this.position.x, this.position.y, this.width, this.height)
    // rect(width / 2, 390, 20, 80)
  }
}


let mirror;
let slab;


function setup() {
  createCanvas(800, 600)
  angleMode(DEGREES)
  mirror = new Mirror()
  slab = new Slab()

}


function draw() {
  background(102)
  noStroke()

  //shelf
  fill(1)
  rect(30, 30, 740, 200)

  //activity area
  rect(30, 275, 740, 300)

  // light
  strokeWeight(10);
  stroke(255, 255, 255, 200)
  line(155, 425, 390, 425)

  //torch
  push()
  translate(100, 425)
  rotate(90)
  image(img, 0 - img.width / 2, 0 - img.width / 2)
  imageMode(CENTER)
  img.resize(100, 100)
  pop()

  noStroke()
  //dummy mirror
  // fill(255, 0, 0)
  // rect(width / 2, 390, 20, 80)

  mirror.draw()
  slab.draw()

}
