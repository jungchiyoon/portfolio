'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';
import Navbar from '@/components/Navbar';


export default function WorkDetail() {
  const { id } = useParams();
  const [language, setLanguage] = useState<'KR' | 'ENG'>('KR');
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
    <div className="container animate-fade work-detail-container">
      {/* Specific layout for the first work (work-01) */}
      {work.id === 'work-01' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Image: Main Thumbnail (Swapped) */}
          <div style={{ width: '100%', background: 'var(--accent)', overflow: 'hidden' }}>
            <img src={work.filename} alt={work.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Caption (Title/Metadata) */}
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
              <h1 style={{ fontSize: '10pt', fontWeight: 300, color: '#999999', margin: 0 }}>{work.title}</h1>
              <span style={{ fontSize: '10pt', fontWeight: 300, color: '#999999' }}>
                {work.medium} {work.dimensions}
              </span>
            </div>
          </div>

          {/* Bottom Section: Statement (Left) + Detail Image (Right, 50%) */}
          <div className="work-01-bottom-section">
            <div style={{ position: 'relative' }}>
              <div 
                key={language}
                className="animate-fade-opacity"
                style={{ fontSize: '12pt', color: '#404040', fontWeight: 300, lineHeight: 1.8, whiteSpace: 'pre-wrap', textAlign: 'justify' }}
              >
                {language === 'KR' && (work as any).descriptionKr ? (work as any).descriptionKr : work.description}
              </div>
              
              {/* KR ENG toggle */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem', fontSize: '10pt', color: '#999999' }}>
                <span 
                  onClick={() => setLanguage('KR')} 
                  style={{ cursor: 'pointer', fontWeight: language === 'KR' ? 600 : 300, color: language === 'KR' ? '#404040' : '#999999', transition: 'all 0.2s ease' }}
                >
                  KR
                </span>
                <span>|</span>
                <span 
                  onClick={() => setLanguage('ENG')} 
                  style={{ cursor: 'pointer', fontWeight: language === 'ENG' ? 600 : 300, color: language === 'ENG' ? '#404040' : '#999999', transition: 'all 0.2s ease' }}
                >
                  ENG
                </span>
              </div>
            </div>
            {work.detailImage && (
              <div style={{ width: '100%', overflow: 'hidden', background: 'var(--accent)' }}>
                <img src={work.detailImage} alt={`${work.title} detail`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Default layout for other works (like work-02) */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
          {/* Main Work Image (Large & Centered) */}
          <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ width: '100%', background: 'var(--accent)', overflow: 'hidden' }}>
              {work.type === 'image' ? (
                <img 
                  src={work.filename} 
                  alt={work.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block',
                    filter: work.id === 'work-03' ? 'brightness(1.1)' : 'none'
                  }} 
                />
              ) : (
                <video src={work.filename} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
              )}
            </div>

            {/* Caption & Statement (Bottom Left of Image) */}
            <div style={{ maxWidth: '600px', alignSelf: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '10pt', fontWeight: 300, color: '#999999', margin: 0 }}>{work.title}</h1>
                <span style={{ fontSize: '10pt', fontWeight: 300, color: '#999999' }}>
                  {work.medium} {work.dimensions}
                </span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <div 
                  key={language}
                  className="animate-fade-opacity"
                  style={{ fontSize: '12pt', color: '#404040', fontWeight: 300, lineHeight: 1.8, whiteSpace: 'pre-wrap', textAlign: 'justify' }}
                >
                  {language === 'KR' && (work as any).descriptionKr ? (work as any).descriptionKr : work.description}
                </div>
                
                {/* KR ENG toggle */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem', fontSize: '10pt', color: '#999999' }}>
                  <span 
                    onClick={() => setLanguage('KR')} 
                    style={{ cursor: 'pointer', fontWeight: language === 'KR' ? 600 : 300, color: language === 'KR' ? '#404040' : '#999999', transition: 'all 0.2s ease' }}
                  >
                    KR
                  </span>
                  <span>|</span>
                  <span 
                    onClick={() => setLanguage('ENG')} 
                    style={{ cursor: 'pointer', fontWeight: language === 'ENG' ? 600 : 300, color: language === 'ENG' ? '#404040' : '#999999', transition: 'all 0.2s ease' }}
                  >
                    ENG
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Detail Image (Optional, also centered) */}
          {work.detailImage && (
            <div style={{ width: '100%', maxWidth: '1000px', background: 'var(--accent)' }}>
              <img src={work.detailImage} alt={`${work.title} detail`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
