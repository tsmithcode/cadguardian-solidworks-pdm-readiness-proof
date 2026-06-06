# Native Runtime

The public kit runs without licensed CAD software. The examples in `native/` are intentionally optional.

## Runtime decision

Use C# for package readiness and a native SolidWorks/PDM adapter only after file references, custom properties, and release states are named.

## Native/API examples

- native/solidworks-pdm/CadGuardianSolidWorksAudit.cs
- native/solidworks-pdm/CadGuardianPdmAddIn.cs

## Rule

Do not claim native geometry mutation, conversion, plotting, PDM state changes, or model edits unless a local tool receipt is produced with approved files and tooling.
