import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function InteractiveWrapper({ children }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let lenisRafId;
    function raf(time) {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(raf);
    }
    lenisRafId = requestAnimationFrame(raf);

    // 2. Custom Cursor Physics (Only on pointer-accurate desktop devices)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    let cursorRafId;
    let onMouseMove;

    if (!isTouchDevice) {
      const cursor = cursorRef.current;
      let mouseX = -100;
      let mouseY = -100;
      let cursorX = -100;
      let cursorY = -100;

      onMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const renderCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        gsap.set(cursor, { x: cursorX, y: cursorY });
        cursorRafId = requestAnimationFrame(renderCursor);
      };
      cursorRafId = requestAnimationFrame(renderCursor);
    }

    return () => {
      lenis.destroy();
      cancelAnimationFrame(lenisRafId);
      if (cursorRafId) cancelAnimationFrame(cursorRafId);
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Hidden on mobile, tablet, and touch screens */}
      <div 
        ref={cursorRef} 
        className="hidden lg:block fixed top-0 left-0 w-6 h-6 bg-vyapo rounded-full pointer-events-none z-[10000] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      />
      {children}
    </>
  );
}