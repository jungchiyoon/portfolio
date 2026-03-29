'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';

export default function WorkDetail() {
  const { id } = useParams();
  const work = portfolioData.find((item) => item.id === id);

  if (!work) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1>Work not found</h1>
        <Link href="/" style={{ marginTop: '2rem', display: 'inline-block', textDecoration: 'underline' }}>
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade" style={{ padding: '4rem 0' }}>
      <Link href="/" style={{ marginBottom: '2rem', display: 'inline-block', opacity: 0.6 }}>
        &larr; Back to Gallery
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Top Image (Now using detailImage) */}
        {work.detailImage && (
          <div style={{ width: '100%', background: 'var(--accent)' }}>
            <img src={work.detailImage} alt={`${work.title} detail`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}
        
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '12pt', fontWeight: 300, color: '#999999', margin: 0 }}>{work.title}</h1>
            <span style={{ fontSize: '12pt', fontWeight: 300, color: '#999999' }}>
              {work.medium} {work.dimensions}
            </span>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{work.description}</p>
        </div>

        {/* Bottom Image (Now using filename, reduced to 50%) */}
        <div style={{ width: '50%', overflow: 'hidden', background: 'var(--accent)' }}>
          {work.type === 'image' ? (
            <img src={work.filename} alt={work.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          ) : (
            <video src={work.filename} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>
      </div>
    </div>
  );
}
