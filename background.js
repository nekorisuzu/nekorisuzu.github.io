let branches = [];

function setup() {
  let c = createCanvas(windowWidth, windowHeight);

  // 关键：把 canvas 变成网页背景层
  c.style('position', 'fixed');
  c.style('top', '0');
  c.style('left', '0');
  c.style('z-index', '-1');
  c.style('pointer-events', 'none');

  // 关键：透明背景
  clear();

  stroke(0);

  for (let i = 0; i < 40; i++) {
    spawn(random(width), random(height));
  }
}

function draw() {
  // 关键：每帧透明清除，而不是白色覆盖
  clear();

  stroke(0);

  for (let i = branches.length - 1; i >= 0; i--) {

    let b = branches[i];

    let x2 = b.x + cos(b.dir) * b.step;
    let y2 = b.y + sin(b.dir) * b.step;

    line(b.x, b.y, x2, y2);

    b.x = x2;
    b.y = y2;
    b.life--;

    // 随机转向
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

    // 分裂
    if (random() < 0.02 && branches.length < 120) {
      branches.push({
        x: b.x,
        y: b.y,
        dir: b.dir + random(-PI / 2, PI / 2),
        step: random(6, 16),
        life: random(20, 80)
      });
    }

    // 删除
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
    x: x,
    y: y,
    dir: random(TWO_PI),
    step: random(6, 16),
    life: random(30, 100)
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
}
