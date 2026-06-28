import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, ExternalLink, Sparkles, Mail } from 'lucide-react';

const danteJapaneseGlyphs = [
  '人生の道の半ばで',
  '暗い森の中にいた',
  'まっすぐな道を失って',
  '水のように文字が流れる',
  '星を見上げてまた歩く',
  '地獄と光のあいだで'
].join(' // ');

const profileCards = [
  {
    id: 'software',
    title: 'Software Developer',
    meta: 'APPS // SITI WEB // UI SYSTEMS',
    body: 'Sviluppo software, interfacce web, portfolio, app creative, prototipi interattivi e strumenti su misura.'
  },
  {
    id: 'creative-3d',
    title: 'Creative 3D & WebGL',
    meta: 'THREE.JS // GLB // MOTION',
    body: 'Esperimenti 3D, viewer browser, character studies, shader, motion test e scene WebGL leggere.'
  },
  {
    id: 'visual',
    title: 'Poster & Visual Identity',
    meta: 'GRAFICA // POSTER // ANTI-STYLE',
    body: 'Poster editoriali, layout tipografici, identita visiva, immagini AI-assisted e direzione estetica street/tech.'
  },
  {
    id: 'indie',
    title: 'Indie Games Lab',
    meta: 'ITCH.IO // TOOLS // PROTOTYPES',
    body: 'Prototipi indie, tool giocabili, interazioni strane e piccoli sistemi da pubblicare nel laboratorio Nosense 3D.'
  }
];

const quickPrompts = [
  'chi sei',
  'cosa fai',
  'contatti',
  'siti web',
  '3d',
  'java effects'
];

function buildAiReply(rawInput: string) {
  const input = rawInput.toLowerCase();

  if (input.includes('contatt') || input.includes('email') || input.includes('social')) {
    return [
      `> "${rawInput}"`,
      'AI_ASSISTANT: Puoi contattare Eugenio / qwerty3D_ via email: truel3000lofi@gmail.com',
      'LINKS: github.com/xtruel // nosense-3d.itch.io // facebook.com/xtruel',
      'TONE: disponibile per siti web, app, visual identity, prototipi 3D e progetti indie.'
    ];
  }

  if (input.includes('chi') || input.includes('about') || input.includes('profilo')) {
    return [
      `> "${rawInput}"`,
      'AI_ASSISTANT: Eugenio Longhitano, alias qwerty3D_, e uno sviluppatore software e creative technologist.',
      'PROFILE: costruisce siti web, app, esperienze interattive, 3D browser-based, poster e sistemi grafici.',
      'SIGNATURE: codice + visual design + sperimentazione AI + gusto street/tech.'
    ];
  }

  if (input.includes('siti') || input.includes('web') || input.includes('app')) {
    return [
      `> "${rawInput}"`,
      'AI_ASSISTANT: Area web/app attiva.',
      'CAN_DO: landing, portfolio, dashboard, frontend React, tool interattivi, app creative e sistemi responsive.',
      'STACK: React, TypeScript, Vite, Three.js, UI motion, integrazione asset e deploy web.'
    ];
  }

  if (input.includes('3d') || input.includes('blender') || input.includes('webgl')) {
    return [
      `> "${rawInput}"`,
      'AI_ASSISTANT: Area 3D attiva.',
      'CAN_DO: viewer GLB, scene Three.js, character preview, poster 3D, shader, rig test e motion prototyping.',
      'NOTE: per rig artistici seri conviene Blender, poi il sito legge GLB/animazioni.'
    ];
  }

  if (input.includes('java') || input.includes('python') || input.includes('py') || input.includes('effect')) {
    return [
      `> "${rawInput}"`,
      'JAVA_PIPELINE: RippleLetters.java -> FlowField -> MouseAttractor',
      'PYTHON_PIPELINE: dante_jp_waterfield.py -> glyph particles -> liquid displacement',
      'JS_CANVAS: live browser render active. Muovi il mouse sul pannello per deformare le lettere.'
    ];
  }

  if (input.includes('itch') || input.includes('game') || input.includes('giochi')) {
    return [
      `> "${rawInput}"`,
      'AI_ASSISTANT: Indie games hub attivo.',
      'ITCH: https://nosense-3d.itch.io/',
      'DIRECTION: prototipi giocabili, tool strani, personaggi, visual experiments e piccole release browser.'
    ];
  }

  return [
    `> "${rawInput}"`,
    'AI_ASSISTANT: Posso parlare del profilo di Eugenio, dei suoi contatti, dei siti/app, del 3D, dei poster o degli esperimenti indie.',
    'TRY: "chi sei", "contatti", "siti web", "3D", "java effects", "itch.io".'
  ];
}

