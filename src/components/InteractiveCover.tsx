import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  RotateCcw, 
  Compass, 
  CornerDownRight,
  Maximize2,
  Minimize2,
  Settings,
  Grid,
  Sparkles,
  ExternalLink,
  Download,
  FolderOpen,
  X,
  Eye,
  Layers,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Bookmark
} from 'lucide-react';
import { LanguageType, TranslationDictionary, CompositionMode } from '../types';
import GraffitiSketchLayer from './GraffitiSketchLayer';
import ThreeDViewer from './ThreeDViewer';
import GeomagHumanViewer from './GeomagHumanViewer';
import AboutTimeline from './AboutTimeline';
import ProgrammingShowcase from './ProgrammingShowcase';
import { geomagPosesData, GeomagPose } from '../data/geomagPoses';
import { 
  projectsData, 
  downloadLibrary, 
  archiveProjects, 
  graphicDesignPosts, 
  programmingProjects,
  timelineData,
  ProjectItem,
  DownloadItem,
  ArchiveItem,
  TimelineItem,
  GraphicDesignPost,
  ProgrammingProject
} from '../data/portfolioData';

// Let's import our real generated assets
const POSTER_ANTI_STYLE_DRAGON = '/assets/images/anti_style_digimon_dragon_poster.png';
const POSTER_TOKYO_ARCHITECTURE = '/assets/images/tokyo_architecture_notebook_blue_yellow.png';

const dictionary: Record<LanguageType, TranslationDictionary> = {
  EN: {
    portfolio: 'PORTFOLIO',
    creativeTechnologist: 'Creative Technologist',
    creativeDeveloper: 'Creative Developer',
    softwareEngineer: 'Software Engineer',
    graphicDesigner: 'Graphic Designer',
    threeDArtist: '3D Artist',
    technicalIllustrator: 'Technical Illustrator',
    aiDeveloper: 'AI Developer',
    creativeCoding: 'Creative Coding',
    visualIdentity: 'Visual Identity',
    motionDesign: 'Motion Design',
    productVisualization: 'Product Visualization',
    researchDevelopment: 'Research & Development',
    interactiveExperiences: 'Interactive Experiences',
    selectedWorks: 'Selected Works',
    edition: '2026 Edition',
  },
  IT: {
    portfolio: 'PORTFOLIO',
    creativeTechnologist: 'Tecnologo Creativo',
    creativeDeveloper: 'Sviluppatore Creativo',
    softwareEngineer: 'Sviluppatore Software',
    graphicDesigner: 'Grafico',
    threeDArtist: 'Artista 3D',
    technicalIllustrator: 'Illustratore Tecnico',
    aiDeveloper: 'Sviluppatore AI',
    creativeCoding: 'Programmazione Creativa',
    visualIdentity: 'Identità Visiva',
    motionDesign: 'Motion Design',
    productVisualization: 'Visualizzazione Prodotto',
    researchDevelopment: 'Ricerca & Sviluppo',
    interactiveExperiences: 'Esperienze Interattive',
    selectedWorks: 'Progetti Selezionati',
    edition: 'Edizione 2026',
  },
  JP: {
    portfolio: 'ポートフォリオ',
    creativeTechnologist: 'クリエイティブテクノロジスト',
    creativeDeveloper: 'クリエイティブデベロッパー',
    softwareEngineer: 'ソフトウェアエンジニア',
    graphicDesigner: 'グラフィックデザイナー',
    threeDArtist: '３Ｄアーティスト',
    technicalIllustrator: 'テクニカルイラストレーター',
    aiDeveloper: '人工知能開発者',
    creativeCoding: 'クリエイティブコーディング',
    visualIdentity: 'ビジュアルデザイン',
    motionDesign: 'モーションデザイン',
    productVisualization: 'プロダクトビジュアライゼーション',
    researchDevelopment: '研究開発 (R&D)',
    interactiveExperiences: 'インタラクティブ体験',
    selectedWorks: '作品集',
    edition: '2026年版',
  }
};

const compositions: CompositionMode[] = [
  {
    id: 'parametric-lattice',
    name: 'Parametric Glass Lattice',
    nameIT: 'Reticolo Parametrico in Vetro',
    nameJP: 'パラメトリック・ガラス格子',
    imageSrc: POSTER_ANTI_STYLE_DRAGON,
    description: 'An exploration of refractive curves, transparent acrylic thickness, and suspended chrome nodes under high-fidelity global illumination.',
    descriptionIT: 'Un\'esplorazione di curve rifrangenti, spessori acrilici trasparenti e nodi cromati sospesi sotto un\'illuminazione globale ad alta fedeltà.',
    descriptionJP: '高精度なグローバル・イルミネーションのもと、屈折する曲線、透明なアクリルの厚み、そして宙に浮くクローム球体の探求。',
    colorTheme: 'from-slate-100 to-zinc-200',
    technicalSpecs: {
      focusLength: '85mm',
      aperture: 'f/1.4',
      renderer: 'Poster Engine 2026',
      samples: '4K PNG MASTER',
      geometry: 'Graffiti / Anime Composite'
    }
  },
  {
    id: 'acrylic-spire',
    name: 'Architectural Acrylic Spire',
    nameIT: 'Guglia Acrilica Architettonica',
    nameJP: '建築的アクリル・尖塔',
    imageSrc: POSTER_TOKYO_ARCHITECTURE,
    description: 'A study in verticality, layered transparent planar volumes, golden dimension coordinate lines, and shallow macro focus depths.',
    descriptionIT: 'Uno studio sulla verticalità, volumi planari trasparenti stratificati, linee di coordinate auree e profondità di messa a fuoco macro ridotte.',
    descriptionJP: '垂直性、積層された透明平面ボリューム、黄金比の座標ガイドライン、そして極めて浅いマクロフォーカスの被写界深度の研究。',
    colorTheme: 'from-neutral-50 to-stone-200',
    technicalSpecs: {
      focusLength: '120mm',
      aperture: 'f/2.0',
      renderer: 'Editorial System',
      samples: 'POSTER_N12',
      geometry: '12-Column Structural'
    }
  }
];

const languageTerms: Record<LanguageType, string[]> = {
  EN: [
    'PORTFOLIO',
    'Creative Technologist',
    'Creative Developer',
    'Software Engineer',
    'Graphic Designer',
    '3D Artist',
    'Technical Illustrator',
    'AI Developer',
    'Creative Coding',
    'Visual Identity',
    'Motion Design',
    'Product Visualization',
    'Research & Development',
    'Interactive Experiences',
    'Selected Works',
    '2026 Edition'
  ],
  IT: [
    'PORTFOLIO',
    'Programmatore',
    'Sviluppatore Software',
    'Grafico',
    'Artista 3D',
    'Illustratore Tecnico',
    'Designer',
    'Identità Visiva',
    'Sviluppo Web',
    'Intelligenza Artificiale',
    'Progetti Selezionati'
  ],
  JP: [
    'ポートフォリオ',
    'クリエイティブテクノロジスト',
    'ソフトウェアエンジニア',
    'クリエイティブデベロッパー',
    'グラフィックデザイナー',
    '３Ｄアーティスト',
    'テクニカルイラストレーター',
    '人工知能',
    'ビジュアルデザイン',
    '作品集'
  ]
};

