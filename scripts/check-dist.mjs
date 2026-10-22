// 빌드 결과(dist) 점검: 필수 루트 파일, 내부 링크 깨짐, Vue 템플릿·자리표시 잔재, www 주소 사용.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const errors = [];

const REQUIRED = {
  'app-ads.txt': 'google.com, pub-8080737075353951, DIRECT, f08c47fec0942fa0',
  CNAME: 'furdice.com',
  'robots.txt': 'Sitemap: https://furdice.com/sitemap.xml',
  'sitemap.xml': '<urlset',
};
for (const [file, mustContain] of Object.entries(REQUIRED)) {
  const p = join(DIST, file);
  if (!existsSync(p)) errors.push(`필수 파일 없음: ${file}`);
  else if (!readFileSync(p, 'utf8').includes(mustContain)) errors.push(`${file} 내용 확인 필요 (기대값: ${mustContain})`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const BAD_PATTERNS = [
  [/\{\{[^}]*\}\}/, 'Vue 템플릿 문법 {{ }}'],
  [/20XX|\[기타\]/, '템플릿 자리표시'],
  [/www\.furdice\.com/, 'www 주소 (대표 주소는 furdice.com)'],
  [/\?page=|\?lang=/, '쿼리 파라미터 URL'],
];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file).split(sep).join('/');
  for (const [re, label] of BAD_PATTERNS) {
    if (re.test(html)) errors.push(`${rel}: ${label}`);
  }
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const url = m[1];
    const target = url.endsWith('/') ? join(DIST, url, 'index.html') : join(DIST, url);
    if (!existsSync(target)) errors.push(`${rel}: 깨진 링크 ${url}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length}개 문제\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ dist 점검 통과 (HTML ${htmlFiles.length}개)`);
