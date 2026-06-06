import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const required = [
  "README.md",
  "index.html",
  ".gitattributes",
  "assets/cad-guardian-logo-highlighted.png",
  "docs/STAR.md",
  "docs/USER_GUIDE.md",
  "docs/RUNTIME_GUIDE.md",
  "docs/API_REFERENCES.md",
  "docs/EXPECTED_OUTCOME.md",
  "docs/INTERVIEW_SCRIPT.md",
  "quickstart/Program.cs",
  "quickstart/quickstart.csproj",
  "scripts/doctor.mjs",
  "scripts/verify.mjs",
  "scripts/runtime-check.mjs",
  "scripts/sanitize.mjs",
  "native/solidworks-pdm/CadGuardianSolidWorksAudit.cs",
  "native/solidworks-pdm/CadGuardianPdmAddIn.cs",
  "fixtures/public/nist/nist_ctc_01_asme1_rd_sw1802.SLDPRT",
  "fixtures/public/nist/nist_ctc_01_asme1_rd.stp"
];
const allowedFixturePaths = new Set([
  "fixtures/public/nist/nist_ctc_01_asme1_rd_sw1802.SLDPRT",
  "fixtures/public/nist/nist_ctc_01_asme1_rd.stp"
]);
const ignoredDirs = new Set([".git", "node_modules", "bin", "obj"]);
const allowedTopLevel = new Set([
  ".gitattributes",
  ".gitignore",
  ".nojekyll",
  "LICENSE",
  "README.md",
  "assets",
  "docs",
  "fixtures",
  "index.html",
  "native",
  "package.json",
  "quickstart",
  "reports",
  "scripts"
]);
const forbiddenRoots = ["samples", "src"];
const forbiddenDocNames = new Set([
  "API_WALKTHROUGH.md",
  "DEVELOPMENT_PREVIEW.md",
  "NATIVE_RUNTIME.md",
  "architecture.md",
  "code-walkthrough.md",
  "runbook.md",
  "sanitization-checklist.md",
  "source-attribution.md",
  "story.md"
]);
const publicFixtureExtensions = new Set([".dgn", ".dwg", ".dxf", ".ifc", ".ipt", ".sldprt", ".step", ".stp"]);
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
      if (ignoredDirs.has(entry)) continue;
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

for (const entry of readdirSync(".")) {
  if (!allowedTopLevel.has(entry) && !entry.startsWith(".")) {
    throw new Error(`Top-level drag file/folder is not allowed: ${entry}`);
  }
  if (forbiddenRoots.includes(entry)) {
    throw new Error(`Removed proof-packet folder came back: ${entry}`);
  }
}

for (const doc of readdirSync("docs")) {
  if (forbiddenDocNames.has(doc)) throw new Error(`Redundant doc should not exist: docs/${doc}`);
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

console.log("Pareto quick-start kit verification passed.");
