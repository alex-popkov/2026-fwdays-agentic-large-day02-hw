# Security

## Input Handling

- Sanitize all user input before rendering (prevent XSS)
- Never use `dangerouslySetInnerHTML` without explicit sanitization
- Never use `eval()`, `new Function()`, or `innerHTML` with dynamic data
- Validate and sanitize file imports/exports (SVG, JSON, Excalidraw files)

## Dependencies

- No new npm packages without explicit approval
- Audit existing dependencies before upgrading (`yarn audit`)
- Prefer built-in APIs and `packages/utils/` over third-party libraries

## Secrets & Credentials

- Never commit secrets, API keys, tokens, or credentials
- Never hardcode sensitive values — use environment variables
- Never log sensitive data (tokens, passwords, PII)
- Keep `.env` files in `.gitignore`

## Data Handling

- Do not send canvas data or user content to external services without consent
- Treat collaboration room IDs and encryption keys as sensitive
- Use `crypto.getRandomValues()` for security-critical randomness, not `Math.random()`

## Network & API

- Validate and allowlist URLs before fetching external resources
- Use HTTPS for all external requests
- Do not disable CORS protections or SSL verification
- Avoid open redirects — validate redirect targets

## Code Patterns to Avoid

- No `@ts-ignore` or `any` to bypass type safety on security-sensitive code
- No `shell: true` in child process calls with user-supplied arguments
- No regex with user input without escaping (ReDoS risk)
- No deserialization of untrusted data without schema validation