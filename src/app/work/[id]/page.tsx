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
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', background: 'var(--accent)' }}>
          {work.type === 'image' ? (
            <img src={work.filename} alt={work.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          ) : (
            <video src={work.filename} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>
        
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>{work.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{work.description}</p>
        </div>
      </div>
    </div>
  );
}
