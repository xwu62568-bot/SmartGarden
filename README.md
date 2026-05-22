# Smart Garden

Smart Garden is a multi-platform product repository for the homeowner and installer control experience.

## Current Status

- `apps/web`: active Vite + React Web implementation
- `apps/mp`: reserved for the future mini-program implementation
- `apps/server`: reserved for a thin server/BFF layer

## Backend Direction

Supabase is the planned primary backend platform.

Planned responsibilities:
- database
- authentication
- storage

The future `apps/server` directory is intended for:
- BFF endpoints
- webhooks
- scheduled jobs
- integration logic that should not run in the client

## Development

```bash
npm run dev:web
npm run build:web
npm run test:web
```

## Structure

```text
apps/web   Web app
apps/mp    Mini-program placeholder
apps/server Thin server/BFF placeholder
docs       Specs, plans, and design references
```

## Deployment

The Web app is configured for deployment to GitHub Pages through GitHub Actions.

## Environment Variables

See `.env.example` for the planned variable categories for Web, server, and Supabase integration.
