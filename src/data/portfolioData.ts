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
    image: '/assets/images/parametric_glass_sculpture_square_1782597633765.jpg',
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
    image: '/assets/images/parametric_glass_sculpture_vertical_1782597646450.jpg',
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
    image: '/assets/images/parametric_glass_sculpture_square_1782597633765.jpg',
    modelType: 'voronoi',
    colorTheme: 'from-neutral-50 to-neutral-200/30'
  }
];

export const downloadLibrary: DownloadItem[] = [
  {
    name: 'Nosense 3D on itch.io',
    category: 'Itch.io',
    details: 'Main hub for all the playable browser tools and experiments, released free under the nosense_3d page.',
    fileSize: 'LIVE PAGE',
    license: 'PUBLIC PROFILE',
    version: 'ACTIVE',
    fileUrl: 'https://nosense-3d.itch.io/'
  },
  {
    name: '3d-KUN',
    category: 'Tool',
    details: 'Turn any 2D image into a solid, 3D-printable model right in the browser — contours, relief and multicolor, fully offline.',
    fileSize: 'BROWSER',
    license: 'FREE',
    version: 'LIVE',
    fileUrl: 'https://nosense-3d.itch.io/3d-kun-3d-estruder-from-2d-images'
  },
  {
    name: 'Real Gamepad DJ-System',
    category: 'Tool',
    details: 'Turn a controller, mouse or finger into a scratch turntable, with a lo-fi / boom-bap beat looping while you scratch a sample.',
    fileSize: 'BROWSER',
    license: 'FREE',
    version: 'LIVE',
    fileUrl: 'https://nosense-3d.itch.io/real-gamepad-dj-system'
  },
  {
    name: 'Auto Image Drawer',
    category: 'Tool',
    details: 'Drop in any image and watch a cursor sketch it back line by line — three styles, plus vertical video export for social.',
    fileSize: 'BROWSER',
    license: 'FREE',
    version: 'LIVE',
    fileUrl: 'https://nosense-3d.itch.io/auto-image-drawer-watch-your-image-draw-itself'
  },
  {
    name: 'DRUMZ Lofi',
    category: 'Tool',
    details: 'Free lo-fi / boom-bap / Dilla-style drum loop generator with a colored MIDI piano roll and MIDI / WAV / MP3 export.',
    fileSize: 'BROWSER',
    license: 'FREE',
    version: 'LIVE',
    fileUrl: 'https://nosense-3d.itch.io/drumzlofidrumloops'
  },
  {
    name: 'webcam—ascii',
    category: 'Tool',
    details: 'Turns your webcam feed into live ASCII art, entirely in the browser — no installs, no accounts.',
    fileSize: 'BROWSER',
    license: 'FREE',
    version: 'LIVE',
    fileUrl: 'https://nosense-3d.itch.io/webcam-ascii'
  }
];

export const archiveProjects: ArchiveItem[] = [
  {
    id: 'itch-3dkun',
    exhibitId: 'ITCH-01',
    year: '2025',
    category: 'BROWSER TOOL // 2D → 3D',
    title: '3d-KUN',
    description: 'Turn any 2D image into a solid, 3D-printable model right in the browser — contours, relief and multicolor, fully offline.',
    techStack: 'JS // CANVAS // MESH EXPORT',
    specText: 'IMAGE → STL // IN-BROWSER',
    mediaType: 'image',
    image: 'https://img.itch.zone/aW1nLzI4MDg3NDYwLnBuZw==/original/Tk1v5i.png',
    tags: ['3D Print', 'Tool', 'Browser'],
    links: { website: 'https://nosense-3d.itch.io/3d-kun-3d-estruder-from-2d-images' }
  },
  {
    id: 'itch-djsystem',
    exhibitId: 'ITCH-02',
    year: '2025',
    category: 'BROWSER TOY // AUDIO',
    title: 'Real Gamepad DJ-System',
    description: 'Turns your controller — or mouse / finger — into a hands-on scratch turntable, with a lo-fi / boom-bap beat looping while you scratch a sample.',
    techStack: 'WEB AUDIO // GAMEPAD API // JS',
    specText: 'SCRATCH ENGINE // LO-FI LOOPS',
    mediaType: 'image',
    image: 'https://img.itch.zone/aW1hZ2UvNDcwNTMwOS8yODAzNzk0Ny5wbmc=/347x500/wUGGnu.png',
    tags: ['Audio', 'Gamepad', 'DJ'],
    links: { website: 'https://nosense-3d.itch.io/real-gamepad-dj-system' }
  },
  {
    id: 'itch-autodraw',
    exhibitId: 'ITCH-03',
    year: '2025',
    category: 'BROWSER TOOL // GENERATIVE',
    title: 'Auto Image Drawer',
    description: 'Drop in any image and watch a cursor sketch it back line by line — three drawing styles and vertical video export for social.',
    techStack: 'CANVAS // VECTOR STROKES // JS',
    specText: 'IMAGE → SELF-DRAWING VIDEO',
    mediaType: 'image',
    image: 'https://img.itch.zone/aW1nLzI3OTI0NTcxLnBuZw==/original/p6%2FCRn.png',
    tags: ['Generative', 'Animation', 'Export'],
    links: { website: 'https://nosense-3d.itch.io/auto-image-drawer-watch-your-image-draw-itself' }
  },
  {
    id: 'itch-drumz',
    exhibitId: 'ITCH-04',
    year: '2024',
    category: 'BROWSER TOY // MUSIC',
    title: 'DRUMZ Lofi',
    description: 'Free lo-fi / boom-bap / Dilla-style drum loop generator with a colored MIDI piano roll, cassette animation and MIDI / WAV / MP3 export.',
    techStack: 'WEB AUDIO // MIDI // JS',
    specText: 'LOOP GENERATOR // MIDI EXPORT',
    mediaType: 'image',
    image: 'https://img.itch.zone/aW1hZ2UvNDA1ODIwOS8yNDE5NjM4Mi5wbmc=/347x500/GMiLkr.png',
    tags: ['Music', 'MIDI', 'Generator'],
    links: { website: 'https://nosense-3d.itch.io/drumzlofidrumloops' }
  },
  {
    id: 'itch-webcamascii',
    exhibitId: 'ITCH-05',
    year: '2024',
    category: 'BROWSER TOY // REAL-TIME',
    title: 'webcam—ascii',
    description: 'Turns your webcam feed into live ASCII art, entirely in the browser — no installs, no accounts.',
    techStack: 'GETUSERMEDIA // CANVAS // JS',
    specText: 'LIVE CAM → ASCII',
    mediaType: 'image',
    image: 'https://img.itch.zone/aW1nLzIyNzEzNTQ4LnBuZw==/347x500/4o16JB.png',
    tags: ['ASCII', 'Webcam', 'Real-time'],
    links: { website: 'https://nosense-3d.itch.io/webcam-ascii' }
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
    image: '/assets/images/italy_pasta_rasta_swiss_poster.png'
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
    image: '/assets/images/tokyo_architecture_notebook_blue_yellow.png'
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
    image: '/assets/images/tokyo_architecture_notebook_red.png'
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
    image: '/assets/images/anti_style_digimon_dragon_poster.png'
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

