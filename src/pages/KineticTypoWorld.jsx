import React, { useState, useEffect, useRef } from 'react';
import { Type, Download, Sliders, RefreshCw, Zap, Maximize2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function KineticTypoWorld() {
  const [text, setText] = useState('KINETIC');
  const [fontSize, setFontSize] = useState(90);
  const [warpForce, setWarpForce] = useState(1.5);
  const [gridCols, setGridCols] = useState(16);
  const [colorMode, setColorMode] = useState('stark'); // stark, neonLime, acidRed, cyan
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  const modes = {
    stark: { bg: '#ffffff', fg: '#000000', grid: 'rgba(0,0,0,0.12)', border: '#000000' },
    neonLime: { bg: '#000000', fg: '#ccff00', grid: 'rgba(204,255,0,0.2)', border: '#ccff00' },
    acidRed: { bg: '#ff2e00', fg: '#ffffff', grid: 'rgba(255,255,255,0.25)', border: '#ffffff' },
    cyan: { bg: '#000000', fg: '#00ffff', grid: 'rgba(0,255,255,0.2)', border: '#00ffff' }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const currentMode = modes[colorMode];

    const render = () => {
      ctx.fillStyle = currentMode.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / gridCols;
      const cellH = canvas.height / 6;

      // Draw drafting table blueprint grid lines
      ctx.strokeStyle = currentMode.grid;
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= canvas.width; x += cellW) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += cellH) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw kinetic letters
      const str = text.toUpperCase() || 'KINETIC';
      ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const letters = str.split('');
      const letterSpacing = fontSize * 0.75;
      const startX = (canvas.width - (letters.length * letterSpacing)) / 2 + (letterSpacing / 2);
      const startY = canvas.height / 2;

      letters.forEach((char, i) => {
        let x = startX + i * letterSpacing;
        let y = startY;

        // Calculate vector repulsion distance from mouse
        const dx = mousePosRef.current.x - x;
        const dy = mousePosRef.current.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 220;

        let offsetX = 0;
        let offsetY = 0;
        let scale = 1;
        let rot = 0;

        if (dist < maxDist) {
          const factor = (1 - dist / maxDist) * warpForce * 45;
          offsetX = -(dx / dist) * factor;
          offsetY = -(dy / dist) * factor;
          scale = 1 + (1 - dist / maxDist) * 0.6;
          rot = ((dx / dist) * factor * Math.PI) / 180;
        }

        ctx.save();
        ctx.translate(x + offsetX, y + offsetY);
        ctx.rotate(rot);
        ctx.scale(scale, scale);

        // Hard offset shadow
        ctx.fillStyle = colorMode === 'stark' ? 'rgba(0,0,0,0.15)' : '#000000';
        ctx.fillText(char, 6, 6);

        // Main character fill
        ctx.fillStyle = currentMode.fg;
        ctx.fillText(char, 0, 0);

        // Stark vector outline stroke
        ctx.strokeStyle = colorMode === 'stark' ? '#000000' : '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText(char, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [text, fontSize, warpForce, gridCols, colorMode]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  const exportPoster = () => {
    audioEngine.playGlitch();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `brutalist-kinetic-${text.toLowerCase()}.png`;
    link.href = image;
    link.click();
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
          <span className="brutal-badge" style={{ background: 'var(--acid-cyan)', color: '#000' }}>
            WORLD 02 // VECTOR LAB
          </span>
          <h1 className="brutal-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
            KINETIC TYPOGRAPHY
          </h1>
        </div>

        <button
          onClick={exportPoster}
          className="brutal-btn"
          style={{ background: 'var(--acid-lime)', color: '#000' }}
        >
          <Download size={18} /> EXPORT POSTER (PNG)
        </button>
      </div>

      {/* Control Dashboard */}
      <div className="brutal-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 800,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Sliders size={16} /> VECTOR DYNAMICS & DRAFTING PARAMETERS
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Custom Text Input */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              TYPE CUSTOM LETTERFORM
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                audioEngine.playBeep(800, 0.01);
              }}
              maxLength={12}
              style={{
                width: '100%',
                background: 'var(--bg-primary)',
                border: '2px solid var(--text-primary)',
                color: 'var(--text-primary)',
                padding: '0.5rem 0.8rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 900,
                outline: 'none'
              }}
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              FONT SIZE ({fontSize}PX)
            </label>
            <input
              type="range"
              min="40"
              max="130"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Warp Force Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              WARP FORCE ({warpForce})
            </label>
            <input
              type="range"
              min="0.3"
              max="3.0"
              step="0.1"
              value={warpForce}
              onChange={(e) => setWarpForce(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Color Mode Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              PALETTE MODE
            </label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              {['stark', 'neonLime', 'acidRed', 'cyan'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    audioEngine.playClick();
                    setColorMode(m);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    background: colorMode === m ? modes[m].fg : 'var(--bg-primary)',
                    color: colorMode === m ? modes[m].bg : 'var(--text-primary)',
                    border: '2px solid var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Canvas Viewport */}
      <div style={{
        background: modes[colorMode].bg,
        border: `4px solid ${modes[colorMode].border}`,
        boxShadow: `8px 8px 0px ${modes[colorMode].border}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={500}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid #ffffff',
          color: '#ffffff',
          padding: '0.3rem 0.6rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700
        }}>
          MOVE CURSOR OVER CANVAS TO WARP LETTERFORM VECTORS
        </div>
      </div>
    </div>
  );
}
