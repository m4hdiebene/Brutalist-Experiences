import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Monitor, RefreshCw, Zap, Trash2, Cpu, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function TerminalWorld() {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'BRUTALIST OS v4.0.9 [UNIX CYBER-TERMINAL INITIALIZED]' },
    { type: 'sys', text: 'Type "help" to view available diagnostic commands.' },
    { type: 'sys', text: '---------------------------------------------------' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [scanlines, setScanlines] = useState(true);
  const [theme, setTheme] = useState('lime'); // lime, red, cyan
  const terminalEndRef = useRef(null);

  const themeColors = {
    lime: 'var(--acid-lime)',
    red: 'var(--acid-red)',
    cyan: 'var(--acid-cyan)'
  };

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

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
          text: `AVAILABLE COMMANDS:
  help              - List commands
  cat manifesto.txt - Print architectural manifesto
  matrix            - Initiate cyber binary stream
  glitch            - Trigger audio glitch & visual warp
  ascii             - Output concrete ASCII monolith
  diag              - System memory & CPU telemetry
  color <hex>       - Set prompt color custom hex
  theme <lime|red|cyan> - Switch color theme
  clear             - Flush terminal screen`
        });
        break;

      case 'cat':
        if (parts[1] === 'manifesto.txt') {
          newHist.push({
            type: 'output',
            text: `[MANIFESTO.TXT]
1. EXPOSE STRUCTURE: RAW COLUMNS, ZERO SOFTENING.
2. MECHANICAL AUDIO: FEEDBACK ON EVERY CLICK.
3. STARK CONTRAST: MONOCHROME & HIGH VOLTAGE ACID ACCENTS.
4. UNFORGIVING ARCHITECTURE: FUNCTION OVER ALL.`
          });
        } else {
          newHist.push({ type: 'error', text: `File not found: ${parts[1] || 'unspecified'}` });
        }
        break;

      case 'matrix':
        audioEngine.playGlitch();
        newHist.push({
          type: 'output',
          text: `01000010 01010010 01010101 01010100 01000001 01001100 01001001 01010011 01010100
10110100 11001010 10101011 00101101 11010101 01010101 11100101 00010111 10101010
[STREAM COMPLETED: 256 BYTES TRANSMITTED]`
        });
        break;

      case 'glitch':
        audioEngine.playGlitch();
        newHist.push({ type: 'output', text: '!!! SYSTEM GLITCH TRIGGERED !!!' });
        break;

      case 'ascii':
        audioEngine.playBeep(1200, 0.1);
        newHist.push({
          type: 'output',
          text: `
  +-----------------------+
  |  BRUTALIST MONOLITH   |
  |  ===================  |
  |  |   |   |   |   |   ||
  |  |   |   |   |   |   ||
  |  |   |   |   |   |   ||
  |  +---+---+---+---+---+|
  |  [EXPOSED CONCRETE]  |
  +-----------------------+`
        });
        break;

      case 'diag':
        newHist.push({
          type: 'output',
          text: `TELEMETRY DUMP:
  CPU ALLOCATION: 4.2%
  MEMORY USED: 64MB / 1024MB
  AUDIO SYNTH: ONLINE (WebAudioAPI)
  FPS RATE: 144.0 FPS
  GRID REASONING: OPTIMAL`
        });
        break;

      case 'theme':
        if (['lime', 'red', 'cyan'].includes(parts[1])) {
          setTheme(parts[1]);
          newHist.push({ type: 'output', text: `Theme updated to: ${parts[1].toUpperCase()}` });
        } else {
          newHist.push({ type: 'error', text: 'Invalid theme. Use: theme lime | theme red | theme cyan' });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        audioEngine.playBeep(300, 0.1);
        newHist.push({ type: 'error', text: `Command not recognized: "${cmd}". Type "help" for command list.` });
        break;
    }

    setHistory(newHist);
    setInputVal('');
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
          <span className="brutal-badge" style={{ background: themeColors[theme] }}>
            WORLD 01
          </span>
          <h1 className="brutal-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            CYBER TERMINAL CLI
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              audioEngine.playClick();
              setScanlines(!scanlines);
            }}
            className="brutal-btn brutal-btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.8rem' }}
          >
            <Monitor size={16} /> CRT SCANLINES: {scanlines ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              setHistory([]);
            }}
            className="brutal-btn brutal-btn-red"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.8rem' }}
          >
            <Trash2 size={16} /> CLEAR
          </button>
        </div>
      </div>

      {/* Terminal Screen Container */}
      <div className={scanlines ? 'crt-scanlines' : ''} style={{
        background: '#050505',
        border: `4px solid ${themeColors[theme]}`,
        boxShadow: `8px 8px 0px ${themeColors[theme]}`,
        minHeight: '550px',
        maxHeight: '650px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Terminal Header Bar */}
        <div style={{
          background: themeColors[theme],
          color: '#000000',
          padding: '0.5rem 1rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={16} /> ROOT@BRUTALIST-OS:~ (TTY1)
          </div>
          <div>BAUD: 115200 // MONO</div>
        </div>

        {/* Terminal Content Stream */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              {item.type === 'user' && (
                <span style={{ color: themeColors[theme], fontWeight: 700 }}>{item.text}</span>
              )}
              {item.type === 'sys' && (
                <span style={{ color: '#888888' }}>{item.text}</span>
              )}
              {item.type === 'output' && (
                <pre style={{
                  color: '#ffffff',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  margin: 0
                }}>
                  {item.text}
                </pre>
              )}
              {item.type === 'error' && (
                <span style={{ color: 'var(--acid-red)', fontWeight: 700 }}>{item.text}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommandSubmit} style={{
          display: 'flex',
          borderTop: `2px solid ${themeColors[theme]}`,
          background: '#0a0a0a'
        }}>
          <span style={{
            padding: '0.8rem 1rem',
            color: themeColors[theme],
            fontWeight: 800,
            fontFamily: 'var(--font-mono)'
          }}>
            root@brutalist:~#
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              audioEngine.playBeep(1000, 0.01);
            }}
            placeholder="Type command ('help', 'matrix', 'ascii', 'diag')..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 600,
              paddingRight: '1rem'
            }}
            autoFocus
          />
          <button
            type="submit"
            style={{
              background: themeColors[theme],
              color: '#000000',
              border: 'none',
              padding: '0 1.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            EXEC
          </button>
        </form>
      </div>
    </div>
  );
}
