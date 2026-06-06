import { existsSync } from "node:fs";

const required = [
  "README.md",
  "docs/USER_GUIDE.md",
  "docs/RUNTIME_GUIDE.md",
  "docs/API_REFERENCES.md",
  "samples/input/request.json",
  "src/adapter/index.mjs",
];

const missing = required.filter((file) => !existsSync(file));

console.log("SolidWorks and PDM Readiness Proof");
console.log("Public synthetic demo: available");
console.log("Native CAD runtime: optional, local-only, and receipt-based");
console.log("Development preview: This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.");

if (missing.length > 0) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

console.log("Doctor passed. Next: npm run verify && npm run demo");
