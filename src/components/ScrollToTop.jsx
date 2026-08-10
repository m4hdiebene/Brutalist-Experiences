import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Prevent browser auto scroll restoration from overriding link clicks
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // When opening ANY project page (pathname !== '/'), force scroll position to top
    if (pathname !== '/') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Micro-task trigger to guarantee scroll position after layout paint
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [pathname]);

  return null;
}