const languageTermTargets = [
  'top',
  'top',
  'programming-showcase-section',
  'programming-showcase-section',
  'visual-archives-section',
  'geomag-human-pose-system',
  'visual-archives-section',
  'programming-showcase-section',
  'programming-showcase-section',
  'visual-archives-section',
  'visual-archives-section',
  'downloads-section',
  'career-timeline-section',
  'archive-exhibition-section',
  'archive-exhibition-section',
  'contact-section'
];

interface SocialLink {
  name: string;
  url: string;
  handle: string;
  description: string;
  statusLabel: string;
  serial: string;
}

const socialLinks: SocialLink[] = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/xtruel', 
    handle: 'github.com/xtruel',
    description: 'Source code storage, creative shader experiments, and WebAssembly compilations.', 
    statusLabel: 'ONLINE // PUBLIC_REPOS',
    serial: 'ACC-001' 
  },
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/profile.php?id=61551231682538', 
    handle: 'facebook.com/xtruel',
    description: 'Direct community node, legacy archives, and social communication stream.', 
    statusLabel: 'ACTIVE // COMMUNITY',
    serial: 'ACC-002' 
  },
  { 
    name: 'Email', 
    url: 'mailto:truel3000lofi@gmail.com', 
    handle: 'truel3000lofi@gmail.com',
    description: 'Direct communication node for editorial, exhibition, and studio inquiries.', 
    statusLabel: 'SMTP // DIRECT_LINE',
    serial: 'ACC-003' 
  }
];

