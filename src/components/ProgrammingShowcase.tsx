import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Sparkles, Mail, Play, Pause } from 'lucide-react';

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

// --- tiny Java syntax highlighter --------------------------------------------
const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'final', 'void', 'new',
  'for', 'while', 'do', 'if', 'else', 'return', 'int', 'double', 'float', 'char',
  'long', 'boolean', 'import', 'package', 'this', 'extends', 'implements',
  'throws', 'try', 'catch', 'break', 'continue', 'true', 'false', 'null'
]);

type Tok = { t: string; v: string };

function tokenize(line: string): Tok[] {
  const out: Tok[] = [];
  let rest = line;
  let comment: string | null = null;
  const ci = rest.indexOf('//');
  if (ci >= 0) {
    comment = rest.slice(ci);
    rest = rest.slice(0, ci);
  }
  const re = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d[\d._]*[fFdDlL]?\b|[A-Za-z_$][\w$]*|\s+|[^\sA-Za-z0-9_$]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(rest))) {
    const v = m[0];
    let t = 'punct';
    if (/^["']/.test(v)) t = 'str';
    else if (/^\d/.test(v)) t = 'num';
    else if (/^\s+$/.test(v)) t = 'ws';
    else if (/^[A-Za-z_$]/.test(v)) t = JAVA_KEYWORDS.has(v) ? 'kw' : /^[A-Z]/.test(v) ? 'type' : 'id';
    out.push({ t, v });
  }
  if (comment !== null) out.push({ t: 'com', v: comment });
  return out;
}

const TOK_COLOR: Record<string, string> = {
  kw: 'text-[#ff79c6]',
  str: 'text-[#a6e22e]',
  num: 'text-[#fd971f]',
  com: 'text-neutral-500 italic',
  type: 'text-[#66d9ef]',
  id: 'text-neutral-200',
  punct: 'text-neutral-400',
  ws: 'text-neutral-200'
};

function CodeLine({ line }: { line: string }) {
  return (
    <div className="whitespace-pre">
      {tokenize(line).map((tok, i) => (
        <span key={i} className={TOK_COLOR[tok.t] ?? 'text-neutral-200'}>{tok.v}</span>
      ))}
      {line.length === 0 ? ' ' : ''}
    </div>
  );
}

// --- ASCII animation generators ----------------------------------------------
const DONUT_CHARS = '.,-~:;=!*#$@';

function donutFrame(A: number, B: number, cols: number, rows: number): string {
  const b = new Array(cols * rows).fill(' ');
  const z = new Array(cols * rows).fill(0);
  const sA = Math.sin(A), cA = Math.cos(A), sB = Math.sin(B), cB = Math.cos(B);
  for (let j = 0; j < 6.28; j += 0.3) {
    const sj = Math.sin(j), cj = Math.cos(j), h = cj + 2;
    for (let i = 0; i < 6.28; i += 0.1) {
      const si = Math.sin(i), ci = Math.cos(i);
      const D = 1 / (si * h * sA + sj * cA + 5);
      const t = si * h * cA - sj * sA;
      const x = Math.floor(cols / 2 + cols * 0.30 * D * (ci * h * cB - t * sB));
      const y = Math.floor(rows / 2 - rows * 0.50 * D * (ci * h * sB + t * cB));
      const o = x + cols * y;
      const lum = Math.floor(8 * ((sj * sA - si * cj * cA) * cB - si * cj * sA - sj * cA - ci * cj * sB));
      if (y >= 0 && y < rows && x >= 0 && x < cols && D > z[o]) {
        z[o] = D;
        b[o] = DONUT_CHARS[lum > 0 ? Math.min(lum, 11) : 0];
      }
    }
  }
  let s = '';
  for (let r = 0; r < rows; r++) s += b.slice(r * cols, (r + 1) * cols).join('') + '\n';
  return s;
}

const WAVE_PALETTE = ' .:-=+*#%@';

function waveFrame(t: number, cols: number, rows: number): string {
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = Math.sin(x * 0.3 + t * 2) + Math.sin(y * 0.4 + t) + Math.sin((x + y) * 0.2 - t);
      const idx = Math.floor(((v + 3) / 6) * (WAVE_PALETTE.length - 1));
      s += WAVE_PALETTE[Math.max(0, Math.min(WAVE_PALETTE.length - 1, idx))];
    }
    s += '\n';
  }
  return s;
}

