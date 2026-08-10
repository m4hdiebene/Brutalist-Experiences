import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Monitor, Trash2, Cpu, CornerDownLeft, Play, AlertCircle } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function TerminalWorld() {
  const [history, setHistory] = useState([
    { type: 'sys', text: '===================================================' },
    { type: 'sys', text: 'BRUTALIST OS v4.0.9 // UNIX CYBER TERMINAL' },
    { type: 'sys', text: 'SYSTEM PHOSPHOR: LIME CRT (144Hz)' },
    { type: 'sys', text: 'Type "help" to view available execution commands.' },
    { type: 'sys', text: '===================================================' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [scanlines, setScanlines] = useState(true);
  const [crtTheme, setCrtTheme] = useState('green'); // green, amber, cyan
  const terminalEndRef = useRef(null);
  const canvasRef = useRef(null);

  const themeStyles = {
    green: { color: '#00ff66', border: '#00ff66', bg: '#030c05' },
    amber: { color: '#ffb000', border: '#ffb000', bg: '#0c0a00' },
    cyan: { color: '#00ffff', border: '#00ffff', bg: '#000c0f' }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Cyber Matrix Rain Background Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const chars = '0123456789ABCDEFBRUTALIST';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = themeStyles[crtTheme].color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();
    return () => cancelAnimationFrame(animId);
  }, [crtTheme]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    audioEngine.playClick();
    const newHist = [...history, { type: 'user', text: `root@brutalist-os:~# ${inputVal}` }];

    const parts = cmd.split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        newHist.push({
          type: 'output',
          text: `COMMAND REGISTRY:
  help              - Display command index
  manifesto         - Output brutalist digital rules
  matrix            - Trigger binary code cascade
  glitch            - Execute audio synth distortion
  ascii             - Render concrete architectural tower
  diag              - System memory & CPU dump
  theme <green|amber|cyan> - Change CRT phosphor tone
  clear             - Flush terminal log`
        });
        break;

      case 'manifesto':
        newHist.push({
          type: 'output',
          text: `[BRUTALIST DIGITAL RULES]
1. HIDE NO SKELETON: Gridlines, borders, parameters exposed.
2. SENSORY AUDIO: Web Audio API synthesis on every trigger.
3. HIGH STARK CONTRAST: Sharp monochrome & high-voltage accents.
4. RADICAL DIFFERENCE: Every page is a distinct universe.`
        });
        break;

      case 'matrix':
        audioEngine.playGlitch();
        newHist.push({
          type: 'output',
          text: `01000010 01010010 01010101 01010100 01000001 01001100 01001001 01010011 01010100
10110100 11001010 10101011 00101101 11010101 01010101 11100101 00010111 10101010
[CASCADE EXECUTED // 1024 BYTES DUMPED]`
        });
        break;

      case 'glitch':
        audioEngine.playGlitch();
        newHist.push({ type: 'output', text: '>>> WARNING: SYNTHETIC FREQUENCY GLITCH DISPATCHED <<<' });
        break;

      case 'ascii':
        audioEngine.playBeep(1200, 0.1);
        newHist.push({
          type: 'output',
          text: `
    _______________________________________
   /                                       \\
  |   +---------------------------------+   |
  |   |   BRUTALIST TERMINAL MONOLITH   |   |
  |   |   ===========================   |   |
  |   |   [X] [X] [X] [X] [X] [X] [X]   |   |
  |   +---------------------------------+   |
   \\_______________________________________/`
        });
        break;

      case 'diag':
        newHist.push({
          type: 'output',
          text: `SYSTEM DUMP:
  CPU CORE: 2.1% LOAD
  RAM ALLOCATED: 184MB / 4096MB
  AUDIO SYNTH: ONLINE (WebAudioAPI)
  FPS: 144Hz`
        });
        break;

      case 'theme':
        if (['green', 'amber', 'cyan'].includes(parts[1])) {
          setCrtTheme(parts[1]);
          newHist.push({ type: 'output', text: `CRT Phosphor color changed to: ${parts[1].toUpperCase()}` });
        } else {
          newHist.push({ type: 'error', text: 'Usage: theme green | theme amber | theme cyan' });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        audioEngine.playBeep(300, 0.1);
        newHist.push({ type: 'error', text: `Command "${cmd}" not recognized. Type "help" for list.` });
        break;
    }

    setHistory(newHist);
    setInputVal('');
  };

  return (
    <div style={{
      background: '#000000',
      color: themeStyles[crtTheme].color,
      padding: '1.5rem',
      border: `6px solid ${themeStyles[crtTheme].border}`,
      boxShadow: `12px 12px 0px ${themeStyles[crtTheme].border}`,
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: `3px solid ${themeStyles[crtTheme].border}`,
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: themeStyles[crtTheme].border,
            color: '#000',
            padding: '0.3rem 0.6rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            fontSize: '0.8rem'
          }}>
            WORLD 01
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: themeStyles[crtTheme].color
          }}>
            CYBER TERMINAL CLI
          </h1>
        </div>

        {/* Phosphor Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['green', 'amber', 'cyan'].map(t => (
            <button
              key={t}
              onClick={() => {
                audioEngine.playClick();
                setCrtTheme(t);
              }}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                background: crtTheme === t ? themeStyles[t].border : '#000000',
                color: crtTheme === t ? '#000000' : themeStyles[t].color,
                border: `2px solid ${themeStyles[t].border}`,
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}

          <button
            onClick={() => {
              audioEngine.playClick();
              setScanlines(!scanlines);
            }}
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 900,
              background: '#000000',
              color: themeStyles[crtTheme].color,
              border: `2px solid ${themeStyles[crtTheme].border}`,
              cursor: 'pointer'
            }}
          >
            <Monitor size={14} style={{ display: 'inline', marginRight: 4 }} /> SCANLINES: {scanlines ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Screen Frame */}
      <div className={scanlines ? 'crt-scanlines' : ''} style={{
        flex: 1,
        background: themeStyles[crtTheme].bg,
        border: `3px solid ${themeStyles[crtTheme].border}`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Matrix Canvas Layer */}
        <canvas ref={canvasRef} style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          pointerEvents: 'none'
        }} />

        {/* Terminal Window Content */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.92rem',
          lineHeight: '1.6',
          zIndex: 2
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              {item.type === 'user' && (
                <span style={{ fontWeight: 900, color: themeStyles[crtTheme].color }}>{item.text}</span>
              )}
              {item.type === 'sys' && (
                <span style={{ opacity: 0.7 }}>{item.text}</span>
              )}
              {item.type === 'output' && (
                <pre style={{
                  color: themeStyles[crtTheme].color,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  margin: 0
                }}>
                  {item.text}
                </pre>
              )}
              {item.type === 'error' && (
                <span style={{ color: 'var(--acid-red)', fontWeight: 900 }}>{item.text}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Form Input */}
        <form onSubmit={handleCommandSubmit} style={{
          display: 'flex',
          borderTop: `2px solid ${themeStyles[crtTheme].border}`,
          background: '#000000',
          zIndex: 2
        }}>
          <span style={{
            padding: '0.75rem 1rem',
            fontWeight: 900,
            color: themeStyles[crtTheme].color
          }}>
            root@brutalist:~#
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              audioEngine.playBeep(1100, 0.01);
            }}
            placeholder="Type command ('help', 'matrix', 'ascii', 'manifesto', 'diag')..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: themeStyles[crtTheme].color,
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 700,
              paddingRight: '1rem'
            }}
            autoFocus
          />
          <button
            type="submit"
            style={{
              background: themeStyles[crtTheme].border,
              color: '#000000',
              border: 'none',
              padding: '0 1.25rem',
              fontWeight: 900,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            EXEC <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
