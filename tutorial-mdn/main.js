import "./style.css";

// page has to load before drawing
window.addEventListener("load", draw);

function draw() {
  // retrieve the canvas node
  const canvas = document.getElementById("tutorial");

  if (canvas.getContext) {
    // script needs to access the rendering context to draw something
    const ctx = canvas.getContext("2d");

    drawOverlappingRects(ctx);
    drawRectangularShape(ctx);
  } else {
    // unsupported canvas fallback
  }
}

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
