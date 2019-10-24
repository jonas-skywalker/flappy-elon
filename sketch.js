
var bird;
var pipes = [];
let elon;
let pipe_picture;
let lit;
let score = 0;
let end = false;

function preload() {
  elon = loadImage('elon.png');
  pipe_picture = loadImage('joint.jpeg');
  lit = loadImage('elonlit.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(255);
  console.log(score);

  if (pipes.length > 0) {
    if (pipes[0].x == bird.x) {
      score++;
    }
  }

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      bird.x = height/2;
      bird.y = width/2;
      pipes = [];
      end = true;
      noLoop();
      break;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  bird.update();
  bird.show();
  textSize(100);
  fill(0);
  text("Score: " + str(score), 100, 100);
  push();
  imageMode(CENTER);
  image(elon, bird.x, bird.y, 100, 100);
  pop();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }

  if (end) {
    image(lit, 0, 0, width, height);
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

function mousePressed() {
  bird.up();
}
