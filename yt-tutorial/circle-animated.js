import "./style.css";

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const mouse = {
  x: null,
  y: null,
};

const MAX_RADIUS = 40;

const COLORS = ["#5C4B51", "#8CBEB2", "#F2EBBF", "#F3B562", "#F06060"];

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

// CIRCLE

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    // switch direction
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx *= -1;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy *= -1;

    // update coords
    this.x += this.dx;
    this.y += this.dy;

    // grow/shrink
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      this.radius = this.radius < MAX_RADIUS ? this.radius + 1 : this.radius;
    } else {
      this.radius =
        this.radius > this.minRadius ? this.radius - 1 : this.radius;
    }

    this.draw();
  }
}

function animate() {
  requestAnimationFrame(animate); // creates a loop
  c.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas for each frame

  circles.forEach((circle) => circle.update());
}

const circles = [];
function init() {
  circles.length = 0; // reset circles
  for (let i = 0; i < 300; i++) {
    const radius = Math.random() * 3 + 1;
    // prevent from sticking to the edges
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;

    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;

    circles.push(new Circle(x, y, dx, dy, radius));
  }
}

init();
animate();
