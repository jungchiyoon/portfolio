import Link from 'next/link';
import AsciiVideo from '@/components/AsciiVideo';
import portfolioData from '@/data/portfolio.json';

export default function Home() {
  return (
    <div className="container">
      <section style={{ padding: '2rem 0 4rem 0' }}>
        <div className="gallery-grid">
          {portfolioData.map((item) => (
            <Link key={item.id} href={`/work/${item.id}`} className="gallery-item">
              {item.id === 'work-04' ? (
                <AsciiVideo 
                  src={item.filename} 
                  width={100} 
                  fontSize="5px" 
                  backgroundColor="#F78989" 
                  color="#000000"
                  subtitle="⠏⠗⠑⠞⠁⠗⠊⠁"
                  subtitleColor="#ffffff"
                  subtitleFontSize="8px"
                  autoPlay={true} 
                />
              ) : item.type === 'image' ? (
                <img src={item.filename} alt={item.title} />
              ) : (
                <video src={item.filename} muted loop onMouseOver={(e) => e.currentTarget.play()} onMouseOut={(e) => e.currentTarget.pause()} />
              )}
              <div className="gallery-overlay">
                <h3>
                  {item.id === 'work-01' ? (
                    <>
                      <span style={{ fontSize: 'calc(1em - 1pt)' }}>■□■□■</span> 2023
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
