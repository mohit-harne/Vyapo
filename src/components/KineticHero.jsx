import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WAYPOINTS = [
  {
    step: "01",
    tag: "Cataloging",
    text: "Easy Cataloging",
    badge: "Instant SKU Sync",
    desc: "Digitize physical store inventories with multi-angle barcode scanning, automated HSN code tagging, and direct WhatsApp catalog publishing.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Digital Handheld Scanner and Product Cataloging Terminal"
  },
  {
    step: "02",
    tag: "Network",
    text: "Simplified Ecosystem",
    subtext: "Connecting Merchants",
    badge: "Direct Distribution",
    desc: "Unify manufacturers, regional stockists, and local retailers under one transparent ledger with verified escrow and dynamic trade credit.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Wholesale Merchant Network and Commercial Exchange"
  },
  {
    step: "03",
    tag: "Procurement",
    text: "Easy Sourcing",
    badge: "Zero Middleman",
    desc: "Direct-from-factory procurement pipelines eliminating intermediary markups, with guaranteed bill-of-lading transit verification.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Freight Transport and Direct Logistics Procurement"
  }
];

export default function KineticHero() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const appCardRef = useRef(null);
  const mobileDeckRef = useRef(null);
  const mobileProgressRef = useRef(null);
  const desktopWaypointsRef = useRef([]);

  useEffect(() => {
    textRefs.current = textRefs.current.filter(Boolean);
    desktopWaypointsRef.current = desktopWaypointsRef.current.filter(Boolean);

    const mm = gsap.matchMedia();

    // ==========================================
    // 1. Initial Load Reveal (Heading Lines)
    // ==========================================
    gsap.fromTo(
      textRefs.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );

    // ==========================================
    // 2. DESKTOP MOTION (min-width: 1024px)
    // ==========================================
    mm.add("(min-width: 1024px)", () => {
      // Float entrance for App Download Hub Card
      if (appCardRef.current) {
        gsap.fromTo(
          appCardRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.4 }
        );
      }

      // Staggered line-draw & image slide for waypoints
      desktopWaypointsRef.current.forEach((section) => {
        const line = section.querySelector('.trace-line');
        const img = section.querySelector('.thumb-preview');
        const content = section.querySelectorAll('.reveal-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Expand horizontal trace line across the section
        if (line) {
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut" });
        }

        // Stagger in content & scale up image thumbnail
        tl.fromTo(
          content,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 0.85, opacity: 0, filter: "grayscale(100%)" },
            { scale: 1, opacity: 1, filter: "grayscale(0%)", duration: 0.7, ease: "back.out(1.2)" },
            "-=0.5"
          );
        }
      });
    });

    // ==========================================
    // 3. MOBILE MOTION (max-width: 1023px)
    // ==========================================
    mm.add("(max-width: 1023px)", () => {
      if (appCardRef.current) {
        gsap.fromTo(
          appCardRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
        );
      }

      const deck = mobileDeckRef.current;
      const prog = mobileProgressRef.current;

      if (deck && prog) {
        const handleScroll = () => {
          const maxScroll = deck.scrollWidth - deck.clientWidth;
          const ratio = maxScroll > 0 ? (deck.scrollLeft / maxScroll) * 100 : 0;
          prog.style.width = `${Math.min(Math.max(ratio, 12), 100)}%`;
        };

        deck.addEventListener("scroll", handleScroll, { passive: true });
        return () => deck.removeEventListener("scroll", handleScroll);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-transparent text-white overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* HERO SECTION: Split Heading (Left) + App Download Hub (Right)  */}
      {/* ============================================================== */}
      <section className="relative min-h-[92vh] flex items-center px-6 sm:px-8 md:px-12 pt-28 pb-16 max-w-[1400px] mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Kinetic Typography Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center select-none">
            <div className="overflow-hidden py-0.5">
              <h1
                ref={(el) => el && (textRefs.current[0] = el)}
                className="text-[14vw] sm:text-[10vw] lg:text-[6.2vw] font-black tracking-tight uppercase leading-[0.88] text-white"
              >
                Wholesale
              </h1>
            </div>

            <div className="overflow-hidden py-0.5">
              <h1
                ref={(el) => el && (textRefs.current[1] = el)}
                className="text-[14vw] sm:text-[10vw] lg:text-[6.2vw] font-black tracking-tight uppercase leading-[0.88]"
                style={{
                  WebkitTextStroke: '1.5px #F59E0B',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Smart.
              </h1>
            </div>

            <div className="overflow-hidden py-0.5">
              <h1
                ref={(el) => el && (textRefs.current[2] = el)}
                className="text-[14vw] sm:text-[10vw] lg:text-[6.2vw] font-black tracking-tight uppercase leading-[0.88] text-white"
              >
                Retail
              </h1>
            </div>

            <div className="overflow-hidden py-0.5 flex items-center gap-4 sm:gap-6">
              <h1
                ref={(el) => el && (textRefs.current[3] = el)}
                className="text-[14vw] sm:text-[10vw] lg:text-[6.2vw] font-black tracking-tight uppercase leading-[0.88] text-amber-500"
              >
                Smarter.
              </h1>
            </div>

            <p className="mt-6 text-white/60 text-base md:text-lg max-w-lg font-light leading-relaxed">
              Real-time inventory synchronization bridging physical warehouse dispatches directly to merchant shelf terminals.
            </p>
          </div>

          {/* RIGHT: High-Impact "Get The App" Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={appCardRef}
              className="relative w-full max-w-md rounded-3xl p-7 md:p-9 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] group overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-700" />
              
              <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Vyapo Merchant App
                </span>
                <span className="text-[11px] font-mono text-white/40">v2.4 Ready</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 relative z-10">
                Trade On The Move.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8 relative z-10 font-light">
                Instant virtual inventory allocations, digital invoice discounting, and instant stock verification right from your pocket.
              </p>

              {/* App Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 relative z-10 mb-6">
                <a
                  href="/download"
                  className="cursor-none flex-1 flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#00D3FF]/50 transition-all duration-300 group/play hover:shadow-[0_0_25px_rgba(0,211,255,0.25)] hover:-translate-y-0.5"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                    alt="Google Play"
                    className="w-6 h-6 object-contain flex-shrink-0 transition-transform duration-300 group-hover/play:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider text-white/50 leading-none">Get it on</span>
                    <span className="block text-xs font-bold text-white tracking-wide mt-0.5 group-hover/play:text-[#00D3FF] transition-colors">Google Play</span>
                  </div>
                </a>

                <a
                  href="/download"
                  className="cursor-none flex-1 flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#007AFF]/50 transition-all duration-300 group/app hover:shadow-[0_0_25px_rgba(0,122,255,0.3)] hover:-translate-y-0.5"
                >
                  <img
                    src="https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/app-store.svg"
                    alt="App Store"
                    className="w-6 h-6 object-contain flex-shrink-0 transition-transform duration-300 group-hover/app:scale-110 drop-shadow-[0_2px_10px_rgba(0,122,255,0.35)]"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider text-white/50 leading-none">Download on</span>
                    <span className="block text-xs font-bold text-white tracking-wide mt-0.5 group-hover/app:text-[#45A3FF] transition-colors">App Store</span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Free Registration For Merchants
                </span>
                <span className="font-mono text-amber-400 font-medium">★★★★★ 4.9</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* MOBILE COMPACT CAROUSEL DECK (< 1024px)                        */}
      {/* ============================================================== */}
      <section className="block lg:hidden px-6 pb-20 pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
            Pipeline Architecture
          </span>
          <span className="text-xs text-white/40">Swipe ➔</span>
        </div>

        <div
          ref={mobileDeckRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WAYPOINTS.map((wp) => (
            <div
              key={wp.step}
              className="min-w-[85vw] sm:min-w-[55vw] snap-center p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-black/50 border border-white/10">
                  <img
                    src={wp.image}
                    alt={wp.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] text-amber-400 bg-black/80 px-2 py-0.5 rounded border border-amber-400/20">
                    {wp.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3 font-mono text-xs text-amber-500">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {wp.step}
                  </span>
                  <span className="uppercase tracking-widest">{wp.tag}</span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                  {wp.text}
                </h3>
                {wp.subtext && (
                  <p className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-2">
                    {wp.subtext}
                  </p>
                )}
              </div>

              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-2">
                {wp.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
          <div
            ref={mobileProgressRef}
            className="h-full bg-amber-500 rounded-full transition-all duration-150"
            style={{ width: '33.33%' }}
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* DESKTOP WAYPOINTS STREAM (With GSAP Line Trace & Mini Thumbnails) */}
      {/* ============================================================== */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-12 pt-8 pb-20">
        <div className="space-y-4">
          {WAYPOINTS.map((wp, idx) => (
            <section
              key={wp.step}
              ref={(el) => (desktopWaypointsRef.current[idx] = el)}
              className="relative p-6 rounded-2xl bg-white/[0.015] border border-white/5 hover:border-white/15 transition-all duration-300 group overflow-hidden"
            >
              {/* Dynamic GSAP Horizontal Trace Line */}
              <div className="trace-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-transparent origin-left scale-x-0" />

              <div className="grid grid-cols-12 gap-6 items-center">
                
                {/* Step Index & Tag Badge */}
                <div className="col-span-2 flex items-center gap-4">
                  <span className="font-mono text-3xl xl:text-4xl font-black text-amber-500/30 group-hover:text-amber-500 transition-colors duration-300">
                    {wp.step}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {wp.tag}
                  </span>
                </div>

                {/* Compact Thumbnail Frame (110px x 68px) */}
                <div className="col-span-2">
                  <div className="w-28 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/10 relative shadow-md group-hover:border-amber-500/40 transition-colors">
                    <img
                      src={wp.image}
                      alt={wp.imageAlt}
                      className="thumb-preview w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Headline & Subtitle */}
                <div className="col-span-4 reveal-text">
                  <h2 className="text-2xl xl:text-3xl font-black uppercase tracking-tight leading-snug text-white group-hover:text-amber-400 transition-colors duration-300">
                    {wp.text}
                  </h2>
                  {wp.subtext && (
                    <span className="font-mono text-xs uppercase tracking-wider text-amber-500/80 block mt-0.5">
                      {wp.subtext}
                    </span>
                  )}
                </div>

                {/* Description & Badge */}
                <div className="col-span-4 border-l border-white/10 pl-6 reveal-text flex flex-col justify-between">
                  <p className="text-white/60 text-xs xl:text-sm leading-relaxed font-light mb-2">
                    {wp.desc}
                  </p>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {wp.badge}
                  </span>
                </div>

              </div>
            </section>
          ))}
        </div>
      </div>

    </div>
  );
}