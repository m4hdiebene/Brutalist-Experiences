import React, { useState, useEffect } from 'react';
import { Terminal, Activity, ShieldAlert, Radio } from 'lucide-react';

export default function MarqueeTicker({ theme }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span><Radio size={14} style={{ display: 'inline', marginRight: 4 }} /> SYSTEM STATUS: 100% ONLINE</span>
        <span>///</span>
        <span>TIME: {time}</span>
        <span>///</span>
        <span>MODE: {theme.toUpperCase()}</span>
        <span>///</span>
        <span>5 DISTINCT BRUTALIST WORLDS</span>
        <span>///</span>
        <span><Activity size={14} style={{ display: 'inline', marginRight: 4 }} /> HERTZ: 144FPS</span>
        <span>///</span>
        <span><ShieldAlert size={14} style={{ display: 'inline', marginRight: 4 }} /> WARNING: NO DECORATIVE FLUFF</span>
        <span>///</span>
        <span><Terminal size={14} style={{ display: 'inline', marginRight: 4 }} /> RAW ARCHITECTURAL EXPERIENCES</span>
        <span>///</span>
      </div>
    </div>
  );
}
