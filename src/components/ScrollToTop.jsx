import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Memory store for Homepage scroll position
let homepageScrollPos = 0;

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    // Disable native browser auto-restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prevPath = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (pathname === '/') {
      // Returning to Homepage: restore saved Homepage scroll position
      requestAnimationFrame(() => {
        window.scrollTo(0, homepageScrollPos);
        document.documentElement.scrollTop = homepageScrollPos;
        document.body.scrollTop = homepageScrollPos;
      });
    } else {
      // Navigating from Homepage to a Project: capture Homepage scroll position before scrolling project to top
      if (prevPath === '/') {
        homepageScrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }

      // Scroll project page to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [pathname]);

  return null;
}
