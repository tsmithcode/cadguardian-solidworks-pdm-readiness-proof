# SolidWorks and PDM Readiness Quick-Start Kit

CAD Guardian quick-start automation kit for peer walkthroughs, technical interviews, and buyer-facing business-case discussions.

> This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.

## STAR story

**Situation:** A product team wants cleanup, automation, or migration, but file references, custom properties, BOM rows, and release states are not trustworthy yet.

**Task:** Create a public-safe quickstart that scores readiness before a SolidWorks API or PDM add-in touches production files.

**Action:** Bundle approved NIST STEP/SolidWorks fixtures, validate package metadata, and show COM/API plus PDM add-in scaffolds.

**Result:** Interviewers can run the kit, inspect the readiness report, and discuss when native SolidWorks or PDM execution becomes justified.

## Fast run

```bash
npm run doctor
npm run verify
npm run demo
dotnet build quickstart
dotnet run --project quickstart
```

The C# quickstart writes `reports/quickstart-report.json`. The Node demo writes `reports/demo-validation-report.json`.

## What is included

- Runnable C# quickstart in `quickstart/`.
- Optional native/runtime examples in `native/`.
- Safe public fixtures in `fixtures/public/`.
- STAR story, API walkthrough, native runtime notes, interview script, and expected outcome docs.

## Workflow

- Product family request
- STEP/SLDPRT fixture inventory
- Custom property check
- BOM readiness check
- PDM state map
- Release package report
- Manufacturing review
- Cleanup or pilot decision

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

## Service page

https://www.cadguardian.com/services/solidworks-pdm-readiness