const NEKO_FRAMES = [
  `       /\\_/\\
      ( o.o )   ~
       > ^ <   /
      /     \\_/
     ( nyaa! )
      \\_____/`,
  `       /\\_/\\
      ( -.- )  ~
       > ^ <    \\
      /     \\_/
     ( nyaa! )
      \\_____/`,
  `       /\\_/\\
      ( o.o ) ~
       > w <   /
      /     \\_/
     ( purr~ )
      \\_____/`
];

// digital clock rendered with a 3x5 block font, driven by the real time
const CLOCK_FONT: Record<string, string[]> = {
  '0': ['███', '█ █', '█ █', '█ █', '███'],
  '1': [' █ ', ' █ ', ' █ ', ' █ ', ' █ '],
  '2': ['███', '  █', '███', '█  ', '███'],
  '3': ['███', '  █', '███', '  █', '███'],
  '4': ['█ █', '█ █', '███', '  █', '  █'],
  '5': ['███', '█  ', '███', '  █', '███'],
  '6': ['███', '█  ', '███', '█ █', '███'],
  '7': ['███', '  █', '  █', '  █', '  █'],
  '8': ['███', '█ █', '███', '█ █', '███'],
  '9': ['███', '█ █', '███', '  █', '███'],
  ':': [' ', '█', ' ', '█', ' '],
  ' ': [' ', ' ', ' ', ' ', ' ']
};

function clockFrame(): string {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const str = `${hh}:${mm}:${ss}`;
  const rows = ['', '', '', '', ''];
  for (const ch of str) {
    const g = CLOCK_FONT[ch] || CLOCK_FONT[' '];
    for (let r = 0; r < 5; r++) rows[r] += g[r] + ' ';
  }
  return '\n\n' + rows.join('\n') + '\n';
}

const MATRIX_CHARS = 'ABCDEFGHKLMNPQRSTXZ0123456789#$@%&*+';

function matrixFrame(head: number[], cols: number, rows: number): string {
  const trail = rows * 0.7;
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const d = head[x] - y;
      s += d >= 0 && d < trail ? MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] : ' ';
    }
    s += '\n';
  }
  for (let x = 0; x < cols; x++) {
    head[x] += 0.45 + Math.random() * 0.9;
    if (head[x] - trail > rows) head[x] = -Math.random() * rows * 0.6;
  }
  return s;
}

function lifeStep(g: Uint8Array, cols: number, rows: number): Uint8Array {
  const n = new Uint8Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let c = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          c += g[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
        }
      }
      const alive = g[y * cols + x] === 1;
      n[y * cols + x] = alive ? (c === 2 || c === 3 ? 1 : 0) : c === 3 ? 1 : 0;
    }
  }
  return n;
}

function lifeRender(g: Uint8Array, cols: number, rows: number): string {
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) s += g[y * cols + x] ? '#' : ' ';
    s += '\n';
  }
  return s;
}

// --- extra ASCII demos -------------------------------------------------------
const DENSITY = ' .:-=+*#%@';

function makeGrid(cols: number, rows: number): string[] { return new Array(cols * rows).fill(' '); }
function gridStr(g: string[], cols: number, rows: number): string {
  let s = '';
  for (let r = 0; r < rows; r++) s += g.slice(r * cols, (r + 1) * cols).join('') + '\n';
  return s;
}
function plot(g: string[], cols: number, rows: number, x: number, y: number, ch: string) {
  const xi = Math.round(x), yi = Math.round(y);
  if (xi >= 0 && xi < cols && yi >= 0 && yi < rows) g[yi * cols + xi] = ch;
}
function line(g: string[], cols: number, rows: number, x0n: number, y0n: number, x1n: number, y1n: number, ch: string) {
  let x0 = Math.round(x0n), y0 = Math.round(y0n);
  const x1 = Math.round(x1n), y1 = Math.round(y1n);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    plot(g, cols, rows, x0, y0, ch);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}

