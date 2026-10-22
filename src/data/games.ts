import type { ImageMetadata } from 'astro';
import type { Lang } from './site';
import thereWereEggs from '../assets/games/there_were_eggs.png';
import lumRun from '../assets/games/lum_run.png';
import mergeCats from '../assets/games/merge_cats.png';

/** 앱이 쓰는 기능. 개인정보처리방침의 "적용 앱" 표가 이 값으로 만들어진다. */
export interface GameFeatures {
  /** Google AdMob 광고 */
  ads: boolean;
  /** Google Play 결제(인앱 구매) */
  iap: boolean;
  /** Google Play 게임즈 서비스 클라우드 저장 */
  cloudSave: boolean;
}

export interface Game {
  slug: string;
  packageName: string;
  platforms: ('android' | 'steam')[];
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  genre: Record<Lang, string>;
  /** 'YYYY-MM' */
  released: string;
  image: ImageMetadata;
  storeUrl: string;
  features: GameFeatures;
  /**
   * features 값이 Play Console 데이터 보안 신고로 확인됐는지.
   * false인 앱은 빌드할 때 경고가 나온다 (progress.md의 할 일과 연결).
   */
  featuresConfirmed: boolean;
}

export const GAMES: Game[] = [
  {
    slug: 'merge-cats',
    packageName: 'com.furdice.mergecats',
    platforms: ['android'],
    name: { en: 'Merge Cats', ko: '고양이 키우기', ja: 'Merge Cats' },
    tagline: {
      en: 'Merge matching cats and meet new feline friends.',
      ko: '같은 고양이를 합쳐 새로운 친구를 만나요.',
      ja: '同じ猫を合体させて、新しい仲間に出会おう。',
    },
    description: {
      en: 'A relaxing idle merge game. Combine matching cats to discover new breeds, decorate their home and collect them all at your own pace.',
      ko: '느긋하게 즐기는 방치형 합치기 게임입니다. 같은 고양이를 합쳐 새로운 고양이를 발견하고, 내 속도대로 모아 보세요.',
      ja: 'のんびり遊べる放置系マージゲーム。同じ猫を合体させて新しい猫を見つけ、自分のペースでコレクションしよう。',
    },
    genre: { en: 'Idle merge', ko: '방치형 합치기', ja: '放置系マージ' },
    released: '2025-04',
    image: mergeCats,
    storeUrl: 'https://play.google.com/store/apps/details?id=com.furdice.mergecats',
    features: { ads: true, iap: true, cloudSave: false },
    featuresConfirmed: false,
  },
  {
    slug: 'there-were-eggs',
    packageName: 'games.furdice.egg',
    platforms: ['android'],
    name: { en: 'There Were Eggs', ko: 'R이있었다', ja: 'たまごがいた' },
    tagline: {
      en: 'Merge eggs and hatch something new every time.',
      ko: '알을 합칠 때마다 새로운 모습이 태어나요.',
      ja: 'たまごを合わせるたびに、新しい姿が生まれる。',
    },
    description: {
      en: 'A cute 2048-style merge puzzle. Slide and combine eggs and characters to uncover new forms one by one.',
      ko: '알과 캐릭터를 합쳐 점점 새로운 모습을 발견해 나가는 귀여운 2048 합치기 퍼즐입니다.',
      ja: 'たまごとキャラクターを合わせて、新しい姿を次々と見つけていくかわいい2048系パズル。',
    },
    genre: { en: '2048 merge puzzle', ko: '2048 합치기 퍼즐', ja: '2048系マージパズル' },
    released: '2022-05',
    image: thereWereEggs,
    storeUrl: 'https://play.google.com/store/apps/details?id=games.furdice.egg',
    features: { ads: true, iap: true, cloudSave: true },
    featuresConfirmed: true,
  },
  {
    slug: 'lum-run',
    packageName: 'com.furdice.lumrun',
    platforms: ['android'],
    name: { en: 'Lum Run', ko: '라무런', ja: 'Lum Run' },
    tagline: {
      en: 'Run, jump and keep Lum going.',
      ko: '귀여운 라무와 함께 끝없이 달려요.',
      ja: 'かわいいラムと一緒にどこまでも走ろう。',
    },
    description: {
      en: 'A charming endless runner. Guide Lum past obstacles and see how far you can go.',
      ko: '귀여운 라무와 함께하는 신나는 달리기 게임입니다. 장애물을 피해 얼마나 멀리 갈 수 있는지 도전해 보세요.',
      ja: 'かわいいラムと冒険するエンドレスランゲーム。障害物をよけて、どこまで行けるか挑戦しよう。',
    },
    genre: { en: 'Endless runner', ko: '러너', ja: 'エンドレスラン' },
    released: '2021-09',
    image: lumRun,
    storeUrl: 'https://play.google.com/store/apps/details?id=com.furdice.lumrun',
    features: { ads: true, iap: true, cloudSave: false },
    featuresConfirmed: false,
  },
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

for (const g of GAMES) {
  if (!g.featuresConfirmed) {
    console.warn(`[games] ${g.slug}: features 미확인 — Play Console 데이터 보안 신고와 대조 필요 (progress.md)`);
  }
}
