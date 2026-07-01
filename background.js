let branches = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");

  background(0, 0, 170);

  stroke(255);
  strokeWeight(1);

  for (let i = 0; i < 40; i++) {
    spawn(random(width), random(height));
  }
}

function draw() {
  noStroke();
  fill(0, 0, 170, 18);
  rect(0, 0, width, height);

  stroke(255);

  for (let i = branches.length - 1; i >= 0; i--) {
    let b = branches[i];

    let x2 = b.x + cos(b.dir) * b.step;
    let y2 = b.y + sin(b.dir) * b.step;

    line(b.x, b.y, x2, y2);

    b.x = x2;
    b.y = y2;
    b.life--;

    if (random() < 0.35) {
      b.dir += random([
        HALF_PI,
        -HALF_PI,
        PI / 4,
        -PI / 4,
        PI,
        0
      ]);
    }

    if (random() < 0.02 && branches.length < 120) {
      branches.push({
        x: b.x,
        y: b.y,
        dir: b.dir + random(-PI / 2, PI / 2),
        step: random(6, 16),
        life: random(20, 80)
      });
    }

    if (
      b.life < 0 ||
      b.x < -20 || b.x > width + 20 ||
      b.y < -20 || b.y > height + 20
    ) {
      branches.splice(i, 1);
    }
  }

  while (branches.length < 40) {
    spawn(random(width), random(height));
  }
}

function spawn(x, y) {
  branches.push({
    x,
    y,
    dir: random(TWO_PI),
    step: random(6, 16),
    life: random(30, 100)
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
