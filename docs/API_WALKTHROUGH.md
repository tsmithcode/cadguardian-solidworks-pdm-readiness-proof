# API Walkthrough

## High-value API signals

- SldWorks
- IModelDoc2
- IModelDocExtension
- CustomPropertyManager
- IAssemblyDoc
- IComponent2
- IEdmAddIn5
- IEdmVault5
- IEdmCmd

## What the public C# quickstart does

- Reads the approved public fixture manifest.
- Validates fixture presence, size, hash, and text-readable markers where the format supports it.
- Writes `reports/quickstart-report.json`.
- Names the native/API boundary without claiming licensed runtime execution.

## Official references

- [SOLIDWORKS API IModelDoc2](https://help.solidworks.com/2023/English/api/sldworksapi/SOLIDWORKS.Interop.sldworks~SOLIDWORKS.Interop.sldworks.IModelDoc2.html) - Model document vocabulary for parts, assemblies, and drawings.
- [SOLIDWORKS PDM Add-ins](https://help.solidworks.com/2026/english/api/epdmapi/AddInApp.htm) - PDM add-in and lifecycle extension vocabulary.
- [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) - API front door, job status, and artifact routes.
- [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) - State-machine orchestration, retries, and exception routing.
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) - Event-driven job functions when the platform standard is Azure.
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) - Queue-backed CAD work and service-bus vocabulary.
