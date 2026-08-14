import { useRouter } from 'next/navigation';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  const router = useRouter();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Highlights', href: '/#highlights' },
    { name: 'Why Attend', href: '/#why-attend' },
    { name: 'Team', href: '/#team' },
    { name: 'Register', href: '/#register' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLink = (href: string) => {
    if (href.startsWith('/#') || href === '/') {
      router.push(href === '/' ? '/' : href);
      if (href.startsWith('/#')) {
        const id = href.split('#')[1];
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 160);
      }
      return;
    }
    router.push(href);
  };

  return (
    <footer
      id="footer"
      className="clay-surface relative mt-12 overflow-hidden pb-0 pt-8"
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
                Startup{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, var(--brand-sky), var(--brand-orange))',
                  }}
                >
                  Confluence
                </span>{' '}
                2.0
              </h2>
            </div>
            
            <div className="clay-card clay-card--blue group relative overflow-hidden rounded-[1.5rem] p-6">
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
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => handleLink(link.href)}
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
              ].map((social) => (
                <a 
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-chip flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-[color:var(--text-inverse)]"
                  style={{ color: social.color }}
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
                <a href="mailto:incubation@ugi.edu.in" className="text-sm font-medium transition-all active:scale-95 block" style={{ color: 'var(--text-primary)' }}>
                  incubation@ugi.edu.in
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
              ].map((social) => (
                <a 
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-chip flex h-14 w-14 items-center justify-center rounded-[18px] transition-all duration-300 active:scale-95 hover:-translate-y-1"
                  style={{ color: social.color }}
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
              <a
                href="https://www.instagram.com/harsh_srivastava_1010/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent font-medium transition-colors"
              >
                Harsh Srivastava
              </a>
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
