import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const logoWatermarkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.fromTo(
        logoWatermarkRef.current,
        { yPercent: 20, scale: 0.9, opacity: 0.03 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 0.08,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/vyaparnama/?originalSubdomain=in',
      hoverBorder: 'hover:border-[#0A66C2]/60 hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linkedin.svg',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/vyaparnama/',
      hoverBorder: 'hover:border-[#E4405F]/60 hover:shadow-[0_0_15px_rgba(228,64,95,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/instagram.svg',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@vyaparnama',
      hoverBorder: 'hover:border-[#FF0000]/60 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/youtube.svg',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/vyaparnama',
      hoverBorder: 'hover:border-[#1877F2]/60 hover:shadow-[0_0_15px_rgba(24,119,242,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/facebook.svg',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/919890229131',
      hoverBorder: 'hover:border-[#25D366]/60 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/whatsapp.svg',
    },
    {
      name: 'Google Maps',
      href: 'https://www.google.com/maps/place/PrimaThink/@20.9625999,77.7764722,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd6a30bc0000071:0x25ccfdcd93fb580b!8m2!3d20.9625949!4d77.7790471!16s%2Fg%2F11ckq_07yb?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
      hoverBorder: 'hover:border-[#FF5A5F]/60 hover:shadow-[0_0_15px_rgba(255,90,95,0.4)]',
      iconUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-maps.svg',
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[50vh] sm:min-h-[58vh] bg-[#050505] overflow-hidden flex flex-col justify-between pt-10 sm:pt-14 pb-5 border-t border-white/10"
    >
      {/* Background Parallax Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <img
          ref={logoWatermarkRef}
          src="/vyapo.png"
          alt="Vyapo Watermark"
          className="w-[85vw] max-w-3xl h-auto object-contain filter grayscale contrast-125 will-change-transform opacity-10"
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-7 border-b border-white/5">
          
          {/* Top/Col 1: Mission & Brand Statement */}
          <div className="md:col-span-5 space-y-2.5">
            <p className="text-vyapo text-xs tracking-[0.2em] uppercase font-mono font-semibold">
              The Supply Chain
            </p>
            <p className="text-white text-base sm:text-xl font-light leading-snug">
              We are Making Wholesale Smart and Retail Smarter.
            </p>
            <div className="inline-flex items-center gap-2 pt-0.5 font-mono text-[11px] text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Network Active</span>
            </div>
          </div>

          {/* MOBILE 2-COLUMN SPLIT */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            
            {/* Col 2: Platform Links */}
            <div className="md:col-span-3 space-y-2">
              <p className="text-vyapo text-xs uppercase tracking-[0.2em] font-mono font-semibold">
                Platform
              </p>
              <div className="flex flex-col space-y-1.5 text-xs text-white/60">
                <a href="/Services" className="cursor-none hover:text-vyapo transition-colors">Services</a>
                <a href="/Features" className="cursor-none hover:text-vyapo transition-colors">Features</a>
                <a href="/download" className="cursor-none hover:text-vyapo transition-colors">Downloads</a>
                <a href="/about" className="cursor-none hover:text-vyapo transition-colors">About</a>
                <a href="/contact" className="cursor-none hover:text-vyapo transition-colors">Contact</a>
                <a href="/MerchantStories" className="cursor-none hover:text-vyapo transition-colors">Stories</a>
                <a href="/Blogs" className="cursor-none hover:text-vyapo transition-colors">Blogs</a>
              </div>
            </div>

            {/* Col 3: Headquarters & Grid Socials */}
            <div className="md:col-span-4 space-y-2">
              <p className="text-vyapo text-xs uppercase tracking-[0.2em] font-mono font-semibold">
                Headquarters
              </p>
              <div className="text-xs text-white/60 space-y-0.5 font-light">
                <p className="text-white font-medium text-[11px] sm:text-xs">Vyapo Technologies Pvt. Ltd.</p>
                <p className="text-[11px] sm:text-xs">PrimaThink, Amravati, Maharashtra, India</p>
                <a href="mailto:info@vyapo.com" className="cursor-none font-mono text-vyapo hover:underline block pt-0.5 text-[11px] sm:text-xs">
                  info@vyapo.com
                </a>
                <a href="https://wa.me/919890229131" target="_blank" rel="noopener noreferrer" className="cursor-none font-mono text-emerald-400 hover:underline block text-[11px] sm:text-xs">
                  +91 98902 29131
                </a>
              </div>

              {/* Social Icons - Clean Borderless Grid */}
              <div className="pt-2 grid grid-cols-4 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="cursor-none p-1 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 group/icon"
                  >
                    <img
                      src={s.iconUrl}
                      alt={s.name}
                      className="w-5 h-5 object-contain transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] pointer-events-none"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Legal & Back to Top */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full z-10 pt-3.5 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-xs font-mono text-white/40">
        <p className="text-center sm:text-left text-[10px] sm:text-[11px]">
          © 2026 Vyapo Business Network. All rights reserved.
        </p>

        <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
          <a href="/privacy" className="cursor-none hover:text-vyapo transition-colors uppercase">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="cursor-none hover:text-vyapo transition-colors uppercase">
            Terms of Service
          </a>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="cursor-none hover:text-vyapo transition-colors uppercase flex items-center gap-1 group"
          >
            <span>Top</span>
            <span className="group-hover:-translate-y-0.5 transition-transform duration-200">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}