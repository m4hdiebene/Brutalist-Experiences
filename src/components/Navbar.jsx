import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Terminal, Type, Disc, Box, Flame, Home, Sun, Moon, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ theme, setTheme }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const worlds = [
    { id: 'home', label: '00. MONOLITH', path: '/', icon: Home },
    { id: 'terminal', label: '01. TERMINAL CLI', path: '/terminal', icon: Terminal },
    { id: 'kinetic-typo', label: '02. KINETIC TYPO', path: '/kinetic-typo', icon: Type },
    { id: 'audio-matrix', label: '03. AUDIO MATRIX', path: '/audio-matrix', icon: Disc },
    { id: 'spatial-void', label: '04. SPATIAL VOID', path: '/spatial-void', icon: Box },
    { id: 'anti-design', label: '05. ANTI-DESIGN', path: '/anti-design', icon: Flame },
  ];

  const handleAudioToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    audioEngine.playClick();
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    audioEngine.playClick();
  };

  return (
    <header style={{
      width: '100%',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      borderBottom: 'var(--border-thick)',
      padding: '0.85rem 1.25rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'background-color 0.15s ease, color 0.15s ease'
    }}>
      <div style={{
        maxWidth: '1500px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand Link */}
        <Link 
          to="/"
          onClick={() => {
            audioEngine.playClick();
            setMobileMenuOpen(false);
          }}
          onMouseEnter={() => audioEngine.playBeep(900, 0.03)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            padding: '0.45rem 0.9rem',
            border: '3px solid var(--text-primary)',
            boxShadow: '3px 3px 0px var(--acid-lime)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '10px',
            height: '10px',
            background: 'var(--acid-red)',
            border: '2px solid var(--bg-primary)'
          }} />
          BRUTALIST // EXPERIENCES
        </Link>

        {/* Action Controls (Theme + Audio + Mobile Hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme Mode Toggle Button */}
          <button
            onClick={handleThemeToggle}
            title="Toggle Light / Dark Mode"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '2px solid var(--text-primary)',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px var(--text-primary)'
            }}
          >
            {theme === 'light' ? <Sun size={14} color="var(--acid-red)" /> : <Moon size={14} color="var(--acid-lime)" />}
            <span>{theme === 'light' ? 'THEME: LIGHT' : 'THEME: DARK'}</span>
          </button>

          {/* Audio Toggle Button */}
          <button
            onClick={handleAudioToggle}
            title="Toggle Audio Engine"
            style={{
              background: 'var(--bg-tertiary)',
              color: isMuted ? 'var(--acid-red)' : 'var(--text-primary)',
              border: '2px solid var(--text-primary)',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px var(--text-primary)'
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--acid-lime)',
              color: '#000000',
              border: '2px solid var(--text-primary)',
              padding: '0.35rem 0.6rem',
              display: 'none',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            className="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Desktop World Navigation Links */}
        <nav 
          className={`desktop-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}
          style={{
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap'
          }}
        >
          {worlds.map((w) => {
            const Icon = w.icon;
            const isActive = location.pathname === w.path;
            return (
              <NavLink
                key={w.id}
                to={w.path}
                onClick={() => {
                  audioEngine.playClick();
                  setMobileMenuOpen(false);
                }}
                onMouseEnter={() => audioEngine.playBeep(700, 0.02)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  background: isActive ? 'var(--acid-lime)' : 'var(--bg-tertiary)',
                  color: isActive ? '#000000' : 'var(--text-primary)',
                  border: isActive ? '2px solid var(--text-primary)' : '2px solid var(--text-muted)',
                  boxShadow: isActive ? '3px 3px 0px var(--text-primary)' : 'none',
                  transition: 'all 0.1s ease',
                  textDecoration: 'none'
                }}
              >
                <Icon size={14} />
                {w.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Responsive CSS for Mobile Navbar Drawer */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-nav-toggle {
            display: flex !important;
          }
          .desktop-nav {
            display: none !important;
            width: 100%;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 2px solid var(--text-primary);
          }
          .desktop-nav.mobile-open {
            display: flex !important;
          }
          .desktop-nav a {
            width: 100%;
            padding: 0.6rem 1rem !important;
          }
        }
      `}</style>
    </header>
  );
}
