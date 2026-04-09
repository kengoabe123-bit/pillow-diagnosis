import type { Metadata } from 'next';
import { getAllArticles } from '@/content/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { BlogCTA } from '@/components/BlogCTA';

export const metadata: Metadata = {
  title: 'お役立ち記事 | PillowMatch 枕診断',
  description: '枕の選び方、肩こり対策、睡眠の質を上げるコツなど、快適な睡眠に役立つ記事をまとめました。',
  openGraph: {
    title: 'お役立ち記事 | PillowMatch 枕診断',
    description: '快適な睡眠に役立つ記事をまとめました。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <h1>枕と睡眠のお役立ち記事</h1>
        <p>枕の選び方・素材の違い・肩こり対策まで、快適な睡眠をサポートする情報をお届けします。</p>
      </section>

      <section className="blog-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            publishedAt={article.publishedAt}
            category={article.category}
          />
        ))}
      </section>

      <BlogCTA />
    </main>
  );
}
