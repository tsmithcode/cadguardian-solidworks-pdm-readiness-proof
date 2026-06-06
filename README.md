<p align="left">
  <a href="https://www.cadguardian.com/">
    <img src="assets/cad-guardian-logo-highlighted.png" alt="CAD Guardian logo" width="120">
  </a>
</p>

# SolidWorks and PDM Readiness Quick-Start Kit

CAD Guardian Pareto quick-start automation kit for drafters, CAD automation peers, technical interviews, and buyer-facing business-case discussions.

> This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.

## Live site

- GitHub Pages: https://tsmithcode.github.io/cadguardian-solidworks-pdm-readiness-proof/
- Download ZIP: https://github.com/tsmithcode/cadguardian-solidworks-pdm-readiness-proof/archive/refs/heads/main.zip
- CAD Guardian: https://www.cadguardian.com/
- TSmithCode.ai: https://www.tsmithcode.ai/
- Service page: https://www.cadguardian.com/services/solidworks-pdm-readiness

## Why this exists

Score file references, custom properties, BOM readiness, and release-state ownership before cleanup, migration, or PDM automation expands.

## Fast run

```bash
npm run doctor
npm run verify
npm run demo
dotnet build quickstart
```

`npm run demo` runs the C# quickstart and writes `reports/quickstart-report.json`.

## What is worth reusing

- `quickstart/Program.cs`: a small C# package-readiness engine with fixture receipts, Pareto checks, native runtime gates, and a JSON report.
- `native/`: optional API/runtime examples for the licensed CAD environment.
- `fixtures/public/`: approved public CAD fixtures only.
- `docs/USER_GUIDE.md`: how to run and adapt the kit.
- `docs/INTERVIEW_SCRIPT.md`: how to explain the business case without guessing.

## STAR story

**Situation:** A product team wants cleanup, automation, or migration, but file references, custom properties, BOM rows, and release states are not trustworthy yet.

**Task:** Score readiness before a SolidWorks API or PDM add-in touches production files.

**Action:** Bundle public STEP/SolidWorks fixtures, validate package metadata, and show COM/API plus PDM add-in scaffolds.

**Result:** A reviewer can run the kit, inspect readiness, and decide when native SolidWorks or PDM execution becomes justified.

## Pareto checks

- **File reference inventory:** Stops migration or automation from breaking references users trust. Handoff: `IModelDoc2`, `IModelDocExtension`, and selected document reference inspection.
- **Custom property and BOM readiness:** Finds the few fields that drive quote, manufacturing, and release errors. Handoff: `CustomPropertyManager`, `IAssemblyDoc`, `IComponent2`, and BOM extraction.
- **PDM release-state boundary:** Keeps PDM work focused on ownership, state, and approval instead of broad vault churn. Handoff: `IEdmAddIn5`, `IEdmVault5`, and `IEdmCmd` after release states are named.

## API and runtime signals

- SldWorks
- IModelDoc2
- IModelDocExtension
- CustomPropertyManager
- IAssemblyDoc
- IComponent2
- IEdmAddIn5
- IEdmVault5
- IEdmCmd

## Public fixture boundary

Only approved public sample files are bundled. No client files, private drawings, credentials, raw opportunity notes, or license-uncertain CAD assets are included.
