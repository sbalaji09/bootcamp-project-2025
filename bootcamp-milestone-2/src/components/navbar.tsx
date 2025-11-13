import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="hero-nav">
      <ul>
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#projects">Projects</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
        <li><Link href="/blogs">Blog</Link></li>
      </ul>
    </nav>
  );
}