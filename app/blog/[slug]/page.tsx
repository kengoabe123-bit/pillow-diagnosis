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

/**
 * インラインテキストのパース（太字・リンク対応）
 */
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <Link key={`${keyPrefix}-${i}`} href={linkMatch[2]} className="article-inline-link">{linkMatch[1]}</Link>;
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

/**
 * コンテンツをリッチなReactコンポーネントに変換
 */
function renderContent(content: string, sectionIndex: number): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (line.trim() === '') { i++; continue; }

    // 水平線
    if (line.trim() === '---') {
      elements.push(<hr key={`${sectionIndex}-${i}`} className="article-hr" />);
      i++; continue;
    }

    // 【見出し風テキスト】
    if (line.trim().startsWith('【') && line.trim().endsWith('】')) {
      elements.push(
        <h3 key={`${sectionIndex}-${i}`} className="article-h3-bracket">
          {line.trim().slice(1, -1)}
        </h3>
      );
      i++; continue;
    }

    // ### 見出し
    if (line.trim().startsWith('### ')) {
      elements.push(
        <h3 key={`${sectionIndex}-${i}`} className="article-h3">
          {line.trim().slice(4)}
        </h3>
      );
      i++; continue;
    }

    // 番号付きリスト
    if (/^\d+\.\s/.test(line.trim())) {
      const olItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        olItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`${sectionIndex}-ol-${i}`} className="article-ordered-list">
          {olItems.map((item, idx) => (
            <li key={idx}>{parseInline(item, `${sectionIndex}-ol-${i}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 箇条書き
    if (line.trim().startsWith('・') || line.trim().startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('・') || lines[i].trim().startsWith('- '))) {
        listItems.push(lines[i].trim().replace(/^[・\-]\s?/, ''));
        i++;
      }
      elements.push(
        <ul key={`${sectionIndex}-ul-${i}`} className="article-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInline(item, `${sectionIndex}-ul-${i}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // テーブル
    if (line.trim().startsWith('|')) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableRows.push(lines[i].trim());
        i++;
      }
      const headerRow = tableRows[0];
      const dataRows = tableRows.filter((row, idx) => idx > 0 && !row.match(/^\|[\s\-:]+\|/));
      const headers = headerRow.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
      
      elements.push(
        <div key={`${sectionIndex}-table-${i}`} className="article-table-wrapper">
          <table className="article-table">
            <thead>
              <tr>
                {headers.map((header, hIdx) => (
                  <th key={hIdx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rIdx) => {
                const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
                return (
                  <tr key={rIdx}>
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx}>{parseInline(cell, `${sectionIndex}-td-${i}-${rIdx}-${cIdx}`)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Q&A パターン
    if (/^Q\d+[：:]/.test(line.trim())) {
      const question = line.trim();
      i++;
      const answerLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== '' && !/^Q\d+[：:]/.test(lines[i].trim())) {
        answerLines.push(lines[i].trim());
        i++;
      }
      const answer = answerLines.join(' ').replace(/^A[：:]\s?/, '');
      
      elements.push(
        <div key={`${sectionIndex}-qa-${i}`} className="article-qa">
          <div className="article-qa-question">
            {parseInline(question, `${sectionIndex}-q-${i}`)}
          </div>
          <div className="article-qa-answer">
            {parseInline(answer, `${sectionIndex}-a-${i}`)}
          </div>
        </div>
      );
      continue;
    }

    // 注意点・ポイント
    if (/^(注意点|ポイント|※|💡)/.test(line.trim())) {
      elements.push(
        <p key={`${sectionIndex}-note-${i}`} className="article-note">
          {parseInline(line.trim(), `${sectionIndex}-note-${i}`)}
        </p>
      );
      i++; continue;
    }

    // 見出し風（対策N：、第N位：等）
    if (/^(対策|第|タイプ|条件|習慣|ポイント|サイン|ステップ)\d+[：:]/.test(line.trim())) {
      elements.push(
        <h4 key={`${sectionIndex}-h4-${i}`} className="article-h4">
          {parseInline(line.trim(), `${sectionIndex}-h4-${i}`)}
        </h4>
      );
      i++; continue;
    }

    // インデント行（→）
    if (line.trim().startsWith('→')) {
      const indentItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('→')) {
        indentItems.push(lines[i].trim().slice(1).trim());
        i++;
      }
      elements.push(
        <ul key={`${sectionIndex}-indent-${i}`} className="article-indent-list">
          {indentItems.map((item, idx) => (
            <li key={idx}>{parseInline(item, `${sectionIndex}-indent-${i}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 通常のパラグラフ
    {
      const paragraphLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !lines[i].trim().startsWith('|') &&
        !lines[i].trim().startsWith('・') &&
        !lines[i].trim().startsWith('- ') &&
        !lines[i].trim().startsWith('【') &&
        !lines[i].trim().startsWith('### ') &&
        !/^\d+\.\s/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith('→') &&
        lines[i].trim() !== '---' &&
        !/^Q\d+[：:]/.test(lines[i].trim()) &&
        !/^(対策|第|タイプ|条件|習慣|ポイント|サイン|ステップ)\d+[：:]/.test(lines[i].trim()) &&
        !/^(注意点|ポイント|※|💡)/.test(lines[i].trim())
      ) {
        paragraphLines.push(lines[i].trimEnd());
        i++;
      }
      if (paragraphLines.length > 0) {
        elements.push(
          <p key={`${sectionIndex}-p-${i}`}>
            {paragraphLines.map((pLine, idx) => (
              <span key={idx}>
                {parseInline(pLine, `${sectionIndex}-p-${i}-${idx}`)}
                {idx < paragraphLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      }
    }
  }

  return elements;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const popularArticles = allArticles.filter(a => a.slug !== slug).slice(0, 5);
  const midPoint = Math.floor(article.sections.length / 2);

  return (
    <main className="article-page" style={maxWidth: 'none', padding: 0}>
      <div className="article-layout" style={display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.25rem', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', alignItems: 'start'}>
        {/* メインコンテンツ */}
        <article className="article-content">
          <header className="article-header">
            <div className="article-header-meta">
              <span className="article-header-category">{article.category}</span>
              <time dateTime={article.publishedAt}>{article.publishedAt.replace(/-/g, '.')}</time>
              {article.updatedAt !== article.publishedAt && (
                <span className="article-updated">更新: {article.updatedAt.replace(/-/g, '.')}</span>
              )}
            </div>
            <h1>{article.title}</h1>
            <p className="article-header-description">{article.description}</p>
          </header>

          {/* ヒーロー画像 */}
          {'heroImage' in article && article.heroImage && (
            <div className="article-hero-image">
              <img
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                loading="eager"
              />
            </div>
          )}

          {/* モバイル用目次 */}
          {article.sections.length >= 3 && (
            <nav className="article-toc-mobile">
              <p className="article-toc-title">📋 この記事の内容</p>
              <ol className="article-toc-list">
                {article.sections.map((section, index) => (
                  <li key={index}>
                    <a href={`#section-${index}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="article-body">
            {article.sections.map((section, index) => (
              <div key={index}>
                <section id={`section-${index}`} className="article-section">
                  <h2>{section.heading}</h2>
                  {'image' in section && section.image && (
                    <figure className="article-section-figure">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        loading="lazy"
                      />
                      {'caption' in section.image && section.image.caption && (
                        <figcaption>{section.image.caption}</figcaption>
                      )}
                    </figure>
                  )}
                  {renderContent(section.content, index)}
                </section>
                {index === midPoint && <BlogCTA />}
              </div>
            ))}
          </div>

          <BlogCTA />

          <nav className="article-nav">
            <Link href="/blog" className="article-back-link">
              ← 記事一覧に戻る
            </Link>
          </nav>
        </article>

        {/* サイドバー */}
        <aside className="article-sidebar">
          {/* 診断CTA */}
          <div className="sidebar-cta">
            <div className="sidebar-cta-icon">🔍</div>
            <h3 className="sidebar-cta-title">あなたに最適な枕を見つけよう</h3>
            <p className="sidebar-cta-description">30秒の無料診断で、睡眠の悩みに合った枕を提案します。</p>
            <Link href="/" className="sidebar-cta-button">
              無料で枕診断する →
            </Link>
          </div>

          {/* 目次（デスクトップ用・スクロール追従） */}
          {article.sections.length >= 3 && (
            <nav className="sidebar-toc">
              <p className="sidebar-toc-title">📋 目次</p>
              <ol className="sidebar-toc-list">
                {article.sections.map((section, index) => (
                  <li key={index}>
                    <a href={`#section-${index}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* 人気記事 */}
          {popularArticles.length > 0 && (
            <div className="sidebar-popular">
              <h3 className="sidebar-popular-title">📰 人気の記事</h3>
              <ul className="sidebar-popular-list">
                {popularArticles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`} className="sidebar-popular-link">
                      <span className="sidebar-popular-category">{a.category}</span>
                      <span className="sidebar-popular-text">{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
