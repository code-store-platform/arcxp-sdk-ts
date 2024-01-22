/* eslint-disable no-useless-escape */
import { ContentElement, ContentElementType } from '../../content-elements';

const socialRegExps = {
  instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([^\/?#&]+)/,
  twitter: /https:\/\/(?:www\.)?twitter\.com\/[^\/]+\/status(?:es)?\/(\d+)/,
  tiktok:
    /https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/,
};

function match(url: string, regex: RegExp): string | undefined {
  return url.match(regex)?.[0];
}

export function youtubeURLParser(url: string | null = '') {
  const regExp =
    // eslint-disable-next-line no-useless-escape
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]vi?=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const id = url?.match(regExp)?.[1];
  if (id) {
    return `https://youtu.be/${id}`;
  }

  const paylistMatch = url?.match(/[?&]list=([^#&?]+)/);
  if (paylistMatch?.[1]) {
    return `https://www.youtube.com/embed/videoseries?list=${paylistMatch?.[1]}`;
  }

  return undefined;
}

export function twitterURLParser(url: string) {
  return match(url, socialRegExps.twitter);
}

export function instagramURLParser(url: string) {
  return match(url, socialRegExps.instagram);
}

export function tiktokURLParser(url: string) {
  return match(url, socialRegExps.tiktok);
}

export function createSocial(url = ''): ContentElementType<'instagram' | 'tiktok' | 'youtube' | 'twitter'>[] {
  const embeds: ContentElementType<'instagram' | 'tiktok' | 'youtube' | 'twitter'>[] = [];

  const instagram = instagramURLParser(url);
  if (instagram) {
    embeds.push(ContentElement.instagram(instagram));
  }

  const twitter = twitterURLParser(url);
  if (twitter) {
    embeds.push(ContentElement.twitter(twitter));
  }

  const tiktok = tiktokURLParser(url);
  if (tiktok) {
    embeds.push(ContentElement.tiktok(tiktok));
  }

  const youtube = youtubeURLParser(url);
  if (youtube) {
    embeds.push(ContentElement.youtube(youtube));
  }

  return embeds;
}
