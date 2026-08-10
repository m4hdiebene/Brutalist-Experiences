import React, { useState, useEffect, useRef } from 'react';
import { Box, RotateCw, Eye, Sun, Layers, Grid } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SpatialVoidWorld() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [explode, setExplode] = useState(0);
  const [lightAngle, setLightAngle] = useState(45);
  const [wireframe, setWireframe] = useState(false);
  const [primitive, setPrimitive] = useState('monolith'); // monolith, cubeGrid, pyramid
  const canvasRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const getBlocks = () => {
      if (primitive === 'monolith') {
        return [
          { x: 0, y: -60, z: 0, w: 100, h: 160, d: 100 },
          { x: 0, y: 70, z: 0, w: 140, h: 40, d: 140 },
          { x: 0, y: -160, z: 0, w: 60, h: 40, d: 60 }
        ];
      } else if (primitive === 'cubeGrid') {
        const blocks = [];
        for (let ix = -1; ix <= 1; ix++) {
          for (let iy = -1; iy <= 1; iy++) {
            blocks.push({ x: ix * 70, y: iy * 70, z: 0, w: 50, h: 50, d: 50 });
          }
        }
        return blocks;
      } else {
        return [
          { x: 0, y: 80, z: 0, w: 180, h: 40, d: 180 },
          { x: 0, y: 30, z: 0, w: 140, h: 40, d: 140 },
          { x: 0, y: -20, z: 0, w: 100, h: 40, d: 100 },
          { x: 0, y: -70, z: 0, w: 60, h: 40, d: 60 },
          { x: 0, y: -110, z: 0, w: 20, h: 40, d: 20 }
        ];
      }
    };

    const project = (x, y, z, rotY) => {
      const rad = (rotY * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;

      const pitchRad = (25 * Math.PI) / 180;
      const cosP = Math.cos(pitchRad);
      const sinP = Math.sin(pitchRad);

      const ry = y * cosP - rz * sinP;
      const rzFinal = y * sinP + rz * cosP;

      const fov = 380;
      const scale = fov / (fov + rzFinal + 300);

      return {
        x: canvas.width / 2 + rx * scale,
        y: canvas.height / 2 + ry * scale,
        z: rzFinal,
        scale
      };
    };

    const render = () => {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw 3D floor grid plane
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let g = -400; g <= 400; g += 80) {
        const p1 = project(g, 150, -400, angleRef.current);
        const p2 = project(g, 150, 400, angleRef.current);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      if (autoRotate) {
        angleRef.current = (angleRef.current + 0.8) % 360;
      }

      const blocks = getBlocks();

      blocks.forEach((b) => {
        const expFactor = explode * 1.5;
        const bx = b.x * (1 + expFactor * 0.01);
        const by = b.y * (1 + expFactor * 0.01);
        const bz = b.z * (1 + expFactor * 0.01);

        const halfW = b.w / 2;
        const halfH = b.h / 2;
        const halfD = b.d / 2;

        const vertices = [
          { x: bx - halfW, y: by - halfH, z: bz - halfD },
          { x: bx + halfW, y: by - halfH, z: bz - halfD },
          { x: bx + halfW, y: by + halfH, z: bz - halfD },
          { x: bx - halfW, y: by + halfH, z: bz - halfD },
          { x: bx - halfW, y: by - halfH, z: bz + halfD },
          { x: bx + halfW, y: by - halfH, z: bz + halfD },
          { x: bx + halfW, y: by + halfH, z: bz + halfD },
          { x: bx - halfW, y: by + halfH, z: bz + halfD }
        ].map(v => project(v.x, v.y, v.z, angleRef.current));

        const faces = [
          { verts: [0, 1, 2, 3], normal: [0, 0, -1] },
          { verts: [5, 4, 7, 6], normal: [0, 0, 1] },
          { verts: [4, 0, 3, 7], normal: [-1, 0, 0] },
          { verts: [1, 5, 6, 2], normal: [1, 0, 0] },
          { verts: [4, 5, 1, 0], normal: [0, -1, 0] },
          { verts: [3, 2, 6, 7], normal: [0, 1, 0] }
        ];

        faces.forEach(f => {
          ctx.beginPath();
          ctx.moveTo(f.verts[0].x, f.verts[0].y);
          for (let i = 1; i < f.verts.length; i++) {
            ctx.lineTo(f.verts[i].x, f.verts[i].y);
          }
          ctx.closePath();

          if (wireframe) {
            ctx.strokeStyle = '#d946ef';
            ctx.lineWidth = 2;
            ctx.stroke();
          } else {
            const lightRad = (lightAngle * Math.PI) / 180;
            const lx = Math.cos(lightRad);
            const lz = Math.sin(lightRad);
            const dot = Math.max(0.15, (f.normal[0] * lx + f.normal[2] * lz));

            ctx.fillStyle = `rgb(${Math.floor(255 * dot)}, ${Math.floor(255 * dot)}, ${Math.floor(255 * dot)})`;
            ctx.fill();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [autoRotate, explode, lightAngle, wireframe, primitive]);

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
          <span className="brutal-badge" style={{ background: 'var(--acid-magenta)', color: '#fff' }}>
            WORLD 04 // 3D VOID
          </span>
          <h1 className="brutal-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
            3D SPATIAL MONOLITH
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              audioEngine.playClick();
              setWireframe(!wireframe);
            }}
            className="brutal-btn brutal-btn-outline"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
          >
            <Eye size={14} /> WIREFRAME: {wireframe ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              setAutoRotate(!autoRotate);
            }}
            className="brutal-btn"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
          >
            <RotateCw size={14} /> ROTATE: {autoRotate ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="brutal-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Primitive Switcher */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--acid-magenta)', display: 'block', marginBottom: '0.3rem' }}>
              GEOMETRIC MONOLITH MODEL
            </label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              {['monolith', 'cubeGrid', 'pyramid'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    audioEngine.playClick();
                    setPrimitive(p);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    background: primitive === p ? 'var(--acid-magenta)' : 'var(--bg-primary)',
                    color: primitive === p ? '#ffffff' : 'var(--text-primary)',
                    border: '2px solid var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Explode Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--acid-lime)', display: 'block', marginBottom: '0.3rem' }}>
              STRUCTURAL EXPLODE ({explode}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={explode}
              onChange={(e) => setExplode(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Light Angle Slider */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--acid-cyan)', display: 'block', marginBottom: '0.3rem' }}>
              ORBITAL LIGHT ANGLE ({lightAngle}&deg;)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={lightAngle}
              onChange={(e) => setLightAngle(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div style={{
        background: '#050508',
        border: '4px solid var(--acid-magenta)',
        boxShadow: '8px 8px 0px var(--acid-magenta)',
        position: 'relative'
      }}>
        <canvas ref={canvasRef} width={1200} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid #ffffff',
          padding: '0.35rem 0.7rem',
          fontSize: '0.75rem',
          color: 'var(--acid-magenta)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800
        }}>
          3D PERSPECTIVE VIEWPORT // FOV: 380
        </div>
      </div>
    </div>
  );
}
