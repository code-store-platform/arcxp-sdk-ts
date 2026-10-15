---
"@code.store/arcxp-sdk-ts": patch
---

Migration Center: `arcAdditionalProperties.video.transcoding` accepts `false` as well as `true`. With `false`, Video Center imports the stream as-is, and Arc does not charge for importing progressive MP4 or HLS MPEG-2. The `useLastUpdated`, `importPriority` and `thumbnailTimeInSeconds` fields are now optional and no longer pinned to literal values.
