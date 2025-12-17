import { useEffect, useRef, useState } from 'react';

export const useReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Validate and clamp threshold to valid range [0, 1]
    const numThreshold = Number(threshold);
    const validThreshold = Number.isNaN(numThreshold) 
      ? 0.1 
      : Math.min(1, Math.max(0, numThreshold));
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: validThreshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return { ref, isVisible };
};