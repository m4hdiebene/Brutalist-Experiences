import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RefreshCw, Volume2, Music, Radio } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AudioMatrixWorld() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(130);
  const [currentStep, setCurrentStep] = useState(0);

  // 4 tracks x 16 steps matrix grid
  const initialGrid = [
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Snare
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],             // HiHat
    [true, false, false, true, false, true, false, false, true, false, true, false, false, true, false, true]     // Synth
  ];

  const [grid, setGrid] = useState(initialGrid);
  const canvasRef = useRef(null);
  const stepRef = useRef(0);
  const timerRef = useRef(null);

  const trackLabels = [
    { name: 'KICK', sound: 'kick', color: 'var(--acid-red)' },
    { name: 'SNARE', sound: 'snare', color: 'var(--acid-lime)' },
    { name: 'HI-HAT', sound: 'hihat', color: 'var(--acid-cyan)' },
    { name: 'SYNTH', sound: 'synth', color: 'var(--acid-magenta)' }
  ];

  // Sequencer playback loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / bpm / 4) * 1000;
      timerRef.current = setInterval(() => {
        const step = (stepRef.current + 1) % 16;
        stepRef.current = step;
        setCurrentStep(step);

        // Play active step sounds
        grid.forEach((track, trackIdx) => {
          if (track[step]) {
            audioEngine.playDrum(trackLabels[trackIdx].sound);
          }
        });
      }, intervalMs);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, bpm, grid]);

  // Oscilloscope canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const renderOscilloscope = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Waveform line
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = isPlaying ? 'var(--acid-red)' : 'var(--acid-lime)';

      const width = canvas.width;
      const height = canvas.height;

      for (let x = 0; x < width; x += 2) {
        const freq = isPlaying ? 0.05 : 0.01;
        const amp = isPlaying ? 35 : 5;
        const y = height / 2 + Math.sin((x * freq) + phase) * amp * (Math.random() * 0.4 + 0.8);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isPlaying ? 0.2 : 0.03;
      animId = requestAnimationFrame(renderOscilloscope);
    };

    renderOscilloscope();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const toggleStep = (trackIdx, stepIdx) => {
    audioEngine.playBeep(900, 0.02);
    const newGrid = grid.map((tr, tIdx) => {
      if (tIdx === trackIdx) {
        const copy = [...tr];
        copy[stepIdx] = !copy[stepIdx];
        return copy;
      }
      return tr;
    });
    setGrid(newGrid);
  };

  const loadPreset = (presetName) => {
    audioEngine.playClick();
    if (presetName === 'techno') {
      setGrid([
        [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
        [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
      ]);
      setBpm(135);
    } else if (presetName === 'cyberpunk') {
      setGrid([
        [true, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false],
        [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true],
        [true, false, true, true, false, true, true, false, true, false, true, true, false, true, true, false],
        [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
      ]);
      setBpm(150);
    } else if (presetName === 'clear') {
      setGrid([
        Array(16).fill(false),
        Array(16).fill(false),
        Array(16).fill(false),
        Array(16).fill(false)
      ]);
    }
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
          <span className="brutal-badge" style={{ background: 'var(--acid-red)', color: '#fff' }}>
            WORLD 03
          </span>
          <h1 className="brutal-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
            CONCRETE SOUND MATRIX
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`brutal-btn ${isPlaying ? 'brutal-btn-red' : ''}`}
          >
            {isPlaying ? <Square size={18} /> : <Play size={18} />}
            {isPlaying ? 'STOP SEQUENCER' : 'PLAY SEQUENCER'}
          </button>
        </div>
      </div>

      {/* Real-time Oscilloscope Canvas */}
      <div className="brutal-card" style={{ marginBottom: '2rem', background: '#000000', padding: 0 }}>
        <div style={{
          background: 'var(--bg-tertiary)',
          padding: '0.5rem 1rem',
          borderBottom: '2px solid #333',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 800,
          display: 'flex',
          justifyContent: 'space-between',
          color: 'var(--acid-lime)'
        }}>
          <span><Radio size={14} style={{ display: 'inline', marginRight: 4 }} /> OSCILLOSCOPE REAL-TIME WAVEFORM</span>
          <span>BPM: {bpm} // STATUS: {isPlaying ? 'RUNNING' : 'STANDBY'}</span>
        </div>
        <canvas ref={canvasRef} width={1200} height={140} style={{ width: '100%', height: '140px', display: 'block' }} />
      </div>

      {/* Control Presets & BPM */}
      <div className="brutal-card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* BPM Slider */}
          <div style={{ minWidth: '240px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--acid-lime)', display: 'block', marginBottom: '0.4rem' }}>
              TEMPO BPM ({bpm} BPM)
            </label>
            <input
              type="range"
              min="70"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="brutal-btn brutal-btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => loadPreset('techno')}>
              INDUSTRIAL TECHNO
            </button>
            <button className="brutal-btn brutal-btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => loadPreset('cyberpunk')}>
              GLITCH CYBERPUNK
            </button>
            <button className="brutal-btn brutal-btn-red" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} onClick={() => loadPreset('clear')}>
              CLEAR MATRIX
            </button>
          </div>
        </div>
      </div>

      {/* 16-step Matrix Grid */}
      <div className="brutal-card" style={{ background: '#0a0a0a', padding: '1.5rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '700px' }}>
          {grid.map((track, trackIdx) => (
            <div key={trackIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Instrument Label */}
              <div style={{
                width: '100px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.9rem',
                color: trackLabels[trackIdx].color,
                background: '#000000',
                padding: '0.4rem 0.6rem',
                border: '2px solid #ffffff',
                textTransform: 'uppercase'
              }}>
                {trackLabels[trackIdx].name}
              </div>

              {/* 16 Steps */}
              <div style={{ display: 'flex', flex: 1, gap: '0.35rem' }}>
                {track.map((active, stepIdx) => {
                  const isCurrent = currentStep === stepIdx && isPlaying;
                  return (
                    <button
                      key={stepIdx}
                      onClick={() => toggleStep(trackIdx, stepIdx)}
                      style={{
                        flex: 1,
                        height: '48px',
                        background: active
                          ? (isCurrent ? '#ffffff' : trackLabels[trackIdx].color)
                          : (isCurrent ? '#333333' : '#1a1a1a'),
                        border: isCurrent ? '3px solid #ffffff' : '2px solid #444444',
                        boxShadow: active ? '3px 3px 0px #000000' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.05s ease',
                        position: 'relative'
                      }}
                    >
                      {stepIdx % 4 === 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          fontSize: '0.55rem',
                          color: active ? '#000000' : '#888888',
                          fontWeight: 800
                        }}>
                          {stepIdx + 1}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
