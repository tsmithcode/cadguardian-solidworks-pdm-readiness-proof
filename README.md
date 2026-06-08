<p align="left">
  <a href="https://www.cadguardian.com/solidworks-automation-consulting">
    <img src="assets/cad-guardian-logo-highlighted.png" alt="CAD Guardian logo" width="120">
  </a>
</p>

# SolidWorks and PDM Readiness Public Runnable Evaluation Kit

Evaluator-first public evaluation kit showing how a CAD Guardian readiness workflow can score file references, custom properties, BOM readiness, and release-state ownership before a SolidWorks API adapter or PDM add-in touches production files.

Canonical consulting paths: [SolidWorks automation consulting](https://www.cadguardian.com/solidworks-automation-consulting) and [PDM/PLM workflow consulting](https://www.cadguardian.com/pdm-plm-workflow-consulting)

Live proof page: [GitHub Pages](https://tsmithcode.github.io/cadguardian-solidworks-pdm-readiness-proof/) | [Download ZIP](https://github.com/tsmithcode/cadguardian-solidworks-pdm-readiness-proof/archive/refs/heads/main.zip) | [CAD Guardian](https://www.cadguardian.com/) | [TSmithCode.ai](https://www.tsmithcode.ai/)

## CAD Guardian procurement fit

- Legal/procurement entity: CAD Guardian LLC, Delaware LLC.
- Primary classification: NAICS 541512 Computer Systems Design Services; SIC 7373 Computer Integrated Systems Design.
- Secondary implementation fit: NAICS 541511 Custom Computer Programming Services when the engagement includes custom software, API, desktop, reporting, or integration work.
- Public offer fit: Drawing/Document Automation Slice; Implementation Build Slice; PDM/PLM workflow consulting lane.
- Canonical consulting paths: [SolidWorks automation consulting](https://www.cadguardian.com/solidworks-automation-consulting) and [PDM/PLM workflow consulting](https://www.cadguardian.com/pdm-plm-workflow-consulting).
- Public runnable proof kit available; private customer artifacts are not exposed.
- GitHub social preview asset: `assets/github-social-preview.png` with SVG source at `assets/github-social-preview.svg`.

## Best for

- Product teams preparing for SolidWorks cleanup, migration, PDM automation, or release process repair.
- CAD/PDM evaluators who need a public, runnable proof before sharing private samples.
- Technical reviewers checking whether the first useful automation slice is narrow enough to trust.

## Decision this proves

Run this repo to decide whether one product family is ready for a private-sample readiness pass, or whether the first move should be cleanup, PDM state mapping, or a smaller API adapter.

The quick-start checks the public fixture package for:

- file reference inventory signals;
- custom property and BOM readiness signals;
- release-state ownership boundaries;
- native SolidWorks API and PDM add-in handoff vocabulary.

## Run locally

```bash
npm run doctor
npm run verify
npm run demo
npm run quickstart:build
npm run sanitize
```

`npm run demo` runs the C# quickstart:

```bash
dotnet run --project quickstart
```

## Expected output

The demo writes:

```text
reports/quickstart-report.json
```

The report includes:

- `Status`: `ready-for-private-sample` or `needs-review`.
- `BusinessImpact`: why this readiness proof exists.
- `Fixtures`: approved public fixture receipts with size and SHA-256.
- `ParetoChecks`: file reference, custom property/BOM, and PDM release-state checks.
- `ReusableRoutines`: code patterns intended for adaptation.
- `ApiSignals`: SolidWorks API and PDM vocabulary for the next technical conversation.

## Proof boundary

This is a public readiness proof, not a production vault tool. It proves that the first evaluation can be narrow, inspectable, and tied to business risk before any licensed SolidWorks or PDM runtime work begins.

The repo intentionally separates:

- public fixture scanning in `quickstart/Program.cs`;
- optional native examples in `native/solidworks-pdm/`;
- evaluator documentation in `docs/`;
- generated demo output at `reports/quickstart-report.json`.

## What to send

For a CAD Guardian evaluation, send:

- the generated `reports/quickstart-report.json`;
- the product family or package type to evaluate next;
- required custom properties and BOM fields;
- release states, owners, and approval gates;
- the first business decision you need from the readiness pass.

Do not send credentials, private drawings, private vault exports, or unapproved CAD fixtures through this public repo.

## Related CAD Guardian page

[SolidWorks automation consulting](https://www.cadguardian.com/solidworks-automation-consulting) | [PDM/PLM workflow consulting](https://www.cadguardian.com/pdm-plm-workflow-consulting)

## Native runtime boundary

The public quickstart does not automate a live SolidWorks session or PDM vault. Native work belongs behind an approved licensed environment after the readiness decision is clear.

Repo-specific native examples:

- `native/solidworks-pdm/CadGuardianSolidWorksAudit.cs`: SolidWorks API audit boundary for `SldWorks`, `IModelDoc2`, `IModelDocExtension`, `CustomPropertyManager`, `IAssemblyDoc`, and `IComponent2`.
- `native/solidworks-pdm/CadGuardianPdmAddIn.cs`: PDM add-in boundary for `IEdmAddIn5`, `IEdmVault5`, and `IEdmCmd`.

## Public fixture boundary

Only approved public sample files are bundled:

- `fixtures/public/nist/nist_ctc_01_asme1_rd_sw1802.SLDPRT`
- `fixtures/public/nist/nist_ctc_01_asme1_rd.stp`

No client files, private drawings, credentials, private names, raw opportunity notes, or license-uncertain CAD assets are included.
