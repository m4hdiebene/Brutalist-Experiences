# BRUTALIST EXPERIENCES // RAW DIGITAL UNIVERSES

An uncompromising web application featuring **5 distinct interactive Brutalist World Universes**. Built with modern technologies (Vite, React 19, Web Audio API, HTML5 Canvas 2D/3D) without relying on simple static templates.

Repository: [https://github.com/m4hdiebene/Brutalist-Experiences.git](https://github.com/m4hdiebene/Brutalist-Experiences.git)

---

## 🎨 5 Radically Distinct Brutalist Worlds

### 01. Cyber Terminal CLI (`/terminal`)
- **Aesthetic**: 1990s Retro Cyber-DOS CRT Monitor inside an industrial chassis.
- **Features**: Live digital Matrix Rain code canvas background, phosphor scanline filter toggle, customizable phosphor color schemes (Lime Green, Amber, Cyan), ASCII art renderer, memory dump telemetry, and executable UNIX CLI command parser (`help`, `matrix`, `ascii`, `diag`, `manifesto`, `glitch`).

### 02. Kinetic Typography Studio (`/kinetic-typo`)
- **Aesthetic**: Swiss Industrial Typographic Drafting Table with vector blueprint gridlines.
- **Features**: Real-time vector font liquid repulsion physics under mouse cursor, custom text input, font size slider (40px–130px), warp force intensity controls, grid density parameters, and single-click downloadable PNG poster snapshot generator.

### 03. Concrete Sound Matrix Synthesizer (`/audio-matrix`)
- **Aesthetic**: Concrete Sound Console / Modular Synth Rack with metallic step switches and LED step lights.
- **Features**: 16-step drum & synth sound sequencer powered by the Web Audio API (Kick, Snare, Hi-Hat, Synth), real-time oscilloscope audio frequency spectrum visualizer canvas, BPM tempo slider (70–180 BPM), and preset beat pattern loader (*Industrial Berlin Techno*, *Glitch Cyberpunk*).

### 04. 3D Spatial Monolith Void (`/spatial-void`)
- **Aesthetic**: 3D Architectural Spatial Blueprint Viewport with dark spatial depth.
- **Features**: Custom 3D vector perspective projection canvas engine running at 144FPS, orbital light angle slider, structural explode percentage control, wireframe blueprint view toggle, and primitive geometry model switcher (*Monolith Pillar*, *Cube Grid*, *Pyramid Tower*).

### 05. Anti-Design Chaos Lab (`/anti-design`)
- **Aesthetic**: 1990s Punk Zine Anti-Design Playground.
- **Features**: Interactive sticker stamping canvas board, tactile acoustic sound buttons, raw data input validation warning meters, and stark modal overlays.

---

## ⚡ Core Features & Architectural System

- **Default Base Light Mode + Switchable Dark Mode**: Default high-impact stark light mode theme (`#F4F4F0` concrete background, sharp `#000000` text, thick black borders `4px solid #000`, hard drop shadows `6px 6px 0px #000`) with a smooth global theme toggle button in the header bar.
- **Web Audio API Sound Engine**: Integrated native audio synthesizer module ([audioEngine.js](src/utils/audioEngine.js)) providing physical mechanical clicks, glitch sound sweeps, synth pulses, and drum hits with a persistent audio toggle.
- **True Separate Page Routing**: Built using `react-router-dom` with dedicated URL paths (`/`, `/terminal`, `/kinetic-typo`, `/audio-matrix`, `/spatial-void`, `/anti-design`).
- **Homepage Scroll Memory**: Returning to the homepage from any project page automatically restores your exact scroll position where you left off.
- **Full Mobile Responsive Support**: Responsive media queries (`@media (max-width: 900px)`) with a dedicated mobile drawer navigation menu and touch-optimized pointer controls.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/m4hdiebene/Brutalist-Experiences.git
   cd Brutalist-Experiences
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production bundle will be generated in the `dist/` directory.

---

## 📁 Repository Structure

```
Brutalist-Experiences/
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx   # Interactive crosshair cursor with X/Y tracking
│   │   ├── Footer.jsx         # Industrial brutalist footer & telemetry
│   │   ├── MarqueeTicker.jsx  # Top continuous scrolling marquee ticker
│   │   ├── Navbar.jsx         # Header navbar with mobile drawer & theme controls
│   │   └── ScrollToTop.jsx    # Scroll position memory & route scroll reset
│   ├── pages/
│   │   ├── Home.jsx             # The Monolith Hub & World Directory
│   │   ├── TerminalWorld.jsx    # World 01: Cyber Terminal CLI
│   │   ├── KineticTypoWorld.jsx # World 02: Kinetic Typography Studio
│   │   ├── AudioMatrixWorld.jsx # World 03: Concrete Sound Matrix
│   │   ├── SpatialVoidWorld.jsx # World 04: 3D Spatial Monolith Void
│   │   └── AntiDesignWorld.jsx  # World 05: Anti-Design Chaos Lab
│   ├── utils/
│   │   └── audioEngine.js     # Web Audio API sound synthesis engine
│   ├── App.jsx                # SPA router & global theme state controller
│   ├── index.css              # Brutalist design system & CSS variables
│   └── main.jsx               # React root entry point
├── index.html                 # Main HTML template with Google Fonts
├── vite.config.js             # Vite configuration
└── package.json               # Project dependencies & scripts
```

---

## 📜 License

Created under the MIT License. Function over decoration — stark industrial digital web architecture.
