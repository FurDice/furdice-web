import type { Lang } from '../data/site';
import type { GameFeatures } from '../data/games';

/**
 * Play Console 데이터 보안 신고값을 그대로 옮긴 표 (There Were Eggs 기준, 2026-10-22 제출분).
 * 신고를 바꾸면 이 표도 같이 바꾼다.
 */
export interface DataType {
  feature: keyof GameFeatures;
  type: Record<Lang, string>;
  by: string;
  shared: boolean;
  required: Record<Lang, string>;
  purpose: Record<Lang, string>;
}

const adsPurpose = {
  en: 'Advertising, analytics, fraud prevention and security',
  ko: '광고, 분석, 사기 방지 및 보안',
  ja: '広告、分析、不正防止とセキュリティ',
};
const required = { en: 'Required', ko: '필수', ja: '必須' };

export const DATA_TYPES: DataType[] = [
  {
    feature: 'ads',
    type: {
      en: 'Approximate location (estimated from IP address)',
      ko: '대략적인 위치 (IP 주소로 추정)',
      ja: 'おおよその位置情報（IPアドレスから推定）',
    },
    by: 'Google AdMob',
    shared: true,
    required,
    purpose: adsPurpose,
  },
  {
    feature: 'ads',
    type: {
      en: 'App interactions (app launches, taps, ad views)',
      ko: '앱 상호작용 (앱 실행, 탭, 광고 시청)',
      ja: 'アプリ操作（起動、タップ、広告の表示）',
    },
    by: 'Google AdMob',
    shared: true,
    required,
    purpose: adsPurpose,
  },
  {
    feature: 'ads',
    type: {
      en: 'Diagnostics (launch time, crash and hang rates)',
      ko: '진단 정보 (실행 시간, 비정상 종료·멈춤 비율 등)',
      ja: '診断情報（起動時間、クラッシュ・フリーズ率など）',
    },
    by: 'Google AdMob',
    shared: true,
    required,
    purpose: adsPurpose,
  },
  {
    feature: 'ads',
    type: {
      en: 'Device or other IDs (advertising ID, app set ID)',
      ko: '기기 또는 기타 ID (광고 ID, 앱 세트 ID)',
      ja: 'デバイスまたはその他のID（広告ID、アプリセットID）',
    },
    by: 'Google AdMob',
    shared: true,
    required,
    purpose: adsPurpose,
  },
  {
    feature: 'iap',
    type: {
      en: 'Purchase history (product ID, purchase status)',
      ko: '구매 내역 (상품 ID, 구매 상태)',
      ja: '購入履歴（商品ID、購入状態）',
    },
    by: 'Google Play billing',
    shared: false,
    required: {
      en: 'Optional — only if you make a purchase',
      ko: '선택 — 구매한 경우에만',
      ja: '任意 — 購入した場合のみ',
    },
    purpose: {
      en: 'App functionality (delivering and restoring purchases)',
      ko: '앱 기능 (구매한 상품 지급·복원)',
      ja: 'アプリの機能（購入アイテムの付与・復元）',
    },
  },
  {
    feature: 'cloudSave',
    type: {
      en: 'Game progress (cloud save)',
      ko: '게임 진행 데이터 (클라우드 저장)',
      ja: 'ゲームの進行データ（クラウドセーブ）',
    },
    by: 'Google Play Games services',
    shared: false,
    required: {
      en: 'Optional — only if you sign in to Play Games',
      ko: '선택 — Play 게임즈에 로그인한 경우에만',
      ja: '任意 — Play ゲームにログインした場合のみ',
    },
    purpose: {
      en: 'App functionality (saving and loading progress across devices)',
      ko: '앱 기능 (다른 기기에서 진행 상황 불러오기)',
      ja: 'アプリの機能（別の端末で進行状況を読み込む）',
    },
  },
];
