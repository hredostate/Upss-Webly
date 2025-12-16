import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Provides predictable scroll behaviour for the public site and admin builder.
 * - Always resets to top on normal navigation
 * - Restores the previous scroll position on back/forward
 * - Scrolls to hash anchors smoothly once the node is present
 */
export function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef<Record<string, number>>({});

  // Ensure the browser doesn't auto-restore and fight our logic
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Save the current scroll position before navigating away
  useEffect(() => {
    return () => {
      positions.current[location.key] = window.scrollY;
    };
  }, [location]);

  useEffect(() => {
    const scrollToAnchor = () => {
      if (!location.hash) return false;

      const id = location.hash.replace('#', '');
      const anchor = document.getElementById(id);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }

      return false;
    };

    const restorePosition = () => {
      if (scrollToAnchor()) return;

      if (navigationType === 'POP') {
        const saved = positions.current[location.key];
        window.scrollTo({ top: typeof saved === 'number' ? saved : 0, left: 0, behavior: 'auto' });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    // Run immediately and again on the next frame so dynamic content has time to mount
    restorePosition();
    const id = window.requestAnimationFrame(restorePosition);

    return () => window.cancelAnimationFrame(id);
  }, [location, navigationType]);

  return null;
}
