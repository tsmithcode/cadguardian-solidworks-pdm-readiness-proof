import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const required = [
  "README.md",
  "index.html",
  "assets/cad-guardian-logo-highlighted.png",
  "docs/story.md",
  "docs/architecture.md",
  "samples/manifest/agentops-proof-packet.json",
  "samples/manifest/source-inventory.json",
  "samples/input/request.json",
  "samples/expected-output/validation-report.sample.json",
  "src/adapter/index.mjs",
];
const forbiddenStringParts = [
  ["Crown", "Castle"],
  ["Burns", "&", "McDonnell"],
  ["B", "McD"],
  ["Inter", "roll"],
  ["", "Users", "cadguardian"],
];
const forbiddenStrings = forbiddenStringParts.map((parts) => {
  if (parts[0] === "") return parts.join("/");
  if (parts.length === 2 && parts[0] === "B") return parts.join("");
  if (parts[0] === "Inter") return parts.join("");
  return parts.join(" ");
});
const blockedRawCadExtensions = new Set([
  ".dwg",
  ".dgn",
  ".rvt",
  ".rfa",
  ".ipt",
  ".iam",
  ".idw",
  ".sldprt",
  ".sldasm",
  ".slddrw"
]);

function walk(root) {
  const results = [];
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      if (entry === ".git" || entry === "node_modules") continue;
      results.push(...walk(path));
    } else {
      results.push(path);
    }
  }
  return results;
}

for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

for (const file of walk(".")) {
  const ext = extname(file).toLowerCase();
  if (blockedRawCadExtensions.has(ext)) {
    throw new Error(`Blocked raw CAD file in public repo: ${file}`);
  }

  if ([".png", ".jpg", ".jpeg", ".gif", ".pdf"].includes(ext)) continue;
  const text = readFileSync(file, "utf8");
  for (const value of forbiddenStrings) {
    if (text.toLowerCase().includes(value.toLowerCase())) {
      throw new Error(`Forbidden public string "${value}" found in ${file}`);
    }
  }
}

JSON.parse(readFileSync("samples/manifest/agentops-proof-packet.json", "utf8"));
JSON.parse(readFileSync("samples/manifest/source-inventory.json", "utf8"));
JSON.parse(readFileSync("samples/input/request.json", "utf8"));
JSON.parse(readFileSync("samples/expected-output/validation-report.sample.json", "utf8"));

console.log("Proof repo verification passed.");
