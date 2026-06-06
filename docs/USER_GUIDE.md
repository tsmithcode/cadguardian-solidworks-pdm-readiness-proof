# User Guide

This CAD library is in development. This is an early public preview for feedback on the best business case, workflow shape, and proof path.

## What this repo is for

Use this proof during a technical interview, buyer review, or peer walkthrough when the question is:

A product team wants cleanup, automation, or migration, but file references, configurations, custom properties, BOM rows, and release states are not yet trustworthy.

## Fast path

1. Read the story in `README.md`.
2. Run `npm run doctor`.
3. Run `npm run verify`.
4. Run `npm run demo`.
5. Open `reports/demo-validation-report.json`.
6. Use `index.html` for a browser-friendly walkthrough.

## What the demo proves

- The workflow can be represented as a request, runtime decision, validation rules, and review-ready report.
- Public data stays synthetic or manifest-based.
- Native CAD files are not bundled into the public repo.
- The handoff can be discussed without exposing private drawings, source systems, credentials, or opportunity notes.

## What it does not claim

- It does not claim native CAD geometry inspection.
- It does not claim conversion, repair, plotting, model mutation, PDM state changes, or cloud execution.
- Those claims require a private local runtime receipt with approved files and tooling.
