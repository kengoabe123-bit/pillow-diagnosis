import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 理想の枕診断',
  description: '理想の枕診断へのお問い合わせはこちらからお願いいたします。',
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <article className="legal-content">
        <h1>お問い合わせ</h1>
        <p className="legal-updated">ご質問・ご要望がございましたら、下記メールアドレスまでお気軽にご連絡ください。</p>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '2rem',
        }}>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
            📧 メールでのお問い合わせ
          </p>
          <a
            href="mailto:banana.sakulazaka123@gmail.com"
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#5BA4B5',
              textDecoration: 'none',
            }}
          >
            banana.sakulazaka123@gmail.com
          </a>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>
            ※ 通常3営業日以内に返信いたします。
          </p>
        </div>
      </article>
    </main>
  );
}
