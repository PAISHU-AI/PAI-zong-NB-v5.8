# Tauri Production Patterns

Use for Tauri desktop development.

## Boundaries

| Layer | Owns | Must Not Own |
|---|---|---|
| Frontend | UI, view state, validation messages | secrets, privileged filesystem logic |
| API Client | remote HTTP calls, retries, auth headers | native commands |
| Tauri Commands | local filesystem, OS integration, secure bridges | UI rendering |
| Rust Services | durable native logic, validation, side effects | frontend-specific formatting |

## Command Rules

- Validate all command inputs in Rust.
- Return typed errors; do not leak internal paths/secrets.
- Keep command names stable; document breaking changes.
- Use explicit permissions/capabilities.
- For long work, expose progress/cancellation instead of blocking UI.

## Security Checks

- Audit `tauri.conf.*`, capabilities, allowed paths, shell/open permissions.
- Never pass tokens through logs or frontend debug panels.
- Treat IPC as a boundary; validate like an API.

## Release Checks

- Build target OS package.
- Confirm signing/notarization/updater strategy.
- Document install, update, rollback, and logs path.
