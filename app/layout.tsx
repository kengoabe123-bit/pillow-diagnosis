import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PillowMatch - あなたにピッタリの枕を30秒で診断',
  description:
    '30秒の無料診断であなたに最適な枕が見つかる。睡眠の悩みや寝姿勢に合わせて、5つの人気枕からベストマッチを提案します。',
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
