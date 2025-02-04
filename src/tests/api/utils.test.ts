import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ArcUtils } from '../../utils/arc';
import { createSocial } from '../../utils/arc/content';

describe('Arc Utils', () => {
  const namespace = `${Date.now()}`;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  describe('ArcUtils.common.generateArcId', () => {
    test('Should have 26 characters', () => {
      const id = ArcUtils.common.generateArcId('1', namespace);

      expect(id).toHaveLength(26);
    });

    test('Same identifiers and namespaces', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('1', namespace);

      expect(id1).toEqual(id2);
    });

    test('Different identifiers', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('2', namespace);

      expect(id1).not.toEqual(id2);
    });

    test('Different namespaces', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('1', `${namespace}1`);

      expect(id1).not.toEqual(id2);
    });
  });

  describe('ArcUtils.content.createSocial', () => {
    describe('Youtube', () => {
      const urls = [
        {
          input: 'https://www.youtube.com/watch?v=DFYRQ_zQ-gk&feature=featured',
          output: 'https://youtu.be/DFYRQ_zQ-gk',
        },
        { input: 'https://www.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://www.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//www.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'www.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://m.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://m.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//m.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'm.youtube.com/watch?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://www.youtube.com/embed/DFYRQ_zQ-gk?autoplay=1', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://www.youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://www.youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//www.youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'www.youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'youtube.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        {
          input: 'https://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk?autoplay=1',
          output: 'https://youtu.be/DFYRQ_zQ-gk',
        },
        { input: 'https://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//www.youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'www.youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'youtube-nocookie.com/embed/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://youtu.be/DFYRQ_zQ-gk?t=120', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://youtu.be/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'http://youtu.be/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: '//youtu.be/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'youtu.be/DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        { input: 'https://www.youtube.com/HamdiKickProduction?v=DFYRQ_zQ-gk', output: 'https://youtu.be/DFYRQ_zQ-gk' },
        {
          input: 'https://www.youtube.com/watch?v=hTWKbfoikeg&list=PLF1D793B61571DD4A&ab_channel=NirvanaVEVO',
          output: 'https://youtu.be/hTWKbfoikeg',
        },
        {
          input: 'https://www.youtube.com/watch?list=PLF1D793B61571DD4A&ab_channel=NirvanaVEVO',
          output: 'https://www.youtube.com/embed/videoseries?list=PLF1D793B61571DD4A',
        },
      ];

      for (const url of urls) {
        test(url.input, () => {
          const [ce] = createSocial(url.input);

          expect(ce.referent.type).to.equal('youtube');
          expect(ce.referent.id).toEqual(url.output);
        });
      }
    });
  });

  describe('Twitter', () => {
    const urls = [
      {
        input: 'https://twitter.com/username/status/1234567890123456789',
        output: 'https://twitter.com/username/status/1234567890123456789',
      },
      {
        input: 'https://twitter.com/username12345/statuses/123456789012345678',
        output: 'https://twitter.com/username12345/statuses/123456789012345678',
      },
      {
        input: 'https://www.twitter.com/username123/status/555555555555555555',
        output: 'https://www.twitter.com/username123/status/555555555555555555',
      },
    ];

    for (const url of urls) {
      test(url.input, () => {
        const [ce] = createSocial(url.input);

        expect(ce.referent.type).to.equal('twitter');
        expect(ce.referent.id).toEqual(url.output);
      });
    }
  });

  describe('Tik Tok', () => {
    const urls = [
      {
        input: 'https://www.tiktok.com/@username/video/1234567890123456789',
        output: 'https://www.tiktok.com/@username/video/1234567890123456789',
      },
      {
        input: 'https://tiktok.com/@another_user/video/987654321098765432',
        output: 'https://tiktok.com/@another_user/video/987654321098765432',
      },
    ];

    for (const url of urls) {
      test(url.input, () => {
        const [ce] = createSocial(url.input);

        expect(ce.referent.type).to.equal('tiktok');
        expect(ce.referent.id).toEqual(url.output);
      });
    }
  });

  describe('Instagram', () => {
    const urls = [
      {
        input: 'https://www.instagram.com/p/CKYJRXVnwMO/?utm_source=ig_web_copy_link',
        output: 'https://www.instagram.com/p/CKYJRXVnwMO/',
      },
      { input: 'instagram.com/p/CKYJRXVnwMO', output: 'instagram.com/p/CKYJRXVnwMO' },
      { input: 'www.instagram.com/p/CKYJRXVnwMO', output: 'www.instagram.com/p/CKYJRXVnwMO' },
      {
        input: 'https://www.instagram.com/taiga765/p/CYS-O2Gr8xZ/?utm_medium=copy_link',
        output: 'https://www.instagram.com/taiga765/p/CYS-O2Gr8xZ/',
      },
      {
        input: 'https://www.instagram.com/y.uuno/p/CXR5ATPls5M/?utm_medium=copy_link',
        output: 'https://www.instagram.com/y.uuno/p/CXR5ATPls5M/',
      },
      {
        input: 'http://www.instagram.com/reel/CRftq6QgG89/?utm_source=ig_web_copy_link',
        output: 'http://www.instagram.com/reel/CRftq6QgG89/',
      },
      { input: 'instagram.com/reel/CRftq6QgG89/', output: 'instagram.com/reel/CRftq6QgG89/' },
      { input: 'www.instagram.com/reel/CRftq6QgG89/', output: 'www.instagram.com/reel/CRftq6QgG89/' },
      {
        input: 'https://www.instagram.com/reel/CXR2xvbgCKW/?utm_medium=copy_link',
        output: 'https://www.instagram.com/reel/CXR2xvbgCKW/',
      },
      {
        input: 'https://www.instagram.com/tv/CN4RZWGn5wS/?utm_source=ig_web_copy_link',
        output: 'https://www.instagram.com/tv/CN4RZWGn5wS/',
      },
      { input: 'instagram.com/tv/CN4RZWGn5wS/', output: 'instagram.com/tv/CN4RZWGn5wS/' },
      { input: 'www.instagram.com/tv/CN4RZWGn5wS/', output: 'www.instagram.com/tv/CN4RZWGn5wS/' },
      {
        input: 'https://www.instagram.com/stories/sintha_tatha/2725190842360050880/',
        output: 'https://www.instagram.com/stories/sintha_tatha/2725190842360050880',
      },
      {
        input: 'https://www.instagram.com/stories/urkawaiibae/2725982322342818754/',
        output: 'https://www.instagram.com/stories/urkawaiibae/2725982322342818754',
      },
      {
        input: 'https://www.instagram.com/stories/willypangestu_/2725773180739197900/',
        output: 'https://www.instagram.com/stories/willypangestu_/2725773180739197900',
      },
      {
        input: 'https://www.instagram.com/stories/atrisna477769/',
        output: 'https://www.instagram.com/stories/atrisna477769/',
      },
      {
        input: 'https://www.instagram.com/stories/highlights/17910460144693951/',
        output: 'https://www.instagram.com/stories/highlights/17910460144693951',
      },
      {
        input: 'www.instagram.com/stories/highlights/17879710684406193/',
        output: 'www.instagram.com/stories/highlights/17879710684406193',
      },
      {
        input: 'instagram.com/stories/highlights/17879710684406193/',
        output: 'instagram.com/stories/highlights/17879710684406193',
      },
    ];

    for (const url of urls) {
      test(url.input, () => {
        const [ce] = createSocial(url.input);

        expect(ce.referent.type).to.equal('instagram');
        expect(ce.referent.id).toEqual(url.output);
      });
    }
  });

  describe('Facebook Video', () => {
    const urls = [
      { input: 'https://www.facebook.com/page-name/videos/1/', output: 'https://www.facebook.com/page-name/videos/1/' },
      { input: 'https://www.facebook.com/username/videos/1/', output: 'https://www.facebook.com/username/videos/1/' },
      { input: 'https://www.facebook.com/video.php?id=1', output: 'https://www.facebook.com/video.php?id=1' },
      { input: 'https://www.facebook.com/video.php?v=1', output: 'https://www.facebook.com/video.php?v=1' },
    ];

    for (const url of urls) {
      test(url.input, () => {
        const [ce] = createSocial(url.input);

        expect(ce.referent.type).to.equal('facebook-video');
        expect(ce.referent.id).toEqual(url.output);
      });
    }
  });

  describe('Facebook Post', () => {
    const urls = [
      { input: 'https://www.facebook.com/page-name/posts/1', output: 'https://www.facebook.com/page-name/posts/1' },
      { input: 'https://www.facebook.com/username/posts/1', output: 'https://www.facebook.com/username/posts/1' },
      { input: 'https://www.facebook.com/username/activity/1', output: 'https://www.facebook.com/username/activity/1' },
      { input: 'https://www.facebook.com/photo.php?fbid=1', output: 'https://www.facebook.com/photo.php?fbid=1' },
      { input: 'https://www.facebook.com/photos/1', output: 'https://www.facebook.com/photos/1' },
      {
        input: 'https://www.facebook.com/permalink.php?story_fbid=1',
        output: 'https://www.facebook.com/permalink.php?story_fbid=1',
      },
      { input: 'https://www.facebook.com/media/set?set=1', output: 'https://www.facebook.com/media/set?set=1' },
      { input: 'https://www.facebook.com/questions/1', output: 'https://www.facebook.com/questions/1' },
      {
        input: 'https://www.facebook.com/notes/username/note-url/1',
        output: 'https://www.facebook.com/notes/username/note-url/1',
      },
    ];

    for (const url of urls) {
      test(url.input, () => {
        const [ce] = createSocial(url.input);

        expect(ce.referent.type).to.equal('facebook-post');
        expect(ce.referent.id).toEqual(url.output);
      });
    }
  });
});
