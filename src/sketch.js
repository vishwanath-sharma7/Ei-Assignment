let img;

function preload() {
  img = loadImage('../img/flashlight.svg')
}




function setup() {
  createCanvas(800, 600)
  angleMode(DEGREES)


}

function draw() {
  background(102)

  //shelf
  fill(1)
  rect(30, 30, 740, 200)

  //activity area
  rect(30, 275, 740, 300)

  //
  push()
  translate(100, 425)
  rotate(90)
  image(img, 0 - img.width / 2, 0 - img.width / 2)
  imageMode(CENTER)
  img.resize(100, 100)
  pop()

}