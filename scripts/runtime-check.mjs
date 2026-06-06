import { existsSync } from "node:fs";

const runtimeHints = [
  "SolidWorks",
  "PDM",
  "SLDPRT/SLDASM/SLDDRW",
  "STEP",
  "BOM",
  "release states"
];
const commonLocalHints = [
  "/Applications/Autodesk",
  "/Applications",
  "C:/Program Files/Autodesk",
  "C:/Program Files/SOLIDWORKS Corp",
  "C:/Program Files/Bentley",
];

const visibleHints = commonLocalHints.filter((path) => existsSync(path));

console.log("SolidWorks and PDM Readiness Proof");
console.log("Runtime vocabulary:", runtimeHints.join(", "));
console.log("Visible local runtime hints:", visibleHints.length > 0 ? visibleHints.join(", ") : "none detected");
console.log("This check does not prove CAD execution. Native geometry, conversion, repair, or API execution requires a separate local tool receipt.");
