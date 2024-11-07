import "./style.css";

import { drawShapes } from "./lessons/basic-shapes";
import { drawStyledShapes } from "./lessons/styles-and-colors";
import { init as drawSolarSystem } from "./lessons/basic-animations";
import { drawTransformed } from "./lessons/transformations";

import { drawWheel } from "./lessons/wheel";

// page has to load before drawing
window.addEventListener("load", () => {
  // drawShapes();
  // drawStyledShapes();
  // drawAnimated();
  drawTransformed();

  // drawWheel();
});

// drawSolarSystem();
