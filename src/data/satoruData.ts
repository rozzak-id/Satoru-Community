export type PageRoute =
  | 'main-page'
  | 'partnership'
  | 'division'
  | 'awards'
  | 'hall-of-fame'
  | 'admins'
  | 'join-satoru-now';

export interface EventItem {
  id: string;
  title: string;
  category: 'mep' | 'collab-jj' | 'other-collabs';
  categoryLabel: string;
  url: string;
  badge?: string;
}

export interface LogoProperty {
  id: 'hollow-star' | 'tenkai-hand' | 'lightning-curse';
  name: string;
  description: string;
}

export interface SideLogo {
  id: string;
  name: string;
  note: string;
}

export interface DivisionItem {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'developing';
  statusLabel: string;
  description: string;
  image: string;
}

export interface HallOfFameEntry {
  category: string;
  winner: string;
  handle?: string;
  isPending?: boolean;
  accentTone: string;
  monogram: string;
  styleTag: string;
}

export interface AdminMember {
  id: string;
  name: string;
  handle: string;
  tiktokUrl: string;
  role: string;
  division: string;
  note: string;
}

export const SITE_ASSETS = {
  heroWave: '/src/assets/images/hero_satoru_wave_1794919726528.jpg',
  heroDivision: '/src/assets/images/hero_division_arch_1794919727627.jpg',
  heroHallOfFame: '/src/assets/images/hero_hall_of_fame_1794919728565.jpg',
  sideLogosSheet: '/assets/aistudio/image_782ece74.png',
  divisionCommunity: '/assets/aistudio/image_7baae584.png',
  divisionVision: '/assets/aistudio/image_d03d32bb.png',
  divisionRadio: '/assets/aistudio/image_e6b68bf7.png',
  divisionExpansion: '/assets/aistudio/image_6a2ac836.png',
};

export const OFFICIAL_LINKS = {
  tiktokOfficial: 'https://www.tiktok.com/@satoruclanofc',
  tiktokFounder: 'https://www.tiktok.com/@keanopreset',
  instagramOfficial: 'https://www.instagram.com/satoruclanofc',
  whatsappSelectionGroup: 'https://chat.whatsapp.com/Jwmcmc9QgohCQ95y1ObjKJ?s=cl&p=a&ilr=0',
};

export const COMMUNITY_STATS = [
  { label: 'Total Intro Komunitas', value: '100+', detail: 'Data per 5/8/26 (70% Keano, 20% Gio, 10% Partner)' },
  { label: 'Partner Komunitas', value: '50', detail: 'Kolaborasi lintas clan & kreator' },
  { label: 'Divisi & Cabang', value: '4', detail: 'Satoru, Vision, Radio, Expansion' },
  { label: 'Kategori SSA Awards', value: '8', detail: '3 Kategori Utama & 5 Kategori Karya' },
];

export const MAIN_LOGOS: LogoProperty[] = [
  {
    id: 'hollow-star',
    name: 'The Hollow Star',
    description: 'Logo ini diciptakan dengan filosopi "Intelligence surrounded by Complexity".',
  },
  {
    id: 'tenkai-hand',
    name: 'Tenkai Hand',
    description: 'Logo ini diambil dari salah satu scene iconic Gojo Satoru disaat "Ryoiki Tenkai".',
  },
  {
    id: 'lightning-curse',
    name: 'Lightning Curse',
    description: 'Logo ini diambil dari imajinasi sendiri, dengan konsep petir yang berbentuk huruf S.',
  },
];

