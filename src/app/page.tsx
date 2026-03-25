import portfolioData from '../data/portfolio.json';

export default function Home() {
  return (
    <div className="container">
      <section style={{ padding: '2rem 0 4rem 0' }}>
        <div className="gallery-grid">
          {portfolioData.map((item) => (
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
