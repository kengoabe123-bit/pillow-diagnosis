import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 理想の枕診断',
  description: '理想の枕診断へのお問い合わせはこちらのフォームからお願いいたします。',
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <article className="legal-content">
        <h1>お問い合わせ</h1>
        <p className="legal-updated">ご質問・ご要望がございましたら、下記フォームよりお問い合わせください。</p>

        <form
          className="contact-form"
          action="https://formspree.io/f/placeholder"
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="contact-name">お名前（ニックネーム可）</label>
            <input type="text" id="contact-name" name="name" required placeholder="例：太郎" />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">メールアドレス</label>
            <input type="email" id="contact-email" name="email" required placeholder="example@email.com" />
          </div>

          <div className="form-group">
            <label htmlFor="contact-category">お問い合わせ種別</label>
            <select id="contact-category" name="category" required>
              <option value="">選択してください</option>
              <option value="サイトについて">サイトについて</option>
              <option value="掲載情報の修正">掲載情報の修正</option>
              <option value="広告掲載について">広告掲載について</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">お問い合わせ内容</label>
            <textarea id="contact-message" name="message" rows={6} required placeholder="お問い合わせ内容をご記入ください" />
          </div>

          <button type="submit" className="contact-submit">送信する</button>
          <p className="contact-note">※ 通常3営業日以内に返信いたします。</p>
        </form>
      </article>
    </main>
  );
}
