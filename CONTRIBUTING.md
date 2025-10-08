# Contributing to ArcXP SDK TypeScript

Thank you for your interest in contributing to the ArcXP SDK! This guide will help you understand the project architecture and contribution workflow.

## Table of Contents

- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Adding New Methods](#adding-new-methods)
- [Type System](#type-system)
- [Quality Standards](#quality-standards)
- [Local Development](#local-development)

---

## Project Architecture

### Foundation Layer

#### Base Abstract Client (`ArcAbstractAPI`)

The foundation of all API modules, providing common HTTP client infrastructure:

**Key Features:**

- Axios-based HTTP client with rate limiting (default 10 RPS, configurable)
- Exponential backoff retry logic for transient failures (5 retries)
- Automatic error wrapping with `ArcError` class
- Built-in rate limit headers tracking (`arcpub-ratelimit-remaining`, `arcpub-ratelimit-reset`)
- Dynamic base URL construction: `https://api.{org}.arcpublishing.com/{apiPath}`

**Retry Logic:**
Automatically retries on:

- 408 Request Timeout
- 429 Too Many Requests
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout

#### Error Handling (`ArcError`)

Custom error class that captures:

- Response data, status, and config
- Rate limit information
- Service name for debugging
- Original stack trace preservation

### API Module Structure

Each API service follows a **consistent two-file pattern**:

```
src/api/{service}/
├── index.ts    # Implementation (extends ArcAbstractAPI)
└── types.ts    # Request/Response types
```

**Implementation Pattern:**

```typescript
import type { GlobalType } from '../../types/entity';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type { LocalParamsType } from './types';

export class ArcServiceName extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'service/v1' });
  }

  async methodName(params: LocalParamsType): Promise<GlobalType> {
    const { data } = await this.client.get('/endpoint', { params });
    return data;
  }
}
```

### Type System Architecture

#### Two-Tier Type Hierarchy

**1. Global Types** (`./src/types/`)

- Generated from ANS (ArcXP Native Schema) using `json-schema-to-typescript`
- **⚠️ Do not modify manually** - these are auto-generated
- Core entities: `AStory`, `AnImage`, `AGallery`, `AVideo`, etc.
- Shared across all APIs
- Regenerate with: `pnpm run gen:ts`

**2. Local Types** (`./src/api/{service}/types.ts`)

- Request parameters (always local)
- Response types (only if not in global types)
- Service-specific enums and utility types

#### Type Decision Flow

```
Need a type?
├─ Is it a request parameter?
│  └─ ✅ Define locally in {service}/types.ts
│
├─ Is it a response?
│  ├─ Check ./src/types/ first
│  ├─ Exists? → ✅ Import and use
│  └─ Doesn't exist? → ✅ Define locally
│
└─ Unclear from spec?
   └─ Ask for clarification
```

**Golden Rule:** Never duplicate type definitions. Always reuse global types when available.

---

## Getting Started

### Prerequisites

- Node.js >= 22.x
- pnpm >= 10.x

### Installation

```bash
pnpm install
```

### Available Scripts

```bash
# Build the project
pnpm run build

# Format code
pnpm run format

# Lint and auto-fix
pnpm run lint

# Run tests
pnpm run test

# Generate coverage report
pnpm run coverage

# Generate TypeScript types from JSON schemas
pnpm run gen:ts

# Create a changeset
pnpm run cs
```

---

## Adding New Methods

### Step-by-Step Workflow

#### 1. Research Phase

Fetch the OpenAPI specification for the target API:

```typescript
// Use the sdk-creator tool if available
sdk-creator:fetch_arcxp_api_spec({ api_name: "content_api" })
```

Or manually review the ArcXP API documentation.

#### 2. Gap Analysis

- Compare spec endpoints with current implementation
- Identify missing methods
- Note parameter and response structures
- Check for similar existing patterns in the codebase

#### 3. Define Types

**In `{service}/types.ts`:**

```typescript
// Always define request parameters locally
export type NewMethodParams = {
  /** Required website identifier */
  website: string;
  /** Optional filter parameter */
  filter?: string;
  /** Pagination offset */
  offset?: number;
};

// For responses - check global types first!
// If exists: import type { AStory } from '../../types/story';
// If not, define locally:
export type NewMethodResponse = {
  items: AStory[];
  total: number;
  next?: string;
};
```

#### 4. Implement the Method

**In `{service}/index.ts`:**

```typescript
async newMethod(params: NewMethodParams): Promise<NewMethodResponse> {
  const { data } = await this.client.get('/endpoint', { params });
  return data;
}
```

#### 5. Export Types

Ensure types are exported from the service's `types.ts` and re-exported in `src/index.ts`:

```typescript
// In src/index.ts
export * from './api/{service}/types';
```

#### 6. Document Changes

Create a changeset describing your additions:

```bash
pnpm run cs
```

Follow the prompts to describe your changes. This will generate a markdown file in `.changeset/` directory.

### Common Implementation Patterns

#### Simple GET Request

```typescript
async getItem(id: string): Promise<AStory> {
  const { data } = await this.client.get(`/items/${id}`);
  return data;
}
```

#### GET with Query Parameters

```typescript
async search(params: SearchParams): Promise<SearchResponse> {
  const { data } = await this.client.get('/search', { params });
  return data;
}
```

#### Array Parameter Transformation

```typescript
async getByIds(params: GetByIdsParams): Promise<Response> {
  const { data } = await this.client.get('/items', {
    params: { ...params, ids: params.ids.join(',') }
  });
  return data;
}
```

#### POST with JSON Body

```typescript
async create(payload: CreatePayload): Promise<AStory> {
  const { data } = await this.client.post('/items', payload);
  return data;
}
```

#### File Upload with FormData

```typescript
async uploadFile(
  stream: ReadStream,
  options?: { filename?: string }
): Promise<AnImage> {
  const form = new FormData();
  form.append('file', stream, {
    filename: options?.filename || 'file.jpg',
    contentType: 'application/octet-stream',
  });

  const { data } = await this.client.post('/upload', form, {
    headers: form.getHeaders()
  });

  return data;
}
```

#### Conditional Return Types

```typescript
async createItem<
  P extends CreatePayload,
  R = P extends TypeA ? ResponseA : ResponseB
>(payload: P): Promise<R> {
  const { data } = await this.client.post('/items', payload);
  return data as R;
}
```

#### Optional Type Parameters

```typescript
async deleteItem(id: string, type = 'story'): Promise<void> {
  await this.client.delete(`/${type}/${id}`);
}
```

---

## Type System

### Working with ANS Types

ArcXP Native Schema (ANS) types are pre-generated and located in `./src/types/`:

- `story.ts` - Story-related types (`AStory`, `AnImage`, etc.)
- `gallery.ts` - Gallery types (`AGallery`)
- `video.ts` - Video types (`AVideo`)
- `author.ts` - Author types
- `section.ts` - Section types
- `content-elements.ts` - Content element types

**⚠️ Important:** Never modify these files directly. They are auto-generated from JSON schemas.

### Type Import Examples

```typescript
// Importing global types
import type { AStory } from '../../types/story';
import type { AGallery } from '../../types/gallery';
import type { AnImage } from '../../types/story';

// Importing local types
import type { GetStoryParams, SearchResponse } from './types';
```

### Handling Unclear Specifications

If the OpenAPI spec provides minimal information like:

```json
{
  "type": "story"
}
```

1. Check `./src/types/` for a matching global type (e.g., `AStory`)
2. If found, import and use it
3. If unclear, ask for clarification before proceeding

---

## Quality Standards

### Code Style

The project uses Biome for formatting and linting. Configuration is in `biome.json`:

- **Quotes:** Single quotes
- **Semicolons:** Always
- **Trailing commas:** ES5 style
- **Line width:** 120 characters
- **Indentation:** 2 spaces
- **Arrow parentheses:** Always

Run formatting before committing:

```bash
pnpm run format
pnpm run lint
```

### TypeScript Standards

- ✅ **Strict mode enabled** - No implicit any
- ✅ **Explicit return types** for public methods
- ✅ **JSDoc comments** for complex types and methods
- ✅ **Async/await** throughout (no callbacks)
- ✅ **Proper error handling** (errors wrapped in `ArcError`)
- ✅ **No type assertions** unless absolutely necessary

### Best Practices

1. **DRY (Don't Repeat Yourself)**

   - Reuse global types
   - Extract common patterns into utilities

2. **Single Responsibility**

   - Each API module handles one service
   - Each method does one thing well

3. **Consistent Naming**

   - Methods: `camelCase`
   - Types/Interfaces: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Private properties: prefix with `_` or mark as `private`

4. **Type Safety**

   - Avoid `any` in production code
   - Use proper generic constraints
   - Leverage TypeScript's type inference

5. **Documentation**
   - Add JSDoc comments for public APIs
   - Document complex type relationships
   - Explain non-obvious parameter usage

### Testing

Write tests for new functionality:

```typescript
import { describe, it, expect } from 'vitest';
import { ArcServiceName } from './index';

describe('ArcServiceName', () => {
  it('should fetch item by id', async () => {
    // Test implementation
  });
});
```

Run tests:

```bash
pnpm run test
pnpm run coverage
```

---

## Local Development

### Linking the SDK Locally

When developing locally and you want to test your changes in another project without publishing:

```bash
# In the arcxp-sdk-ts directory
pnpm link --global

# In your consuming project
pnpm link --global @code.store/arcxp-sdk-ts
```

This creates a symlink to your local development version, allowing you to test changes in real-time.

**⚠️ Remember to build after making changes:**

```bash
# In arcxp-sdk-ts directory
pnpm run build
```

Your consuming project will now use the updated built version.

### Unlinking

When you're done testing locally:

```bash
# In your consuming project
pnpm unlink --global @code.store/arcxp-sdk-ts

# Reinstall the published version
pnpm install @code.store/arcxp-sdk-ts
```

### Development Workflow

1. **Make changes** to source files in `src/`
2. **Build the project**: `pnpm run build`
3. **Test locally** in a linked project
4. **Run tests**: `pnpm run test`
5. **Format code**: `pnpm run format && pnpm run lint`
6. **Create changeset**: `pnpm run cs`
7. **Commit changes** with conventional commit messages
8. **Submit PR** with clear description

---

## Build System

### Technology Stack

- **TypeScript 5.3+** with strict mode
- **Module System:** CommonJS (output)
- **Formatter/Linter:** Biome
- **Test Runner:** Vitest
- **Versioning:** Changesets
- **Package Manager:** pnpm

### Configuration Files

- `tsconfig.json` - TypeScript compiler configuration
- `biome.json` - Code formatting and linting rules
- `package.json` - Project metadata and scripts
- `vite.config.ts` - Vitest configuration

### Build Output

The build process:

1. Compiles TypeScript to CommonJS in `./dist/`
2. Generates type declarations (`.d.ts` files)
3. Creates source maps for debugging

---

## Current API Coverage

**Implemented Services:**

- Author
- Content
- Content Ops
- Custom
- Draft
- Global Settings
- Identity
- IFX
- Migration Center
- Photo Center
- Redirect
- Retail Events (WebSockets)
- Sales
- Signing Service
- Site
- Tags
- Websked

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/) and uses [Changesets](https://github.com/changesets/changesets) for version management.

### Creating a Changeset

After making changes:

```bash
pnpm run cs
```

This will:

1. Prompt you to select the change type (major/minor/patch)
2. Ask for a description of the changes
3. Create a markdown file in `.changeset/`

The changeset will be used to:

- Generate the changelog
- Determine the next version number
- Document changes for users

### Changeset Guidelines

**Patch** (0.0.X) - Bug fixes and minor tweaks:

- Bug fixes
- Documentation updates
- Internal refactoring

**Minor** (0.X.0) - New features (backwards compatible):

- New API methods
- New optional parameters
- Enhanced functionality

**Major** (X.0.0) - Breaking changes:

- Removed or renamed methods
- Changed method signatures
- Modified return types

---

## Example: Adding a New Method

Let's walk through adding a new method to the Content API:

### 1. Check the OpenAPI Spec

Review the ArcXP Content API documentation for the endpoint `/v4/stories/bulk`.

### 2. Define Types

```typescript
// In src/api/content/types.ts

export type BulkGetStoriesParams = {
  /** Website identifier */
  website: string;
  /** Comma-separated list of story IDs */
  ids: string[];
  /** Whether to return published or draft stories */
  published?: boolean;
  /** Fields to include in response */
  included_fields?: string;
};

export type BulkGetStoriesResponse = {
  stories: AStory[];
  errors?: Array<{
    id: string;
    error: string;
  }>;
};
```

### 3. Implement the Method

```typescript
// In src/api/content/index.ts

async bulkGetStories(params: BulkGetStoriesParams): Promise<BulkGetStoriesResponse> {
  const { data } = await this.client.post('/stories/bulk', {
    ids: params.ids,
    website: params.website,
    published: params.published ?? true,
    included_fields: params.included_fields,
  });
  return data;
}
```

### 4. Test Locally

```bash
pnpm run build
pnpm link --global

# In your test project
pnpm link --global @code.store/arcxp-sdk-ts

# Test the new method
import { ArcAPI } from '@code.store/arcxp-sdk-ts';

const api = ArcAPI({
  credentials: {
    organizationName: 'your-org',
    accessToken: 'your-token'
  }
});

const result = await api.Content.bulkGetStories({
  website: 'my-site',
  ids: ['story1', 'story2'],
});
```

### 5. Create Changeset

```bash
pnpm run cs
# Select: minor
# Description: "Add bulkGetStories method to Content API"
```

### 6. Submit PR

Include in your PR description:

- What was added
- Why it was added
- Any breaking changes
- Example usage

---

## Getting Help

- **Issues:** Open an issue on GitHub
- **Documentation:** Check the [README.md](./README.md)
- **ArcXP Docs:** Visit [ArcXP Documentation](https://arcxp.com/documentation)

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