export const SIDE_LOGOS: SideLogo[] = [
  { id: 'kanji-chi', name: 'Kanji V2 (智)', note: 'Simbol kebijaksanaan & kecerdasan' },
  { id: 'kanji-go', name: 'Kanji V2 (悟)', note: 'Karakter Kanji Satoru / pencerahan' },
  { id: 'pixel-star', name: 'Pixelated Hollow Star', note: 'Varian retro 8-bit untuk intro tematik' },
  { id: 'project-v1', name: 'Project V1', note: 'Tipografi artistik edisi awal' },
  { id: 'coming-soon', name: 'Coming Soon Pixel', note: 'Varian teaser proyek mendadak' },
  { id: 'fallen-text', name: 'Fallen Text', note: 'Wordmark SATORU gaya grunge' },
  { id: 'project-v2', name: 'Project V2', note: 'Monogram huruf S & Q kolaboratif' },
];

export const SEASONAL_CHAPTERS = [
  {
    title: 'Freezing Land',
    period: 'Desember 2025',
    summary: 'Tema Natal dan Musim Salju dengan nuansa lahan membeku untuk intro dan event bulanan.',
  },
  {
    title: 'Ramadhan Chapter',
    period: 'Bulan Ramadhan',
    summary: 'Tema khusus Ramadhan lengkap dengan collab style Jedag-Jedug dan Tagwall Eid Al Adha.',
  },
  {
    title: 'Seasonal & Cultural Events',
    period: 'Sepanjang Tahun',
    summary: 'Chapter tematik seperti Imlek, Halloween, HUT NKRI, hingga Brat Theme yang diperbarui tiap bulan.',
  },
];

export const DEDICATION_HASHTAGS = ['#SatoruClan', '#SatoruClanCreator', '#SatoruCreator'];

export const INTRO_BREAKDOWN = [
  { creator: 'Keano', percentage: 70 },
  { creator: 'Gio', percentage: 20 },
  { creator: 'Pihak Partnership Lainnya', percentage: 10 },
];

