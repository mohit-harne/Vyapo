import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const linksContainerRef = useRef(null);
  const linksRef = useRef({});
  const mobileRowsRef = useRef([]);
  const mobileBackdropRef = useRef(null);
  const contactDropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const contactSubItems = [
    { label: 'Get in Touch', href: '/contact', desc: 'Direct communications & inquiries' },
    { label: 'Careers', href: '/careers', desc: 'Join the execution team' },
  ];

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Merchant Stories', href: '/MerchantStories' },
    { label: 'Blogs', href: '/Blogs' },
    { label: 'About Us', href: '/about' },
    { label: 'Downloads', href: '/download' },
    {
      label: 'Contact Us',
      isDropdown: true,
      subItems: contactSubItems,
    },
  ];

  // Helper to check if item is the active route
  const isActive = (href) => {
    if (!currentPath || !href) return false;
    const cleanCurrent = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    const cleanHref = href.toLowerCase().replace(/\/$/, '') || '/';

    if (cleanHref === '/') {
      return cleanCurrent === '/';
    }
    return cleanCurrent === cleanHref || cleanCurrent.startsWith(`${cleanHref}/`);
  };

  const isContactActive = () => {
    return contactSubItems.some((sub) => isActive(sub.href));
  };

  // 1. Position Pill to Active Link (Default resting state)
  const positionPillToActive = () => {
    if (!linksContainerRef.current || !pillRef.current) return;

    let activeEl = null;

    if (isContactActive()) {
      activeEl = linksRef.current['contact-dropdown'];
    } else {
      const activeItem = navItems.find((item) => !item.isDropdown && isActive(item.href));
      if (activeItem) {
        activeEl = linksRef.current[activeItem.href];
      }
    }

    if (!activeEl) {
      gsap.to(pillRef.current, { opacity: 0, scaleX: 0.8, duration: 0.3 });
      return;
    }

    const navBounds = linksContainerRef.current.getBoundingClientRect();
    const linkBounds = activeEl.getBoundingClientRect();
    const x = linkBounds.left - navBounds.left;
    const width = linkBounds.width;

    gsap.to(pillRef.current, {
      x,
      width,
      opacity: 1,
      scaleX: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  // 2. Initial Setup, Route Listener, & Scroll Handler
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    updatePath();

    window.addEventListener('popstate', updatePath);
    document.addEventListener('astro:page-load', updatePath);

    // Initial Navbar Mount Entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.15 }
    );

    // Scroll Detection
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      if (containerRef.current) {
        if (isScrolled) {
          gsap.to(containerRef.current, {
            maxWidth: '1200px',
            paddingTop: '0.65rem',
            paddingBottom: '0.65rem',
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(containerRef.current, {
            maxWidth: '1280px',
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('popstate', updatePath);
      document.removeEventListener('astro:page-load', updatePath);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update resting pill whenever currentPath changes
  useEffect(() => {
    positionPillToActive();
  }, [currentPath]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(e.target)) {
        setContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. Desktop Hover Handlers
  const handleMouseEnter = (e) => {
    const link = e.currentTarget;
    const navBounds = linksContainerRef.current?.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();

    if (!navBounds || !pillRef.current) return;

    const x = linkBounds.left - navBounds.left;
    const width = linkBounds.width;

    gsap.to(pillRef.current, {
      x,
      width,
      opacity: 1,
      scaleX: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    positionPillToActive();
  };

  // 4. Mobile Drawer Animation
  useEffect(() => {
    const validRows = mobileRowsRef.current.filter(Boolean);

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(mobileBackdropRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.fromTo(
        validRows,
        { y: 40, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      document.body.style.overflow = 'auto';

      gsap.to(validRows, {
        y: -15,
        opacity: 0,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.in',
      });

      gsap.to(mobileBackdropRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.35,
        ease: 'power2.in',
        delay: 0.1,
      });

      setMobileContactOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 w-full z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300"
      >
        <div
          ref={containerRef}
          className={`mx-auto pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 border ${
            scrolled
              ? 'bg-[#0a0a0a]/85 backdrop-blur-2xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] px-5 sm:px-7 py-2.5 mt-3'
              : 'bg-transparent border-transparent px-2 sm:px-4 py-5 mt-0'
          }`}
        >
          {/* Logo with Amber Glow */}
          <a href="/" className="flex items-center group cursor-none z-50 relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full bg-vyapo/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
            <img
              src="/vyapo.png"
              alt="Vyapo Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)] relative z-10"
            />
          </a>

          {/* Desktop Nav with Floating Pill Spotlight */}
          <div
            ref={linksContainerRef}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:flex items-center relative rounded-full px-2 py-1 bg-white/[0.02] border border-white/5"
          >
            {/* Sliding Pill Indicator */}
            <div
              ref={pillRef}
              className="absolute left-0 top-1 bottom-1 rounded-full bg-gradient-to-r from-vyapo/20 to-amber-500/15 border border-vyapo/50 opacity-0 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            ></div>

            {navItems.map((item) => {
              if (item.isDropdown) {
                const active = isContactActive();
                return (
                  <div
                    key="contact-dropdown"
                    ref={contactDropdownRef}
                    className="relative"
                    onMouseEnter={() => setContactOpen(true)}
                    onMouseLeave={() => setContactOpen(false)}
                  >
                    <button
                      type="button"
                      ref={(el) => (linksRef.current['contact-dropdown'] = el)}
                      onMouseEnter={handleMouseEnter}
                      onClick={() => setContactOpen(!contactOpen)}
                      className={`relative z-10 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-200 cursor-none flex items-center gap-1.5 bg-transparent border-none ${
                        active || contactOpen
                          ? 'text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-3 h-3 transition-transform duration-300 ${
                          contactOpen ? 'rotate-180 text-vyapo' : 'text-white/40'
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {active && (
                        <span className="w-1 h-1 rounded-full bg-vyapo shadow-[0_0_6px_#F59E0B]"></span>
                      )}
                    </button>

                    {/* Desktop Submenu Popover */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-200 ${
                        contactOpen
                          ? 'opacity-100 pointer-events-auto translate-y-0'
                          : 'opacity-0 pointer-events-none -translate-y-2'
                      }`}
                    >
                      <div className="rounded-2xl bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-2xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.9)] space-y-1">
                        {item.subItems.map((sub) => {
                          const subActive = isActive(sub.href);
                          return (
                            <a
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setContactOpen(false)}
                              className={`block p-2.5 rounded-xl transition-all duration-200 cursor-none ${
                                subActive
                                  ? 'bg-vyapo/15 border border-vyapo/30'
                                  : 'hover:bg-white/[0.04] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs font-mono uppercase tracking-wider font-bold ${
                                    subActive ? 'text-vyapo' : 'text-white group-hover:text-vyapo'
                                  }`}
                                >
                                  {sub.label}
                                </span>
                                {subActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-vyapo animate-pulse"></span>
                                )}
                              </div>
                              <p className="text-[10px] text-white/40 font-light mt-0.5 leading-tight">
                                {sub.desc}
                              </p>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  ref={(el) => (linksRef.current[item.href] = el)}
                  href={item.href}
                  onMouseEnter={handleMouseEnter}
                  className={`relative z-10 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-200 cursor-none flex items-center gap-1.5 ${
                    active ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="w-1 h-1 rounded-full bg-vyapo shadow-[0_0_6px_#F59E0B]"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Status Pill & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Mainnet Active
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 z-50 cursor-none focus:outline-none transition-colors duration-300 hover:border-vyapo/50"
              aria-label="Toggle Navigation"
            >
              <span
                className={`bg-white h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
                  isOpen ? 'rotate-45 translate-y-[5.5px] !bg-vyapo' : '-translate-y-1'
                }`}
              ></span>
              <span
                className={`bg-white h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`bg-white h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
                  isOpen ? '-rotate-45 -translate-y-[5.5px] !bg-vyapo' : 'translate-y-1'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        ref={mobileBackdropRef}
        className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl z-40 opacity-0 pointer-events-none lg:hidden flex flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto"
      >
        <div className="absolute top-1/4 right-0 w-[240px] h-[240px] bg-vyapo/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 left-0 w-[200px] h-[200px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="w-full max-w-sm mx-auto space-y-1">
          {navItems.map((item, idx) => {
            if (item.isDropdown) {
              const active = isContactActive();
              return (
                <div
                  key="mobile-contact"
                  ref={(el) => (mobileRowsRef.current[idx] = el)}
                  className={`border-b transition-colors ${
                    active ? 'border-vyapo/30 bg-white/[0.02] px-2 rounded-lg' : 'border-white/5'
                  }`}
                >
                  {/* Non-routing toggle button */}
                  <button
                    type="button"
                    onClick={() => setMobileContactOpen(!mobileContactOpen)}
                    className="w-full py-3 flex items-center justify-between group cursor-none bg-transparent border-none text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          active ? 'text-vyapo' : 'text-vyapo/50 group-hover:text-vyapo'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-xl sm:text-2xl font-bold uppercase tracking-tight transition-colors ${
                          active || mobileContactOpen ? 'text-vyapo' : 'text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileContactOpen ? 'rotate-180 text-vyapo' : 'text-white/40'
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Expandable Mobile Accordion Options */}
                  {mobileContactOpen && (
                    <div className="pl-8 pr-2 pb-3 pt-1 space-y-2 border-t border-white/5 mt-1">
                      {item.subItems.map((sub) => {
                        const subActive = isActive(sub.href);
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileContactOpen(false);
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-none ${
                              subActive ? 'bg-vyapo/10 text-vyapo' : 'text-white/70 hover:text-white'
                            }`}
                          >
                            <span className="text-base font-semibold uppercase tracking-tight font-mono">
                              {sub.label}
                            </span>
                            <span className="font-mono text-xs text-vyapo">
                              {subActive ? '●' : '→'}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <div
                key={item.href}
                ref={(el) => (mobileRowsRef.current[idx] = el)}
                className={`border-b py-3 transition-colors ${
                  active ? 'border-vyapo/30 bg-white/[0.02] px-2 rounded-lg' : 'border-white/5'
                }`}
              >
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between group cursor-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs ${
                        active ? 'text-vyapo' : 'text-vyapo/50 group-hover:text-vyapo'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-xl sm:text-2xl font-bold uppercase tracking-tight transition-colors ${
                        active ? 'text-vyapo' : 'text-white group-hover:text-vyapo'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs transition-all ${
                      active
                        ? 'text-vyapo font-bold'
                        : 'text-white/30 group-hover:translate-x-1 group-hover:text-vyapo'
                    }`}
                  >
                    {active ? '●' : '→'}
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-sm mx-auto pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Node: Live
          </span>
          <span>Vyapo OS v2.4</span>
        </div>
      </div>
    </>
  );
}