const CUBE_V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
const CUBE_E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
function cubeFrame(t: number, cols: number, rows: number): string {
  const g = makeGrid(cols, rows);
  const ca = Math.cos(t * 0.9), sa = Math.sin(t * 0.9), cb = Math.cos(t * 0.7), sb = Math.sin(t * 0.7);
  const cx = cols / 2, cy = rows / 2, scale = rows * 0.55;
  const p = CUBE_V.map(([x, y, z]) => {
    const y1 = y * ca - z * sa, z1 = y * sa + z * ca;
    const x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb;
    const d = 1 / (z2 + 4);
    return [cx + x2 * scale * d * 2, cy - y1 * scale * d];
  });
  CUBE_E.forEach(([a, b]) => line(g, cols, rows, p[a][0], p[a][1], p[b][0], p[b][1], '#'));
  return gridStr(g, cols, rows);
}

function plasmaFrame(t: number, cols: number, rows: number): string {
  const cx = cols / 2, cy = rows / 2;
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = Math.sin(x * 0.2 + t) + Math.sin(y * 0.3 + t * 1.3)
        + Math.sin((x + y) * 0.15 + t * 0.8)
        + Math.sin(Math.hypot(x - cx, (y - cy) * 1.8) * 0.25 - t * 2);
      const idx = Math.floor(((v + 4) / 8) * (DENSITY.length - 1));
      s += DENSITY[Math.max(0, Math.min(DENSITY.length - 1, idx))];
    }
    s += '\n';
  }
  return s;
}

function starsFrame(stars: { x: number; y: number; z: number }[], cols: number, rows: number): string {
  const g = makeGrid(cols, rows);
  const cx = cols / 2, cy = rows / 2, ch = '.+*#@';
  for (const s of stars) {
    s.z -= 0.012;
    if (s.z <= 0.04) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; }
    plot(g, cols, rows, cx + (s.x / s.z) * cx, cy + (s.y / s.z) * cy, ch[Math.min(4, Math.floor((1 - s.z) * 5))]);
  }
  return gridStr(g, cols, rows);
}

function mandelFrame(t: number, cols: number, rows: number): string {
  const chars = ' .:-=+*#%@';
  const zoom = Math.exp(-2.4 * (0.5 + 0.5 * Math.sin(t * 0.22)));
  const sc = 2.7 * zoom, cx0 = -0.745, cy0 = 0.113, maxI = 48;
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cr = cx0 + (x / cols - 0.5) * sc * (cols / rows) * 0.55;
      const ci = cy0 + (y / rows - 0.5) * sc;
      let zr = 0, zi = 0, i = 0;
      while (zr * zr + zi * zi < 4 && i < maxI) { const tmp = zr * zr - zi * zi + cr; zi = 2 * zr * zi + ci; zr = tmp; i++; }
      s += i >= maxI ? ' ' : chars[Math.floor((i / maxI) * (chars.length - 1))];
    }
    s += '\n';
  }
  return s;
}

function tunnelFrame(t: number, cols: number, rows: number): string {
  const cx = cols / 2, cy = rows / 2;
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = (x - cx) / (cols * 0.5), dy = (y - cy) / (rows * 0.5) * 0.55;
      const dist = Math.hypot(dx, dy) + 1e-3;
      const v = Math.floor(2 / dist + t * 4 + Math.atan2(dy, dx) * 2);
      s += DENSITY[((v % DENSITY.length) + DENSITY.length) % DENSITY.length];
    }
    s += '\n';
  }
  return s;
}

function rippleFrame(t: number, cols: number, rows: number): string {
  const cx = cols / 2, cy = rows / 2;
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const d = Math.hypot(x - cx, (y - cy) * 1.8);
      const v = Math.sin(d * 0.6 - t * 3);
      s += DENSITY[Math.floor(((v + 1) / 2) * (DENSITY.length - 1))];
    }
    s += '\n';
  }
  return s;
}

