---
"@code.store/arcxp-sdk-ts": minor
---

Migration Center: video imports default to `arcAdditionalProperties.video.transcoding: false`. When the field is not set, `postAns` now sends `false` for a video. Pass `true` to have Video Center re-encode the source into a rendition ladder; Arc charges extra for that encoding. With `false`, the stream is imported as-is, and Arc does not charge for importing progressive MP4 or HLS MPEG-2. The `useLastUpdated`, `importPriority` and `thumbnailTimeInSeconds` fields are now optional and no longer pinned to literal values.
