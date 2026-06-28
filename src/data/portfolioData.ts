export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  software: string[];
  skills: string[];
  tags: string[];
  description: string;
  longDescription?: string;
  links: {
    github?: string;
    behance?: string;
    website?: string;
    download?: string;
  };
  image: string;
  modelType: 'sculpture' | 'torus_knot' | 'mobius' | 'voronoi' | 'lsystem' | 'parametric';
  colorTheme: string;
}

export interface DownloadItem {
  name: string;
  category: 'Game' | 'Tool' | 'Prototype' | 'Devlog' | 'Asset Lab' | 'Itch.io';
  details: string;
  fileSize: string;
  license: string;
  version: string;
  fileUrl: string;
}

export interface ArchiveItem {
  id: string;
  exhibitId: string;
  year: string;
  category: string;
  title: string;
  description: string;
  techStack: string;
  specText: string;
  image?: string;
  mediaType?: 'image' | 'video' | '3d' | 'external' | 'code' | 'logo' | 'illustration' | 'graffiti';
  mediaUrl?: string;
  tags?: string[];
  links?: {
    github?: string;
    website?: string;
    download?: string;
  };
}

export interface TimelineItem {
  year: string;
  title: string;
  role: string;
  discipline: 'Programming' | 'Graffiti' | 'Design' | '3D' | 'AI' | 'Research' | 'Freelance';
  description: string;
  location: string;
  details: string[];
}

export interface GraphicDesignPost {
  id: string;
  title: string;
  serial: string;
  gridRatio: string;
  year: string;
  description: string;
  colorway: string;
  alignment: 'Left' | 'Center' | 'Justified' | 'Asymmetric';
  image?: string;
}

export interface ProgrammingProject {
  id: string;
  title: string;
  githubUrl: string;
  liveDemoUrl: string;
  technologies: string[];
  stats: {
    stars: number;
    forks: number;
    size: string;
  };
  codeSnippet: string;
  description: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'parametric-glass',
    title: 'Parametric Refraction Sculpture',
    category: '3D PORTFOLIO // CGI INSTALLATION',
    year: '2026',
    software: ['Three.js', 'Blender', 'SideFX Houdini'],
    skills: ['Glass Shader formulation', 'Algorithmic division', 'SDF Raymarching'],
    tags: ['Glass', 'Generative', 'Parametric', 'Installation'],
    description: 'An interactive real-time glass refractive sculpture calculated via custom procedural math, casting physical caustic dispersions across adjacent surfaces.',
    longDescription: 'This exhibit explores how physical light interacts with computer-generated architectural structures. Using custom volumetric shader pipelines and physical glass index equations (IOR 1.52), the sculpture bends light dynamically based on camera perspective and mouse coordinate orbits.',
    links: {
      github: 'https://github.com/qwerty3D_/parametric-glass',
      behance: 'https://behance.net/qwerty3D_',
      website: 'https://ai.studio',
      download: '/downloads/glass_sculpture_v1.stl'
    },
    image: '/src/assets/images/parametric_glass_sculpture_square_1782597633765.jpg',
    modelType: 'sculpture',
    colorTheme: 'from-blue-50 to-emerald-50/20'
  },
  {
    id: 'mobius-strip-v2',
    title: 'Mobius Structural Loop v2',
    category: '3D PORTFOLIO // ARCHITECTURAL FLOW',
    year: '2025',
    software: ['Rhino', 'Grasshopper', 'WebGL'],
    skills: ['Non-Euclidean math', 'Structural calculations', 'Casting simulation'],
    tags: ['Architecture', 'Mobius', 'Infinite', 'CGI'],
    description: 'A study on infinite loops in design, capturing single-sided surfaces as spatial structural frames optimized for gravity load-paths.',
    longDescription: 'A single-surface structural ring modeled parametrically. In this 3D installation, the camera tracks along the coordinate matrix, allowing users to analyze spatial depth and material thickness constraints under varying dynamic wind loads.',
    links: {
      github: 'https://github.com/qwerty3D_/mobius-loop',
      behance: 'https://behance.net/qwerty3D_',
      website: 'https://ai.studio',
      download: '/downloads/mobius_ring.glb'
    },
    image: '/src/assets/images/parametric_glass_sculpture_vertical_1782597646450.jpg',
    modelType: 'mobius',
    colorTheme: 'from-amber-50/80 to-stone-100/40'
  },
  {
    id: 'voronoi-fracture-mesh',
    title: 'Voronoi Architectural Cell Matrix',
    category: '3D PORTFOLIO // BIO-COMPUTING',
    year: '2026',
    software: ['Houdini', 'Figma', 'Three.js'],
    skills: ['Voronoi tessellation', 'Spatial partitioning', 'Physics-based design'],
    tags: ['Cellular', 'Organic', '3D Print', 'Mathematical'],
    description: 'A structural column generated through organic spatial division rules, representing skeletal frameworks modeled after cell walls.',
    longDescription: 'An interactive simulation showcasing cellular mesh construction. Users can select and fracture the vertices in real-time, observing how load forces distribute down structural ribbing in response to coordinate shifts.',
    links: {
      github: 'https://github.com/qwerty3D_/voronoi-matrix',
      behance: 'https://behance.net/qwerty3D_',
      website: 'https://ai.studio',
      download: '/downloads/voronoi_column.stl'
    },
    image: '/src/assets/images/parametric_glass_sculpture_square_1782597633765.jpg',
    modelType: 'voronoi',
    colorTheme: 'from-neutral-50 to-neutral-200/30'
  }
];

