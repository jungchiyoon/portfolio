import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <section className="hero animate-fade">
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.6 }}>Portfolio</p>
        <h1>Creative Visionary.</h1>
        <p>
          이미지와 영상을 통해 이야기하는 예술가의 공간입니다. 
          세상의 모든 아름다움을 기록하고 공유합니다.
        </p>
        <Link href="/gallery" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600, border: '1px solid var(--foreground)' }}>
          View Gallery
        </Link>
      </section>

      <section style={{ padding: '8rem 0' }}>
        <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Featured Work</h2>
        {/* We can repeat a few highlights here later */}
        <div style={{ padding: '4rem', background: 'var(--glass)', borderRadius: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--secondary)' }}>
            `public/portfolio` 폴더에 사진과 영상을 넣고 작품을 소개해 보세요.
          </p>
        </div>
      </section>
    </div>
  );
}
