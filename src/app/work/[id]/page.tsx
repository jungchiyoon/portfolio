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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
        {/* Top Image & Caption Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {work.detailImage && (
            <div style={{ width: '100%', background: 'var(--accent)' }}>
              <img src={work.detailImage} alt={`${work.title} detail`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}
          
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
              <h1 style={{ fontSize: '10pt', fontWeight: 300, color: '#999999', margin: 0 }}>{work.title}</h1>
              <span style={{ fontSize: '10pt', fontWeight: 300, color: '#999999' }}>
                {work.medium} {work.dimensions}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Statement (Left) + Image (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginTop: '1.5rem' }}>
          <div style={{ fontSize: 10, color: '#404040', fontWeight: 300, lineHeight: 1.8, whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
            {work.description}
          </div>
          <div style={{ width: '100%', overflow: 'hidden', background: 'var(--accent)' }}>
            {work.type === 'image' ? (
              <img src={work.filename} alt={work.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            ) : (
              <video src={work.filename} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
