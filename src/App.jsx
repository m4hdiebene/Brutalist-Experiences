import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MarqueeTicker from './components/MarqueeTicker';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

// Pages / Brutalist Worlds
import Home from './pages/Home';
import TerminalWorld from './pages/TerminalWorld';
import KineticTypoWorld from './pages/KineticTypoWorld';
import AudioMatrixWorld from './pages/AudioMatrixWorld';
import SpatialVoidWorld from './pages/SpatialVoidWorld';
import AntiDesignWorld from './pages/AntiDesignWorld';

export default function App() {
  const [activeWorld, setActiveWorld] = useState('home');

  const renderWorld = () => {
    switch (activeWorld) {
      case 'terminal':
        return <TerminalWorld />;
      case 'kinetic-typo':
        return <KineticTypoWorld />;
      case 'audio-matrix':
        return <AudioMatrixWorld />;
      case 'spatial-void':
        return <SpatialVoidWorld />;
      case 'anti-design':
        return <AntiDesignWorld />;
      case 'home':
      default:
        return <Home setActiveWorld={setActiveWorld} />;
    }
  };

  return (
    <div className="app-container">
      {/* Background Architectural Grid Lines */}
      <div className="grid-overlay" />

      {/* Custom Brutalist Crosshair Cursor */}
      <CustomCursor />

      {/* Top Continuous Marquee Ticker */}
      <MarqueeTicker />

      {/* Multi-world Navigation Header */}
      <Navbar activeWorld={activeWorld} setActiveWorld={setActiveWorld} />

      {/* Main World Content Canvas */}
      <main className="main-content">
        {renderWorld()}
      </main>

      {/* Industrial Footer */}
      <Footer setActiveWorld={setActiveWorld} />
    </div>
  );
}
