import "./style.css";

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// CIRCLE

let x = 200;
let y = 200;
let dx = 5;
let dy = 5;
const radius = 30;

function animate() {
  requestAnimationFrame(animate); // creates a loop
  c.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas for each frame

  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();

  // switch direction
  if (x + radius > innerWidth || x - radius < 0) dx *= -1;
  if (y + radius > innerHeight || y - radius < 0) dy *= -1;

  // update coords
  x += dx;
  y += dy;
}

animate(); // init
