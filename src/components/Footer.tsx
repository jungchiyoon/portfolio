export default function Footer() {
  return (
    <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Artist Portfolio. Created with Antigravity.
        </p>
      </div>
    </footer>
  );
}
