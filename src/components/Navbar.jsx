import React from 'react';
import { Terminal, Type, Disc, Box, Flame, Home } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ activeWorld, setActiveWorld }) {
  const worlds = [
    { id: 'home', label: '00. MONOLITH', path: '/', icon: Home },
    { id: 'terminal', label: '01. TERMINAL CLI', path: '/terminal', icon: Terminal },
    { id: 'kinetic-typo', label: '02. KINETIC TYPO', path: '/kinetic-typo', icon: Type },
    { id: 'audio-matrix', label: '03. AUDIO MATRIX', path: '/audio-matrix', icon: Disc },
    { id: 'spatial-void', label: '04. SPATIAL VOID', path: '/spatial-void', icon: Box },
    { id: 'anti-design', label: '05. ANTI-DESIGN', path: '/anti-design', icon: Flame },
  ];

  const handleNav = (worldId) => {
    audioEngine.playClick();
    setActiveWorld(worldId);
  };

  return (
    <header style={{
      width: '100%',
      background: 'var(--bg-secondary)',
      borderBottom: 'var(--border-thick)',
      padding: '1rem 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand Monolith */}
        <div 
          onClick={() => handleNav('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--text-primary)',
            color: '#000000',
            padding: '0.5rem 1rem',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px var(--acid-lime)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
          onMouseEnter={() => audioEngine.playBeep(900, 0.03)}
        >
          <div style={{
            width: '12px',
            height: '12px',
            background: 'var(--acid-red)',
            border: '2px solid #000'
          }} />
          BRUTALIST // EXPERIENCES
        </div>

        {/* World Navigation Links */}
        <nav style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {worlds.map((w) => {
            const Icon = w.icon;
            const isActive = activeWorld === w.id;
            return (
              <button
                key={w.id}
                onClick={() => handleNav(w.id)}
                onMouseEnter={() => audioEngine.playBeep(700, 0.02)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: isActive ? 'var(--acid-lime)' : 'var(--bg-tertiary)',
                  color: isActive ? '#000000' : '#ffffff',
                  border: isActive ? '3px solid #ffffff' : '2px solid #555555',
                  boxShadow: isActive ? '4px 4px 0px #ffffff' : 'none',
                  transition: 'all 0.1s ease'
                }}
              >
                <Icon size={14} />
                {w.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
