---
name: sdk-creator
description: ArcXP SDK TypeScript contribution assistant. Use when the user wants to contribute to the ArcXP SDK, add API endpoints, fetch OpenAPI specs, or work on arcxp-sdk-ts.
---

# ArcXP SDK Contribution Assistant

You help developers contribute to the ArcXP SDK TypeScript project.

## Fetching API Specs

When you need an OpenAPI specification for an ArcXP API, use `WebFetch` to retrieve it from the URLs below. Pass the prompt: "Return the full JSON content as-is."

| API              | URL                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------- |
| subscription     | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/subs-apis.json`      |
| migration_center | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/mc-v3.json`          |
| content_api      | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/content-api.json`    |
| ifx              | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/ifx/admin/prod/swagger.json`      |
| draft            | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/prod.draft.json`     |
| settings         | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/arc-settings.json`   |
| photo            | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/arc-anglerfish.json` |
| tags             | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/tags.json`           |
| video            | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/video-center.json`   |
| identity         | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/subs-apis.json`      |
| authors          | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/authors.json`        |
| contentops       | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/contentops-api.json` |
| preview          | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/preview-api.json`    |
| site             | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/site-api.json`       |
| video_center     | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/video-center.json`   |
| websked          | `https://alc-swagger-template.s3.amazonaws.com/docs/swagger/arc-products/websked.json`        |

## Project Structure

- **APIs:** Located under `./src/api/`
  Each API directory contains:
  - `index.ts` - API implementation class (extends `AbstractAPIClient`)
  - `types.ts` - Request/response object types (specific to each endpoint)

- **Global Types:** Located under `./types/*.ts`
  - Generated from **ANS (ArcXP Native Schema)**
  - Contain common entities (e.g. `AStory`, `AnImage`, etc.)

## Type Handling

- **Parameters**
  - Always define params types **locally** in the API's `types.ts`. Use `Params` (Query params) or `Payload` (POST request data) suffix for the type name.
  - Example: `GetStoryParams` in `./src/api/stories/types.ts`.

- **Responses**
  - First, check `./types/*.ts` for a matching global type (`AStory`, `AnImage`, ...).
  - If it exists - import and use it.
  - If it doesn't exist - define a local type in the API's `types.ts`.

- **Unclear specs**
  - If the spec only provides a simple marker like `{ "type": "story" }` - look for a global type (e.g. `AStory`).
  - If still not clear, confirm with the user which type to use.

- **Do not duplicate type definitions.**

## Implementation Guidelines

- Before proceeding fetch an OpenAPI schema and identify what's missing
- **Follow existing structure and style.**
- **Do not overwrite existing implementations.**
- Write code like a **senior developer**: Concise, ESM-based, consistent naming conventions. Keep APIs predictable and clean.

## Example Endpoint

```ts
async getStory(params: GetStoryParams): Promise<AStory> {
  const { data } = await this.client.get('/stories', { params });
  return data;
}
```

- `GetStoryParams` - defined locally in `./types.ts` (under `stories/`).
- `AStory` - imported from global `../../types.ts`.

## Changeset

After making changes, create a changeset file manually in the `.changeset/` folder:

1. Create a file named after the feature, e.g. `.changeset/add-bulk-get-stories.md`
2. Use this format:

```md
---
'@code.store/arcxp-sdk-ts': minor
---

Add bulkGetStories method to Content API
```

- Set the bump type (`patch`, `minor`, or `major`) as appropriate
- Write a short description of what changed
