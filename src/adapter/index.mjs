export function runAdapter(job) {
  return {
    requestId: job.requestId,
    kitType: "CAD Guardian quick-start automation kit",
    repo: "tsmithcode/cadguardian-solidworks-pdm-readiness-proof",
    runtimeDecision: job.runtimeDecision,
    apiSignals: [
  "SldWorks",
  "IModelDoc2",
  "IModelDocExtension",
  "CustomPropertyManager",
  "IAssemblyDoc",
  "IComponent2",
  "IEdmAddIn5",
  "IEdmVault5",
  "IEdmCmd"
],
    expectedOutputs: [
  "pdm-readiness-score",
  "custom-property-report",
  "BOM-checks",
  "native adapter notes"
],
    validation: [
  "SolidWorks and STEP fixtures are present and attributed",
  "STEP fixture exposes ISO-10303 markers",
  "Custom property, BOM, and release-state checks are represented",
  "SolidWorks API and PDM add-in handoff is documented"
].map((rule) => ({
      rule,
      status: "review-ready",
      evidence: "Public quick-start kit fixture, API walkthrough, or native adapter example is present.",
    })),
    publicBoundary: "No private client files, login material, raw opportunity notes, or license-uncertain CAD assets are included.",
  };
}
