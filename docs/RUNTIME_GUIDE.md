# Runtime Guide

## Default public runtime

The default runtime is Node.js plus synthetic fixtures:

```bash
npm run doctor
npm run verify
npm run demo
```

Expected output: `reports/demo-validation-report.json`.

## Optional native/runtime path

Run:

```bash
npm run runtime:check
```

This command only reports visible local runtime hints. It does not prove CAD execution.

## Runtime decision for this proof

PDM readiness assessment before automation or migration.

## AgentOps boundary

NIST unrestricted STEP/SolidWorks references stay catalog-controlled. This repo publishes manifests, synthetic BOM/property data, and validation posture.

Native CAD files, private client material, credentials, source-system exports, and raw opportunity notes stay outside this public repo.
