import React, { useState, useEffect, useRef } from 'react';
import { Type, Download, Sliders, RefreshCw, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function KineticTypoWorld() {
  const [text, setText] = useState('BRUTALIST');
  const [fontSize, setFontSize] = useState(80);
  const [warpForce, setWarpForce] = useState(1.2);
  const [gridCols, setGridCols] = useState(16);
  const [colorTheme, setColorTheme] = useState('lime'); // lime, cyan, red, mono
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  const themeColors = {
    lime: { fg: '#ccff00', bg: '#0a0a0a', grid: 'rgba(204,255,0,0.15)' },
    cyan: { fg: '#00ffff', bg: '#0a0a0a', grid: 'rgba(0,255,255,0.15)' },
    red: { fg: '#ff2e00', bg: '#0a0a0a', grid: 'rgba(255,46,0,0.15)' },
    mono: { fg: '#ffffff', bg: '#000000', grid: 'rgba(255,255,255,0.15)' }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.fillStyle = themeColors[colorTheme].bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / gridCols;
      const cellH = canvas.height / 8;

      // Draw exposed blueprint grid lines
      ctx.strokeStyle = themeColors[colorTheme].grid;
      ctx.lineWidth = 1;
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
      const str = text.toUpperCase() || 'BRUTALIST';
      ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const letters = str.split('');
      const startX = (canvas.width - (letters.length * (fontSize * 0.7))) / 2 + (fontSize * 0.35);
      const startY = canvas.height / 2;

      letters.forEach((char, i) => {
        let x = startX + i * (fontSize * 0.7);
        let y = startY;

        // Calculate distance from mouse for kinetic repulsion
        const dx = mousePosRef.current.x - x;
        const dy = mousePosRef.current.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        let offsetX = 0;
        let offsetY = 0;
        let scale = 1;
        let rot = 0;

        if (dist < maxDist) {
          const factor = (1 - dist / maxDist) * warpForce * 40;
          offsetX = -(dx / dist) * factor;
          offsetY = -(dy / dist) * factor;
          scale = 1 + (1 - dist / maxDist) * 0.5;
          rot = ((dx / dist) * factor * Math.PI) / 180;
        }

        ctx.save();
        ctx.translate(x + offsetX, y + offsetY);
        ctx.rotate(rot);
        ctx.scale(scale, scale);

        // Hard drop shadow behind letter
        ctx.fillStyle = '#000000';
        ctx.fillText(char, 4, 4);

        // Letter foreground
        ctx.fillStyle = themeColors[colorTheme].fg;
        ctx.fillText(char, 0, 0);

        // Letter stark stroke
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeText(char, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, fontSize, warpForce, gridCols, colorTheme]);

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
          <span className="brutal-badge" style={{ background: themeColors[colorTheme].fg, color: '#000' }}>
            WORLD 02
          </span>
          <h1 className="brutal-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            KINETIC TYPO & GRID
          </h1>
        </div>

        <button
          onClick={exportPoster}
          className="brutal-btn"
          style={{ background: themeColors[colorTheme].fg, color: '#000' }}
        >
          <Download size={18} /> EXPORT POSTER (PNG)
        </button>
      </div>

      {/* Control Dashboard */}
      <div className="brutal-card" style={{ marginBottom: '2rem', background: 'var(--bg-secondary)' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 800,
          marginBottom: '1rem',
          color: themeColors[colorTheme].fg,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Sliders size={18} /> VECTOR DEFORMATION CONTROLS
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Text Input */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              CUSTOM TYPOGRAPHY TEXT
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                audioEngine.playBeep(800, 0.01);
              }}
              maxLength={14}
              style={{
                width: '100%',
                background: '#000000',
                border: '2px solid #ffffff',
                color: themeColors[colorTheme].fg,
                padding: '0.5rem 0.8rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 800,
                outline: 'none'
              }}
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              FONT SIZE ({fontSize}PX)
            </label>
            <input
              type="range"
              min="30"
              max="130"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Warp Force Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              WARP FORCE ({warpForce})
            </label>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={warpForce}
              onChange={(e) => setWarpForce(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Color Theme Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              PALETTE THEME
            </label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['lime', 'cyan', 'red', 'mono'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    audioEngine.playClick();
                    setColorTheme(t);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    background: colorTheme === t ? themeColors[t].fg : '#000',
                    color: colorTheme === t ? '#000' : '#fff',
                    border: '2px solid #fff',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Canvas Display */}
      <div style={{
        background: '#000000',
        border: `4px solid ${themeColors[colorTheme].fg}`,
        boxShadow: `8px 8px 0px ${themeColors[colorTheme].fg}`,
        position: 'relative'
      }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={500}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid #ffffff',
          color: themeColors[colorTheme].fg,
          padding: '0.3rem 0.6rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)'
        }}>
          DRAG MOUSE OVER CANVAS TO DISTORT VECTOR TEXT
        </div>
      </div>
    </div>
  );
}
