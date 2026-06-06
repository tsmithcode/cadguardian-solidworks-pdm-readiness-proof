import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const required = ["README.md", "quickstart/Program.cs", "docs/STAR.md", "docs/API_WALKTHROUGH.md", "fixtures/public"];
const missing = required.filter((file) => !existsSync(file));

console.log("SolidWorks and PDM Readiness Quick-Start Kit");
console.log("Kit type: CAD Guardian quick-start automation kit");
console.log("C# quickstart: quickstart/");
console.log("Native examples: optional licensed runtime adapters");
console.log("Development preview: This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.");

try {
  const dotnet = execFileSync("dotnet", ["--version"], { encoding: "utf8" }).trim();
  console.log("dotnet:", dotnet);
} catch {
  throw new Error("dotnet is required for the C# quickstart.");
}

if (missing.length > 0) throw new Error(`Missing required files: ${missing.join(", ")}`);
console.log("Doctor passed. Next: npm run kit");
