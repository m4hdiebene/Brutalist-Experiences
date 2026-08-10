import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Activity, ShieldAlert, Radio } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function MarqueeTicker() {
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    audioEngine.playClick();
  };

  return (
    <div className="marquee-container" style={{ position: 'relative' }}>
      <div className="marquee-content">
        <span><Radio size={14} style={{ display: 'inline', marginRight: 4 }} /> SYSTEM STATUS: 100% ONLINE</span>
        <span>///</span>
        <span>TIME: {time}</span>
        <span>///</span>
        <span>ARCHITECTURE: UNCOMPROMISING BRUTALISM</span>
        <span>///</span>
        <span>5 WORLDS READY FOR DISCOVERY</span>
        <span>///</span>
        <span><Activity size={14} style={{ display: 'inline', marginRight: 4 }} /> HERTZ: 144FPS</span>
        <span>///</span>
        <span><ShieldAlert size={14} style={{ display: 'inline', marginRight: 4 }} /> WARNING: NO DECORATIVE FLUFF ALLOWED</span>
        <span>///</span>
        <span><Terminal size={14} style={{ display: 'inline', marginRight: 4 }} /> RAW INDUSTRIAL INTERACTION</span>
        <span>///</span>
      </div>

      <button
        onClick={handleAudioToggle}
        title="Toggle Audio Engine"
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#000000',
          color: isMuted ? '#ff2e00' : '#ccff00',
          border: '2px solid #000000',
          padding: '0.2rem 0.6rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 5
        }}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
      </button>
    </div>
  );
}
