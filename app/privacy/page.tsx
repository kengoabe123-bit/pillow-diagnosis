import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 理想の枕診断',
  description: '理想の枕診断のプライバシーポリシーです。個人情報の取扱い、Cookie、広告プログラムについてご確認ください。',
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <article className="legal-content">
        <h1>プライバシーポリシー</h1>
        <p className="legal-updated">最終更新日：2026年4月11日</p>

        <section className="legal-section">
          <h2>1. 個人情報の取扱いについて</h2>
          <p>当サイト「理想の枕診断」（以下「当サイト」）では、お問い合わせの際に、お名前・メールアドレス等の個人情報をご提供いただく場合がございます。取得した個人情報は、お問い合わせへの回答や必要な情報をご連絡するためのみに利用し、これらの目的以外では利用いたしません。</p>
        </section>

        <section className="legal-section">
          <h2>2. 広告・アフィリエイトプログラムについて</h2>
          <p>当サイトは、以下のアフィリエイトプログラムに参加しています。</p>
          <ul>
            <li><strong>A8.net</strong>（株式会社ファンコミュニケーションズ）</li>
          </ul>
          <p>当サイトが紹介するサービスへのリンクには、アフィリエイトリンクが含まれている場合があります。リンクを経由してサービスに登録・購入された場合、当サイトに報酬が支払われることがあります。</p>
          <p>なお、アフィリエイトリンクを利用しても、ユーザーの皆様に追加の費用が発生することはありません。</p>
        </section>

        <section className="legal-section">
          <h2>3. Cookieの利用について</h2>
          <p>当サイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用しています。</p>
          <ul>
            <li><strong>Google Analytics</strong> — アクセス解析ツール。トラフィックデータの収集にCookieを使用します。データは匿名で収集されており、個人を特定するものではありません。</li>
            <li><strong>アフィリエイトCookie</strong> — アフィリエイトプログラムの計測のためにCookieが使用されます。</li>
          </ul>
          <p>Cookieの使用を望まない場合は、ブラウザの設定から無効にすることができます。</p>
        </section>

        <section className="legal-section">
          <h2>4. 免責事項</h2>
          <p>当サイトに掲載された情報は、可能な限り正確な情報を提供するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
          <p>また、当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
        </section>

        <section className="legal-section">
          <h2>5. 著作権について</h2>
          <p>当サイトに掲載されている文章・画像・デザイン等のコンテンツの著作権は、当サイト運営者に帰属します。無断転載・複製を禁じます。</p>
        </section>

        <section className="legal-section">
          <h2>6. プライバシーポリシーの変更について</h2>
          <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
        </section>
      </article>
    </main>
  );
}
