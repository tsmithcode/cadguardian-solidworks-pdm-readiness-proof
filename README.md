# SolidWorks and PDM Readiness Proof

CAD Guardian proof repo for technical interviews, buyer reviews, and peer walkthroughs.

> This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.

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
npm run doctor
npm run verify
npm run demo
npm run sanitize
```

Expected demo output: `reports/demo-validation-report.json` with a review-ready status, validation checks, stop conditions, and the public CAD data boundary.

## Runtime model
This repo is tiered:

- Public demo: runs anywhere with Node.js and synthetic fixtures.
- Optional native/runtime check: `npm run runtime:check` reports whether local CAD/API tooling appears available.
- Real CAD files: stay in an AgentOps-controlled private library unless explicitly approved for a private runtime receipt.

## Guides
- [User guide](docs/USER_GUIDE.md)
- [Runtime guide](docs/RUNTIME_GUIDE.md)
- [API references](docs/API_REFERENCES.md)
- [Expected outcome](docs/EXPECTED_OUTCOME.md)
- [Development preview warning](docs/DEVELOPMENT_PREVIEW.md)

## Official references
- [SOLIDWORKS API IModelDoc2](https://help.solidworks.com/2023/English/api/sldworksapi/SOLIDWORKS.Interop.sldworks~SOLIDWORKS.Interop.sldworks.IModelDoc2.html) - Model document vocabulary for parts, assemblies, and drawings.
- [SOLIDWORKS PDM Add-ins](https://help.solidworks.com/2026/english/api/epdmapi/AddInApp.htm) - PDM add-in and lifecycle extension vocabulary.
- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) - API front door, status endpoints, and service boundary discussion.
- [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) - State-machine orchestration, retries, and staged workflow discussion.
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) - Event-driven job/API shape when the platform standard is Azure.
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) - Queue and service-bus vocabulary for async CAD work.

## Public CAD data boundary
NIST unrestricted STEP/SolidWorks references stay catalog-controlled. This repo publishes manifests, synthetic BOM/property data, and validation posture.

This repository is built for public proof. It includes source inventory manifests, synthetic input fixtures, validation examples, and adapter code shaped for walkthroughs. It does not include private drawings, proprietary project files, login material, raw opportunity notes, or native CAD files that AgentOps marks catalog-only.

## Related service page
https://www.cadguardian.com/services/solidworks-pdm-readiness
