import React, { useState } from 'react';
import { Flame, AlertTriangle, Stamp, BellRing, Sparkles, CheckSquare } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AntiDesignWorld() {
  const [stickers, setStickers] = useState([
    { id: 1, text: 'NO SOFT EDGES', x: 40, y: 50, color: 'var(--acid-lime)' },
    { id: 2, text: 'WARNING: RAW DATA', x: 220, y: 120, color: 'var(--acid-red)' },
    { id: 3, text: '100% UNFILTERED', x: 450, y: 60, color: 'var(--acid-cyan)' }
  ]);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const addSticker = (label, color) => {
    audioEngine.playGlitch();
    const newSticker = {
      id: Date.now(),
      text: label,
      x: Math.floor(Math.random() * 500) + 20,
      y: Math.floor(Math.random() * 200) + 20,
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
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: 'var(--border-thick)',
        paddingBottom: '1rem'
      }}>
        <div>
          <span className="brutal-badge" style={{ background: 'var(--acid-yellow)', color: '#000' }}>
            WORLD 05
          </span>
          <h1 className="brutal-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            ANTI-DESIGN LAB
          </h1>
        </div>

        <button
          onClick={() => {
            audioEngine.playClick();
            setModalOpen(true);
          }}
          className="brutal-btn brutal-btn-red"
        >
          <AlertTriangle size={18} /> OPEN BRUTALIST MODAL
        </button>
      </div>

      {/* Grid of Anti-Design Experiments */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Section 1: Tactile Audio Buttons */}
        <div className="brutal-card">
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--acid-lime)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <BellRing size={18} /> AUDIO TRIGGER BUTTONS
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1.5rem' }}>
            Button components with physical Web Audio synthesized acoustic response on press.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
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
                triggerToast('AUDIO GLITCH SWEEP DISPATCHED');
              }}
            >
              HARSH AUDIO GLITCH
            </button>
            <button
              className="brutal-btn brutal-btn-cyan"
              onClick={() => {
                audioEngine.playDrum('kick');
                triggerToast('SUB-BASS KICK PULSE DISPATCHED');
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
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--acid-cyan)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckSquare size={18} /> UNFILTERED FORM INPUT
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
            No rounded corners, raw character counting, and aggressive border validation.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--acid-cyan)', display: 'block', marginBottom: '0.3rem' }}>
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
                background: '#000000',
                border: inputVal.length > 10 ? '4px solid var(--acid-red)' : '4px solid var(--acid-lime)',
                color: '#ffffff',
                padding: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            padding: '0.5rem',
            background: '#000000',
            border: '1px solid #444',
            color: inputVal.length > 10 ? 'var(--acid-red)' : 'var(--acid-lime)'
          }}>
            CHAR COUNT: {inputVal.length} / 10 max
            {inputVal.length > 10 && ' [CRITICAL OVERFLOW WARNING]'}
          </div>
        </div>
      </div>

      {/* Section 3: Interactive Brutalist Sticker Canvas Board */}
      <div className="brutal-card" style={{ marginBottom: '3rem', background: '#0a0a0a', position: 'relative' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '2px solid #333',
          paddingBottom: '1rem'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: 'var(--acid-yellow)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Stamp size={20} /> STICKER STAMPING CANVAS
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#aaa' }}>Click badges below to stamp interactive brutalist badges onto the board.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="brutal-btn" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => addSticker('HEAVY MACHINERY', 'var(--acid-lime)')}>
              + STICKER 01
            </button>
            <button className="brutal-btn brutal-btn-red" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => addSticker('DANGER 1000V', 'var(--acid-red)')}>
              + STICKER 02
            </button>
            <button className="brutal-btn brutal-btn-cyan" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => addSticker('CYBER INDUSTRIAL', 'var(--acid-cyan)')}>
              + STICKER 03
            </button>
          </div>
        </div>

        {/* Sticker Board Area */}
        <div style={{
          height: '350px',
          background: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          border: '2px solid #333',
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
                padding: '0.4rem 0.8rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
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
          padding: '1rem 1.5rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: '1rem',
          zIndex: 99999
        }}>
          <Sparkles size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
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
            border: '6px solid var(--acid-red)',
            boxShadow: '12px 12px 0px var(--acid-red)',
            padding: '2.5rem',
            maxWidth: '550px',
            width: '100%',
            position: 'relative'
          }}>
            <h2 className="brutal-title" style={{ fontSize: '2rem', color: 'var(--acid-red)', marginBottom: '1rem' }}>
              STARK MODAL OVERLAY
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: '1.6', marginBottom: '2rem' }}>
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
