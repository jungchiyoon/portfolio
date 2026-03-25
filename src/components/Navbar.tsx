import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass">
      <div className="container nav-content">
        <Link href="/" className="logo">JUNG CHIYOON</Link>
        <ul className="nav-links">
          <li><Link href="/about">ABOUT</Link></li>
        </ul>
      </div>
    </nav>
  );
}
