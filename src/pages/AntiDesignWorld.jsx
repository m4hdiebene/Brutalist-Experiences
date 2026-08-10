import React, { useState } from 'react';
import { AlertTriangle, Stamp, BellRing, Sparkles, CheckSquare, Zap, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AntiDesignWorld() {
  const [stickers, setStickers] = useState([
    { id: 1, text: 'NO DECORATIVE FLUFF', x: 30, y: 40, color: 'var(--acid-lime)' },
    { id: 2, text: 'WARNING: HIGH VOLTAGE', x: 210, y: 110, color: 'var(--acid-red)' },
    { id: 3, text: 'RAW UNFILTERED CODE', x: 400, y: 50, color: 'var(--acid-cyan)' }
  ]);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const addSticker = (label, color) => {
    audioEngine.playGlitch();
    const newSticker = {
      id: Date.now(),
      text: label,
      x: Math.floor(Math.random() * 450) + 15,
      y: Math.floor(Math.random() * 180) + 15,
      color
    };
    setStickers([...stickers, newSticker]);
  };

  const triggerToast = (msg) => {
    audioEngine.playBeep(1200, 0.1);
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: 'var(--border-thick)',
        paddingBottom: '1rem'
      }}>
        <div>
          <span className="brutal-badge" style={{ background: 'var(--acid-yellow)', color: '#000' }}>
            WORLD 05 // ANTI-DESIGN
          </span>
          <h1 className="brutal-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
            ANTI-DESIGN CHAOS LAB
          </h1>
        </div>

        <button
          onClick={() => {
            audioEngine.playClick();
            setModalOpen(true);
          }}
          className="brutal-btn brutal-btn-red"
        >
          <AlertTriangle size={18} /> OPEN STARK MODAL
        </button>
      </div>

      {/* Grid of Experiments */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Section 1: Tactile Sound Triggers */}
        <div className="brutal-card">
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: 900,
            color: 'var(--acid-lime)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <BellRing size={16} /> ACOUSTIC SOUND TRIGGERS
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 600 }}>
            Physical acoustic responses synthesized in real time via Web Audio API.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="brutal-btn"
              onClick={() => {
                audioEngine.playClick();
                triggerToast('MECHANICAL CLICK SOUND DISPATCHED');
              }}
            >
              MECHANICAL CLICK
            </button>
            <button
              className="brutal-btn brutal-btn-red"
              onClick={() => {
                audioEngine.playGlitch();
                triggerToast('SYNTHETIC AUDIO GLITCH DISPATCHED');
              }}
            >
              HARSH AUDIO GLITCH
            </button>
            <button
              className="brutal-btn brutal-btn-cyan"
              onClick={() => {
                audioEngine.playDrum('kick');
                triggerToast('SUB-BASS KICK DISPATCHED');
              }}
            >
              SUB-BASS KICK PULSE
            </button>
          </div>
        </div>

        {/* Section 2: Brutalist Form Input & Validation */}
        <div className="brutal-card">
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            fontWeight: 900,
            color: 'var(--acid-cyan)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckSquare size={16} /> UNFILTERED FORM INPUT
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
            Zero border softening, raw numeric validation meters, and error alerts.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>
              RAW DATA FIELD
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                audioEngine.playBeep(1100, 0.01);
              }}
              placeholder="Type anything to test validation..."
              style={{
                width: '100%',
                background: 'var(--bg-primary)',
                border: inputVal.length > 10 ? '4px solid var(--acid-red)' : '4px solid var(--acid-lime)',
                color: 'var(--text-primary)',
                padding: '0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                outline: 'none',
                fontWeight: 700
              }}
            />
          </div>

          <div style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            padding: '0.5rem',
            background: 'var(--bg-tertiary)',
            border: '2px solid var(--text-primary)',
            color: inputVal.length > 10 ? 'var(--acid-red)' : 'var(--text-primary)',
            fontWeight: 800
          }}>
            CHAR METER: {inputVal.length} / 10 MAX
            {inputVal.length > 10 && ' [CRITICAL OVERFLOW WARNING]'}
          </div>
        </div>
      </div>

      {/* Section 3: Interactive Sticker Stamping Canvas */}
      <div className="brutal-card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
          borderBottom: '2px solid var(--text-primary)',
          paddingBottom: '0.75rem'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Stamp size={18} /> STICKER STAMPING CANVAS
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Click buttons to stamp interactive brutalist badges onto the canvas.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button className="brutal-btn" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => addSticker('HEAVY MACHINERY', 'var(--acid-lime)')}>
              + STICKER 01
            </button>
            <button className="brutal-btn brutal-btn-red" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => addSticker('DANGER 1000V', 'var(--acid-red)')}>
              + STICKER 02
            </button>
            <button className="brutal-btn brutal-btn-cyan" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => addSticker('CYBER INDUSTRIAL', 'var(--acid-cyan)')}>
              + STICKER 03
            </button>
          </div>
        </div>

        {/* Sticker Board Area */}
        <div style={{
          height: '320px',
          background: 'radial-gradient(circle, var(--grid-line-color) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          border: '2px solid var(--text-primary)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {stickers.map((s) => (
            <div
              key={s.id}
              style={{
                position: 'absolute',
                left: `${s.x}px`,
                top: `${s.y}px`,
                background: s.color,
                color: '#000000',
                padding: '0.4rem 0.75rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 900,
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                transform: `rotate(${(s.id % 10) - 5}deg)`,
                cursor: 'pointer'
              }}
              onClick={() => audioEngine.playGlitch()}
            >
              {s.text}
            </div>
          ))}
        </div>
      </div>

      {/* Toast Alert Banner */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--acid-lime)',
          color: '#000000',
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #000000',
          padding: '0.85rem 1.25rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: '0.95rem',
          zIndex: 99999
        }}>
          <Sparkles size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          {toast}
        </div>
      )}

      {/* Brutalist Modal Overlay */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '6px solid var(--acid-red)',
            boxShadow: '12px 12px 0px var(--acid-red)',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative'
          }}>
            <h2 className="brutal-title" style={{ fontSize: '1.8rem', color: 'var(--acid-red)', marginBottom: '1rem' }}>
              STARK MODAL OVERLAY
            </h2>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.75rem', fontWeight: 600 }}>
              This modal component breaks generic smooth transitions with high-contrast borders and sharp, instantaneous visibility.
            </p>
            <button
              className="brutal-btn brutal-btn-red"
              onClick={() => {
                audioEngine.playClick();
                setModalOpen(false);
              }}
              style={{ width: '100%' }}
            >
              DISMISS MODAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