export default function InteractiveCover() {
  const [lang, setLang] = useState<LanguageType>('EN');
  const [activeCompIndex, setActiveCompIndex] = useState<number>(0);
  const [showBlueprint, setShowBlueprint] = useState<boolean>(true);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [designerMode, setDesignerMode] = useState<boolean>(false);
  const [sketchOpacity, setSketchOpacity] = useState<number>(0.25);
  
  // Custom interactive parameters
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [focalDepth, setFocalDepth] = useState<number>(35); // 0-100 (blur factor simulator)
  const [lightingAngle, setLightingAngle] = useState<number>(45); // 0-360 deg
  const [gridCount, setGridCount] = useState<number>(12); // Grid layout density
  
  // Archive drawer state
  const [selectedArchiveItem, setSelectedArchiveItem] = useState<ArchiveItem | null>(null);
  
  // Character rig pose system state
  const [selectedGeomagPose, setSelectedGeomagPose] = useState<GeomagPose | null>(null);
  const [geomagAutoRotates, setGeomagAutoRotates] = useState<Record<string, boolean>>({});
  
  const currentDict = dictionary[lang];
  const activeComp = compositions[activeCompIndex];
  const scrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Ref for mouse parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const archiveContainerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Keyboard Shortcuts: 'g' toggles Grid, 't' cycles language, 'a' scrolls/focuses Archive drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Grid
      if (e.key.toLowerCase() === 'g') {
        setShowGridLines(prev => !prev);
      }
      // Cycle Language
      if (e.key.toLowerCase() === 't') {
        setLang(prev => {
          if (prev === 'EN') return 'IT';
          if (prev === 'IT') return 'JP';
          return 'EN';
        });
      }
      // Focus/Scroll to Archive Section
      if (e.key.toLowerCase() === 'a') {
        const target = document.getElementById('archive-exhibition-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Designer Mode (CTRL + SHIFT + D)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setDesignerMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setParallax({ x: x * 15, y: y * 15 });
  };

  // Autoplay rotation or light angle when user does nothing (subtle animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setLightingAngle((prev) => (prev + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Archive Mousewheel Scroll support (translating vertical wheel to horizontal scroll inside archive)
  const handleArchiveWheel = (e: React.WheelEvent) => {
    if (archiveContainerRef.current) {
      // Only horizontal scroll if the user is scrolling over the archive container
      archiveContainerRef.current.scrollLeft += e.deltaY * 0.75;
    }
  };

  const scrollArchive = (direction: 'left' | 'right') => {
    if (archiveContainerRef.current) {
      const scrollAmount = 400;
      archiveContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      className="relative min-h-screen bg-studio-50 text-studio-950 font-sans antialiased overflow-x-hidden transition-all duration-[1200ms] ease-in-out paper-noise flex flex-col justify-between selection:bg-neutral-900 selection:text-white swiss-grid-pattern"
    >
      
      {/* DESIGNER MODE REDLINES HUD OVERLAY */}
      <AnimatePresence>
        {designerMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 font-mono text-[9px] text-[#FF2E51]"
          >
            {/* Outline on outer borders */}
            <div className="absolute inset-4 border border-dashed border-[#FF2E51]/40" />
            <div className="absolute top-4 left-6">[BOUNDING_BOX: 98vw x 98vh] // DISPLAY_SCALE: 1.0</div>
            <div className="absolute bottom-4 right-6">[BASELINE_GRID: 8PX // GRID_COUNT: {gridCount}]</div>

            {/* Simulated Horizontal Baseline Grid */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-20 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-full border-t border-[#FF2E51] text-[7px]" />
              ))}
            </div>

            {/* Layout Guides labels inside viewport */}
            <div className="absolute left-[12%] top-0 bottom-0 border-l border-[#FF2E51]/30 flex flex-col justify-center">
              <span className="bg-[#FF2E51]/10 px-1 py-0.5 transform -rotate-90">GUIDE: COL_01 (12%)</span>
            </div>
            <div className="absolute left-[88%] top-0 bottom-0 border-r border-[#FF2E51]/30 flex flex-col justify-center">
              <span className="bg-[#FF2E51]/10 px-1 py-0.5 transform -rotate-90">GUIDE: COL_12 (88%)</span>
            </div>

            {/* Interactive typography measurements */}
            <div className="absolute top-[35%] left-[6%] border-t border-b border-[#FF2E51] py-1 pl-1">
              H1_HEIGHT: 96PX // LEADING: 0.85
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRAFFITI SKETCH LAYER (Notebook Sketches, Construction lines, Anti-style Scribbles) */}
      <GraffitiSketchLayer 
        opacity={sketchOpacity} 
        density={designerMode ? 'medium' : 'low'}
        visible={true}
      />

      {/* Frosted Glass Theme Micro Details */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2 z-30 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-black/15 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-black/15 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-black/15 rounded-full"></div>
      </div>
      <div className="absolute bottom-12 left-[41.666%] w-[1px] h-24 bg-black/10 z-10 hidden lg:block pointer-events-none"></div>

      {/* 1. Swiss Editorial Background Grid lines */}
      <AnimatePresence>
        {showGridLines && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none z-0 grid"
            style={{ 
              gridTemplateColumns: `repeat(${gridCount}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridCount}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: gridCount * gridCount }).map((_, i) => (
              <div 
                key={i} 
                className="border-b border-r border-studio-900/30 transition-all duration-500"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blueprint elements (sine waves, measurements) */}
      <AnimatePresence>
        {showBlueprint && (
          <motion.svg 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            {/* Dimension Indicators and Coordinate Lines */}
            <line x1="5%" y1="12%" x2="95%" y2="12%" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="12%" y1="5%" x2="12%" y2="95%" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="88%" y1="5%" x2="88%" y2="95%" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Top dimension text */}
            <text x="50%" y="10.5%" textAnchor="middle" className="font-mono text-[9px] uppercase tracking-[0.2em] fill-neutral-600">
              W_DIMENSION_AXIS: 1920PX // LAT_TGT_73 // SEC_ED_2026
            </text>

            {/* Precision geometric circles in margins */}
            <circle cx="12%" cy="12%" r="24" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 3" />
            <circle cx="12%" cy="12%" r="2" fill="#000" />
            <circle cx="88%" cy="12%" r="24" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 3" />
            <circle cx="88%" cy="12%" r="2" fill="#000" />
            
            {/* Focal indicator crosshairs around center */}
            <path d="M 47% 50% L 53% 50% M 50% 47% L 50% 53%" stroke="#000" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="48" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="3 6" />
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Custom creative coding SVG Sine Waves representing mathematical algorithms */}
            <path 
              d={`M 12% 85% Q 31% ${85 - Math.sin(lightingAngle * Math.PI / 180) * 15}%, 50% 85% T 88% 85%`}
              fill="none" 
              stroke="#000" 
              strokeWidth="0.75" 
            />
            <path 
              d={`M 12% 85.5% Q 31% ${85.5 + Math.cos(lightingAngle * Math.PI / 180) * 10}%, 50% 85.5% T 88% 85.5%`}
              fill="none" 
              stroke="#000" 
              strokeWidth="0.25" 
              strokeDasharray="2 2"
            />
            <text x="13%" y="84%" className="font-mono text-[8px] fill-neutral-500 uppercase tracking-widest">
              f(x) = sin(θ) * Δt // parametric wave trace
            </text>

            {/* Corner Bracket decorations */}
            <path d="M 24 40 L 24 24 L 40 24" fill="none" stroke="#000" strokeWidth="1" />
            <path d="M 24 C 24 24, 40 24, 40 40" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="2 2" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* 2. Top Navigation Bar: Minimal, structured */}
      <header className="w-full z-30 border-b border-studio-900/10 px-6 py-4 md:px-12 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center font-mono text-[10px] uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-studio-950 animate-pulse" />
          <span className="font-bold tracking-widest text-studio-950">CT.PORTFOLIO</span>
        </div>

        <div className="hidden md:flex flex-col text-neutral-500 text-left leading-relaxed">
          <span>COORDINATES: 45.4642° N, 9.1900° E</span>
          <span className="text-[9px] text-neutral-400">MILANO // TOKYO // LONDON</span>
        </div>

        <div className="hidden md:flex flex-col text-neutral-500 text-left leading-relaxed">
          <span>REPRESENTATION: {activeComp.technicalSpecs.geometry}</span>
          <span className="text-[9px] text-neutral-400">ACTIVE SCULPTURE: COMP-0{activeCompIndex + 1}</span>
        </div>

        {/* Global Controls & Language Switcher */}
        <div className="flex justify-end items-center space-x-3 justify-self-end">
          <div className="flex border border-studio-900/20 rounded bg-white/50 p-0.5 shadow-sm">
            {(['EN', 'IT', 'JP'] as LanguageType[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-[9px] font-bold rounded transition-all duration-300 ${
                  lang === l 
                    ? 'bg-studio-950 text-white shadow-sm' 
                    : 'text-neutral-500 hover:text-studio-950'
                }`}
                aria-label={`Switch language to ${l === 'JP' ? '日本語' : l}`}
              >
                {l === 'JP' ? '日本語' : l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3. Main Stage: Asymmetrical Editorial Composition */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20 relative">
        
        {/* Left Column: Bold Editorial Titles (6 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full select-none z-20">
          
          {/* Tagline / Context with subtle staggering */}
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-4 flex items-center space-x-2">
            <span className="font-bold text-studio-950">[ {currentDict.portfolio} ]</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-600">{currentDict.edition}</span>
          </div>

          {/* Master Header */}
          <div className="relative">
            {/* Editorial Serif Header for a high-end luxury book vibe */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight font-normal text-studio-950 mb-6 relative">
              Creative<br />
              <span className="italic font-normal text-neutral-800">Technologist</span>
              
              {/* Floating micro-caption */}
              <span className="absolute -right-4 top-0 font-mono text-[9px] bg-studio-950 text-white px-1.5 py-0.5 uppercase tracking-widest rounded-sm transform rotate-12">
                R&D
              </span>
            </h1>
          </div>

          {/* Curator Plate with Eugenio Longhitano (qwerty3D_) circular avatar */}
          <div className="flex items-center space-x-3.5 mb-6 p-2.5 rounded-xl border border-neutral-900/10 bg-white/20 hover:bg-white/40 transition-all duration-300 backdrop-blur-sm group select-none max-w-sm">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-900/20 shadow-sm flex-shrink-0">
              <img 
                src="/assets/images/eugenio_avatar_v2.png"
                alt="Eugenio Longhitano (qwerty3D_)" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="font-mono text-left leading-none">
              <div className="text-[8px] text-neutral-400 uppercase tracking-widest mb-1 font-semibold">EXHIBITION_DEVELOPER</div>
              <div className="text-xs font-bold text-studio-950 uppercase tracking-wider mb-0.5">Eugenio Longhitano</div>
              <div className="text-[9px] text-neutral-500 font-medium">@qwerty3D_</div>
            </div>
          </div>

          {/* Description Block */}
          <p className="font-sans text-neutral-600 text-sm md:text-base font-light leading-relaxed max-w-md mb-8 border-l border-studio-950/20 pl-4">
            {lang === 'EN' && "At the intersection of design, code, and physical light. Crafting premium digital installations, architectural real-time CGI, and responsive experiences."}
            {lang === 'IT' && "All'intersezione tra design, codice e luce fisica. Creazione di installazioni digitali premium, CGI in tempo reale e installazioni interattive."}
            {lang === 'JP' && "デザイン、コード、そして物理的な光が交差する場所。プレミアムなデジタルインスタレーション、リアルタイムCGI、感覚的なインタラクティブ体験を創造します。"}
          </p>

          {/* Multidisciplinary Skills / Tag Grid containing the EXACT requested terms for the chosen language */}
          <div className="glass-panel p-4 rounded-xl mb-6 bg-white/20">
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono uppercase text-neutral-600">
              {languageTerms[lang].map((term, index) => (
                <button
                  type="button"
                  key={index} 
                  onClick={() => scrollToSection(languageTermTargets[index] ?? 'top')}
                  className="group flex items-center space-x-1.5 py-1 px-2 border border-studio-900/5 hover:border-studio-900/15 rounded bg-white/35 hover:bg-white/70 transition-all duration-300 text-left cursor-pointer"
                  title={`Go to ${term}`}
                >
                  <span className="text-[7.5px] text-neutral-400 font-medium font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="text-neutral-700 tracking-tight leading-tight group-hover:text-studio-950 transition-colors">
                    {term}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick interactive trigger */}
          <div className="mt-8 flex items-center space-x-4">
            <button 
              onClick={() => {
                const nextIdx = (activeCompIndex + 1) % compositions.length;
                setActiveCompIndex(nextIdx);
              }}
              className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest bg-studio-950 text-white py-2.5 px-5 rounded-full hover:bg-neutral-800 transition-all shadow-md group"
            >
              <Sparkles size={11} className="group-hover:rotate-12 transition-transform" />
              <span>
                {lang === 'EN' && "Cycle Composition"}
                {lang === 'IT' && "Cambia Composizione"}
                {lang === 'JP' && "構成を切り替える"}
              </span>
            </button>

            <button 
              onClick={() => setShowBlueprint(!showBlueprint)}
              className={`flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest py-2 px-3 rounded-full border transition-all ${
                showBlueprint 
                  ? 'border-neutral-900 text-neutral-900 bg-neutral-100' 
                  : 'border-neutral-300 text-neutral-500 hover:border-neutral-800'
              }`}
            >
              <Compass size={11} />
              <span>Blueprint</span>
            </button>
          </div>
        </div>

      </main>

      {/* ADDITIONAL SECTIONS ACCORDING TO CREATIVE DIRECTOR METRICS */}

      {/* SECTION 02: NEKO MASK CHARACTER RIG SYSTEM */}
      <section id="geomag-human-pose-system" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-studio-900/10 z-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#FF2E51] mb-2 font-bold">
              STAGE 03 // REAL-TIME WEBGL CHARACTER RIG STUDY
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950 uppercase">
              NEKO MASK FANTASY RIG
            </h2>
            <p className="font-sans text-neutral-500 text-xs md:text-sm mt-3 font-light leading-relaxed">
              A procedural humanoid fantasy character with a glossy neko mask, cloak, armor accents, and retargetable rig bones.
            </p>
          </div>
          <div className="font-mono text-[10px] text-neutral-400 uppercase mt-4 md:mt-0">
            SYSTEM // ACTIVE VIEWPORTS: 08 // STATUS: COMPILER_OK
          </div>
        </div>

        {/* 2x4 Grid with the 8 poses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {geomagPosesData.map((pose) => {
            const isAutoRotating = geomagAutoRotates[pose.id] === true;
            return (
              <motion.div
                key={pose.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, rotateX: 2.5, rotateY: -2.5, scale: 1.01 }}
                className="glass-panel p-5 rounded-2xl bg-white/35 hover:bg-white/50 hover:shadow-xl hover:border-neutral-900/40 transition-colors duration-500 flex flex-col justify-between group text-left will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div>
                  {/* Top Header Row (Monospace Metadata) */}
                  <div className="flex justify-between items-baseline font-mono text-[8.5px] text-neutral-400 tracking-wider mb-2">
                    <span>{pose.serial} // YEAR_{pose.year}</span>
                    <span className="text-[#FF2E51] font-bold">[ STUDY_NODE ]</span>
                  </div>

                  {/* Pose Title (Display Typography) */}
                  <h3 className="font-serif text-lg font-medium text-studio-950 tracking-tight mb-2 group-hover:text-[#FF2E51] transition-colors uppercase">
                    {pose.title.replace('_', ' ')}
                  </h3>

                  {/* Small Description */}
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light line-clamp-2 mb-4">
                    {pose.description}
                  </p>

                  {/* Interactive 3D Canvas Box */}
                  <div className="w-full h-64 bg-radial from-neutral-50/50 to-neutral-100/30 rounded-xl overflow-hidden relative border border-neutral-200/50 group-hover:border-neutral-900/20 transition-all duration-500 mb-4 shadow-inner">
                    <GeomagHumanViewer 
                      pose={pose} 
                      autoRotate={isAutoRotating}
                    />
                  </div>
                </div>

                {/* Footer Controls & Stats Row */}
                <div className="pt-3 border-t border-dashed border-neutral-200 mt-auto">
                  {/* Auto Rotate Control State */}
                  <div className="flex items-center justify-between font-mono text-[8px] mb-3">
                    <span className="text-neutral-400">STATE // AUTO_ROTATE</span>
                    <button
                      onClick={() => setGeomagAutoRotates(prev => ({ ...prev, [pose.id]: !isAutoRotating }))}
                      className={`px-2 py-0.5 rounded transition-all font-bold cursor-pointer ${
                        isAutoRotating 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                      }`}
                    >
                      {isAutoRotating ? 'ENABLED' : 'PAUSED'}
                    </button>
                  </div>

                  {/* VIEW button */}
                  <button 
                    onClick={() => setSelectedGeomagPose(pose)}
                    className="w-full py-2 bg-neutral-900 hover:bg-neutral-950 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded transition-colors duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>VIEW DETAILS</span>
                    <CornerDownRight size={10} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 04: GRAPHIC DESIGN, SECTION 05: ILLUSTRATIONS, & SECTION 06: GRAFFITI RESEARCH */}
      <section id="visual-archives-section" className="w-full bg-neutral-900 text-neutral-100 py-20 z-20 relative overflow-hidden">
        {/* Floating gridlines representing Golden Ratio in dark mode */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-0 right-0 border-t border-white" />
          <div className="absolute left-1/3 top-0 bottom-0 border-r border-white" />
          <div className="absolute left-2/3 top-0 bottom-0 border-r border-white" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#FF2E51] mb-2 font-bold">
                RESEARCH ARCHIVE // SECTIONS 04, 05, 06
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-white">
                Visual <span className="italic font-light text-neutral-400">Archives</span> & Research
              </h2>
              <p className="font-sans text-neutral-400 text-xs md:text-sm mt-3 font-light max-w-xl">
                Exploring the tension between strict mathematical layout rules (Swiss Editorial, Baseline Grids) and raw human visual expression (Milanese Anti-Style, Street Spray studies).
              </p>
            </div>
            <div className="font-mono text-[9px] text-neutral-500 uppercase mt-4 md:mt-0">
              DOCUMENT MATRIX // ACTIVE STUDY CODES
            </div>
          </div>

          {/* Core Graphic Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
            {graphicDesignPosts.map((post) => (
              <div 
                key={post.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#FF2E51]/40 transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[520px] group"
              >
                {post.image ? (
                  <div className="relative aspect-[2/3] overflow-hidden bg-neutral-950 border-b border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[2/3] bg-neutral-950 border-b border-white/10 flex items-center justify-center overflow-hidden">
                    <svg className="w-28 h-28 opacity-35 stroke-white" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="14" y1="50" x2="86" y2="50" strokeWidth="0.5" />
                      <line x1="50" y1="14" x2="50" y2="86" strokeWidth="0.5" />
                      <path d="M20,72 Q42,14 62,46 T82,22" strokeWidth="1" />
                    </svg>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-baseline font-mono text-[8px] text-neutral-500 mb-4 tracking-widest">
                    <span>{post.serial} // {post.year}</span>
                    <span className="text-[#FF2E51] font-bold">{post.gridRatio}</span>
                  </div>

                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-3">
                    {post.title}
                  </h3>

                  <p className="font-sans text-neutral-400 text-xs leading-relaxed font-light mb-5">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-dashed border-white/10 font-mono text-[8px] text-neutral-500 space-y-1">
                    <div>COLORWAY // <span className="text-neutral-300">{post.colorway}</span></div>
                    <div>ALIGNMENT // <span className="text-neutral-300">{post.alignment.toUpperCase()} LAYOUT</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Miniature Blueprint vector graphic representational box (Illustrations study) */}
          <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md font-mono text-left leading-relaxed">
              <div className="text-[7.5px] text-[#FF2E51] font-bold mb-1 uppercase tracking-wider">[ EXHIBITION_BLUEPRINT ]</div>
              <div className="text-xs text-white uppercase font-bold tracking-widest mb-1.5">CGI Technical Layout Wireframes</div>
              <div className="text-[10px] text-neutral-400 font-light">
                Study of mathematical perspective coordinate grids. Shows orthographic construction projections (Front, Elevation, Plan) overlayed with organic vector trajectories.
              </div>
            </div>

            {/* Micro schematic preview using nested borders */}
            <div className="w-48 h-20 border border-dashed border-white/10 relative overflow-hidden flex items-center justify-center font-mono text-[6.5px] text-neutral-600">
              <div className="absolute inset-2 border border-white/5 flex items-center justify-between px-2">
                <span>FRONT_PROJ</span>
                <span>PLANE_A</span>
              </div>
              <div className="w-[1px] h-full bg-white/5 absolute left-1/2" />
              <div className="h-[1px] w-full bg-white/5 absolute top-1/2" />
              <div className="w-12 h-12 rounded-full border border-dashed border-[#FF2E51]/30 absolute animate-pulse" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 07: PROGRAMMING & SECTION 08: OPEN SOURCE */}
      <section id="programming-showcase-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 z-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2 font-bold">
              SECTION 07 // DEVELOPMENT REPOS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950">
              Interactive <span className="italic font-light">Programming</span>
            </h2>
            <p className="font-sans text-neutral-500 text-xs md:text-sm mt-3 font-light leading-relaxed">
              Explore Eugenio's algorithmic coding files. Swapping repositories loads code highlights and starts real compiler telemetry inside our terminal console.
            </p>
          </div>
          <div className="font-mono text-[10px] text-neutral-400 uppercase mt-4 md:mt-0">
            LATEST COMPILER: WEBASSEMBLY (WASM) ENGINE ACTIVE
          </div>
        </div>

        <ProgrammingShowcase />
      </section>

      {/* SECTION 09: RETROSPECTIVE ARCHIVE CABINET (MUSEUM DRAWER DESIGN) */}
      <section 
        id="archive-exhibition-section"
        className="w-full bg-neutral-100/60 border-t border-b border-studio-900/10 py-20 z-20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
              SECTION 09 // INDIE LAB // ITCH.IO RELEASES
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950">
              Released <span className="italic font-light">Work</span> on itch.io
            </h2>
            <p className="font-sans text-neutral-500 text-xs md:text-sm mt-2 font-light max-w-xl leading-relaxed">
              Playable browser tools and toys published as <span className="font-medium text-neutral-700">nosense_3d</span> — 2D→3D conversion, audio scratch decks, generative drawing, lo-fi drum loops and live webcam ASCII. Click a card to open it on itch.io. Drag or use the mouse wheel to slide.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => scrollArchive('left')}
              className="p-2 bg-white border border-neutral-200 hover:border-neutral-900 rounded-full transition-all cursor-pointer shadow-sm"
              aria-label="Scroll archive left"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={() => scrollArchive('right')}
              className="p-2 bg-white border border-neutral-200 hover:border-neutral-900 rounded-full transition-all cursor-pointer shadow-sm"
              aria-label="Scroll archive right"
            >
              <ChevronRight size={14} />
            </button>
            <span className="font-mono text-[8.5px] text-neutral-400 uppercase ml-2 tracking-wider">MOUSE WHEEL ACCESSIBLE</span>
          </div>
        </div>

        {/* Horizontal Container scroll */}
        <div 
          ref={archiveContainerRef}
          onWheel={handleArchiveWheel}
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-8 scrollbar-thin scroll-smooth select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'thin' }}
        >
          {archiveProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedArchiveItem(project)}
              className="snap-start flex-shrink-0 w-[300px] md:w-[350px] glass-panel bg-white p-6 rounded-xl hover:border-neutral-950 cursor-pointer transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[8px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded font-bold tracking-wider">
                    {project.exhibitId}
                  </span>
                  <span className="font-mono text-[9px] text-studio-950 font-semibold">{project.year}</span>
                </div>

                {/* Media Preview Box */}
                <div className="w-full h-32 mb-4 bg-neutral-100 rounded-lg overflow-hidden relative border border-neutral-200/40 group-hover:border-neutral-900/10 transition-colors flex items-center justify-center font-mono select-none">
                  {project.mediaType === 'image' && project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                  {project.mediaType === 'video' && project.mediaUrl && (
                    <video 
                      src={project.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter grayscale opacity-80"
                    />
                  )}
                  {project.mediaType === '3d' && (
                    <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-4 text-center">
                      <Layers size={22} className="text-neutral-400 mb-2 animate-pulse" />
                      <span className="text-[7px] text-neutral-500 uppercase tracking-widest">[ 3D MODEL FILE ]</span>
                      <span className="text-[6px] text-neutral-300 mt-1">AXIS // X Y Z</span>
                    </div>
                  )}
                  {project.mediaType === 'code' && (
                    <div className="absolute inset-0 bg-neutral-950 p-3 text-left overflow-hidden flex flex-col justify-between font-mono">
                      <div className="flex justify-between text-[6.5px] text-neutral-500">
                        <span>FILE: MAIN.TS</span>
                        <span>UTF-8</span>
                      </div>
                      <pre className="text-[7px] text-emerald-400 leading-tight font-light truncate select-none">
                        {`const gl = canvas.getContext('webgl');\nif (!gl) throw Error('WebGL_err');`}
                      </pre>
                      <div className="text-[6.5px] text-neutral-600">[COMPILER_OK]</div>
                    </div>
                  )}
                  {project.mediaType === 'logo' && (
                    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                      <div className="w-12 h-12 border border-dashed border-white/20 flex items-center justify-center relative">
                        <div className="absolute inset-2 border border-white/5" />
                        <span className="text-[9px] text-neutral-400 font-bold tracking-widest font-mono">q3D_</span>
                      </div>
                    </div>
                  )}
                  {project.mediaType === 'illustration' && (
                    <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center overflow-hidden">
                      <svg className="w-full h-full opacity-40 stroke-neutral-900" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="30" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
                        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" />
                        <path d="M 20 20 L 80 80" strokeWidth="0.25" strokeDasharray="1 1" />
                      </svg>
                      <span className="absolute text-[7px] text-neutral-500 tracking-widest font-mono uppercase">L-SYSTEM VECTORS</span>
                    </div>
                  )}
                  {project.mediaType === 'graffiti' && (
                    <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                      <div className="absolute top-2 left-2 text-[6.5px] text-[#FF2E51] font-bold">[SPRAY_TAG]</div>
                      <svg className="w-14 h-14 opacity-30 stroke-neutral-950" viewBox="0 0 100 100" fill="none">
                        <path d="M20,50 Q35,10 50,50 T80,50" strokeWidth="1.5" />
                        <path d="M30,70 L70,30" strokeWidth="1" strokeDasharray="2,2" />
                      </svg>
                      <span className="text-[6.5px] text-neutral-500 font-mono tracking-widest">WEIGHT: RAW</span>
                    </div>
                  )}
                  {project.mediaType === 'external' && (
                    <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-white p-3">
                      <ExternalLink size={16} className="text-neutral-500 mb-1.5" />
                      <span className="text-[7px] text-neutral-400 uppercase tracking-widest font-mono">[ EXTERNAL SECURE LINK ]</span>
                    </div>
                  )}
                </div>

                <div className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 mb-2">
                  {project.category}
                </div>
                <h3 className="font-serif text-lg text-studio-950 tracking-tight mb-2 group-hover:text-[#FF2E51] transition-colors font-medium">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Tags Display */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="font-mono text-[7px] text-neutral-500 bg-neutral-100 border border-neutral-200/40 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-neutral-100">
                <div className="font-mono text-[7px] text-neutral-400 mb-1 font-bold">
                  SYSTEM / HARDWARE ARCHITECTURE
                </div>
                <div className="font-mono text-[8px] text-neutral-700 font-bold uppercase truncate tracking-wider">
                  {project.techStack}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL DRAWER SIMULATION TO SATISFY "OPEN AN OLD DRAWER" RETRO INTERACTION */}
        <AnimatePresence>
          {selectedArchiveItem && (
            <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 120 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.95 }}
                className="glass-panel bg-white/95 max-w-2xl w-full rounded-2xl p-8 relative shadow-3xl text-studio-950 overflow-hidden"
              >
                {/* Simulated Drawer Handle / Drawer Pull Aesthetic */}
                <div className="w-16 h-1.5 bg-neutral-300 rounded-full mx-auto mb-6 cursor-pointer hover:bg-neutral-400 transition-colors" onClick={() => setSelectedArchiveItem(null)} />

                <button 
                  onClick={() => setSelectedArchiveItem(null)}
                  className="absolute top-6 right-6 p-1.5 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-studio-950 cursor-pointer"
                >
                  <X size={15} />
                </button>

                <div className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">
                  MUSEUM ARCHIVAL DEPOSIT // DRAWER: {selectedArchiveItem.exhibitId}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-3 mb-6 gap-2">
                  <h3 className="font-serif text-2xl font-normal text-studio-950 tracking-tight">
                    {selectedArchiveItem.title}
                  </h3>
                  <span className="font-mono text-xs bg-neutral-900 text-white px-2 py-0.5 rounded font-bold tracking-widest uppercase self-start sm:self-auto">
                    YEAR_{selectedArchiveItem.year}
                  </span>
                </div>

                {/* Grid Layout inside Drawer for Metadata + Media Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Left Column: Description + Specifications */}
                  <div className="space-y-4 text-left">
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light">
                      {selectedArchiveItem.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200/50 font-mono text-[8.5px]">
                      <div>
                        <span className="block text-neutral-400 uppercase font-bold text-[7px] tracking-wider">CLASSIFICATION</span>
                        <span className="font-bold text-neutral-800">{selectedArchiveItem.category}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-400 uppercase font-bold text-[7px] tracking-wider">SPECS MATRIX</span>
                        <span className="font-bold text-neutral-800">{selectedArchiveItem.specText}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-neutral-400 uppercase font-bold text-[7px] tracking-wider">TECHNOLOGY STACK COORD</span>
                        <span className="font-bold text-[#FF2E51]">{selectedArchiveItem.techStack}</span>
                      </div>
                    </div>

                    {/* Links row */}
                    {selectedArchiveItem.links && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {selectedArchiveItem.links.github && (
                          <a 
                            href={selectedArchiveItem.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-[8.5px] font-bold bg-neutral-900 text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors flex items-center space-x-1"
                          >
                            <span>SOURCE_CODE</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                        {selectedArchiveItem.links.website && (
                          <a 
                            href={selectedArchiveItem.links.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-[8.5px] font-bold border border-neutral-950 text-neutral-950 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors flex items-center space-x-1"
                          >
                            <span>PLAY ON ITCH.IO</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                        {selectedArchiveItem.links.download && (
                          <a 
                            href={selectedArchiveItem.links.download} 
                            className="font-mono text-[8.5px] font-bold bg-[#FF2E51] text-white px-3 py-1.5 rounded-full hover:bg-red-600 transition-colors flex items-center space-x-1"
                          >
                            <span>DOWNLOAD_STL</span>
                            <Download size={10} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Large Media Preview */}
                  <div className="w-full h-48 md:h-60 bg-neutral-100 rounded-xl overflow-hidden relative border border-neutral-200 flex items-center justify-center font-mono">
                    {selectedArchiveItem.mediaType === 'image' && selectedArchiveItem.image && (
                      <img 
                        src={selectedArchiveItem.image} 
                        alt={selectedArchiveItem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    )}
                    {selectedArchiveItem.mediaType === 'video' && selectedArchiveItem.mediaUrl && (
                      <video 
                        src={selectedArchiveItem.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover filter grayscale opacity-90"
                      />
                    )}
                    {selectedArchiveItem.mediaType === '3d' && (
                      <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
                        <Layers size={36} className="text-[#FF2E51] mb-2 animate-pulse" />
                        <span className="text-[9px] text-white uppercase tracking-[0.3em]">[ OBJ MODEL INSTANCE ]</span>
                        <span className="text-[8px] text-neutral-400 mt-1">SAMPLES: 4,096 SPP // IOR: 1.52</span>
                      </div>
                    )}
                    {selectedArchiveItem.mediaType === 'code' && (
                      <div className="absolute inset-0 bg-neutral-950 p-4 text-left overflow-y-auto flex flex-col justify-between font-mono">
                        <div className="flex justify-between text-[8px] text-neutral-500 pb-2 border-b border-neutral-800">
                          <span>FILE: SYSTEM_CORE.TS</span>
                          <span>STATUS: ONLINE</span>
                        </div>
                        <pre className="text-[8.5px] text-emerald-400 leading-relaxed font-light select-all pt-2 whitespace-pre-wrap">
                          {`// Algorithmic Matrix Transformation\nconst gl = canvas.getContext('webgl');\nconst vShader = gl.createShader(gl.VERTEX_SHADER);\ngl.shaderSource(vShader, code);\ngl.compileShader(vShader);`}
                        </pre>
                        <div className="text-[7.5px] text-neutral-600 pt-2 border-t border-neutral-900">[CORE_TEL: STABLE // RENDER 144FPS]</div>
                      </div>
                    )}
                    {selectedArchiveItem.mediaType === 'logo' && (
                      <div className="absolute inset-0 bg-[#070707] flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 border border-dashed border-white/20 flex items-center justify-center relative mb-2">
                          <div className="absolute inset-4 border border-white/5" />
                          <span className="text-sm text-white font-bold tracking-[0.35em] font-mono">q3D_</span>
                        </div>
                        <span className="text-[7.5px] text-neutral-500 uppercase tracking-widest">BRANDMARK_GRID</span>
                      </div>
                    )}
                    {selectedArchiveItem.mediaType === 'illustration' && (
                      <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center overflow-hidden">
                        <svg className="w-full h-full stroke-neutral-950 opacity-60" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="3 3" />
                          <circle cx="50" cy="50" r="2" fill="#FF2E51" />
                          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.25" />
                          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.25" />
                          <path d="M 20 20 L 80 80 M 80 20 L 20 80" strokeWidth="0.25" strokeDasharray="1 1" />
                        </svg>
                        <span className="absolute bottom-4 text-[7px] text-neutral-500 tracking-[0.2em] font-mono uppercase">LINDENMAYER GRAPHICS</span>
                      </div>
                    )}
                    {selectedArchiveItem.mediaType === 'graffiti' && (
                      <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                        <div className="absolute top-3 left-3 text-[7.5px] text-[#FF2E51] font-bold tracking-widest">[STUDY_N28]</div>
                        <svg className="w-24 h-24 opacity-40 stroke-white" viewBox="0 0 100 100" fill="none">
                          <path d="M20,50 Q35,10 50,50 T80,50 Q75,90 50,60 T20,50 Z" strokeWidth="2" />
                          <path d="M30,70 L70,30" strokeWidth="1" strokeDasharray="2,2" />
                        </svg>
                        <span className="text-[7.5px] text-neutral-400 font-mono tracking-widest">MILAN ANTI-STYLE THROW-UP</span>
                      </div>
                    )}
                    {selectedArchiveItem.mediaType === 'external' && (
                      <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-white p-4">
                        <ExternalLink size={28} className="text-[#FF2E51] mb-2" />
                        <span className="text-[9px] text-neutral-300 uppercase tracking-[0.25em] font-mono">[ EXTERNAL CONTRIBUTION ]</span>
                        <span className="text-[7.5px] text-neutral-500 mt-1 font-mono">AWWWARDS SITE OF THE DAY</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Display Tags on modal */}
                {selectedArchiveItem.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-neutral-100 justify-start">
                    {selectedArchiveItem.tags.map((tag, i) => (
                      <span key={i} className="font-mono text-[8px] text-neutral-600 bg-neutral-100 border border-neutral-200/60 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between font-mono text-[9px] text-neutral-400">
                  <span>© QWERTY3D_ // EXPERIMENTAL DEPOSIT CABINET</span>
                  <button 
                    onClick={() => setSelectedArchiveItem(null)}
                    className="text-neutral-900 hover:underline font-bold cursor-pointer uppercase tracking-wider text-[8px]"
                  >
                    CLOSE ARCHIVE DEPOSIT
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {selectedGeomagPose && (
            <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 120 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.95 }}
                className="glass-panel bg-white/95 max-w-4xl w-full rounded-2xl p-6 md:p-8 relative shadow-3xl text-studio-950 overflow-hidden"
              >
                {/* Simulated Drawer Handle / Drawer Pull Aesthetic */}
                <div className="w-16 h-1.5 bg-neutral-300 rounded-full mx-auto mb-6 cursor-pointer hover:bg-neutral-400 transition-colors" onClick={() => setSelectedGeomagPose(null)} />

                <button 
                  onClick={() => setSelectedGeomagPose(null)}
                  className="absolute top-6 right-6 p-1.5 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-studio-950 cursor-pointer"
                >
                  <X size={15} />
                </button>

                <div className="font-mono text-[8.5px] text-[#FF2E51] uppercase tracking-widest mb-1.5 font-bold">
                  NEKO MASK RIG STUDY // SPECIMEN_{selectedGeomagPose.serial}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-3 mb-6 gap-2">
                  <h3 className="font-serif text-2xl font-normal text-studio-950 tracking-tight uppercase">
                    {selectedGeomagPose.title.replace('_', ' ')}
                  </h3>
                  <span className="font-mono text-xs bg-neutral-900 text-white px-2 py-0.5 rounded font-bold tracking-widest uppercase self-start sm:self-auto">
                    STATION_Y_{selectedGeomagPose.year}
                  </span>
                </div>

                {/* Grid Layout inside Drawer for Metadata + Media Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Left Column: Description + Specifications */}
                  <div className="space-y-4 text-left flex flex-col justify-between">
                    <div>
                      <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light mb-4">
                        {selectedGeomagPose.description}
                      </p>

                      <div className="space-y-2">
                        <span className="block font-mono text-[8px] uppercase text-neutral-400 font-bold tracking-wider">JOINT COORDINATES (X, Y, Z)</span>
                        <div className="bg-neutral-50/80 border border-neutral-200/50 rounded-lg p-3 max-h-[140px] overflow-y-auto font-mono text-[8.5px] text-neutral-700 space-y-1 divide-y divide-neutral-100">
                          {selectedGeomagPose.joints.map(joint => (
                            <div key={joint.id} className="flex justify-between py-1 first:pt-0">
                              <span className="text-neutral-500 font-medium">JOINT_0{joint.id} ({joint.name})</span>
                              <span className="text-neutral-900 font-bold">[{joint.position.map(n => n.toFixed(2)).join(', ')}]</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200/50 font-mono text-[8.5px] mt-4">
                        <div>
                          <span className="block text-neutral-400 uppercase font-bold text-[7px] tracking-wider">RIG BONES</span>
                          <span className="font-bold text-blue-600">{selectedGeomagPose.connections.length} IK CHAINS</span>
                        </div>
                        <div>
                          <span className="block text-neutral-400 uppercase font-bold text-[7px] tracking-wider">CONTROL JOINTS</span>
                          <span className="font-bold text-neutral-800">{selectedGeomagPose.joints.length} CTRLS</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <button 
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(selectedGeomagPose, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `neko_mask_rig_${selectedGeomagPose.title.toLowerCase()}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="font-mono text-[8.5px] font-bold bg-neutral-900 text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors flex items-center space-x-1"
                      >
                        <span>EXPORT_CAD_JSON</span>
                        <Download size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Immersive WebGL Canvas viewport */}
                  <div className="w-full h-[320px] md:h-auto bg-neutral-50 rounded-xl overflow-hidden relative border border-neutral-200 shadow-inner">
                    <GeomagHumanViewer 
                      pose={selectedGeomagPose} 
                      autoRotate={true}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between font-mono text-[9px] text-neutral-400">
                  <span>© {selectedGeomagPose.year} qwerty3D_ // NEKO MASK RIG PROTOCOL</span>
                  <button 
                    onClick={() => setSelectedGeomagPose(null)}
                    className="text-neutral-900 hover:underline font-bold cursor-pointer uppercase tracking-wider text-[8px]"
                  >
                    CLOSE POSE DRAWER
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 10: INDIE TOOLS & GAMES */}
      <section id="downloads-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 z-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
              SECTION 10 // INDIE TOOLS & GAME LAB
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950">
              Indie <span className="italic font-light">Tools & Games</span>
            </h2>
            <p className="font-sans text-neutral-500 text-xs md:text-sm mt-3 font-light leading-relaxed">
              Playable prototypes, strange browser toys, character tests, visual tools, and devlog fragments published through the Nosense 3D itch.io lab.
            </p>
          </div>
          <div className="font-mono text-[10px] text-neutral-400 uppercase mt-4 md:mt-0">
            ITCH.IO HUB: NOSENSE-3D // STATUS: LIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadLibrary.map((model, index) => (
            <a
              key={index}
              href={model.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-xl hover:shadow-lg hover:border-neutral-900 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[9px] text-neutral-400">RESOURCE_NODE_0{index+1}</span>
                  <span className="font-mono text-[8px] px-2 py-0.5 bg-neutral-100 border border-neutral-200/50 rounded text-neutral-600 font-bold tracking-widest uppercase">
                    {model.category}
                  </span>
                </div>
                <h3 className="font-sans text-sm font-bold text-studio-950 mb-2 tracking-tight flex items-center justify-between group-hover:text-[#FF2E51] transition-colors">
                  {model.name}
                  <ExternalLink size={13} className="text-neutral-400 group-hover:text-studio-950 transition-colors" />
                </h3>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed font-light mb-4">
                  {model.details}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center font-mono text-[8.5px] text-neutral-400 uppercase">
                <span>TYPE: <span className="text-neutral-700 font-semibold">{model.license}</span></span>
                <span>FORMAT: <span className="text-neutral-700 font-semibold">{model.fileSize}</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 11: ABOUT TIMELINE */}
      <section id="career-timeline-section" className="w-full bg-neutral-50 border-t border-b border-studio-900/10 py-20 z-20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
                SECTION 11 // THE CHRONOLOGICAL RECORD
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950">
                The Career <span className="italic font-light">Timeline</span>
              </h2>
              <p className="font-sans text-neutral-500 text-xs md:text-sm mt-3 font-light leading-relaxed">
                A multi-disciplinary path spanning software engineering, WebGL, CAD fabrication, street graffiti studies, and editorial visual design. Click tabs to filter milestones.
              </p>
            </div>
            <div className="font-mono text-[10px] text-neutral-400 uppercase mt-4 md:mt-0">
              MILESTONE MATRIX: 05 STAGES RECORDED
            </div>
          </div>

          <AboutTimeline />

        </div>
      </section>

      {/* SECTION 12: CONTACT CONNECT PLATES */}
      <section id="contact-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 z-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2">
              SECTION 12 // SMTP DIRECTORIES & CONNECT CHANNELS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-studio-950">
              Connect <span className="italic font-light">Exhibitions</span>
            </h2>
            <p className="font-sans text-neutral-500 text-xs md:text-sm mt-2 font-light max-w-lg">
              Explore secondary databases, physical model archives, interactive code version control systems, and curated social feeds via information plate nodes.
            </p>
          </div>
          <div className="font-mono text-[9px] text-neutral-400 uppercase mt-4 md:mt-0">
            NETWORK STATUS: SECURE TRANSIT // 03 NODES ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-neutral-900/10">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border-b border-r border-neutral-900/10 bg-white/10 hover:bg-neutral-900/5 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4 text-left">
                {/* Monospace Metadata Row */}
                <div className="flex justify-between items-baseline font-mono text-[8px] text-neutral-400 tracking-wider">
                  <span>EXHIBITION_NODE // {link.serial}</span>
                  <span className="text-neutral-900/40 group-hover:text-black font-bold transition-colors">[ DIRECT ]</span>
                </div>

                {/* Platform Name (Display Typography) */}
                <div className="font-sans text-base font-bold tracking-tight text-neutral-900 uppercase group-hover:text-neutral-700 transition-colors">
                  {link.name}
                </div>

                {/* Small Description */}
                <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                  {link.description}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-dashed border-neutral-200 font-mono text-[8px] text-left space-y-1.5">
                {/* URL / Handle */}
                <div className="text-neutral-500 truncate group-hover:text-[#FF2E51] transition-colors">
                  DIR // <span className="font-semibold">{link.handle}</span>
                </div>

                {/* Status Label */}
                <div className="text-neutral-400">
                  STATUS // <span className="text-neutral-700 font-bold tracking-widest uppercase">{link.statusLabel}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Modular Footer: Swiss Exhibition Metadata */}
      <footer className="w-full z-30 border-t border-studio-900/10 px-6 py-4 md:px-12 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono text-[9px] uppercase tracking-wider text-neutral-500">
        
        {/* Left footer: Language specifics */}
        <div className="col-span-1 md:col-span-4 flex items-center space-x-2">
          <CornerDownRight size={10} className="text-studio-950" />
          <span>
            {lang === 'EN' && "SELECTED EXHIBITION WORKS // MULTIDISCIPLINARY MASTER"}
            {lang === 'IT' && "OPERE SELEZIONATE IN MOSTRA // MASTER MULTIDISCIPLINARE"}
            {lang === 'JP' && "厳選された展示作品集 // 総合芸術分野"}
          </span>
        </div>

        {/* Center footer: Render performance metrics */}
        <div className="col-span-1 md:col-span-5 flex flex-wrap gap-x-4 gap-y-1 justify-start md:justify-center text-neutral-400">
          <span className="flex items-center space-x-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span>RENDER SPEED: 144 FPS</span>
          </span>
          <span>•</span>
          <span>RENDER DEPTH: 32-BIT FLOAT EXR</span>
          <span>•</span>
          <span>GRID ALIGNED: SWISS 1:√2 Ratio</span>
        </div>

        {/* Right footer: Legal/Edition Details */}
        <div className="col-span-1 md:col-span-3 text-right text-studio-950 font-bold self-center md:justify-self-end">
          © 2026 // ALL RIGHTS RESERVED
        </div>
      </footer>

    </div>
  );
}

