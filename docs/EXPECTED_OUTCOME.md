# Expected Outcome

After running:

```bash
dotnet run --project quickstart
```

the repo writes:

```
reports/quickstart-report.json
```

The report must include:

- `Status`: review-ready or review-required.
- `Fixtures`: approved public fixture receipts with size and SHA-256.
- `Checks`: validation checks tied to the workflow.
- `ApiSignals`: the native/API vocabulary this kit is prepared to discuss.

Expected outputs for this kit:

- pdm-readiness-score
- custom-property-report
- BOM-checks
- native adapter notes
