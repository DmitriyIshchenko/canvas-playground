const canvas = document.getElementById("wheel");
canvas.width = 300;
canvas.height = 300;

const ctx = canvas.getContext("2d");

const WHEEL = {
  centerX: 150,
  centerY: 150,
  radius: 140,
};

const LOTS = {
  lotA: 100,
  lotB: 50,
  lotC: 50,
  lotD: 30,
};

class Segment {
  constructor(name, startAngle, endAngle) {
    this.name = name;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.rotation = 0;
  }

  draw() {
    const { centerX, centerY, radius } = WHEEL;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, this.startAngle, this.endAngle);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.restore();

    this.drawText();
  }

  drawText() {
    const { centerX, centerY } = WHEEL;

    ctx.save();

    ctx.translate(centerX, centerY);
    // middle of the segment
    ctx.rotate(this.startAngle + (this.endAngle - this.startAngle) / 2);

    ctx.font = "16px serif";
    ctx.fillStyle = "black";
    ctx.fillText(this.name, 50, 7);

    ctx.restore();
  }

  update() {
    this.draw();

    // this.rotation += 0.01;

    // this.startAngle += 0.01;
    // this.endAngle += 0.01;
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  segments.forEach((segment) => segment.update());
}

const segments = [];
function generateSegments() {
  let startAngle = 0;
  const sum = Object.values(LOTS).reduce((acc, cur) => acc + cur, 0);

  Object.entries(LOTS).forEach(([name, value]) => {
    const endAngle = startAngle + (2 * Math.PI * value) / sum;
    segments.push(new Segment(name, startAngle, endAngle));
    startAngle = endAngle;
  });
}

generateSegments();

animate();