export const downloadLibrary: DownloadItem[] = [
  {
    name: 'Nosense 3D on itch.io',
    category: 'Itch.io',
    details: 'Main hub for experimental indie games, playable prototypes, strange 3D sketches, and small interactive releases.',
    fileSize: 'LIVE PAGE',
    license: 'PUBLIC PROFILE',
    version: 'ACTIVE',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: 'Browser Game Experiments',
    category: 'Game',
    details: 'Small web-playable ideas focused on movement, mood, lo-fi 3D scenes, character tests, and fast creative iteration.',
    fileSize: 'HTML5',
    license: 'PLAYABLE',
    version: 'LAB',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: 'Interactive Tool Prototypes',
    category: 'Tool',
    details: 'Utility-style experiments for procedural visuals, terminal-like interfaces, image systems, and real-time creative controls.',
    fileSize: 'WEB TOOL',
    license: 'EXPERIMENTAL',
    version: 'WIP',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: 'Character Motion Tests',
    category: 'Prototype',
    details: 'A place for testing rigs, masks, fantasy characters, controller ideas, and animation loops before they become full releases.',
    fileSize: 'GLB / WEBGL',
    license: 'DEV BUILD',
    version: 'PREVIEW',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: 'Devlog Sketch Archive',
    category: 'Devlog',
    details: 'Progress notes, rough builds, process captures, screenshots, and fragments from the ongoing Nosense 3D project space.',
    fileSize: 'UPDATES',
    license: 'OPEN NOTES',
    version: 'ONGOING',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: 'Asset Lab Experiments',
    category: 'Asset Lab',
    details: 'Sprites, 3D fragments, poster textures, ASCII screens, and visual systems that can become future indie game assets.',
    fileSize: 'MIXED MEDIA',
    license: 'STUDIO LAB',
    version: 'COLLECTION',
    fileUrl: 'https://nosense-3d.itch.io/'
  }
];

