import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MarqueeTicker from './components/MarqueeTicker';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

// Pages / Brutalist World Pages
import Home from './pages/Home';
import TerminalWorld from './pages/TerminalWorld';
import KineticTypoWorld from './pages/KineticTypoWorld';
import AudioMatrixWorld from './pages/AudioMatrixWorld';
import SpatialVoidWorld from './pages/SpatialVoidWorld';
import AntiDesignWorld from './pages/AntiDesignWorld';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState('light'); // Light mode is default base

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        {/* Background Architectural Grid Lines */}
        <div className="grid-overlay" />

        {/* Custom Brutalist Crosshair Cursor */}
        <CustomCursor />

        {/* Top Continuous Marquee Ticker */}
        <MarqueeTicker theme={theme} setTheme={setTheme} />

        {/* Multi-world Navigation Header */}
        <Navbar />

        {/* Main World Page Content Canvas */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terminal" element={<TerminalWorld />} />
            <Route path="/kinetic-typo" element={<KineticTypoWorld />} />
            <Route path="/audio-matrix" element={<AudioMatrixWorld />} />
            <Route path="/spatial-void" element={<SpatialVoidWorld />} />
            <Route path="/anti-design" element={<AntiDesignWorld />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Industrial Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
