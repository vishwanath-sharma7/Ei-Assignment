
//initialise torch svg
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
    this.circle = {
      x: 0,
      y: 0,
      radius: 130
    }
  }

  over() {
    // Is mouse over object ?
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
    // Is rectangle being clicked?
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
    // Stop dragging
    this.dragging = false;
  }
}

class Mirror extends Draggable {

  constructor(x, y, w, h, rotation, offsetX, offsetY) {
    super(x, y, w, h, offsetX, offsetY);
    this.rotation = rotation;
  }

  show() {
    noStroke()
    push()
    translate(this.x + this.w / 2, this.y + this.h / 2)
    rotate(this.rotation)
    // draw mirror
    fill(255)
    noStroke()
    rect(-this.w / 2, -this.h / 2, this.w, this.h);
    pop()
  }
}


//Glass Slab
class Slab extends Draggable {
  constructor(x, y, w, h, rotation, offsetX, offsetY) {
    super(x, y, w, h, offsetX, offsetY);
    this.rotation = rotation;
  }

  show() {
    noFill();
    push()
    translate(this.x + this.w / 2, this.y + this.h / 2)
    rotate(slab.rotation)
    stroke(255)
    strokeWeight(10)
    //draw slab
    rect(-this.w / 2, -this.h / 2, this.w, this.h);
    pop()
  }
}


let mirror;
let slab;

//helpers
let slider1;
let slider2;


// Initialise 
function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);

  //new Mirror
  mirror = new Mirror(200, 100, 20, 100, 0);
  //new Slab
  slab = new Slab(550, 100, 40, 100, 0);


  //Rotation Control Sliders
  createSlider(0, 1, [20], [50])
  slider1 = createSlider(-45, 45, 0, 0);
  slider1.position(width / 1.1, 110);
  slider1.style('width', '80px');

  createSlider(-45, 45, [20], [5])
  slider2 = createSlider(-30, 30, 0, 0);
  slider2.position(width / 1.1, 150);
  slider2.style('width', '80px');
}



//Animation Loop
function draw() {

  //update rotation based on input from sliders
  let val1 = slider1.value();
  mirror.rotation = val1

  let val2 = slider2.value();
  slab.rotation = val2


  //set Background
  background(104);
  noStroke();

  //Shelf containing mirror and slab
  fill(1);
  rect(30, 30, 740, 200);



  //Activity area
  rect(30, 275, 740, 300);


  // light
  if (mirror.y < 380 && slab.y < 380) {
    strokeWeight(5);
    stroke(255, 255, 255);
    line(155, 425, 765, 425);
  } else {
    strokeWeight(5);
    stroke(255, 255, 255, 200);
    line(155, 425, 380, 425);


    //check for mirror or slab
    if (mirror.y > 200) {
      push()
      translate(380, 425)
      if (mirror.y === 380) {
        rotate(mirror.rotation * 2)
        stroke(255, 255, 255, 200)
        line(0, 0, -400, 0)
      }
      pop()
    } else if (slab.y === 380) {
      push()
      translate(380, 425)
      if (slab.y === 380) {
        //angle of refraction
        rotate(asin(sin(slab.rotation / 1.6)) - 180)
        console.log(asin(sin(slab.rotation / 1.6)))
        stroke(255, 255, 255, 200)
        line(0, 0, -(slab.w), 0)
      }
      pop()

      //update shape based on +ve rotation
      if (slab.rotation > 0) {
        const thickness = slab.w;
        const l = thickness * (sin(slab.rotation - asin(sin(slab.rotation / 1.6))) / cos(asin(sin(slab.rotation / 1.6))))
        push()
        translate(400, 425)
        if (l > 0) {
          fill(255, 0, 0)
          // ellipse(0, 0, 1)
          line(20, l + 3, 500, l + 3)
        }
        pop()
      }
      //update shape based on -ve rotation
      if (slab.rotation < 0) {
        const thickness = slab.w;
        const l = thickness * (sin(slab.rotation - asin(sin(slab.rotation / 1.6))) / cos(asin(sin(slab.rotation / 1.6))))


        push()
        translate(400, 425)
        if (l < 0) {
          fill(255, 0, 0)
          // ellipse(0, 0, 1)
          line(20, l - 5, 500, l - 3)
        }
        pop()
      }
    }
  }

  // if neither mirror nor slab are present
  if (slab.y > 300 && slab.rotation === 0) {
    strokeWeight(5);
    stroke(255, 255, 255, 200);
    line(155, 425, 765, 425);
  }



  //Torch
  push();
  img.resize(100, 100);
  translate(100, 425);
  rotate(90);
  image(img, 0 - img.width / 2, 0 - img.width / 2);
  imageMode(CENTER);
  pop();
  noStroke();

  // Mirror area
  mirror.over();
  mirror.update();
  mirror.show();

  slab.over();
  slab.update();
  slab.show();


}

//helper functions

function mousePressed() {
  mirror.pressed();
  slab.pressed();
}

function mouseReleased() {

  if (mirror.rollover) {

    if (slab.y === 380) {
      slab.x = 550;
      slab.y = 100;
    }
    if (mirror.y > 200) {
      mirror.x = 380;
      mirror.y = 380;
      mirror.draggable = false;
    } else {
      mirror.x = 200;
      mirror.y = 100;
    }
    mirror.released();
  }

  if (slab.rollover) {


    if (mirror.y === 380) {
      mirror.x = 200;
      mirror.y = 100;
    }

    if (slab.y > 200) {
      slab.x = 380;
      slab.y = 380;
      mirror.draggable = false;

    } else {
      slab.x = 550;
      slab.y = 100;
    }
    slab.released();
  }

}