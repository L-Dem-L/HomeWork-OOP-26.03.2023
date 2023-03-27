// Watchers for scss and html files
import "./index.scss";
import "./scripts/watchers/_pages"

// Import modules
import { Circle } from "./scripts/modules/radius";
import { CssClass } from "./scripts/modules/CssClass";
// Import utils

// Bisiness logic
const circle = new Circle(7);
console.log("Radius: " + circle.radius); // 7
console.log("Diameter: " + circle.diameter); // 14
console.log("Area: " + circle.area()); // 153.93804002589985
console.log("Circumference: " + circle.circumference()); // 43.982297150257104

//Separator
console.log("-------------------------------------");

const myClass = new CssClass('my-class');

myClass.setStyle('color', 'red');
myClass.setStyle('font-size', '16px');
myClass.setStyle('font-weight', 'bold');

myClass.removeStyle('font-weight');

const cssCode = myClass.getCss();
console.log(cssCode);