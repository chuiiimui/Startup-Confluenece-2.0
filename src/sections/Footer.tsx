import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    if (id === 'register') {
      navigate('/register');
      return;
    }
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
    <footer
      id="footer"
      className="relative overflow-hidden pt-8 pb-0 mt-12"
      style={{ background: 'var(--surface)' }}
    >
      {/* Top glowing separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
      
      {/* Large watermark background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[10rem] lg:text-[15rem] font-heading font-black opacity-[0.02] whitespace-nowrap pointer-events-none select-none">
        CONFLUENCE
      </div>

      {/* Mobile Background Orbs */}
      <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* DESKTOP FOOTER */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-8">
          {/* Brand & UIH Bio Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-3xl font-heading font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Startup <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF9F43]">Confluence</span> 2.0
              </h2>
            </div>
            
            <div className="p-6 rounded-[1.5rem] border backdrop-blur-xl shadow-2xl relative overflow-hidden group" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-lg font-bold text-accent flex items-center gap-2 mb-3">
                <span className="text-2xl">✨🚀</span> UIH – Nurturing Innovators
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                United Incubation Hub (UIH) is a premier startup incubator, officially authorised by <strong>StartinUP</strong> under the UP Startup Policy of the Government of Uttar Pradesh. We are dedicated to bridging the gap between innovative ideas and extraordinary execution.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:pl-10">
            <h3 className="text-lg font-heading font-bold mb-8 uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Explore</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleScroll(link.id)}
                    className="group flex items-center text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="w-4 h-[1px] bg-accent mr-3 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    <span className="group-hover:text-accent transition-colors">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-heading font-bold mb-8 uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Connect</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Follow the official page links for regular updates.</p>
            
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <FaLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/united-incubation-hub/", color: "#0077b5" },
                { icon: <FaInstagram className="w-5 h-5" />, href: "https://www.instagram.com/united_incubationhub?igsh=dGNxdTl6amwxbWJy", color: "#E1306C" },
                { icon: <FaFacebook className="w-5 h-5" />, href: "https://www.facebook.com/share/1B7u65PANq/", color: "#1877F2" },
                { icon: <FaYoutube className="w-5 h-5" />, href: "https://youtube.com/@unitedincubationhub?si=phJkowpp_LhV8pGu", color: "#FF0000" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,122,0,0.2)] hover:border-accent hover:bg-accent hover:text-white"
                  style={{ background: 'var(--surface)', color: social.color, borderColor: 'var(--border)' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE FOOTER (PREMIUM REDESIGN) */}
        <div className="md:hidden flex flex-col items-center text-center space-y-10 mt-8 mb-4 px-2">
          
          {/* Get In Touch */}
          <div className="flex flex-col items-center space-y-8">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-accent mb-1">Phone</span>
                <a href="tel:+916390903018" className="text-sm font-medium transition-all active:scale-95" style={{ color: 'var(--text-primary)' }}>
                  +91-6390903018
                </a>
                <a href="tel:+918953615232" className="mt-1 text-sm font-medium transition-all active:scale-95" style={{ color: 'var(--text-primary)' }}>
                  +91-89536 15232
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-accent mb-1">Email</span>
                <a href="mailto:startupconfluence@ugi.edu.in" className="text-sm font-medium mb-1 transition-all active:scale-95 block" style={{ color: 'var(--text-primary)' }}>
                  startupconfluence@ugi.edu.in
                </a>
                <a href="mailto:incubation@united.edu.in" className="text-sm font-medium transition-all active:scale-95 block" style={{ color: 'var(--text-primary)' }}>
                  incubation@united.edu.in
                </a>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-accent mb-1">Location</span>
                <a href="https://maps.google.com/?q=United+Institute+of+Technology,+Prayagraj" target="_blank" rel="noopener noreferrer" className="text-sm font-medium leading-tight max-w-[200px] transition-all active:scale-95 block" style={{ color: 'var(--text-primary)' }}>
                  United Institute of Technology<br/>Prayagraj
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-center space-y-8">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Follow Us</h3>
            
            <div className="flex flex-row justify-center gap-4">
              {[
                { icon: <FaLinkedin className="w-6 h-6" />, href: "https://www.linkedin.com/company/united-incubation-hub/", color: "#0077b5" },
                { icon: <FaInstagram className="w-6 h-6" />, href: "https://www.instagram.com/united_incubationhub?igsh=dGNxdTl6amwxbWJy", color: "#E1306C" },
                { icon: <FaFacebook className="w-6 h-6" />, href: "https://www.facebook.com/share/1B7u65PANq/", color: "#1877F2" },
                { icon: <FaYoutube className="w-6 h-6" />, href: "https://youtube.com/@unitedincubationhub?si=phJkowpp_LhV8pGu", color: "#FF0000" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:border-accent/30"
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    color: social.color
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section (Unified for both) */}
        <div className="pt-4 pb-4 mt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium tracking-wide" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <p className="md:flex-1 text-center md:text-left">
            © {new Date().getFullYear()} Startup Confluence 2.0
          </p>
          
          <div className="md:flex-1 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Crafted with ❤️ by{' '}
              <a
                href="https://ayushyadav.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent font-medium transition-colors"
              >
                Ayush Yadav
              </a>
              {' '}&{' '}
              <span className="hover:text-accent font-medium transition-colors">
                Harsh Srivastava
              </span>
            </p>
          </div>

          <div className="md:flex-1 flex items-center justify-center md:justify-end gap-2">
            <span>Powered by</span>
            <strong className="text-accent">United Incubation Hub</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
