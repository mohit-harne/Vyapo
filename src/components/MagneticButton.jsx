import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, href, className = "" }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(buttonRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(buttonRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = buttonRef.current;
    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <a ref={buttonRef} href={href} target={href.startsWith('http') ? "_blank" : "_self"} className={`inline-block ${className}`}>
      {children}
    </a>
  );
}