# User Guide

## Run

```bash
npm run doctor
npm run verify
npm run demo
```

## Inspect

Open `reports/quickstart-report.json` after the run. The report tells you:

- which public fixtures were inspected;
- which Pareto checks are ready for a private sample;
- which native/API handoff should happen next;
- what the first scoped buyer decision should be.

## Adapt

1. Replace the public fixture paths with approved private samples after the review channel is established.
2. Change the Pareto checks in `quickstart/Program.cs` to match the repeated drafter checks.
3. Move only proven rules into `native/` after the public report explains why the native runtime is needed.

## Stop rule

Do not automate broader files, folders, vaults, models, or drawing packages until the first private sample produces an accepted report.
