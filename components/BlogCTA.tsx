import Link from 'next/link';

export function BlogCTA() {
  return (
    <div className="blog-cta">
      <div className="blog-cta-inner">
        <p className="blog-cta-lead">あなたにピッタリの枕、まだ見つかってないかも？</p>
        <p className="blog-cta-sub">5つの質問に答えるだけ。約30秒で診断完了。無料・個人情報不要。</p>
        <Link href="/" className="blog-cta-button" id="blog-cta-diagnosis">
          無料で診断してみる
        </Link>
      </div>
    </div>
  );
}
