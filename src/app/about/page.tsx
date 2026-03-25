export default function AboutPage() {
  return (
    <div className="container animate-fade">
      <section style={{ padding: '8rem 0', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '3rem' }}>ABOUT</h1>
        
        <div style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '2rem' }}>
            예술은 언어로 표현하지 못하는 감정을 시각적으로 전달하는 가장 강력한 도구라고 믿습니다.
          </p>
          
          <p style={{ marginBottom: '3rem', opacity: 0.8 }}>
            저는 현대적인 기술과 예술적인 감각을 결합하여 새로운 경험을 창조하는 것을 즐깁니다. 
            이 공간은 저의 여정과 영감을 기록하는 개인적인 기록실이자, 대중과 소통하는 창구입니다.
          </p>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Biography</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', opacity: 0.7 }}>현재 활동 분야: 시각 예술 및 미디어 아트</li>
              <li style={{ marginBottom: '1rem', opacity: 0.7 }}>주요 관심사: 기술과 감성의 조화</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
