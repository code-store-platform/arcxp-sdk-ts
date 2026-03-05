# CLAUDE.md

## Project Overview

ArcXP SDK for TypeScript — a strongly typed wrapper around ArcXP REST APIs. ESM-only, published as `@code.store/arcxp-sdk-ts`.

## Tech Stack

- **Runtime:** Node.js >= 22
- **Package Manager:** pnpm >= 10
- **Language:** TypeScript (strict mode, ESM with `.js` extensions in imports)
- **Build:** Rollup (outputs ESM + CJS)
- **Linter/Formatter:** Biome (single quotes, trailing commas, semicolons, 120 line width, spaces)
- **Tests:** Vitest + nock for HTTP mocking
- **Changesets:** `@changesets/cli` for versioning

## Commands

| Task          | Command        |
| ------------- | -------------- |
| Type-check    | `tsc --noEmit` |
| Build         | `pnpm build`   |
| Test          | `pnpm test`    |
| Lint + fix    | `pnpm lint`    |
| Format        | `pnpm format`  |
| Check (biome) | `pnpm check`   |

Always run `tsc --noEmit` after making changes to verify types.

## Project Structure

```
src/
  api/                  # API client implementations
    abstract-api.ts     # Base class (ArcAbstractAPI) all API clients extend
    index.ts            # ArcAPI factory — registers all API clients
    <api-name>/
      index.ts          # API class (extends ArcAbstractAPI)
      types.ts          # Request params / response types for this API
  types/                # Global ANS types (AStory, AnImage, etc.) — auto-generated, do not edit manually
  tests/                # Test files (*.test.ts)
  utils/                # Shared utilities
.changeset/             # Changeset files for versioning
```

## Contributing API Endpoints

### Workflow

1. **Fetch the OpenAPI spec** for the target API using the `sdk-creator` skill (it has URLs for all ArcXP APIs).
2. **Read existing code** in `src/api/<api-name>/` before changing anything.
3. **Identify missing endpoints** by comparing the spec to the implementation.
4. **Implement** following the patterns below, then type-check with `tsc --noEmit`.
5. **Create a changeset** in `.changeset/` (see below).

### API Implementation Pattern

Each API client extends `ArcAbstractAPI` and is registered in `src/api/index.ts`.

```ts
// src/api/example/index.ts
import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type { GetThingParams, CreateThingPayload, Thing } from './types.js';

export class ArcExample extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'example' });
  }

  async getThing(params: GetThingParams): Promise<Thing> {
    const { data } = await this.client.get<Thing>('/v1/things', { params });
    return data;
  }

  async createThing(payload: CreateThingPayload): Promise<Thing> {
    const { data } = await this.client.post<Thing>('/v1/things', payload);
    return data;
  }
}
```

### Type Conventions

- **Params types** (query params): suffix with `Params` — e.g. `ListAuthorsParams`. Define in the API's local `types.ts`.
- **Payload types** (POST body): suffix with `Payload` — e.g. `CreateAuthorPayload`. Define in the API's local `types.ts`.
- **Response types**: check `src/types/` for existing global ANS types first. Only define locally if no global type exists.
- **Do not duplicate types** that already exist globally.

### Changeset

After making changes, create a file in `.changeset/` named after the feature:

```md
---
'@code.store/arcxp-sdk-ts': minor
---

Add getAuthor and createAuthor methods to Author API
```

Use `patch` for fixes, `minor` for new endpoints/features, `major` for breaking changes.

## Code Style Rules

- ESM imports with `.js` extensions (e.g. `'../abstract-api.js'`)
- Use `type` keyword for type-only imports
- Single quotes, semicolons, trailing commas (es5), arrow parens always
- Indent with spaces (2), max line width 120
- No unused variables or imports (enforced by biome)
- Keep methods concise — destructure `{ data }` from axios response and return directly
- Name methods clearly: `getX`, `listX`, `createX`, `updateX`, `deleteX`

## Things to Avoid

- Do not edit files in `src/types/` — these are auto-generated from ANS schemas
- Do not overwrite existing endpoint implementations without being asked
- Do not add dependencies without explicit approval
- Do not use `any` unless truly unavoidable (biome allows it but prefer proper types)
