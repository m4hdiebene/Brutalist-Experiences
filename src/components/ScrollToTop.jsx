import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  const isProjectPage = pathname !== '/';

  // 1. Scroll-To-Top on Navigation: EXCLUSIVELY for Project Pages
  useLayoutEffect(() => {
    // If on Homepage, DO NOT run scroll to top!
    if (!isProjectPage) return;

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname, isProjectPage]);

  // 2. Floating TOP Button: EXCLUSIVELY for Project Pages
  useEffect(() => {
    if (!isProjectPage) {
      setVisible(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isProjectPage]);

  // Strictly return null if on Homepage or if not scrolled
  if (!isProjectPage || !visible) return null;

  const scrollToTopManual = () => {
    audioEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTopManual}
      onMouseEnter={() => audioEngine.playBeep(900, 0.02)}
      title="Scroll to Top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        background: 'var(--acid-lime)',
        color: '#000000',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        padding: '0.6rem 0.9rem',
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        cursor: 'pointer',
        textTransform: 'uppercase'
      }}
    >
      <ArrowUp size={18} />
      <span>TOP</span>
    </button>
  );
}