export const archiveProjects: ArchiveItem[] = [
  {
    id: 'arch-01',
    exhibitId: 'CAB-01',
    year: '2021',
    category: 'LEGACY WEBSITE // WEBGL',
    title: 'Neo-Tokyo Web Portal',
    description: 'An interactive 3D portal representing futuristic cybernetic architecture, engineered with native WebGL, custom matrix transformations, and direct mouse coordinates tracking.',
    techStack: 'HTML5 // WEBGL // VANILLA JS',
    specText: '9000 VERTICES // DIRECT DOM BINDING',
    mediaType: 'code',
    tags: ['WebGL', 'GLSL Shaders', 'Cyberpunk', 'Creative Coding'],
    links: {
      github: 'https://github.com/qwerty3D_/neo-tokyo-portal',
      website: 'https://ai.studio'
    }
  },
  {
    id: 'arch-02',
    exhibitId: 'CAB-02',
    year: '2022',
    category: 'ANTI-STYLE GRAFFITI',
    title: 'Milano Centrali Underpass',
    description: 'A study on architectural concrete surfaces and aggressive, raw typography layouts. Hand-crafted using spray paints, examining how spatial layout interacts with concrete typography.',
    techStack: 'SPRAY PAINT // RAW CONCRETE // 1:√2 CANVAS',
    specText: 'SCALE 10M x 3.5M // ACID CHROME',
    mediaType: 'graffiti',
    tags: ['Street Art', 'Throw-up', 'Spray Can', 'Concrete study']
  },
  {
    id: 'arch-03',
    exhibitId: 'CAB-03',
    year: '2023',
    category: 'HARD SURFACE MODELING',
    title: 'Parametric Housing Module',
    description: 'Structural component proposals for sustainable micro-housing modules, utilizing interlocking sub-assemblies calculated with architectural Grasshopper algorithms.',
    techStack: 'GRASSHOPPER // RHINO 3D // OBJ MESH',
    specText: '34 INTERLOCKING CNC PARTS',
    mediaType: '3d',
    tags: ['CNC Milling', 'Grasshopper', 'Modular', 'Architecture'],
    links: {
      download: '/downloads/housing_module.stl'
    }
  },
  {
    id: 'arch-04',
    exhibitId: 'CAB-04',
    year: '2023',
    category: 'CREATIVE CODING',
    title: 'L-System Flora Synthesizer',
    description: 'An implementation of complex fractal plant growth models using context-free Lindenmayer grammars. Renders delicate branching structures in a customizable physical canvas.',
    techStack: 'CANVAS API // RUST // WEBASSEMBLY',
    specText: 'DEPTH DEPLETION RECURSION // 8 LEVELS',
    mediaType: 'illustration',
    tags: ['L-System', 'Fractal', 'WASM', 'Procedural']
  },
  {
    id: 'arch-05',
    exhibitId: 'CAB-05',
    year: '2024',
    category: 'GRAPHIC DESIGN',
    title: 'Zurich Typography Grid Poster',
    description: 'A minimalist print editorial focusing on asymmetric alignments, extreme leading, and tight character tracking. Printed on archival cotton paper.',
    techStack: 'ADOBE INDESIGN // SWISS GRID // 120GSM COTTON',
    specText: '60x90CM // MONOCHROME SERIF',
    mediaType: 'image',
    image: '/src/assets/images/parametric_glass_sculpture_vertical_1782597646450.jpg',
    tags: ['Swiss Design', 'Typography', 'Grid Poster', 'Printmaking']
  },
  {
    id: 'arch-06',
    exhibitId: 'CAB-06',
    year: '2024',
    category: 'EXHIBITION VIDEO SCREEN',
    title: 'Glass Dispersion Motion Loop',
    description: 'A slow-motion video study of light dispersion inside double-refractive glass. Rendered at 60fps in Octane and compiled for fluid digital display projections.',
    techStack: 'OCTANE RENDER // ADOBE PREMIERE // H.264',
    specText: '4K MP4 // 60 FPS // 1.52 IOR',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41718-large.mp4',
    tags: ['Motion Graphics', 'Refraction Loop', 'Video Art', 'Octane']
  },
  {
    id: 'arch-07',
    exhibitId: 'CAB-07',
    year: '2025',
    category: 'EXTERNAL CONTRIBUTION',
    title: 'Awwwards Exhibition Feature',
    description: 'Award-winning digital showcase featuring our interactive parametric glass viewer, recognized for design innovation, spatial interactive performance, and high-end typography.',
    techStack: 'HTML5 // WEBGL // FRAMER MOTION',
    specText: 'SITES OF THE DAY // SCORE 8.92',
    mediaType: 'external',
    tags: ['Awwwards', 'Exhibition Design', 'Interactive UI', 'Feature'],
    links: {
      website: 'https://www.awwwards.com'
    }
  },
  {
    id: 'arch-08',
    exhibitId: 'CAB-08',
    year: '2025',
    category: 'LOGO ARCHIVE',
    title: 'Parametric Branding Identity',
    description: 'A collection of mathematical logos and high-contrast wordmarks developed for spatial computing projects, showcasing modular geometries and custom letterforms.',
    techStack: 'VECTOR ENGINE // SVG ILLUSTRATOR // PATHS',
    specText: '12 LOGO SETS // MONOCHROME VECTORS',
    mediaType: 'logo',
    tags: ['Branding', 'Vector Logo', 'Identity Design', 'Symbolism']
  }
];

