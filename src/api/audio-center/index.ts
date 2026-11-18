import axios, { type AxiosResponse } from 'axios';
import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  AudioClip,
  AudioDeliverable,
  AudioPage,
  AudioPlaylist,
  AudioUploadResponse,
  CreateClipPayload,
  CreatePlaylistPayload,
  GetClipFileParams,
  GetClipUploadUrlParams,
  ListClipsParams,
  ListPlaylistsParams,
  PublishClipParams,
  ReplaceClipPayload,
  ReplacePlaylistPayload,
  UnpublishClipParams,
  UpdateClipPayload,
  UpdatePlaylistPayload,
} from './types.js';

// Arrays must be sent as repeated keys (`sites=a&sites=b`), not `sites[]=a`
const paramsSerializer = { indexes: null };

export class ArcAudioCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'audiocenter/api/editorial' });
  }

  // Clips

  async listClips(params?: ListClipsParams): Promise<AudioPage<AudioClip>> {
    const { data } = await this.client.get<AudioPage<AudioClip>>('/v1/clips/', { params, paramsSerializer });
    return data;
  }

  async getClip(id: string): Promise<AudioClip> {
    const { data } = await this.client.get<AudioClip>(`/v1/clips/${id}`);
    return data;
  }

  async createClip(payload: CreateClipPayload): Promise<{ id: string }> {
    const response = await this.client.post('/v1/clips/', payload);
    return { id: this.getIdFromLocation(response) };
  }

  async updateClip(id: string, payload: UpdateClipPayload): Promise<void> {
    await this.client.patch(`/v1/clips/${id}`, payload);
  }

  async replaceClip(id: string, payload: ReplaceClipPayload): Promise<void> {
    await this.client.put(`/v1/clips/${id}`, payload);
  }

  async deleteClip(id: string): Promise<void> {
    await this.client.delete(`/v1/clips/${id}`);
  }

  async getClipUploadUrl(id: string, params: GetClipUploadUrlParams): Promise<AudioUploadResponse> {
    const { data } = await this.client.post<AudioUploadResponse>(`/v1/clips/${id}/upload/presigned`, undefined, {
      params,
    });
    return data;
  }

  /**
   * Requests a presigned URL and uploads the file to it.
   * The upload goes straight to the storage host, so no Arc credentials are sent.
   */
  async uploadClipFile(id: string, fileName: string, file: Uint8Array | Blob): Promise<void> {
    const { upload_url, content_type } = await this.getClipUploadUrl(id, { file_name: fileName });
    await axios.put(upload_url, file, {
      headers: { 'Content-Type': content_type },
      maxBodyLength: Number.POSITIVE_INFINITY,
      maxContentLength: Number.POSITIVE_INFINITY,
    });
  }

  async publishClip(id: string, params?: PublishClipParams): Promise<void> {
    await this.client.post(`/v1/clips/${id}/publish`, undefined, { params });
  }

  async unpublishClip(id: string, params?: UnpublishClipParams): Promise<void> {
    await this.client.post(`/v1/clips/${id}/unpublish`, undefined, { params });
  }

  async getClipFile(id: string, params?: GetClipFileParams): Promise<AudioDeliverable> {
    const { data } = await this.client.get<AudioDeliverable>(`/v1/clips/${id}/binary`, { params });
    return data;
  }

  // Playlists

  async listPlaylists(params?: ListPlaylistsParams): Promise<AudioPage<AudioPlaylist>> {
    const { data } = await this.client.get<AudioPage<AudioPlaylist>>('/v1/playlists/', { params, paramsSerializer });
    return data;
  }

  async getPlaylist(id: string): Promise<AudioPlaylist> {
    const { data } = await this.client.get<AudioPlaylist>(`/v1/playlists/${id}`);
    return data;
  }

  async createPlaylist(payload: CreatePlaylistPayload): Promise<{ id: string }> {
    const response = await this.client.post('/v1/playlists/', payload);
    return { id: this.getIdFromLocation(response) };
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistPayload): Promise<void> {
    await this.client.patch(`/v1/playlists/${id}`, payload);
  }

  async replacePlaylist(id: string, payload: ReplacePlaylistPayload): Promise<void> {
    await this.client.put(`/v1/playlists/${id}`, payload);
  }

  async deletePlaylist(id: string): Promise<void> {
    await this.client.delete(`/v1/playlists/${id}`);
  }

  private getIdFromLocation(response: AxiosResponse): string {
    const id = String(response.headers.location ?? '')
      .split('/')
      .filter(Boolean)
      .pop();

    if (!id) throw new Error(`${this.name}: response has no Location header`);
    return id;
  }
}
