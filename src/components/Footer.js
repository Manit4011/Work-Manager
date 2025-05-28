'use client';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-cyan-400 text-2xl font-bold mb-4">WORK MANAGER</h2>
          <p className="text-sm text-gray-300">
            Creating the future of web experiences — modern, fast, and intelligent.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400 transition">About</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition">Services</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social & CTA */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4 text-xl text-cyan-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
          <button className="mt-2 bg-cyan-500 text-black px-5 py-2 rounded-full hover:bg-cyan-400 transition">
            Join the Future
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Manit PVT LTD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
