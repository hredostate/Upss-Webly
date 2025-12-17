import { useEffect, useState } from 'react';

export function useDelayedVisibility(delayMs = 0, active = true) {
  const [visible, setVisible] = useState(delayMs === 0);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    if (delayMs === 0) {
      setVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, active]);

  return visible;
}
