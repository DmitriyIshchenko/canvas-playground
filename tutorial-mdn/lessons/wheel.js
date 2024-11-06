const LOTS = {
  a: 100,
  b: 25,
  c: 33,
  d: 35,
  e: 15,
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

    Object.values(LOTS).forEach((value) => {
      const endAngle = startAngle + (2 * Math.PI * value) / sum;
      drawSegment(ctx, startAngle, endAngle);
      startAngle = endAngle;
    });
  } else {
    // unsupported canvas fallback
  }
}

function drawSegment(ctx, startAngle, endAngle) {
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
}
