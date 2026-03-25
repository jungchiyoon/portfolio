import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass">
      <div className="container nav-content">
        <Link href="/" className="logo">ARTIST PORTFOLIO</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}
