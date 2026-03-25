import portfolioData from '../data/portfolio.json';

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
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="gallery-grid">
          {portfolioData.items.map((item) => (
            <div key={item.id} className="gallery-item animate-fade">
              {item.type === 'image' ? (
                <img src={item.filename} alt={item.title} loading="lazy" />
              ) : (
                <video src={item.filename} controls />
              )}
              <div className="item-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
