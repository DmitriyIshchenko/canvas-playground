const LOTS = {
  aaaaaa: 200,
  bbb: 50,
  cccc: 50,
  dddd: 50,
  eeee: 50,
};

const WHEEL = {
  centerX: 150,
  centerY: 150,
  radius: 140,
};

export function drawWheel() {
  const canvas = document.getElementById("tutorial");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    let startAngle = 0;
    const sum = Object.values(LOTS).reduce((acc, cur) => acc + cur, 0);

    Object.entries(LOTS).forEach(([name, value]) => {
      const endAngle = startAngle + (2 * Math.PI * value) / sum;
      drawSegment(ctx, startAngle, endAngle, name);
      startAngle = endAngle;
    });
  } else {
    // unsupported canvas fallback
  }
}

function drawSegment(ctx, startAngle, endAngle, name) {
  const { centerX, centerY, radius } = WHEEL;
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  ctx.fillStyle = `#${randomColor}`;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineTo(centerX, centerY);

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.fillStyle = "black";
  ctx.translate(150, 150);
  ctx.rotate(startAngle + (endAngle - startAngle) / 2);
  ctx.font = "24px serif";
  ctx.fillText(name, 50, 6);

  ctx.restore();
}