function heartFrame(t: number, cols: number, rows: number): string {
  const beat = 1 + 0.08 * Math.sin(t * 6);
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const X = (x - cols / 2) / (cols * 0.33) / beat;
      const Y = (rows / 2 - y) / (rows * 0.42) / beat;
      const a = X * X + Y * Y - 1;
      const f = a * a * a - X * X * Y * Y * Y;
      s += f <= 0 ? (a < -0.35 ? '@' : '#') : ' ';
    }
    s += '\n';
  }
  return s;
}

function fireFrame(heat: Float64Array, cols: number, rows: number): string {
  for (let x = 0; x < cols; x++) heat[(rows - 1) * cols + x] = Math.random() < 0.85 ? 1 : Math.random();
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols; x++) {
      const avg = (heat[(y + 1) * cols + x]
        + heat[(y + 1) * cols + Math.max(0, x - 1)]
        + heat[(y + 1) * cols + Math.min(cols - 1, x + 1)]
        + heat[Math.min(rows - 1, y + 2) * cols + x]) / 4;
      heat[y * cols + x] = Math.max(0, avg - 0.015 - Math.random() * 0.04);
    }
  }
  let s = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) s += DENSITY[Math.min(DENSITY.length - 1, Math.floor(heat[y * cols + x] * (DENSITY.length - 1) * 1.25))];
    s += '\n';
  }
  return s;
}

type Program = {
  id: string;
  file: string;
  cmd: string;
  kind: 'donut' | 'wave' | 'neko' | 'clock' | 'matrix' | 'life'
    | 'cube' | 'plasma' | 'stars' | 'mandel' | 'tunnel' | 'ripple' | 'heart' | 'fire';
  cols: number;
  rows: number;
  code: string[];
};

