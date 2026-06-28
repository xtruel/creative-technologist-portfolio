import React from 'react';

interface GraffitiSketchLayerProps {
  opacity?: number;
  density?: 'low' | 'medium' | 'high';
  visible?: boolean;
  className?: string;
}

export default function GraffitiSketchLayer({ 
  opacity = 0.25, 
  density = 'low', 
  visible = true, 
  className = '' 
}: GraffitiSketchLayerProps) {
  if (!visible) return null;

  // Render different SVG annotations based on density levels
  const showMedium = density === 'medium' || density === 'high';
  const showHigh = density === 'high';

  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-[1] ${className}`}
      style={{ opacity }}
    >
      {/* Absolute floating SVGs and annotations */}
      <svg className="absolute inset-0 w-full h-full min-h-[3000px]" xmlns="http://www.w3.org/2000/svg">
        
        {/* Sketchbook grid paper lines (subtle blueprint background grid) */}
        <pattern id="sketchbookGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 0, 0, 0.015)" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#sketchbookGrid)" />

        {/* 1. Left column notebook margin divider (Always visible) */}
        <line 
          x1="80" y1="0" x2="80" y2="100%" 
          stroke="rgba(0, 0, 0, 0.08)" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
        />

        {/* 2. Top Header corner scribble: pencil construction circles (Low density) */}
        <g transform="translate(120, 150)" stroke="rgba(0, 0, 0, 0.15)" fill="none" strokeWidth="1">
          <circle cx="0" cy="0" r="45" strokeDasharray="2,3" />
          <circle cx="10" cy="-5" r="30" />
          <line x1="-60" y1="0" x2="60" y2="0" />
          <line x1="0" y1="-60" x2="0" y2="60" />
          <path d="M -30,-30 L 30,30" strokeWidth="0.5" />
          <path d="M -30,30 L 30,-30" strokeWidth="0.5" />
          <text 
            x="50" y="-10" 
            fill="rgba(0, 0, 0, 0.4)" 
            className="font-mono text-[7px] font-bold tracking-widest"
          >
            R_COORD = 1.618 (GOLDEN)
          </text>
        </g>

        {/* 3. Anti-style throwup letter contours: 'Q', 'W', '3' (Low density) */}
        <g transform="translate(1380, 220)" stroke="rgba(0, 0, 0, 0.1)" fill="none" strokeWidth="1.5">
          {/* Letter Q contour study */}
          <path d="M 50,50 C 30,10 0,20 0,60 C 0,100 40,110 50,70 C 55,60 60,90 70,100" strokeWidth="2" />
          <path d="M 45,55 C 35,20 10,25 10,65 C 10,95 40,105 45,75" strokeWidth="0.75" strokeDasharray="2,2" />
          
          {/* Letter W study */}
          <path d="M 80,45 L 95,100 L 110,60 L 125,100 L 140,40" strokeWidth="2" />
          
          {/* Arrow directional guide */}
          <path d="M 145,50 L 160,35 M 160,35 L 152,35 M 160,35 L 160,43" strokeWidth="1" />
          
          <text 
            x="80" y="120" 
            fill="rgba(0, 0, 0, 0.35)" 
            className="font-mono text-[6.5px] tracking-wider uppercase font-semibold"
          >
            [ ANTI_STYLE_THROW_v1.09 ]
          </text>
        </g>

        {/* 4. Felt-tip marker note (Low density) */}
        <g transform="translate(85, 800)" stroke="rgba(0, 0, 0, 0.12)" fill="none" strokeWidth="1">
          <path d="M 10,25 C 25,10 50,15 70,30 C 90,45 80,75 50,80 C 20,85 10,65 10,40 Z" strokeWidth="1.5" />
          <line x1="10" y1="40" x2="90" y2="40" strokeDasharray="3,3" />
          <text 
            x="100" y="35" 
            fill="rgba(0, 0, 0, 0.45)" 
            className="font-mono text-[7.5px] tracking-widest font-bold uppercase"
          >
            // CORRECTION: REDUCE CGI REFRACTION WEIGHT
          </text>
          <text 
            x="100" y="50" 
            fill="rgba(0, 0, 0, 0.3)" 
            className="font-mono text-[6.5px]"
          >
            "Baselines aligned to strict Swiss grids; marker gestures free the boundary"
          </text>
        </g>

        {/* 5. Stamp-like seal / Architect certificate block (Always visible at the bottom) */}
        <g transform="translate(100, 2400)" stroke="rgba(0, 0, 0, 0.15)" fill="none" strokeWidth="1">
          <rect x="0" y="0" width="180" height="50" rx="3" />
          <line x1="0" y1="20" x2="180" y2="20" />
          <line x1="60" y1="20" x2="60" y2="50" />
          <text 
            x="10" y="13" 
            fill="rgba(0, 0, 0, 0.5)" 
            className="font-mono text-[7.5px] font-bold tracking-widest uppercase"
          >
            OFFICIAL RESEARCH PLATFORM
          </text>
          <text 
            x="8" y="32" 
            fill="rgba(0, 0, 0, 0.4)" 
            className="font-mono text-[6.5px]"
          >
            CLIENT_REF
          </text>
          <text 
            x="8" y="43" 
            fill="rgba(0, 0, 0, 0.8)" 
            className="font-mono text-[8px] font-bold"
          >
            qwerty3D_ // CO
          </text>
          <text 
            x="68" y="32" 
            fill="rgba(0, 0, 0, 0.4)" 
            className="font-mono text-[6.5px]"
          >
            CATALOGUE CODE
          </text>
          <text 
            x="68" y="43" 
            fill="rgba(0, 0, 0, 0.8)" 
            className="font-mono text-[8px] font-bold"
          >
            SWISS_JAPANESE_009
          </text>
        </g>

        {/* ========================================================== */}
        {/* MEDIUM DENSITY ADDITIONAL GRAPHICS (Perspective lines, Japanese) */}
        {/* ========================================================== */}
        {showMedium && (
          <>
            {/* Perspective grid lines / vanishing point study */}
            <g transform="translate(700, 450)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" fill="none">
              <circle cx="0" cy="0" r="4" fill="rgba(0,0,0,0.1)" />
              <line x1="-300" y1="-150" x2="300" y2="150" />
              <line x1="-300" y1="150" x2="300" y2="-150" />
              <line x1="-400" y1="0" x2="400" y2="0" strokeDasharray="2,2" />
              <line x1="0" y1="-250" x2="0" y2="250" strokeDasharray="2,2" />
              <rect x="-120" y="-75" width="240" height="150" strokeWidth="0.75" strokeDasharray="4,4" />
              <text x="10" y="-10" fill="rgba(0,0,0,0.3)" className="font-mono text-[6px] uppercase tracking-wider">
                V_POINT // GRID_PERSPECTIVE_MATRIX
              </text>
            </g>

            {/* Japanese Scribbles & Anatomy Notes */}
            <g transform="translate(100, 1250)" stroke="rgba(0,0,0,0.12)" fill="none" strokeWidth="1">
              <path d="M 10,10 L 40,15 L 20,45" strokeWidth="1.5" />
              {/* "アイデア" (Idea) written in Japanese */}
              <text x="50" y="20" fill="rgba(0,0,0,0.4)" className="font-sans text-[10px] font-semibold tracking-wider">
                アイデア // IDEA STUDY
              </text>
              <text x="50" y="35" fill="rgba(0,0,0,0.25)" className="font-mono text-[7px]">
                ANATOMY_WEIGHT: SLIGHT ASYMMETRY
              </text>
              <path d="M 50,42 L 180,42" strokeDasharray="1,2" />
            </g>

            {/* Crossed-out ideas and mini arrows */}
            <g transform="translate(1250, 1500)" stroke="rgba(0,0,0,0.12)" fill="none" strokeWidth="1">
              <text x="0" y="0" fill="rgba(0,0,0,0.3)" className="font-mono text-[8px] line-through uppercase">
                [EXPIRED_CONCEPT: SYMMETRICAL REACTION]
              </text>
              <path d="M -10, -3 L 180, -3" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
              <path d="M 80,10 Q 120,30 90,60" strokeWidth="1.25" strokeDasharray="2,1" />
              {/* Arrow tip */}
              <path d="M 90,60 L 98,54 M 90,60 L 93,68" strokeWidth="1" />
              <text x="105" y="55" fill="rgba(0,0,0,0.4)" className="font-mono text-[6.5px]">
                ROUTE TO ASYMMETRY_EXE
              </text>
            </g>

            {/* Coordinate markers */}
            <g transform="translate(950, 920)" fill="rgba(0,0,0,0.2)" className="font-mono text-[6px] tracking-widest">
              <text x="0" y="0">X_AXIS_COORD: 1.000</text>
              <text x="0" y="10">Y_AXIS_COORD: 0.707</text>
              <text x="0" y="20" fill="rgba(0,0,0,0.4)">Z_AXIS_COORD: 0.000</text>
            </g>
          </>
        )}

        {/* ========================================================== */}
        {/* HIGH DENSITY EXTRAS (Scribbles, Throwups, Heavy Annotation) */}
        {/* ========================================================== */}
        {showHigh && (
          <>
            {/* Big raw street throwup gesture background sketch */}
            <g transform="translate(350, 1750)" stroke="rgba(0, 0, 0, 0.15)" fill="none" strokeWidth="2.5">
              <path d="M 0,100 C 30,20 80,10 120,60 C 140,80 160,20 200,60 C 230,90 220,150 150,160 C 80,170 10,130 0,100 Z" />
              <path d="M 50,75 L 120,135 M 120,135 L 110,135 M 120,135 L 120,125" strokeWidth="1" />
              {/* Japanese translation "グラフィティ 研究" (Graffiti Research) */}
              <text x="10" y="195" fill="rgba(0,0,0,0.45)" className="font-sans text-[11px] font-bold tracking-widest">
                グラフィティ研究 // GRAFFITI CORE STUDY
              </text>
              <text x="10" y="210" fill="rgba(0,0,0,0.3)" className="font-mono text-[7px] uppercase">
                TYPE: STREET-GEN_RAW_MARKER // STRETCH_LEVEL: MAX
              </text>
            </g>

            {/* Detailed letter anatomy guidelines */}
            <g transform="translate(850, 2100)" stroke="rgba(0,0,0,0.15)" fill="none" strokeWidth="1">
              {/* Letter A analysis */}
              <path d="M 50,50 L 80,110 M 80,110 L 110,50" strokeWidth="2" />
              <line x1="65" y1="85" x2="95" y2="85" strokeWidth="1.5" />
              <circle cx="80" cy="110" r="6" strokeDasharray="1,1" />
              <circle cx="80" cy="50" r="10" strokeDasharray="2,2" stroke="rgba(0,0,0,0.3)" />
              <text x="130" y="75" fill="rgba(0,0,0,0.4)" className="font-mono text-[7px] uppercase tracking-wider font-bold">
                ANATOMICAL_APEX // GAP: 0.35
              </text>
              <text x="130" y="90" fill="rgba(0,0,0,0.25)" className="font-mono text-[6px]">
                X_LENGTH_VEC: [45.2, 90.1, 12.8]
              </text>
              {/* Arrow */}
              <path d="M 125,75 L 115,75" strokeWidth="1" />
              <path d="M 115,75 L 119,71 M 115,75 L 119,79" strokeWidth="1" />
            </g>

            {/* Massive geometric concentric circles background */}
            <g transform="translate(1300, 1000)" stroke="rgba(0,0,0,0.06)" fill="none" strokeWidth="0.5">
              <circle cx="0" cy="0" r="100" />
              <circle cx="0" cy="0" r="200" />
              <circle cx="0" cy="0" r="300" strokeDasharray="4,4" />
              <line x1="-350" y1="0" x2="350" y2="0" />
              <line x1="0" y1="-350" x2="0" y2="350" />
              <text x="15" y="-15" fill="rgba(0,0,0,0.2)" className="font-mono text-[6px] tracking-widest">
                GEOMETRIC_ORBIT_LIMIT_V2
              </text>
            </g>

            {/* Japanese character stamps: "展" (Exhibition) in a box */}
            <g transform="translate(1380, 2350)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none">
              <rect x="0" y="0" width="30" height="30" strokeWidth="1.5" />
              <text x="6" y="21" fill="rgba(0,0,0,0.6)" className="font-sans text-[15px] font-bold leading-none">
                展
              </text>
              <text x="38" y="12" fill="rgba(0,0,0,0.4)" className="font-mono text-[6px] uppercase">
                EXHIBITION APPROVED SEAL
              </text>
              <text x="38" y="22" fill="rgba(0,0,0,0.3)" className="font-mono text-[6px] uppercase">
                TOKYO OFFICE // qwerty3D_
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
