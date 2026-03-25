import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass">
      <div className="container nav-content">
        <Link href="/" className="logo">JUNG CHIYOON</Link>
      </div>
    </nav>
  );
}
