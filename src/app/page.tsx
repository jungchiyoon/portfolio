import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';

export default function Home() {
  return (
    <div className="container">
      <section style={{ padding: '2rem 0 4rem 0' }}>
        <div className="gallery-grid">
          {portfolioData.map((item) => (
            <Link href={`/work/${item.id}`} key={item.id} className="gallery-item animate-fade">
              {item.type === 'image' ? (
                <img src={item.filename} alt={item.title} />
              ) : (
                <video src={item.filename} muted loop onMouseOver={(e) => e.currentTarget.play()} onMouseOut={(e) => e.currentTarget.pause()} />
              )}
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