export const EVENT_RESULTS: EventItem[] = [
  // MEP Edits (15)
  {
    id: 'mep-bad-romance',
    title: 'JedagJedug Bad Romance',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    badge: 'Terbaru',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7663301681886563605?is_from_webapp=1&sender_device=pc&web_id=7670477400007230993',
  },
  {
    id: 'mep-starfamily',
    title: 'StarFamily Mep',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7630794458996428052?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-pmv-01',
    title: 'Picture Music Video mep 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7624824496364522773?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-3d-big-01',
    title: '3D Big Mep 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7621391326382214421?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-codestra',
    title: 'Satoru X Codestra Mograph',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7610315061701168405?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-ultra-1',
    title: 'Ultra Mep 1 JJX3D',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7605219510550826261?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-ultra-2',
    title: 'Ultra Mep 2 JJX3D',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7605220779172695316?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-anniv-1',
    title: 'Anniversary 1st Year JJ',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7595099009086311700?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-mega-jj',
    title: 'Mega Mep Jedag Jedug 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7590068155674889493?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-newyear',
    title: 'NewYear Mep JJ 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7587461367637085460?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-typography-01',
    title: 'Typography 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7569937287383944469?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-asa-xii',
    title: 'Satoru X Asa X XII Jedag Jedug',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7560864976282324235?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-4tk',
    title: 'Satoru X 4TK Jedag Jedug',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7517603026538925317?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-3d-pict',
    title: 'Project 3D Pict',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7494165565813083410?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'mep-jj-01',
    title: 'Jedag-Jedug 0.1',
    category: 'mep',
    categoryLabel: 'MEP Edits',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7461143532703649042?is_from_webapp=1&sender_device=pc',
  },

  // Collab Style Jedag Jedug (12)
  {
    id: 'jj-satoru-01',
    title: 'Satoru 0.1',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7461143532703649042?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'jj-satoru-02',
    title: 'Satoru 0.2',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7462732468035112199?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'jj-satoru-03',
    title: 'Satoru 0.3',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7469936779232054546?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-friys',
    title: "Satoru X Friy's",
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7475243477320649992?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'jj-ramadhan-01',
    title: 'Satoru Ramadhan 0.1',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7476496151487810834?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'jj-satoru-04',
    title: 'Satoru 0.4',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7490398809151835400?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-satoru-05',
    title: 'Satoru 0.5',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7496064298934979858?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-ne3',
    title: 'Satoru X Ne3',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7525758673495346438?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-brat',
    title: 'Satoru Brat Theme',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7524276184306191621?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-halloween',
    title: 'Satoru Halloween Theme',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7499723045221813512?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-nkri',
    title: 'Satoru Hut NKRI 0.1',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7540120406871559429?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'jj-after-reset',
    title: 'Satoru After Reset',
    category: 'collab-jj',
    categoryLabel: 'Collab Style Jedag Jedug',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7557269157272767800?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },

  // Other Collabs (11)
  {
    id: 'other-pp-imlek',
    title: 'Collab Profile Picture Imlek',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7465135904168938770?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-gfx-l2d',
    title: 'GFX/L2D Anime',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7470178812333018376?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-tagwall-01',
    title: 'Tagwall 0.1',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/photo/7477916533172292884?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-admins-pp',
    title: 'Admins Profile Picture 0.1',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7482035779514944775?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-three-pillars',
    title: 'The Three Pillars',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7483757206958083346?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-jj-event',
    title: 'Jedag Jedug Event',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7486499912213908754?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-face-reveal-01',
    title: 'Face Reveal 0.1',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7501863990331510024?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-tagwall-adha',
    title: 'Tagwall Eid Al Adha',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/photo/7511335153654828293?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-pp-01',
    title: 'Profile Picture 0.1',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7561014917411704120?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
  {
    id: 'other-collab-face-reveal',
    title: 'Collab Face Reveal',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7654550838265859348?is_from_webapp=1&sender_device=pc',
  },
  {
    id: 'other-pp-02',
    title: 'Profile Picture 0.2',
    category: 'other-collabs',
    categoryLabel: 'Other Collabs',
    url: 'https://www.tiktok.com/@satoruclanofc/video/7561014917411704120?is_from_webapp=1&sender_device=pc&web_id=7587016886207301136',
  },
];

export const PARTNER_COMMUNITIES: string[] = [
  'Never Evolution Three',
  'Moon',
  'Four Eleven Community (411)',
  'Infinite Camera Division',
  'Mekdi Gen Two',
  'Four Team Kece',
  'Astrix Community',
  'Eclipse Gank',
  'Zorion Gank',
  'Preset Kreator Indonesia',
  'Dove',
  'Nure Family',
  'Codestra Unit',
  'Clover Team',
  'Xazy Family',
  'Dandelion',
  'Sekte Asik Amat',
  'Ningen Two',
  'Peacock',
  'Blackhole / 4bbys',
  'NH Creator',
  'Nevix Team',
  'Action Academy',
  'Zero Zero Seven Unity (007)',
  'Sekte Warga Preset',
  'GameOver',
  'Xenoble',
  'Frisian Flag Creator',
  'General Team',
  'Poker Unity',
  'Fox Team',
  'Axl',
  'T6N',
  'anime Creator Aogiri',
  'Four Vesper',
  'On My Game Team',
  'Tensai',
  'Wanted',
  'Muxen',
  'Tenshi',
  'Xipaling Company',
  'XML Family',
  'Evil Empire',
  'Digiedaw People',
  'Orang Orangan Nhetral (O2N)',
  'Smith People',
  'Jar.Nexus',
  '3Arrow',
  'VISOR3D',
  'VivyOrchestra',
];

export const DIVISIONS: DivisionItem[] = [
  {
    id: 'satoru-community',
    name: 'Satoru Community',
    status: 'active',
    statusLabel: 'Aktif',
    description:
      'Divisi utama yang menerima hampir Semua jenis editing, identik dengan jedag-jedug, MotionGraphic, dan lain2.',
    image: SITE_ASSETS.divisionCommunity,
  },
  {
    id: 'satoru-vision',
    name: 'Satoru Vision',
    status: 'active',
    statusLabel: 'Aktif',
    description:
      'Divisi Kedua yang berfokus keeditan yang lebih serius seperti MV/MOGRAPH/TYPOGRAPH dan lain2nya.',
    image: SITE_ASSETS.divisionVision,
  },
  {
    id: 'satoru-radio',
    name: 'Satoru Radio',
    status: 'paused',
    statusLabel: 'Sedang Tidak Berjalan',
    description:
      'Divisi khusus yang berfokus kepada Musik, seperti Cover, Songwriting, Producing yang sayangnya sekarang sedang tidak berjalan dikarenakan pengurusnya memiliki kendala.',
    image: SITE_ASSETS.divisionRadio,
  },
  {
    id: 'satoru-expansion',
    name: 'Satoru Expansion',
    status: 'developing',
    statusLabel: 'Butuh Pengurus',
    description:
      'Divisi publik yang sebenarnya ditembak khusus untuk editor Semua Style dan untuk Semua editor dari penjuru dunia / Global Edition, yang sayangnya lagi, ini adalah divisi yang belum bisa berjalan lancar, dikarenakan kurang tenaga pengurus.',
    image: SITE_ASSETS.divisionExpansion,
  },
];

export const SSA_CATEGORIES = [
  { number: 1, title: 'The Best Dedicated Edit Of The Semester', group: 'Kategori Utama' },
  { number: 2, title: 'The Most Dedicated Account Of The Semester', group: 'Kategori Utama' },
  { number: 3, title: 'The Most Active Member Of The Semester', group: 'Kategori Utama' },
  { number: 4, title: 'The Best Jedag-Jedug Of The Semester', group: 'Kategori Karya' },
  { number: 5, title: 'The Most Viral Edit Video Of The Semester', group: 'Kategori Karya' },
  { number: 6, title: 'The Best Motiongraphy/Typography Edit Of The Semester', group: 'Kategori Karya' },
  { number: 7, title: 'The Most Underrated Edit Of The Semester', group: 'Kategori Karya' },
  { number: 8, title: 'The Best 3Dimension Picture Edit Of The Semester', group: 'Kategori Karya' },
];

export const SSA_SEASONS = [
  {
    season: 'Season 1',
    period: 'Juli — Desember',
    nominationDate: '10 Desember',
    winnerDate: '15 Desember',
    description: 'Juri berfokus menelusuri video dedikasi #SatoruClan yang diunggah dari bulan Juli (7) hingga Desember (12).',
  },
  {
    season: 'Season 2',
    period: 'Januari — Juni',
    nominationDate: '10 Juni',
    winnerDate: '15 Juni',
    description: 'Juri berfokus menelusuri video dedikasi #SatoruClan yang diunggah dari bulan Januari (1) hingga Juni (6).',
  },
];

export const HOF_PERDANA_SMA: HallOfFameEntry[] = [
  {
    category: 'Most Dedic Of The Semester',
    winner: '@oxygen.preset',
    handle: 'oxygen.preset',
    accentTone: 'from-[#1B2A4A] to-[#0D1321]',
    monogram: 'OXY',
    styleTag: 'Dedikasi Konsisten',
  },
  {
    category: 'Best Dedic Of The Semester',
    winner: '@hh3en_',
    handle: 'hh3en_',
    accentTone: 'from-[#005582] to-[#002840]',
    monogram: 'H3N',
    styleTag: 'Alight Motion & Preset',
  },
  {
    category: 'Most Active Of The Semester',
    winner: '@yanzysmithpeople07',
    handle: 'yanzysmithpeople07',
    accentTone: 'from-[#2A2930] to-[#111015]',
    monogram: 'YAN',
    styleTag: 'Partisipasi Event',
  },
  {
    category: 'Best JJ Of The Semester',
    winner: '@rewww_suka_mandai2',
    handle: 'rewww_suka_mandai2',
    accentTone: 'from-[#3D2E20] to-[#1A130D]',
    monogram: 'REW',
    styleTag: 'Jedag-Jedug',
  },
  {
    category: 'Most Viral Of The Semester',
    winner: '@rewww_suka_mandai2',
    handle: 'rewww_suka_mandai2',
    accentTone: 'from-[#3D2E20] to-[#1A130D]',
    monogram: 'REW',
    styleTag: 'Jangkauan Tertinggi',
  },
  {
    category: 'Best Mograph/Typograph Of The Semester',
    winner: '@hh3en_',
    handle: 'hh3en_',
    accentTone: 'from-[#005582] to-[#002840]',
    monogram: 'H3N',
    styleTag: 'Motion & Typography',
  },
  {
    category: 'Most Underrated Of The Semester',
    winner: '@itzz_anzyxz',
    handle: 'itzz_anzyxz',
    accentTone: 'from-[#2C363F] to-[#161B20]',
    monogram: 'ANZ',
    styleTag: 'Kualitas Tersembunyi',
  },
  {
    category: 'Best 3D Of The Semester',
    winner: '@iniyotaawoi',
    handle: 'iniyotaawoi',
    accentTone: 'from-[#2A2042] to-[#140F21]',
    monogram: 'YOT',
    styleTag: '3Dimension Edit',
  },
];

export const HOF_SSA_S1: HallOfFameEntry[] = [
  { category: 'Most Dedic Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Best Dedic Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Most Active Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Best JJ Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Most Viral Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Best Mograph/Typograph Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Most Underrated Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
  { category: 'Best 3D Of The Semester', winner: '@NOT YET', isPending: true, accentTone: 'from-[#25242B] to-[#17161B]', monogram: 'S1', styleTag: 'Menunggu 15 Des' },
];

export const ADMIN_FOUNDERS_AND_LEADERS: AdminMember[] = [
  {
    id: 'keanopreset',
    name: 'Keano',
    handle: 'keanopreset',
    tiktokUrl: 'https://www.tiktok.com/@keanopreset',
    role: 'Founder & Lead Admin',
    division: 'Satoru Community',
    note: 'Pendiri Satoru Community (13 Januari 2025) serta kreator utama ~70% intro resmi komunitas.',
  },
];

export const ADMIN_ROLES_OVERVIEW = [
  {
    title: 'Admin Seleksi Open Member',
    description:
      'Bertanggung jawab menerima entry calon member lewat WhatsApp, memeriksa video editan, dan mengecek timeline pengerjaan.',
  },
  {
    title: 'Admin Event & Kolaborasi',
    description:
      'Mengatur agenda MEP Edits, Collab Style Jedag-Jedug, seasonal chapter bulanan, serta kerja sama partnership antar clan.',
  },
  {
    title: 'Dewan Juri SSA & Pengurus Divisi',
    description:
      'Menilai nominasi Satoru Semester Awards melalui hashtag #SatoruClan serta mengelola divisi aktif seperti Satoru Vision.',
  },
];

export const JOIN_STEPS = [
  {
    step: 1,
    title: 'Follow Akun TikTok Resmi',
    detail: 'Kamu harus follow akun TikTok Satoru (@satoruclanofc) terlebih dahulu sebelum mengirim entry.',
  },
  {
    step: 2,
    title: 'Masuk Grup Seleksi WhatsApp',
    detail: 'Ikuti open member Satoru yang diadakan di WhatsApp melalui grup seleksi resmi.',
  },
  {
    step: 3,
    title: 'Chat 1 Admin Yang Sedang Open Entry',
    detail: 'Ucapkan salam dan kirimkan data seleksi hanya ke 1 admin. Jika belum dibalas dalam 1,5 jam, kamu boleh chat admin lain.',
  },
  {
    step: 4,
    title: 'Kirim Karya, Timeline & Identitas Akun',
    detail: 'Sertakan video editan kamu (All Style), timeline/waktu pengerjaan (All Software), nama akun TikTok, link akun TikTok, dan nomor WhatsApp.',
  },
];
