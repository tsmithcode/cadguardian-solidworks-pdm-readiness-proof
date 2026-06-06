# Runtime Guide

## Public runtime

The default kit runs with local .NET and does not require licensed CAD software.

```bash
dotnet run --project quickstart
```

## Native runtime

Use C# for package readiness and a native SolidWorks/PDM adapter only after file references, custom properties, and release states are named.

Native examples are intentionally optional. They should be used only inside the matching licensed CAD environment after the package boundary is proven.

## Native handoff points

- **File reference inventory:** `IModelDoc2`, `IModelDocExtension`, and selected document reference inspection.
- **Custom property and BOM readiness:** `CustomPropertyManager`, `IAssemblyDoc`, `IComponent2`, and BOM extraction.
- **PDM release-state boundary:** `IEdmAddIn5`, `IEdmVault5`, and `IEdmCmd` after release states are named.
