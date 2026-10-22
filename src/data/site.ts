export const LANGS = ['en', 'ko', 'ja'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

export const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
};

export const SITE = {
  url: 'https://furdice.com',
  name: 'FurDice',
  email: 'furdicegames@gmail.com',
  // 개인정보 보호책임자 (기존 방침 표기 유지)
  // 영문·일문 표기가 정해지면 언어별로 나눌 것 (progress.md 참고)
  privacyOfficer: '배종엽',
  playDeveloperUrl: 'https://play.google.com/store/apps/dev?id=6644044804204622439',
  // 개인정보처리방침 시행일. 실제 게시하는 날 이 값만 바꾼다.
  policyEffectiveDate: '2026-10-22',
};

/** 언어별 경로 접두사. 영어가 기본(루트). */
export function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** lang 기준 내부 경로. path는 '/'로 시작하고 '/'로 끝난다. */
export function localePath(lang: Lang, path: string): string {
  return `${langPrefix(lang)}${path}`;
}

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** 'YYYY-MM-DD' → 언어별 날짜 */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (lang === 'ko') return `${y}년 ${m}월 ${d}일`;
  if (lang === 'ja') return `${y}年${m}月${d}日`;
  return `${MONTHS_EN[m - 1]} ${d}, ${y}`;
}

/** 'YYYY-MM' → 언어별 연월 */
export function formatMonth(ym: string, lang: Lang): string {
  const [y, m] = ym.split('-').map(Number);
  if (lang === 'ko') return `${y}년 ${m}월`;
  if (lang === 'ja') return `${y}年${m}月`;
  return `${MONTHS_EN[m - 1]} ${y}`;
}