const PROGRAMS: Program[] = [
  {
    id: 'donut',
    file: 'Donut.java',
    cmd: 'javac Donut.java && java Donut',
    kind: 'donut',
    cols: 40,
    rows: 18,
    code: [
      'public class Donut {',
      '  // spinning torus rendered as ASCII luminance',
      '  static final String LUM = ".,-~:;=!*#$@";',
      '',
      '  public static void main(String[] args) throws Exception {',
      '    double a = 0, b = 0;',
      '    while (true) {',
      '      char[] out = new char[40 * 18];',
      '      double[] zbuf = new double[40 * 18];',
      '      render(out, zbuf, a, b);',
      '      System.out.print("\\033[H" + new String(out));',
      '      a += 0.07; b += 0.03;',
      '      Thread.sleep(33);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'wave',
    file: 'Wave.java',
    cmd: 'java Wave.java',
    kind: 'wave',
    cols: 44,
    rows: 16,
    code: [
      'public class Wave {',
      '  static final String P = " .:-=+*#%@";',
      '',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.1) {',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 16; y++) {',
      '        for (int x = 0; x < 44; x++) {',
      '          double v = Math.sin(x * 0.3 + t * 2)',
      '                   + Math.sin(y * 0.4 + t)',
      '                   + Math.sin((x + y) * 0.2 - t);',
      '          s.append(P.charAt((int)((v + 3) / 6 * 9)));',
      '        }',
      '        s.append(\'\\n\');',
      '      }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'neko',
    file: 'Neko.java',
    cmd: 'java Neko --cute',
    kind: 'neko',
    cols: 26,
    rows: 6,
    code: [
      'public class Neko {',
      '  // a tiny ASCII cat that blinks and wags',
      '  static String[] frames = {',
      '    " /\\\\_/\\\\ ( o.o ) > ^ < ",',
      '    " /\\\\_/\\\\ ( -.- ) > ^ < ",',
      '    " /\\\\_/\\\\ ( o.o ) > w < "',
      '  };',
      '',
      '  public static void main(String[] a) throws Exception {',
      '    for (int i = 0; ; i++) {',
      '      System.out.print("\\033[H" + frames[i % frames.length]);',
      '      Thread.sleep(400);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'clock',
    file: 'Clock.java',
    cmd: 'java Clock.java',
    kind: 'clock',
    cols: 30,
    rows: 9,
    code: [
      'import java.time.LocalTime;',
      '',
      'public class Clock {',
      '  public static void main(String[] a) throws Exception {',
      '    while (true) {',
      '      LocalTime t = LocalTime.now();',
      '      String hms = String.format("%02d:%02d:%02d",',
      '        t.getHour(), t.getMinute(), t.getSecond());',
      '      System.out.print("\\033[H" + bigFont(hms));',
      '      Thread.sleep(200);',
      '    }',
      '  }',
      '  // draws the time with a 3x5 block font',
      '}'
    ]
  },
  {
    id: 'matrix',
    file: 'Matrix.java',
    cmd: 'java Matrix.java',
    kind: 'matrix',
    cols: 44,
    rows: 18,
    code: [
      'public class Matrix {',
      '  static final String G = "ABC0123#$@%&*";',
      '',
      '  public static void main(String[] a) throws Exception {',
      '    int w = 44, h = 18;',
      '    double[] head = new double[w];',
      '    for (int x = 0; x < w; x++) head[x] = -Math.random() * h;',
      '    while (true) {',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < h; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < w; x++) {',
      '          double d = head[x] - y;',
      '          s.append(d >= 0 && d < h * 0.7',
      '            ? G.charAt((int)(Math.random() * G.length())) : \' \');',
      '        }',
      '      for (int x = 0; x < w; x++) {',
      '        head[x] += 0.45 + Math.random();',
      '        if (head[x] - h * 0.7 > h) head[x] = -Math.random() * h;',
      '      }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(55);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'life',
    file: 'Life.java',
    cmd: 'java Life.java',
    kind: 'life',
    cols: 44,
    rows: 18,
    code: [
      'public class Life {',
      '  // Conway\'s Game of Life on a toroidal grid',
      '  public static void main(String[] a) throws Exception {',
      '    int w = 44, h = 18;',
      '    boolean[][] g = new boolean[h][w];',
      '    for (boolean[] r : g)',
      '      for (int x = 0; x < w; x++) r[x] = Math.random() < 0.28;',
      '    while (true) {',
      '      boolean[][] n = new boolean[h][w];',
      '      for (int y = 0; y < h; y++)',
      '        for (int x = 0; x < w; x++) {',
      '          int c = 0;',
      '          for (int dy = -1; dy <= 1; dy++)',
      '            for (int dx = -1; dx <= 1; dx++)',
      '              if ((dx | dy) != 0 && g[(y+dy+h)%h][(x+dx+w)%w]) c++;',
      '          n[y][x] = g[y][x] ? (c == 2 || c == 3) : (c == 3);',
      '        }',
      '      g = n;',
      '      Thread.sleep(120);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'cube', file: 'Cube.java', cmd: 'java Cube.java', kind: 'cube', cols: 42, rows: 22,
    code: [
      'public class Cube {',
      '  static int[][] V = {{-1,-1,-1},{1,-1,-1},{1,1,-1},{-1,1,-1},',
      '                      {-1,-1,1},{1,-1,1},{1,1,1},{-1,1,1}};',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.05) {',
      '      char[] s = blank(42, 22);',
      '      double[][] p = project(V, t);  // rotate + perspective',
      '      drawEdges(s, p);               // 12 wireframe edges',
      '      System.out.print("\\033[H" + new String(s));',
      '      Thread.sleep(33);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'plasma', file: 'Plasma.java', cmd: 'java Plasma.java', kind: 'plasma', cols: 46, rows: 18,
    code: [
      'public class Plasma {',
      '  static final String P = " .:-=+*#%@";',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.1) {',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 18; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < 46; x++) {',
      '          double v = Math.sin(x*0.2+t) + Math.sin(y*0.3+t*1.3)',
      '                   + Math.sin((x+y)*0.15+t*0.8);',
      '          s.append(P.charAt((int)((v+3)/6*9)));',
      '        }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'stars', file: 'Stars.java', cmd: 'java Stars.java', kind: 'stars', cols: 46, rows: 22,
    code: [
      'public class Stars {',
      '  public static void main(String[] a) throws Exception {',
      '    int n = 90;',
      '    double[] x = new double[n], y = new double[n], z = new double[n];',
      '    for (int i = 0; i < n; i++) { x[i]=rnd(); y[i]=rnd(); z[i]=Math.random(); }',
      '    while (true) {',
      '      char[] s = blank(46, 22);',
      '      for (int i = 0; i < n; i++) {',
      '        z[i] -= 0.012;',
      '        if (z[i] <= 0.04) { x[i]=rnd(); y[i]=rnd(); z[i]=1; }',
      '        put(s, 23 + (int)(x[i]/z[i]*23), 11 + (int)(y[i]/z[i]*11),',
      '            ".+*#@".charAt(Math.min(4,(int)((1-z[i])*5))));',
      '      }',
      '      System.out.print("\\033[H" + new String(s));',
      '      Thread.sleep(33);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'mandel', file: 'Mandelbrot.java', cmd: 'java Mandelbrot.java', kind: 'mandel', cols: 46, rows: 22,
    code: [
      'public class Mandelbrot {',
      '  static final String C = " .:-=+*#%@";',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.08) {',
      '      double zoom = Math.exp(-2.4*(0.5+0.5*Math.sin(t*0.22)));',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 22; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < 46; x++) {',
      '          double cr = -0.745 + (x/46.0-0.5)*2.7*zoom*1.1;',
      '          double ci =  0.113 + (y/22.0-0.5)*2.7*zoom;',
      '          double zr=0, zi=0; int i=0;',
      '          while (zr*zr+zi*zi<4 && i<48) {',
      '            double tmp=zr*zr-zi*zi+cr; zi=2*zr*zi+ci; zr=tmp; i++;',
      '          }',
      '          s.append(i>=48 ? \' \' : C.charAt(i*9/48));',
      '        }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'tunnel', file: 'Tunnel.java', cmd: 'java Tunnel.java', kind: 'tunnel', cols: 46, rows: 20,
    code: [
      'public class Tunnel {',
      '  static final String P = " .:-=+*#%@";',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.1) {',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 20; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < 46; x++) {',
      '          double dx = (x-23)/23.0, dy = (y-10)/10.0*0.55;',
      '          double dist = Math.hypot(dx, dy) + 1e-3;',
      '          int v = (int)(2/dist + t*4 + Math.atan2(dy,dx)*2);',
      '          s.append(P.charAt(((v%10)+10)%10));',
      '        }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'ripple', file: 'Ripple.java', cmd: 'java Ripple.java', kind: 'ripple', cols: 44, rows: 18,
    code: [
      'public class Ripple {',
      '  static final String P = " .:-=+*#%@";',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.1) {',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 18; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < 44; x++) {',
      '          double d = Math.hypot(x-22, (y-9)*1.8);',
      '          double v = Math.sin(d*0.6 - t*3);',
      '          s.append(P.charAt((int)((v+1)/2*9)));',
      '        }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'heart', file: 'Heart.java', cmd: 'java Heart.java', kind: 'heart', cols: 34, rows: 22,
    code: [
      'public class Heart {',
      '  public static void main(String[] a) throws Exception {',
      '    for (double t = 0; ; t += 0.1) {',
      '      double beat = 1 + 0.08*Math.sin(t*6);  // pulse',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < 22; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < 34; x++) {',
      '          double X = (x-17)/11.0/beat, Y = (11-y)/9.0/beat;',
      '          double a = X*X + Y*Y - 1;',
      '          double f = a*a*a - X*X*Y*Y*Y;',
      '          s.append(f <= 0 ? (a < -0.35 ? \'@\' : \'#\') : \' \');',
      '        }',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  },
  {
    id: 'fire', file: 'Fire.java', cmd: 'java Fire.java', kind: 'fire', cols: 46, rows: 20,
    code: [
      'public class Fire {',
      '  static final String C = " .:-=+*#%@";',
      '  public static void main(String[] a) throws Exception {',
      '    int w = 46, h = 20; double[] heat = new double[w*h];',
      '    while (true) {',
      '      for (int x = 0; x < w; x++)',
      '        heat[(h-1)*w+x] = Math.random() < 0.85 ? 1 : Math.random();',
      '      for (int y = 0; y < h-1; y++) for (int x = 0; x < w; x++) {',
      '        double avg = (heat[(y+1)*w+x] + heat[(y+1)*w+Math.max(0,x-1)]',
      '          + heat[(y+1)*w+Math.min(w-1,x+1)] + heat[Math.min(h-1,y+2)*w+x]) / 4;',
      '        heat[y*w+x] = Math.max(0, avg - 0.015 - Math.random()*0.04);',
      '      }',
      '      StringBuilder s = new StringBuilder();',
      '      for (int y = 0; y < h; y++, s.append(\'\\n\'))',
      '        for (int x = 0; x < w; x++) s.append(C.charAt(Math.min(9,(int)(heat[y*w+x]*11))));',
      '      System.out.print("\\033[H" + s);',
      '      Thread.sleep(40);',
      '    }',
      '  }',
      '}'
    ]
  }
];

export default function ProgrammingShowcase() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(true);
  const [ascii, setAscii] = useState('');
  const [typedCmd, setTypedCmd] = useState('');
  const [codeShown, setCodeShown] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const onScreenRef = useRef(true);
  const prog = PROGRAMS[active];

  // Type the command, then reveal the source line by line.
  useEffect(() => {
    setTypedCmd('');
    setCodeShown(0);
    let i = 0;
    let revealTimer: number | undefined;
    const cmd = prog.cmd;
    const typer = window.setInterval(() => {
      i += 1;
      setTypedCmd(cmd.slice(0, i));
      if (i >= cmd.length) {
        window.clearInterval(typer);
        let li = 0;
        revealTimer = window.setInterval(() => {
          li += 1;
          setCodeShown(li);
          if (li >= prog.code.length) window.clearInterval(revealTimer);
        }, 45);
      }
    }, 34);
    return () => {
      window.clearInterval(typer);
      if (revealTimer) window.clearInterval(revealTimer);
    };
  }, [active]);

  // Pause the render loop when the section is off-screen or the tab is hidden.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { onScreenRef.current = entries[0]?.isIntersecting ?? true; },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The "running program" — drives the ASCII output, throttled to ~24fps.
  useEffect(() => {
    let raf = 0;
    let last = 0;
    let acc = 0;
    let A = 0, B = 0, t = 0, nekoAcc = 0, nekoFrame = 0;
    const STEP = 1 / 24;

    // per-program persistent state
    const cols = prog.cols, rows = prog.rows;
    const mHead = new Array(cols).fill(0).map(() => -Math.random() * rows);
    let life: Uint8Array | null = null;
    let lifeAcc = 0;
    if (prog.kind === 'life') {
      life = new Uint8Array(cols * rows);
      for (let i = 0; i < life.length; i++) life[i] = Math.random() < 0.28 ? 1 : 0;
    }
    let stars: { x: number; y: number; z: number }[] = [];
    if (prog.kind === 'stars') {
      stars = Array.from({ length: 90 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 0.9 + 0.1 }));
    }
    let fire: Float64Array | null = null;
    if (prog.kind === 'fire') fire = new Float64Array(cols * rows);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!running || !onScreenRef.current || document.hidden) return;
      acc += dt;
      if (acc < STEP) return;
      acc = 0;
      t += STEP;

      switch (prog.kind) {
        case 'donut':
          A += STEP * 1.0; B += STEP * 0.6;
          setAscii(donutFrame(A, B, cols, rows));
          break;
        case 'wave':
          setAscii(waveFrame(t, cols, rows));
          break;
        case 'clock':
          setAscii(clockFrame());
          break;
        case 'matrix':
          setAscii(matrixFrame(mHead, cols, rows));
          break;
        case 'life':
          lifeAcc += STEP;
          if (lifeAcc >= 0.13 && life) {
            lifeAcc = 0;
            life = lifeStep(life, cols, rows);
            let alive = 0;
            for (let i = 0; i < life.length; i++) alive += life[i];
            if (alive < cols * rows * 0.04) {
              for (let i = 0; i < life.length; i++) if (Math.random() < 0.28) life[i] = 1;
            }
          }
          if (life) setAscii(lifeRender(life, cols, rows));
          break;
        case 'cube':
          setAscii(cubeFrame(t, cols, rows));
          break;
        case 'plasma':
          setAscii(plasmaFrame(t, cols, rows));
          break;
        case 'stars':
          setAscii(starsFrame(stars, cols, rows));
          break;
        case 'mandel':
          setAscii(mandelFrame(t, cols, rows));
          break;
        case 'tunnel':
          setAscii(tunnelFrame(t, cols, rows));
          break;
        case 'ripple':
          setAscii(rippleFrame(t, cols, rows));
          break;
        case 'heart':
          setAscii(heartFrame(t, cols, rows));
          break;
        case 'fire':
          if (fire) setAscii(fireFrame(fire, cols, rows));
          break;
        default:
          nekoAcc += STEP;
          if (nekoAcc >= 0.4) { nekoAcc = 0; nekoFrame = (nekoFrame + 1) % NEKO_FRAMES.length; }
          setAscii(NEKO_FRAMES[nekoFrame]);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, running]);

  const cmdDone = typedCmd.length >= prog.cmd.length;

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: profile nodes + links */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1">
          Profile Nodes
        </div>

        {profileCards.map((card) => (
          <div
            key={card.id}
            className="glass-panel p-5 rounded-xl transition-all duration-300 border-neutral-200/50 bg-white/40 hover:bg-white hover:border-neutral-400 text-left group"
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
          </div>
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

      {/* Right: live Java ASCII studio */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 px-1">
          <span>JAVA ASCII STUDIO // LIVE CODE → ANIMATION</span>
          <span className="flex items-center space-x-1">
            <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`} />
            <span>{running ? 'RUNNING' : 'PAUSED'}</span>
          </span>
        </div>

        <div className="bg-neutral-950 rounded-xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col">
          {/* window title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="font-mono text-[10px] text-neutral-400 ml-2">{prog.file}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                className="flex items-center gap-1 px-2 py-1 rounded font-mono text-[8.5px] uppercase text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:text-white transition-colors"
                title={running ? 'Pause' : 'Run'}
              >
                {running ? <Pause size={9} /> : <Play size={9} />}
                {running ? 'Pause' : 'Run'}
              </button>
            </div>
          </div>

          {/* command line */}
          <div className="px-4 py-2.5 border-b border-neutral-800 font-mono text-[11px]">
            <span className="text-emerald-400 font-bold">qwerty3D_@studio</span>
            <span className="text-neutral-500">:</span>
            <span className="text-[#66d9ef]">~/java</span>
            <span className="text-neutral-500">$ </span>
            <span className="text-neutral-100">{typedCmd}</span>
            <span className={`inline-block w-1.5 h-3.5 -mb-0.5 ml-0.5 bg-emerald-400 ${cmdDone ? 'animate-pulse' : ''}`} />
          </div>

          {/* code + output split */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* source */}
            <div className="p-4 font-mono text-[10px] leading-[1.5] border-b md:border-b-0 md:border-r border-neutral-800 overflow-x-auto min-h-[300px]">
              {prog.code.map((line, i) => (
                <div
                  key={i}
                  className={`flex transition-opacity duration-300 ${i < codeShown ? 'opacity-100' : 'opacity-0'}`}
                >
                  <span className="select-none text-neutral-700 w-6 flex-shrink-0 text-right pr-2">{i + 1}</span>
                  <CodeLine line={line} />
                </div>
              ))}
            </div>

            {/* ASCII output */}
            <div className="bg-black p-4 flex flex-col min-h-[300px]">
              <div className="font-mono text-[8px] text-emerald-400/70 mb-2 tracking-widest flex items-center justify-between">
                <span>STDOUT // ASCII RENDER</span>
                <span className="text-neutral-600">{prog.kind === 'neko' ? '~3 fps' : '24 fps'}</span>
              </div>
              <pre
                className="flex-grow flex items-center justify-center text-emerald-300 m-0 select-none"
                style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: '10px', lineHeight: '10px', whiteSpace: 'pre' }}
              >
{ascii}
              </pre>
            </div>
          </div>
        </div>

        {/* program selector */}
        <div className="flex flex-wrap gap-2">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 font-mono text-[9px] rounded uppercase border transition-all flex items-center gap-1.5 ${
                i === active
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${i === active ? 'bg-emerald-400' : 'bg-neutral-400'}`} />
              {p.file}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
