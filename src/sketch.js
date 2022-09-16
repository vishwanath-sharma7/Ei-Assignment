let img;

function preload() {
  img = loadImage("../img/flashlight.svg");
}

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  over() {
    // Is mouse over object
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  pressed() {
    // Did I click on the rectangle?
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class Mirror extends Draggable {
  constructor(x, y, w, h, offsetX, offsetY) {
    super(x, y, w, h, offsetX, offsetY);
  }
  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

class Slab extends Draggable {
  constructor(x, y, w, h, offsetX, offsetY) {
    super(x, y, w, h, offsetX, offsetY);
  }

  show() {
    noFill();
    // Different fill based on state
    if (this.dragging) {
      stroke(50);
    } else if (this.rollover) {
      stroke(100);
    } else {
      stroke(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

// function Mirror() {
//   this.height = 80;
//   this.width = 20;
//   this.position = { x: 250, y: 90 };

//   this.draw = () => {
//     fill(255, 0, 0);
//     rect(this.position.x, this.position.y, this.width, this.height);
//   };
// }

// function Slab() {
//   this.height = 80;
//   this.width = 40;
//   this.position = { x: 400, y: 90 }

//   this.draw = () => {
//     noFill()
//     strokeWeight(5)
//     stroke(255, 0, 0)
//     rect(this.position.x, this.position.y, this.width, this.height)
//     // rect(width / 2, 390, 20, 80)
//   }
// }

let mirror;
let slab;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  // mirror = new Mirror();
  // slab = new Slab()

  mirror = new Mirror(200, 100, 40, 80);
  slab = new Slab(550, 100, 40, 80);
}

function draw() {
  background(102);
  noStroke();

  //shelf
  fill(1);
  rect(30, 30, 740, 200);

  //activity area
  rect(30, 275, 740, 300);

  // light
  strokeWeight(10);
  stroke(255, 255, 255, 200);
  line(155, 425, 390, 425);

  //torch
  push();
  translate(100, 425);
  rotate(90);
  image(img, 0 - img.width / 2, 0 - img.width / 2);
  imageMode(CENTER);
  img.resize(100, 100);
  pop();

  noStroke();

  // mirror area

  mirror.over();
  mirror.update();
  mirror.show();

  slab.over();
  slab.update();
  slab.show();

  //dummy mirror
  // fill(255, 0, 0)
  // rect(width / 2, 390, 20, 80)

  // mirror.draw();
  // slab.draw();
}

function mousePressed() {
  mirror.pressed();
  slab.pressed();
}

function mouseReleased() {
  mirror.released();
  slab.released();
}