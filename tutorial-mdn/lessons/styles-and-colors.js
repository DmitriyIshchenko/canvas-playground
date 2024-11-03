export function drawStyledShapes() {
  const ctx = document.getElementById("tutorial").getContext("2d");

  // drawGridPalette(ctx);
  // drawGridCircles(ctx);
  drawTransparentCircles(ctx);
}

// FILL STYLE EXAMPLE

function drawGridPalette(ctx) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * row)} ${Math.floor(
        255 - 42.5 * col
      )} 0)`;

      ctx.fillRect(col * 25, row * 25, 25, 25);
    }
  }
}

// STROKE STYLE EXAMPLE

function drawGridCircles(ctx) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * row)} ${Math.floor(
        255 - 42.5 * col
      )})`;

      ctx.beginPath();
      ctx.arc(12.5 + col * 25, 12.5 + row * 25, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// TRANSPARENCY

function drawTransparentCircles(ctx) {
  // draw background
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";

  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
