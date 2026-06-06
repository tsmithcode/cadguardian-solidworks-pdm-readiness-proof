import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { runAdapter } from "../src/adapter/index.mjs";

const request = JSON.parse(readFileSync("samples/input/request.json", "utf8"));
const result = runAdapter(request);
mkdirSync("reports", { recursive: true });
writeFileSync("reports/demo-validation-report.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
