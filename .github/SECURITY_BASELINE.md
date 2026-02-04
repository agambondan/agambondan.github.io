# Security Baseline

This document defines the minimum security baseline for this repository.

## Required Branch Protection (master)

- Require pull request before merging.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Require conversation resolution before merging.
- Restrict force pushes and branch deletion.

## Required Status Checks

- `CI / workflow-lint`
- `CI / quality`
- `CI / security`
- `QA Automation / qa-web`
- `QA Automation / qa-mobile`
- `CodeQL / Analyze`

## Security Automation in CI

- Secret scan via `gitleaks` on PR and push.
- Dependency audit via `npm audit --audit-level=high`.
- Code scanning via CodeQL.

## Secrets Handling Rules

- Keep secrets only in GitHub Actions secrets.
- Never commit `.env` values with real credentials.
- Rotate exposed secrets immediately and invalidate compromised tokens.
