# SolidWorks and PDM Readiness Proof

CAD Guardian proof repo for technical interviews, buyer reviews, and peer walkthroughs.

## Story
A product team wants cleanup, automation, or migration, but file references, configurations, custom properties, BOM rows, and release states are not yet trustworthy.

## Business case
The first decision is whether one product family or document class is ready for controlled PDM work.

## Workflow
- Product family request
- File reference inventory
- Property and BOM contract
- PDM state map
- STEP/native catalog references
- Release package check
- Manufacturing review
- Cleanup or pilot decision

## Stack vocabulary
- SolidWorks
- PDM
- SLDPRT/SLDASM/SLDDRW
- STEP
- BOM
- release states

## Run

```bash
npm run verify
npm run demo
```

## Public CAD data boundary
NIST unrestricted STEP/SolidWorks references stay catalog-controlled. This repo publishes manifests, synthetic BOM/property data, and validation posture.

This repository is built for public proof. It includes source inventory manifests, synthetic input fixtures, validation examples, and adapter code shaped for walkthroughs. It does not include private drawings, proprietary project files, login material, raw opportunity notes, or native CAD files that AgentOps marks catalog-only.

## Related service page
https://www.cadguardian.com/services/solidworks-pdm-readiness
