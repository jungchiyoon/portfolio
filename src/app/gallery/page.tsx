import portfolioData from '@/data/portfolio.json';

export default function GalleryPage() {
  return (
    <div className="container">
      <header style={{ padding: '6rem 0 2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 700 }}>Gallery</h1>
        <p style={{ color: 'var(--secondary)' }}>A collection of recent works and experiments.</p>
      </header>

      <div className="gallery-grid">
        {portfolioData.map((item) => (
          <div key={item.id} className="gallery-item animate-fade">
            {item.type === 'video' ? (
              <video src={`/portfolio/${item.filename}`} autoPlay muted loop playsInline />
            ) : (
              <img src={`/portfolio/${item.filename}`} alt={item.title} />
            )}
            <div className="gallery-overlay">
              <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {portfolioData.length === 0 && (
        <div style={{ padding: '10rem 0', textAlign: 'center', opacity: 0.5 }}>
          <p>No items found in the gallery.</p>
        </div>
      )}
    </div>
  );
}