export default function ProgrammingShowcase() {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentCmd, setCurrentCmd] = useState<string>('');
  const [isThinking, setIsThinking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    setTerminalLogs([
      'AI_PORTFOLIO_CHAT: pronto.',
      'Scrivi una domanda su Eugenio, qwerty3D_, contatti, siti web, app, 3D, poster o indie games.',
      'VISUAL_ENGINE: Dante Japanese water-letter field mounted.'
    ]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const chars = Array.from(danteJapaneseGlyphs);
    const particles = Array.from({ length: 86 }, (_, index) => ({
      glyph: chars[index % chars.length],
      x: Math.random(),
      y: Math.random(),
      speed: 0.08 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      size: 10 + Math.random() * 8,
      depth: 0.35 + Math.random() * 0.55
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = (time: number) => {
      const t = time * 0.001;
      ctx.fillStyle = 'rgba(3, 7, 18, 0.18)';
      ctx.fillRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const px = pointer.x * width;
      const py = pointer.y * height;

      particles.forEach((particle, index) => {
        const baseX = particle.x * width;
        const baseY = ((particle.y + t * particle.speed * 0.018) % 1) * height;
        const waveX = Math.sin(t * 0.55 + particle.phase + baseY * 0.012) * 8 * particle.depth;
        const waveY = Math.cos(t * 0.45 + particle.phase + baseX * 0.01) * 5 * particle.depth;
        const dx = baseX + waveX - px;
        const dy = baseY + waveY - py;
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const force = pointer.active ? Math.min(55 / distance, 1.2) : 0;
        const ripple = Math.sin(distance * 0.045 - t * 2.2) * force * 8;
        const x = baseX + waveX + (dx / distance) * ripple;
        const y = baseY + waveY + (dy / distance) * ripple;
        const alpha = 0.18 + particle.depth * 0.48 + (pointer.active ? force * 0.06 : 0);

        ctx.font = `${particle.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = index % 11 === 0
          ? `rgba(255, 46, 81, ${Math.min(alpha, 0.95)})`
          : `rgba(230, 255, 247, ${Math.min(alpha, 0.88)})`;
        ctx.fillText(particle.glyph, x, y);
      });

      ctx.strokeStyle = 'rgba(0, 255, 190, 0.13)';
      ctx.lineWidth = 1;
      for (let y = 18; y < height; y += 28) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const offset = Math.sin(x * 0.018 + t * 0.9 + y * 0.025) * 2;
          if (x === 0) ctx.moveTo(x, y + offset);
          else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    resize();
    animationId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const submitPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || isThinking) return;

    setIsThinking(true);
    setTerminalLogs((prev) => [...prev, `---`, `USER: "${trimmed}"`, 'AI_ASSISTANT: sto componendo una risposta...']);
    setCurrentCmd('');

    window.setTimeout(() => {
      const reply = buildAiReply(trimmed);
      setTerminalLogs((prev) => [...prev.slice(0, -1), ...reply]);
      setIsThinking(false);
    }, 420);
  };

  const handleCommandSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitPrompt(currentCmd);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1">
          Profile Nodes
        </div>

        {profileCards.map((card) => (
          <button
            type="button"
            key={card.id}
            onClick={() => submitPrompt(card.title)}
            className="glass-panel p-5 rounded-xl cursor-pointer transition-all duration-300 border-neutral-200/50 bg-white/40 hover:bg-white hover:border-neutral-400 text-left group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[8px] text-neutral-400">NODE // {card.id.toUpperCase()}</span>
              <Sparkles size={12} className="text-[#FF2E51] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {card.title}
            </h3>

            <p className="font-sans text-[11px] text-neutral-500 leading-relaxed font-light mb-4">
              {card.body}
            </p>

            <div className="font-mono text-[7.5px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600 font-semibold inline-flex">
              {card.meta}
            </div>
          </button>
        ))}

        <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
          <a href="https://github.com/xtruel" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 rounded border border-neutral-200 bg-white/50 py-2 text-neutral-600 hover:text-neutral-950">
            <Github size={11} /> GitHub
          </a>
          <a href="https://nosense-3d.itch.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 rounded border border-neutral-200 bg-white/50 py-2 text-neutral-600 hover:text-neutral-950">
            <ExternalLink size={11} /> itch.io
          </a>
          <a href="mailto:truel3000lofi@gmail.com" className="flex items-center justify-center gap-1 rounded border border-neutral-200 bg-white/50 py-2 text-neutral-600 hover:text-neutral-950">
            <Mail size={11} /> Email
          </a>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 px-1">
          <span>AI PORTFOLIO CHAT // CREATIVE CODE CONSOLE</span>
          <span className="flex items-center space-x-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
            <span>{isThinking ? 'THINKING' : 'READY'}</span>
          </span>
        </div>

        <div className="bg-neutral-950 text-neutral-200 p-5 rounded-xl font-mono text-[10.5px] shadow-2xl border border-neutral-900 flex flex-col justify-between min-h-[520px] h-full overflow-hidden">
          <div
            className="relative h-44 mb-4 rounded-lg overflow-hidden border border-emerald-400/20 bg-black"
            onMouseEnter={() => {
              pointerRef.current.active = true;
            }}
            onMouseLeave={() => {
              pointerRef.current.active = false;
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              pointerRef.current = {
                x: (event.clientX - rect.left) / rect.width,
                y: (event.clientY - rect.top) / rect.height,
                active: true
              };
            }}
          >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div className="absolute left-3 top-3 font-mono text-[8px] text-emerald-300 tracking-widest">
              DANTE_JP_WATERFIELD // PYTHON + JAVA + JS
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[7.5px] text-neutral-400">
              <span>INPUT: MOUSE_VECTOR</span>
              <span>MODE: CALM LIQUID LETTERS</span>
            </div>
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[250px] pr-2 scrollbar-thin scrollbar-thumb-neutral-800">
            {terminalLogs.map((log, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap leading-relaxed ${
                  log.startsWith('USER') || log.startsWith('>')
                    ? 'text-emerald-400 font-bold'
                    : log.startsWith('AI_ASSISTANT')
                    ? 'text-cyan-300'
                    : log.startsWith('LINKS') || log.startsWith('ITCH') || log.startsWith('STACK')
                    ? 'text-amber-300'
                    : 'text-neutral-300'
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommandSubmit} className="mt-4 pt-3 border-t border-neutral-900 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold font-mono">ask@qwerty3D_:~#</span>
            <input
              type="text"
              value={currentCmd}
              onChange={(event) => setCurrentCmd(event.target.value)}
              className="flex-grow bg-transparent text-white border-none outline-none font-mono focus:ring-0 p-0 text-[11px]"
              placeholder='Scrivi: "chi sei", "contatti", "siti web", "3D", "java effects"...'
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => submitPrompt(prompt)}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-[9px] rounded uppercase border border-neutral-200 transition-all text-center"
            >
              {prompt}
            </button>
          ))}
          <button
            type="button"
            onClick={() => submitPrompt('java effects')}
            className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-[9px] rounded uppercase transition-all text-center flex items-center justify-center space-x-1"
          >
            <Terminal size={10} />
            <span>RUN_EFFECTS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
