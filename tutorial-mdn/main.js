import "./style.css";

// page has to load before drawing
window.addEventListener("load", draw);

function draw() {
  // retrieve the canvas node
  const canvas = document.getElementById("tutorial");

  if (canvas.getContext) {
    // script needs to access the rendering context to draw something
    const ctx = canvas.getContext("2d");

    // drawOverlappingRects(ctx);
    // drawRectangularShape(ctx);
    // drawTriangle(ctx);
    // drawFace(ctx);
    // drawMirroredTriangles(ctx);
    drawArcs(ctx);
  } else {
    // unsupported canvas fallback
  }
}

// RECTANGULAR SHAPES
function drawOverlappingRects(ctx) {
  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);
}

function drawRectangularShape(ctx) {
  ctx.fillStyle = "rgb(0 0 0 )";

  // draw a large square
  ctx.fillRect(25, 25, 100, 100);
  // erase the middle
  ctx.clearRect(45, 45, 60, 60);
  // draw a small empty square inside
  ctx.strokeRect(50, 50, 50, 50);
}

// PATHS

function drawTriangle(ctx) {
  ctx.beginPath();

  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

function drawFace(ctx) {
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  ctx.stroke();
}

function drawMirroredTriangles(ctx) {
  // filled triangle
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // stroked triangle
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath(); // stroke doesn't close path automatically
  ctx.stroke();
}

function drawArcs(ctx) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      ctx.beginPath();
      const x = 25 + col * 50; // x coordinate
      const y = 25 + row * 50; // y coordinate
      const radius = 20; // arc radius
      const startAngle = 0; // circle starting point
      const endAngle = Math.PI + (Math.PI * col) / 2; // circle end point: pi, 3pi / 2, 2pi
      const counterclockwise = row % 2 !== 0; // counterclockwise for odd rows

      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

      // fill last 2 rows
      if (row > 1) ctx.fill();
      else ctx.stroke();
    }
  }
}
