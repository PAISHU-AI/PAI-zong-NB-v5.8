---
name: security
description: Analyze and implement security-sensitive code involving authentication, authorization, tokens, sessions, uploads, payment, encryption, secrets, webhooks, sensitive data, dependency risk, injection, XSS, CSRF, SSRF, SQL injection, and audit logging.
---

# Security

## Workflow

1. Identify assets, actors, trust boundaries, and attacker-controlled inputs.
2. Validate and normalize input at boundaries.
3. Enforce authentication and authorization close to protected actions.
4. Protect secrets and sensitive data in storage, transit, logs, and errors.
5. Check injection, XSS, CSRF, SSRF, path traversal, upload, and deserialization risks as relevant.
6. Add tests for bypass, malformed input, and authorization boundaries when feasible.

## Hard Rules

- Never output real secrets.
- Never recommend disabling security checks as a durable fix.
- Never concatenate untrusted input into SQL, shell commands, templates, file paths, or URLs without safe APIs and validation.
- Do not log tokens, passwords, private keys, full payment data, or sensitive personal data.

## Output

State threat, mitigation, residual risk, and verification. Keep security claims precise.
