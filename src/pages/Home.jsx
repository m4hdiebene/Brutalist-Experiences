import React, { useState } from 'react';
import { Terminal, Type, Disc, Box, Flame, ArrowRight, Zap, Code, Layers, Volume2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Home({ setActiveWorld }) {
  const [manifestoOpen, setManifestoOpen] = useState(0);
  const [rawView, setRawView] = useState(false);

  const worlds = [
    {
      id: 'terminal',
      num: '01',
      title: 'CYBER TERMINAL CLI',
      desc: 'Interactive retro UNIX/DOS terminal environment with scanlines, memory dump diagnostics, ASCII generators, and custom command parsing.',
      accent: 'var(--acid-lime)',
      icon: Terminal,
      tags: ['CLI', 'SCANLINES', 'ASCII', 'MEMORY']
    },
    {
      id: 'kinetic-typo',
      num: '02',
      title: 'KINETIC TYPO & GRID',
      desc: 'Vector letter repulsion canvas. Type custom text, distort letterforms with cursor dynamics, alter grid density, and export snapshots.',
      accent: 'var(--acid-cyan)',
      icon: Type,
      tags: ['CANVAS', 'PHYSICS', 'KINETIC', 'EXPORT']
    },
    {
      id: 'audio-matrix',
      num: '03',
      title: 'CONCRETE SOUND SYNTH',
      desc: '16-step drum machine & synthesizer powered by Web Audio API with oscilloscope real-time waveform visualization and pattern presets.',
      accent: 'var(--acid-red)',
      icon: Disc,
      tags: ['WEB AUDIO API', '16-STEP', 'SYNTH', 'OSCILLOSCOPE']
    },
    {
      id: 'spatial-void',
      num: '04',
      title: '3D SPATIAL MONOLITH',
      desc: 'Interactive 3D geometry engine viewport. Light source positioning, explode wireframe controls, concrete texture depth, and orbital rotation.',
      accent: 'var(--acid-magenta)',
      icon: Box,
      tags: ['3D CANVAS', 'WIREFRAME', 'PROJECTION', 'MONOLITH']
    },
    {
      id: 'anti-design',
      num: '05',
      title: 'ANTI-DESIGN LAB',
      desc: 'Showcase of chaotic neo-brutalist UI components: dynamic sound triggers, brutalist stickers, unhinged sliders, stark notifications.',
      accent: 'var(--acid-yellow)',
      icon: Flame,
      tags: ['ANTI-DESIGN', 'STICKERS', 'UNHINGED UI', 'AUDIO']
    }
  ];

  const manifestoItems = [
    {
      title: "01 // EXPOSE THE SKELETON",
      content: "Hide nothing. Grid lines, raw borders, numeric parameters, and structural alignment coordinates must be visible. True beauty is found in exposed concrete and raw structural engineering."
    },
    {
      title: "02 // TACTILE MECHANICAL AUDIO",
      content: "Web interactions should produce tactile physical sensations. Clicks, keypresses, hover triggers, and page shifts sound with real-time Web Audio API synthesized pulses."
    },
    {
      title: "03 // UNCOMPROMISING MONOCHROME & ACCENTS",
      content: "Stark black (#000000) and pure white (#FFFFFF) form the backbone, punctured by high-voltage acid accents (Electric Lime #CCFF00, Acid Red #FF2E00, Cyan #00FFFF)."
    },
    {
      title: "04 // KINETIC & INTERACTIVE DYNAMICS",
      content: "Static pages are dead. Brutalism is kinetic — vector typography warps under mouse drag, synthesizers react to step patterns, 3D monoliths rotate in real-time space."
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Header */}
      <section style={{
        padding: '3rem 0 4rem 0',
        borderBottom: 'var(--border-thick)',
        position: 'relative'
      }}>
        <div className="corner-marker corner-tl" />
        <div className="corner-marker corner-tr" />
        <div className="corner-marker corner-bl" />
        <div className="corner-marker corner-br" />

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span className="brutal-badge">ARCHITECTURAL HUB</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--acid-lime)' }}>[VER 1.0.0 // ONLINE]</span>
        </div>

        {/* Hero Title with Hover Scatter Sound */}
        <h1 
          className="brutal-title glitch-text"
          data-text="BRUTALIST // EXPERIENCES"
          onMouseEnter={() => audioEngine.playGlitch()}
          style={{ marginBottom: '1.5rem', cursor: 'pointer' }}
        >
          BRUTALIST <br />
          <span style={{ color: 'var(--acid-lime)', textShadow: '4px 4px 0px #000' }}>EXPERIENCES</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          maxWidth: '900px',
          lineHeight: '1.4',
          marginBottom: '2.5rem',
          color: '#dddddd'
        }}>
          AN UNFORGIVING ARCHITECTURE OF SEPARATE BRUTALIST WORLDS. EXPLORE CYBER TERMINALS, KINETIC TYPOGRAPHY PHYSICS, WEB AUDIO SYNTHESIZERS, AND 3D SPATIAL MONOLITHS.
        </p>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="brutal-btn"
            onClick={() => {
              audioEngine.playClick();
              setActiveWorld('terminal');
            }}
          >
            LAUNCH TERMINAL CLI <ArrowRight size={18} />
          </button>
          <button 
            className="brutal-btn brutal-btn-red"
            onClick={() => {
              audioEngine.playClick();
              setActiveWorld('audio-matrix');
            }}
          >
            PLAY SOUND MATRIX <Volume2 size={18} />
          </button>
        </div>
      </section>

      {/* World Selection Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <h2 className="brutal-sub-title">// WORLD SELECTION PORTAL</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select an experience world to jump directly into its environment.</p>
          </div>
          <div className="brutal-tag">5 WORLDS READY</div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {worlds.map((w) => {
            const Icon = w.icon;
            return (
              <div 
                key={w.id}
                className="brutal-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  background: 'var(--bg-secondary)',
                  borderTop: `6px solid ${w.accent}`
                }}
                onMouseEnter={() => audioEngine.playBeep(600, 0.03)}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.2rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      color: w.accent
                    }}>
                      {w.num}
                    </span>
                    <div style={{
                      padding: '0.6rem',
                      background: '#000000',
                      border: '2px solid #ffffff',
                      color: w.accent
                    }}>
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    {w.title}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    color: '#aaaaaa',
                    lineHeight: '1.5',
                    marginBottom: '1.5rem'
                  }}>
                    {w.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                    {w.tags.map(t => (
                      <span key={t} className="brutal-tag">{t}</span>
                    ))}
                  </div>

                  <button
                    className="brutal-btn"
                    style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => {
                      audioEngine.playClick();
                      setActiveWorld(w.id);
                    }}
                  >
                    ENTER WORLD {w.num} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Brutalist Manifesto Accordion */}
      <section style={{
        padding: '3rem',
        background: 'var(--bg-secondary)',
        border: 'var(--border-thick)',
        boxShadow: 'var(--shadow-lime)',
        position: 'relative',
        marginBottom: '4rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #444',
          paddingBottom: '1rem'
        }}>
          <div>
            <h2 className="brutal-sub-title" style={{ color: '#ffffff' }}>
              // THE BRUTALIST MANIFESTO
            </h2>
            <p style={{ color: 'var(--acid-lime)', fontSize: '0.85rem' }}>CORE ARCHITECTURAL RULES OF THIS DIGITAL EXPERIMENTAL PLATFORM</p>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              setRawView(!rawView);
            }}
            className="brutal-btn brutal-btn-outline"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
          >
            <Code size={14} /> {rawView ? 'RENDERED VIEW' : 'RAW JSON VIEW'}
          </button>
        </div>

        {rawView ? (
          <pre style={{
            background: '#000000',
            padding: '1.5rem',
            border: '2px solid var(--acid-lime)',
            color: 'var(--acid-lime)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            overflowX: 'auto'
          }}>
            {JSON.stringify(manifestoItems, null, 2)}
          </pre>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {manifestoItems.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  border: manifestoOpen === idx ? '3px solid var(--acid-lime)' : '2px solid #333333',
                  background: manifestoOpen === idx ? '#000000' : 'var(--bg-tertiary)',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  onClick={() => {
                    audioEngine.playBeep(manifestoOpen === idx ? 500 : 900, 0.03);
                    setManifestoOpen(manifestoOpen === idx ? -1 : idx);
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{item.title}</span>
                  <span style={{
                    color: 'var(--acid-lime)',
                    fontSize: '1.4rem',
                    fontWeight: 900
                  }}>
                    {manifestoOpen === idx ? '−' : '+'}
                  </span>
                </button>

                {manifestoOpen === idx && (
                  <div style={{
                    padding: '0 1.2rem 1.2rem 1.2rem',
                    color: '#cccccc',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid #222'
                  }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
