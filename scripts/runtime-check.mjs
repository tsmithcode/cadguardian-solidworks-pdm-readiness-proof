import { existsSync } from "node:fs";

const runtimeHints = [
  "SldWorks",
  "IModelDoc2",
  "IModelDocExtension",
  "CustomPropertyManager",
  "IAssemblyDoc",
  "IComponent2",
  "IEdmAddIn5",
  "IEdmVault5",
  "IEdmCmd"
];
const commonLocalHints = [
  "/Applications/Autodesk",
  "/Applications",
  "C:/Program Files/Autodesk",
  "C:/Program Files/SOLIDWORKS Corp",
  "C:/Program Files/Bentley",
];
const visibleHints = commonLocalHints.filter((path) => existsSync(path));

console.log("SolidWorks and PDM Readiness Quick-Start Kit");
console.log("API/native vocabulary:", runtimeHints.join(", "));
console.log("Visible local runtime hints:", visibleHints.length > 0 ? visibleHints.join(", ") : "none detected");
console.log("Public quickstart is runnable without licensed CAD. Native adapters require the matching local CAD/runtime environment.");
