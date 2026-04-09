import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/content/articles';
import { BlogCTA } from '@/components/BlogCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  
  return {
    title: `${article.title} | PillowMatch`,
    description: article.description,
    keywords: article.keywords.join(', '),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      locale: 'ja_JP',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-page">
      <article className="article-content">
        <header className="article-header">
          <div className="article-header-meta">
            <span className="article-header-category">{article.category}</span>
            <time dateTime={article.publishedAt}>{article.publishedAt.replace(/-/g, '.')}</time>
          </div>
          <h1>{article.title}</h1>
          <p className="article-header-description">{article.description}</p>
        </header>

        <div className="article-body">
          {article.sections.map((section, index) => (
            <section key={index} className="article-section">
              <h2>{section.heading}</h2>
              {section.content.split('\n\n').map((paragraph, pIndex) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={pIndex} className="article-bold">{paragraph.replace(/\*\*/g, '')}</p>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={pIndex} className="article-list">
                      {items.map((item, iIndex) => (
                        <li key={iIndex}>{item.replace(/^- /, '').replace(/\*\*/g, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('| ')) {
                  const rows = paragraph.split('\n').filter(row => row.startsWith('|'));
                  const headerRow = rows[0];
                  const dataRows = rows.slice(2);
                  const headers = headerRow.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                  return (
                    <div key={pIndex} className="article-table-wrapper">
                      <table className="article-table">
                        <thead>
                          <tr>
                            {headers.map((header, hIndex) => (
                              <th key={hIndex}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataRows.map((row, rIndex) => {
                            const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                            return (
                              <tr key={rIndex}>
                                {cells.map((cell, cIndex) => (
                                  <td key={cIndex}>{cell}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={pIndex}>
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIndex}>{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return <span key={partIndex}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </section>
          ))}
        </div>

        <BlogCTA />

        <nav className="article-nav">
          <Link href="/blog" className="article-back-link">
            ← 記事一覧に戻る
          </Link>
        </nav>
      </article>
    </main>
  );
}