export const timelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'Creative Technologist // Director',
    role: 'qwerty3D_ Studio',
    discipline: 'Research',
    description: 'Developing high-fidelity CGI installations, physical computing artifacts, and real-time interactive browser engines for design museums.',
    location: 'Milano, IT',
    details: [
      'Engineered interactive WebGL visualizers for Swiss design studios.',
      'Released parametric models for high-resolution resin printing.',
      'Collaborated on architectural spatial studies utilizing computer-generated physics simulations.'
    ]
  },
  {
    year: '2025',
    title: 'Creative Developer // Programmer',
    role: 'R&D Lab Zurich',
    discipline: 'Programming',
    description: 'Researched parametric algorithms and WebGL rendering optimizations, focusing on interactive 3D viewport pipelines on web frames.',
    location: 'Zurich, CH',
    details: [
      'Designed and coded the core interactive architecture for structural loading visualizers.',
      'Reduced WebGL render times by 35% using raw WebGL shaders and instanced geometry.',
      'Conducted computational research on spatial division matrices (Voronoi, Delaunay).'
    ]
  },
  {
    year: '2024',
    title: 'Architectural CGI & 3D Artist',
    role: 'Exhibition Design',
    discipline: '3D',
    description: 'Rendered luxury glass refractions, light simulations, and parametric hard-surface installations for design houses.',
    location: 'Tokyo, JP',
    details: [
      'Evolved custom glass dispersion shader models for photorealistic Cycles casting.',
      'Designed structural assets exported to USDZ for Apple product augmented-reality presentations.',
      'Formulated procedural material maps based on chemical weathering algorithms.'
    ]
  },
  {
    year: '2023',
    title: 'Graffiti Researcher & Visual Artist',
    role: 'Independent Study',
    discipline: 'Graffiti',
    description: 'Conducted field research on Milan anti-style typography movements, documenting the raw composition and letterform weight variations of street tags.',
    location: 'Milan / Berlin',
    details: [
      'Published academic notebooks analyzing throw-up structural guides.',
      'Vectorized aggressive spray tag typographies into open-source fonts.',
      'Exhibited graffiti sketchbook studies focusing on architectural wireframes.'
    ]
  },
  {
    year: '2022',
    title: 'Graphic Designer & Illustrator',
    role: 'Editorial Agency',
    discipline: 'Design',
    description: 'Applied Swiss grid alignments, asymmetric text ratios, and Japanese graphic pairings for fine art publications.',
    location: 'Milano, IT',
    details: [
      'Formulated editorial layouts using baseline grids and golden ratio column structures.',
      'Designed vector-based illustration guides detailing perspective planes.',
      'Supervised high-contrast screenprint editions on heavyweight cotton sheets.'
    ]
  }
];

