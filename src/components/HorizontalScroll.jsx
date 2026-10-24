import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ children }) {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const totalWidth = scrollRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: -(totalWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden h-screen flex items-center">
      <div ref={scrollRef} className="flex gap-20 px-32 w-[300vw]">
        {children}
      </div>
    </div>
  );
}