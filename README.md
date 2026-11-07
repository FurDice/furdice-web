# furdice.com

FurDice 홈페이지. [Astro](https://astro.build)로 만든 완전 정적 사이트이며, GitHub Actions로 빌드해 GitHub Pages에 배포합니다.

## 명령

| 명령 | 설명 |
|---|---|
| `npm install` | 의존성 설치 |
| `npm run dev` | 개발 서버 (http://localhost:4321) |
| `npm run build` | `dist/`에 정적 HTML 생성 |
| `npm run check:links` | 빌드 결과 점검 (필수 파일, 깨진 링크, 템플릿 잔재, www 주소) |
| `npm run preview` | 빌드 결과 미리보기 |

## 구조

- `src/data/games.ts` — 게임 목록. 게임 추가는 여기에 항목 하나와 `src/assets/games/`에 이미지 하나.
- `src/data/site.ts` — 회사 정보, 언어, **개인정보처리방침 시행일**(`policyEffectiveDate`).
- `src/data/ui.ts` — 화면 문구 (en / ko / ja).
- `src/policy/` — 개인정보처리방침. 영어(`PolicyEn.astro`)가 원본, 한국어·일본어는 같은 내용으로 맞춘다.
  - `dataTypes.ts` — Play Console 데이터 보안 신고와 1:1로 맞춘 수집 항목 표.
- `public/` — 그대로 복사되는 파일: `app-ads.txt`, `CNAME`, `robots.txt`, 예전 주소(`privacy.html`, `games.html`) 안내 페이지.
- `stubs/furdice.github.io/` — 예전 `furdice.github.io` 저장소에 넣을 안내 페이지와 `app-ads.txt`.

## URL

대표 주소는 `https://furdice.com` (www 없음). 영어는 루트, 한국어 `/ko/`, 일본어 `/ja/`.

- `/`, `/games/`, `/games/<slug>/`, `/privacy/`