export const graphicDesignPosts: GraphicDesignPost[] = [
  {
    id: 'gd-01',
    title: 'ITALY PASTA RASTA',
    serial: 'POSTER_N04',
    gridRatio: '1:√2 GOLDEN RATIO',
    year: '2025',
    description: 'A Swiss-poster composition mixing Italian cultural type, Japanese side notation, halftone architecture, and optical rhythm systems.',
    colorway: 'BLACK INK & SIGNAL YELLOW',
    alignment: 'Asymmetric',
    image: '/src/assets/images/italy_pasta_rasta_swiss_poster.png'
  },
  {
    id: 'gd-02',
    title: 'TOKYO ARCHITECTURE NOTEBOOK',
    serial: 'POSTER_N12',
    gridRatio: '12-COLUMN STRUCTURAL',
    year: '2026',
    description: 'A poster combining Japanese characters (Kanji/Kana) with industrial blueprints, simulating technical draft plans of spatial micro-capsules.',
    colorway: 'ELECTRIC BLUE & SIGNAL YELLOW',
    alignment: 'Left',
    image: '/src/assets/images/tokyo_architecture_notebook_blue_yellow.png'
  },
  {
    id: 'gd-03',
    title: 'TOKYO POWER GRID STUDY',
    serial: 'POSTER_N12B',
    gridRatio: '12-COLUMN STRUCTURAL',
    year: '2026',
    description: 'A red monochrome industrial poster study built around electrical infrastructure, dense wiring silhouettes, and Japanese technical notation.',
    colorway: 'SIGNAL RED & BLACK',
    alignment: 'Left',
    image: '/src/assets/images/tokyo_architecture_notebook_red.png'
  },
  {
    id: 'gd-04',
    title: 'ANTI STYLE DRAGON STUDY',
    serial: 'POSTER_N28',
    gridRatio: 'GRIDLESS FREEDOM',
    year: '2024',
    description: 'A blue anti-style anime poster with graffiti lettering, high-energy splash forms, and a silhouetted rider over a red dragon figure.',
    colorway: 'CYAN BLUE & DRAGON RED',
    alignment: 'Justified',
    image: '/src/assets/images/anti_style_digimon_dragon_poster.png'
  }
];

export const programmingProjects: ProgrammingProject[] = [
  {
    id: 'glass-engine',
    title: 'glass-dispersion-webgl',
    githubUrl: 'https://github.com/qwerty3D_/glass-dispersion-webgl',
    liveDemoUrl: 'https://ai.studio',
    technologies: ['TypeScript', 'WebGL', 'GLSL', 'Vite'],
    stats: {
      stars: 142,
      forks: 18,
      size: '2.4 MB'
    },
    codeSnippet: `// WebGL Refraction Index & Dispersion formula (Eugenio L.)
precision highp float;
uniform vec3 u_cameraPos;
uniform float u_iorR; // 1.515 (Red IOR)
uniform float u_iorG; // 1.520 (Green IOR)
uniform float u_iorB; // 1.525 (Blue IOR)

vec3 calculateDispersion(vec3 normal, vec3 view, vec3 tex) {
  vec3 refR = refract(view, normal, 1.0 / u_iorR);
  vec3 refG = refract(view, normal, 1.0 / u_iorG);
  vec3 refB = refract(view, normal, 1.0 / u_iorB);
  
  float rVal = texture2D(u_envMap, refR.xy).r;
  float gVal = texture2D(u_envMap, refG.xy).g;
  float bVal = texture2D(u_envMap, refB.xy).b;
  
  return vec3(rVal, gVal, bVal) * 0.95;
}`,
    description: 'An open-source, ultra-lightweight shader module that implements chromatic dispersion and volumetric glass absorption inside vanilla WebGL pipelines.'
  },
  {
    id: 'parametric-cad-js',
    title: 'parametric-cad-js',
    githubUrl: 'https://github.com/qwerty3D_/parametric-cad-js',
    liveDemoUrl: 'https://ai.studio',
    technologies: ['TypeScript', 'Three.js', 'Rust', 'WebAssembly'],
    stats: {
      stars: 284,
      forks: 31,
      size: '14.8 MB'
    },
    codeSnippet: `// Intersecting spline triangulation algorithm
export function computeVoronoiMesh(vertices: Float32Array): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positionBuffer: number[] = [];
  
  // Triangulate organic spatial bounds
  for (let i = 0; i < vertices.length; i += 3) {
    const p = new Vector3(vertices[i], vertices[i+1], vertices[i+2]);
    const adjacent = getKNearest(p, vertices, 6);
    adjacent.forEach(adj => {
      positionBuffer.push(p.x, p.y, p.z);
      positionBuffer.push(adj.x, adj.y, adj.z);
    });
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionBuffer, 3));
  return geometry;
}`,
    description: 'A developer tool for generating water-tight parametric meshes (STL/OBJ ready) directly within the web browser environment using client-side WebAssembly.'
  }
];
