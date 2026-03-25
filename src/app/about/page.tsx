export default function AboutPage() {
  return (
    <div className="container">
      <section style={{ padding: '10rem 0' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About the Artist</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '1/1', borderRadius: '24px', border: '1px solid var(--glass-border)', background: 'var(--accent)' }}>
            {/* Artist photo placeholder */}
          </div>
          <div>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
              예술은 언어로 표현하지 못하는 감정을 시각적, 청각적으로 전달하는 가장 강력한 도구입니다.
            </p>
            <p style={{ opacity: 0.8 }}>
              저는 현대적인 기술과 예술적인 감각을 결합하여 새로운 경험을 창조하는 것을 즐깁니다. 
              이 공간은 저의 여정과 영감을 기록하는 개인적인 기록실이자, 대중과 소통하는 창구입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
