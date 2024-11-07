export function drawTransformed() {
  const ctx = document.getElementById("tutorial").getContext("2d");

  // drawNestedRects(ctx);
  // drawTranslatedGrid(ctx);
  // drawRotated(ctx);
  drawScaled(ctx);
}

// SAVE-RESTORE EXAMPLE

function drawNestedRects(ctx) {
  ctx.fillRect(0, 0, 150, 150); // black square with default settings
  ctx.save(); // save the original default state

  ctx.fillStyle = "#09f"; // change settings
  ctx.fillRect(15, 15, 120, 120); // draw blue rect with new settings
  ctx.save(); // save current state

  ctx.fillStyle = "#fff"; // change settings again
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // draw semi transparent white square with new settings

  ctx.restore(); // restore to prev state (pop newest settings from stack)
  ctx.fillRect(45, 45, 60, 60);

  ctx.restore(); // pop another state from stack -> default black settings on top
  ctx.fillRect(60, 60, 30, 30); // draw a rect with restored black settings
}

// TRANSLATING

// translate() moves the whole canvas
function drawTranslatedGrid(ctx) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      ctx.save();

      ctx.fillStyle = `rgb(${51 * row} ${255 - 51 * row} 255)`; // generate new color for each grid
      ctx.translate(10 + col * 50, 10 + row * 50); // adjust drawing position
      ctx.fillRect(0, 0, 25, 25); // don't need to update rect coords

      ctx.restore();
    }
  }
}

// ROTATING

function drawRotated(ctx) {
  ctx.save();

  // blue rect
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25); // rotate 25 degrees

  // grey rect
  ctx.fillStyle = "grey";
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore(); // rotate back to default state

  // right rects, rotate from rectangle center

  // blue rect
  ctx.fillStyle = "#0095dd";
  ctx.fillRect(150, 30, 100, 100);

  ctx.translate(200, 80); // move canvas to rectangle center
  // x = x + width / 2
  // y = y + height / 2
  ctx.rotate((Math.PI / 180) * 25); // rotate 25 degrees
  ctx.translate(-200, -80); // translate back

  // grey rect
  ctx.fillStyle = "grey";
  ctx.fillRect(150, 30, 100, 100);
}

// SCALING

function drawScaled(ctx) {
  // draw scaled rect
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // mirror horizontally

  ctx.scale(-1, 1);
  ctx.font = "48px serif";
  ctx.fillText("MDN", -135, 120);
}
