import "./style.css";

import { drawShapes } from "./lessons/basic-shapes";
import { drawStyledShapes } from "./lessons/styles-and-colors";
import { init as drawSolarSystem } from "./lessons/basic-animations";

// page has to load before drawing
// window.addEventListener("load", () => {
//   // drawShapes();
//   // drawStyledShapes();
//   drawAnimated();
// });

drawSolarSystem();
