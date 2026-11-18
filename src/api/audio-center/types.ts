export type AudioProcessingStatus = 'create' | 'processing' | 'failed' | 'ready';

export type AudioPublishingStatus = 'not_published' | 'pending' | 'scheduled' | 'published' | 'failed';

export type AudioRendition = 'original' | 'preview' | 'aac-standard' | 'aac-quality' | 'mp3-standard' | 'flac';

export type AudioActorId = 'system' | 'unknown' | string;

export type AudioCirculation = {
  cid: string;
  sites: string[];
};

export type AudioPublishingSchedule = {
  schedule_workflow_id: string;
  target_publishing_time: string;
};

export type AudioWaveformData = {
  sample_count: number;
  duration_per_sample: number;
  min: number[];
  max: number[];
  peak: number;
  rms: number[];
  mean: number[];
};

export type AudioBreakCandidate = {
  kind: 'silence';
  start_ms: number;
  end_ms: number;
};

export type AudioFileEditorialResponse = {
  location: { uri: string } | null;
  file_size: number | null;
  waveform: AudioWaveformData | null;
  break_candidates: AudioBreakCandidate[] | null;
};

export type AudioDeliverySource = {
  kind: 'original' | 'studio_audio' | 'normalized';
  studio_audio_id?: string | null;
  normalization?: {
    target_lufs?: number;
    true_peak_dbtp?: number;
    loudness_range_lra?: number;
    linear?: boolean;
  } | null;
  set_at?: string | null;
};

export type AudioClip = {
  id: string;
  title: string;
  description?: string | null;
  tags?: string[];
  circulation?: AudioCirculation | null;
  processing_status: AudioProcessingStatus;
  publishing_status?: AudioPublishingStatus;
  published_at?: string | null;
  publish_schedule?: AudioPublishingSchedule | null;
  unpublished_at?: string | null;
  unpublish_schedule?: AudioPublishingSchedule | null;
  renditions?: Record<string, AudioFileEditorialResponse> | null;
  duration?: number | null;
  ai_generated?: boolean;
  can_normalize?: boolean;
  can_undo_delivery?: boolean;
  delivery_source?: AudioDeliverySource;
  created_by?: AudioActorId;
  last_edited_by?: AudioActorId;
  created_at?: string;
  updated_at?: string;
};

export type AudioPlaylistItem = {
  clip_id: string;
  position: number;
};

export type AudioPlaylist = {
  id: string;
  items: AudioPlaylistItem[];
  tags?: string[];
  circulation: AudioCirculation;
  created_by?: AudioActorId;
  last_edited_by?: AudioActorId;
  created_at?: string;
  updated_at?: string;
};

export type AudioPage<T> = {
  data: T[];
  next_page_token?: string | null;
};

export type AudioDeliverable = {
  uri: string;
  waveform?: AudioWaveformData | null;
  break_candidates?: AudioBreakCandidate[] | null;
  metadata?: Record<string, unknown> | null;
  transcript?: Record<string, unknown> | null;
};

export type AudioUploadResponse = {
  upload_url: string;
  content_type: string;
  notification_url: string;
};

export type ListAudioParams = {
  include_tags?: string[];
  exclude_tags?: string[];
  sites?: string[];
  processing_status?: AudioProcessingStatus;
  publishing_status?: AudioPublishingStatus;
  creator?: AudioActorId;
  last_edited_by?: AudioActorId;
  updated_after?: string;
  updated_before?: string;
  created_after?: string;
  created_before?: string;
  page_token?: string;
  /** Default 10 */
  max_results?: number;
  /** Default `created_at` */
  sort_field?: 'score' | 'updated_at' | 'created_at' | 'title' | '_id';
  /** Default `desc` */
  sort_direction?: 'asc' | 'desc';
};

export type ListClipsParams = ListAudioParams;

export type ListPlaylistsParams = ListAudioParams;

export type CreateClipPayload = {
  title: string;
  description?: string | null;
  tags?: string[];
  circulation?: AudioCirculation | null;
};

export type UpdateClipPayload = CreateClipPayload;

export type ReplaceClipPayload = CreateClipPayload;

export type GetClipUploadUrlParams = {
  file_name: string;
};

export type PublishClipParams = {
  /** Default `aac-standard` */
  rendition?: string;
  /** ISO 8601 date-time */
  schedule_at?: string;
};

export type UnpublishClipParams = PublishClipParams;

export type GetClipFileParams = {
  /** Default `aac-standard` */
  rendition?: AudioRendition;
  /** Default `false` */
  waveform?: boolean;
};

export type CreatePlaylistPayload = {
  items: AudioPlaylistItem[];
  tags?: string[];
  circulation?: AudioCirculation | null;
};

export type UpdatePlaylistPayload = CreatePlaylistPayload;

export type ReplacePlaylistPayload = CreatePlaylistPayload;
