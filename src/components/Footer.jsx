import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Code2, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'var(--bg-secondary)',
      borderTop: 'var(--border-thick)',
      padding: '3rem 1.5rem 1.5rem 1.5rem',
      marginTop: '4rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        paddingBottom: '2rem',
        borderBottom: '2px solid #333'
      }}>
        {/* Column 1: Monolith Spec */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--acid-lime)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Cpu size={18} /> TELEMETRY & SPEC
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            A raw digital universe built without compromises. High-contrast layout, vector warp physics, Web Audio API sound synthesis, exposed structural coordinates.
          </p>
          <div className="brutal-badge">
            BUILD // MULTI-PAGE 2.0.0
          </div>
        </div>

        {/* Column 2: Quick World Portals */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--acid-cyan)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Terminal size={18} /> SEPARATE WORLD PAGES
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { path: '/terminal', label: 'WORLD 01 // CYBER TERMINAL CLI' },
              { path: '/kinetic-typo', label: 'WORLD 02 // KINETIC TYPOGRAPHY' },
              { path: '/audio-matrix', label: 'WORLD 03 // SOUND SYNTHESIZER' },
              { path: '/spatial-void', label: 'WORLD 04 // 3D CONCRETE VOID' },
              { path: '/anti-design', label: 'WORLD 05 // ANTI-DESIGN LAB' },
            ].map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playBeep(800, 0.02)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none'
                  }}
                >
                  <ArrowUpRight size={14} color="var(--acid-lime)" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Repository & Philosophy */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--acid-red)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Shield size={18} /> SOURCE & REPOSITORY
          </h3>
          <a
            href="https://github.com/m4hdiebene/Brutalist-Experiences.git"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClick()}
            className="brutal-btn"
            style={{ width: '100%', marginBottom: '1rem', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
          >
            <Code2 size={16} /> GITHUB REPOSITORY
          </a>
          <p style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-mono)' }}>
            STARK MONOCHROME // HIGH IMPACT // UNAPOLOGETIC WEB ARCHITECTURE
          </p>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          &copy; {new Date().getFullYear()} BRUTALIST EXPERIENCES // ALL RIGHTS EXPOSED
        </div>
        <div style={{ background: '#000', padding: '2px 8px', border: '1px solid #333', color: 'var(--acid-lime)' }}>
          COORDINATES: LAT 51.5074 N // LON 0.1278 W
        </div>
      </div>
    </footer>
  );
}
