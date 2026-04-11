import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WebsiteSchema } from '@/components/StructuredData';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

const SITE_NAME = '理想の枕診断';
const SITE_URL = 'https://pillow-diagnosis.vercel.app';

export const metadata: Metadata = {
  title: 'PillowMatch - あなたにピッタリの枕を30秒で診断',
  description:
    '30秒の無料診断であなたに最適な枕が見つかる。睡眠の悩みや寝姿勢に合わせて、5つの人気枕からベストマッチを提案します。',
  verification: {
    google: 'MIqh5zm0FnokIIIavzUIGMbvBVSdL-3x8VQhTys_fuQ',
  },
  openGraph: {
    title: 'PillowMatch - あなたにピッタリの枕を30秒で診断',
    description:
      '30秒の無料診断であなたに最適な枕が見つかる。睡眠の悩みや寝姿勢に合わせて、5つの人気枕からベストマッチを提案します。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PillowMatch - あなたにピッタリの枕を30秒で診断',
    description: '30秒の無料診断であなたに最適な枕が見つかる。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <WebsiteSchema
          siteName={SITE_NAME}
          siteUrl={SITE_URL}
          description="あなたにぴったりの枕が見つかる無料診断テストです。質問に答えるだけで、あなたの睡眠スタイルに最適な枕をTOP3でレコメンドします。"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
