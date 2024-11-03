import "./style.css";

import { drawShapes } from "./basic-shapes";

// page has to load before drawing
window.addEventListener("load", () => {
  drawShapes();
});
