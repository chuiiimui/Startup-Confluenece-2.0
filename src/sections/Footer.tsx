import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Events', id: 'highlights' },
    { name: 'Speakers', id: 'speakers' },
    { name: 'Register', id: 'register' }
  ];

  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-space font-bold text-white">Startup Confluence <span className="text-accent">2.0</span></h2>
            <p className="text-text leading-relaxed">
              India's premier startup summit bridging the gap between innovative ideas and extraordinary execution.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleScroll(link.id)}
                    className="text-text hover:text-accent transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Connect</h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaLinkedin className="w-5 h-5" />, href: "#" },
                { icon: <FaInstagram className="w-5 h-5" />, href: "#" },
                { icon: <FaFacebook className="w-5 h-5" />, href: "#" },
                { icon: <FaYoutube className="w-5 h-5" />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 hover:bg-accent text-white rounded-xl flex items-center justify-center transition-all border border-white/10 hover:border-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-text mb-4">Subscribe for updates on speakers and schedule.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-dark/50 border border-white/10 text-white rounded-l-xl px-4 py-3 w-full focus:outline-none focus:border-accent"
              />
              <button 
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-r-xl transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center md:flex md:justify-between md:text-left text-sm text-text">
          <p>© 2026 Startup Confluence 2.0 · United Incubation Hub</p>
          <p className="mt-2 md:mt-0">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
