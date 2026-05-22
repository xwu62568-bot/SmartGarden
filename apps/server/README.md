# Server Placeholder

This directory is reserved for the future Smart Garden server-side layer.

Planned role:
- lightweight BFF endpoints for Web and mini-program clients
- webhooks
- scheduled jobs
- integration glue that should not live in the browser

Primary backend direction:
- Supabase remains the main backend platform for database, auth, and storage
- `apps/server` is intended for the thin server layer around Supabase, not as a full standalone backend replacement
