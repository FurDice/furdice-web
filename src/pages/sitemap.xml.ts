import { GAMES } from '../data/games';
import { LANGS, DEFAULT_LANG, SITE, localePath } from '../data/site';

// 언어별 URL을 모두 넣고, 각 URL에 hreflang 대체 주소를 단다.
const PATHS = ['/', '/games/', ...GAMES.map((g) => `/games/${g.slug}/`), '/privacy/'];

const abs = (path: string) => new URL(path, SITE.url).href;

export function GET() {
  const urls = PATHS.flatMap((path) =>
    LANGS.map((lang) => {
      const alternates = [
        ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(localePath(l, path))}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(localePath(DEFAULT_LANG, path))}"/>`,
      ].join('\n');
      return `  <url>\n    <loc>${abs(localePath(lang, path))}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
