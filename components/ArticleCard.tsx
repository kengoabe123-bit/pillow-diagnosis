import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
}

export function ArticleCard({ slug, title, description, publishedAt, category }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="article-card" id={`article-${slug}`}>
      <div className="article-card-inner">
        <span className="article-category">{category}</span>
        <h2 className="article-title">{title}</h2>
        <p className="article-description">{description}</p>
        <div className="article-meta">
          <time dateTime={publishedAt}>{publishedAt.replace(/-/g, '.')}</time>
          <span className="article-read-more">続きを読む →</span>
        </div>
      </div>
    </Link>
  );
}
