import "./style.css";

function draw() {
  // retrieve the canvas node
  const canvas = document.getElementById("tutorial");

  if (canvas.getContext) {
    // script needs to access the rendering context to draw something
    const ctx = canvas.getContext("2d");
  } else {
    // unsupported canvas fallback
  }
}

// page has to load before drawing
window.addEventListener("load", draw);
