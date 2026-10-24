import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = "" }) {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}