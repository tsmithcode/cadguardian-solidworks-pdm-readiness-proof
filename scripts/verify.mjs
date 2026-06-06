import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const required = [
  "README.md",
  "index.html",
  ".gitattributes",
  "assets/cad-guardian-logo-highlighted.png",
  "docs/STAR.md",
  "docs/API_WALKTHROUGH.md",
  "docs/NATIVE_RUNTIME.md",
  "docs/INTERVIEW_SCRIPT.md",
  "docs/EXPECTED_OUTCOME.md",
  "samples/manifest/agentops-proof-packet.json",
  "samples/manifest/source-inventory.json",
  "samples/manifest/fixture-attribution.json",
  "samples/input/request.json",
  "quickstart/Program.cs",
  "quickstart/quickstart.csproj",
  "src/adapter/index.mjs",
  "scripts/doctor.mjs",
  "scripts/runtime-check.mjs"
];
const allowedFixturePaths = new Set([
  "fixtures/public/nist/nist_ctc_01_asme1_rd_sw1802.SLDPRT",
  "fixtures/public/nist/nist_ctc_01_asme1_rd.stp"
]);
const publicFixtureExtensions = new Set([
  ".dgn",
  ".dwg",
  ".dxf",
  ".ifc",
  ".ipt",
  ".sldprt",
  ".step",
  ".stp"
]);
const forbiddenStringParts = [
  ["Crown", "Castle"],
  ["Burns", "&", "McDonnell"],
  ["B", "McD"],
  ["Inter", "roll"],
];
const forbiddenStrings = forbiddenStringParts.map((parts) => {
  if (parts.length === 2 && parts[0] === "B") return parts.join("");
  if (parts[0] === "Inter") return parts.join("");
  return parts.join(" ");
});

function walk(root) {
  const results = [];
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      if (entry === ".git" || entry === "node_modules" || entry === "bin" || entry === "obj") continue;
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

for (const fixturePath of allowedFixturePaths) {
  if (!existsSync(fixturePath)) throw new Error(`Missing bundled fixture: ${fixturePath}`);
}

for (const file of walk(".")) {
  const normalized = file.replace(/^\.\//, "");
  const ext = extname(file).toLowerCase();
  if (publicFixtureExtensions.has(ext) && !allowedFixturePaths.has(normalized)) {
    throw new Error(`Raw CAD fixture is only allowed under the approved fixture manifest: ${file}`);
  }

  if ([".png", ".jpg", ".jpeg", ".gif", ".pdf", ".dwg", ".dgn", ".ipt", ".sldprt"].includes(ext)) continue;
  const text = readFileSync(file, "utf8");
  for (const value of forbiddenStrings) {
    if (text.toLowerCase().includes(value.toLowerCase())) {
      throw new Error(`Forbidden public string "${value}" found in ${file}`);
    }
  }
}

JSON.parse(readFileSync("samples/manifest/agentops-proof-packet.json", "utf8"));
JSON.parse(readFileSync("samples/manifest/source-inventory.json", "utf8"));
JSON.parse(readFileSync("samples/manifest/fixture-attribution.json", "utf8"));
JSON.parse(readFileSync("samples/input/request.json", "utf8"));

console.log("Quick-start kit verification passed.");
