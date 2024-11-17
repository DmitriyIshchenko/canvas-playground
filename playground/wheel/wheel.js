const canvas = document.getElementById("wheel");
canvas.width = 300;
canvas.height = 300;

const ctx = canvas.getContext("2d");

const winnerEl = document.createElement("p");
document.body.append(winnerEl);

const COLORS = ["#EB5353", "#36AE7C", "#F9D923", "#187498"];

const LOTS = {
  lotA: 100,
  lotB: 50,
  lotC: 50,
  lotD: 30,
  lotE: 80,
  lotF: 150,
  lotG: 90,
  lotH: 30,
};

class Wheel {
  constructor() {
    this.settings = {
      centerX: 150,
      centerY: 150,
      radius: 140,
    };

    this.segments = this.createSegments(LOTS);
    this.frame = null;
    this.spinDuration = 5000;

    this.drawCursor();
  }

  drawCursor() {
    ctx.save();
    ctx.translate(this.settings.centerX, 0);

    // triangle
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(0, 30);
    ctx.lineTo(15, 0);

    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  createSegments(lots) {
    let startAngle = 0;
    const sum = Object.values(lots).reduce((acc, cur) => acc + cur, 0);

    return Object.entries(lots)
      .sort(() => Math.random() - 0.5)
      .map(([name, value], index) => {
        // fraction of the whole circle (2PI)
        const endAngle = startAngle + (2 * Math.PI * value) / sum;
        const angles = {
          startAngle,
          endAngle,
        };

        const segment = new Segment(
          name,
          { ...this.settings, color: COLORS[index % COLORS.length] },
          angles
        );

        segment.draw();
        startAngle = endAngle;

        return segment;
      });
  }

  detectCurrentSegment() {
    const cursorAngle = (3 * Math.PI) / 2; // top center

    const currentSegment = this.segments.find((segment) => {
      const normalizedStart =
        (segment.angles.startAngle + segment.rotation) % (Math.PI * 2);
      const normalizedEnd =
        (segment.angles.endAngle + segment.rotation) % (Math.PI * 2);

      return normalizedStart <= cursorAngle && normalizedEnd >= cursorAngle;
    });

    if (currentSegment) {
      winnerEl.textContent = currentSegment.name;
    }
  }

  startAnimation() {
    this.frame = window.requestAnimationFrame(this.startAnimation.bind(this));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.segments.forEach((segment) => segment.update());
    this.drawCursor();
    this.detectCurrentSegment();
  }

  stopAnimation() {
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = null;
    }
  }

  spin() {
    if (!this.frame) {
      this.startAnimation();
    }

    setTimeout(() => {
      this.stopAnimation();
    }, this.spinDuration);
  }
}

class Segment {
  constructor(name, settings, angles) {
    this.name = name;
    this.settings = settings;
    this.angles = angles;

    this.rotation = 0;
  }

  draw() {
    const { centerX, centerY, radius, color } = this.settings;
    const { startAngle, endAngle } = this.angles;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.lineTo(0, 0);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    this.drawText();
  }

  drawText() {
    const { centerX, centerY } = this.settings;
    const { startAngle, endAngle } = this.angles;

    ctx.save();

    ctx.translate(centerX, centerY);
    // middle of the segment
    ctx.rotate(startAngle + (endAngle - startAngle) / 2 + this.rotation);

    ctx.font = "16px serif";
    ctx.fillStyle = "black";
    ctx.fillText(this.name, 50, 7);

    ctx.restore();
  }

  update() {
    this.draw();

    // TODO: implement gradual slowing
    this.rotation += 0.1;
  }
}

////////////////////////

const wheel = new Wheel();

const button = document.createElement("button");
button.textContent = "spin";

document.body.append(button);

button.addEventListener("click", () => {
  wheel.spin();
});

/////////////////////////
