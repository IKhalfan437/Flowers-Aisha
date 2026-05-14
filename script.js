/* ─────────────────────────────────────────────
   Flower Animation  •  script.js
   ───────────────────────────────────────────── */

// ── Flower data ──────────────────────────────
const FLOWERS = [
  // { petalCount, petalColor, petalGlow, centerColor, centerGlow,
  //   bloomSize, stemH, stemW, leafSize, lean, swayDur, swayDelay, growDelay }
  { petalCount:8, petalColor:'#ff79c6', petalGlow:'rgba(255,121,198,0.6)', centerColor:'#f8d56b', centerGlow:'rgba(248,213,107,0.7)', bloomSize:62, stemH:150, stemW:5, leafSize:26, lean:-3, swayDur:3.2, swayDelay:0,   growDelay:0.1 },
  { petalCount:6, petalColor:'#c792ea', petalGlow:'rgba(199,146,234,0.6)', centerColor:'#fff',    centerGlow:'rgba(255,255,255,0.6)', bloomSize:48, stemH:120, stemW:4, leafSize:20, lean:2,  swayDur:2.8, swayDelay:0.4, growDelay:0.4 },
  { petalCount:10,petalColor:'#ff9de2', petalGlow:'rgba(255,157,226,0.6)', centerColor:'#f8d56b', centerGlow:'rgba(248,213,107,0.7)', bloomSize:70, stemH:175, stemW:6, leafSize:30, lean:-1, swayDur:3.6, swayDelay:0.2, growDelay:0.7 },
  { petalCount:7, petalColor:'#ffd6e8', petalGlow:'rgba(255,214,232,0.5)', centerColor:'#ff79c6', centerGlow:'rgba(255,121,198,0.6)', bloomSize:54, stemH:135, stemW:4, leafSize:22, lean:3,  swayDur:3.0, swayDelay:0.6, growDelay:1.0 },
  { petalCount:8, petalColor:'#a0e7ff', petalGlow:'rgba(160,231,255,0.5)', centerColor:'#fff',    centerGlow:'rgba(255,255,255,0.6)', bloomSize:58, stemH:160, stemW:5, leafSize:24, lean:-2, swayDur:2.6, swayDelay:0.1, growDelay:1.3 },
  { petalCount:6, petalColor:'#ffb3de', petalGlow:'rgba(255,179,222,0.5)', centerColor:'#f8d56b', centerGlow:'rgba(248,213,107,0.7)', bloomSize:44, stemH:110, stemW:4, leafSize:18, lean:1,  swayDur:3.4, swayDelay:0.5, growDelay:1.6 },
  { petalCount:9, petalColor:'#e89fff', petalGlow:'rgba(232,159,255,0.5)', centerColor:'#f8d56b', centerGlow:'rgba(248,213,107,0.7)', bloomSize:65, stemH:155, stemW:5, leafSize:26, lean:-3, swayDur:3.1, swayDelay:0.3, growDelay:1.9 },
  { petalCount:5, petalColor:'#ff79c6', petalGlow:'rgba(255,121,198,0.6)', centerColor:'#c792ea', centerGlow:'rgba(199,146,234,0.6)', bloomSize:50, stemH:125, stemW:4, leafSize:20, lean:2,  swayDur:2.9, swayDelay:0.7, growDelay:2.2 },
];

function buildFlower(f) {
  const wrap = document.createElement('div');
  wrap.className = 'flower';
  wrap.style.cssText = `
    --sway-duration:${f.swayDur}s;
    --sway-delay:${f.swayDelay}s;
    --grow-delay:${f.growDelay}s;
    --lean:${f.lean}deg;
    margin: 0 ${Math.random() * 18 + 6}px;
  `;

  // Bloom
  const bloom = document.createElement('div');
  bloom.className = 'bloom';
  bloom.style.cssText = `--bloom-size:${f.bloomSize}px; width:${f.bloomSize}px; height:${f.bloomSize}px;`;

  // Petals
  for (let i = 0; i < f.petalCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const rot = (360 / f.petalCount) * i;
    const delay = (f.growDelay + 0.6 + i * 0.06).toFixed(2);
    p.style.cssText = `
      --rot:${rot}deg;
      --petal-color:${f.petalColor};
      --petal-glow:${f.petalGlow};
      --petal-delay:${delay}s;
      width:${f.bloomSize * 0.38}px;
      height:${f.bloomSize * 0.5}px;
    `;
    bloom.appendChild(p);
  }

  // Center
  const center = document.createElement('div');
  center.className = 'center';
  center.style.cssText = `--center-color:${f.centerColor}; --center-glow:${f.centerGlow};`;
  bloom.appendChild(center);

  // Stem
  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.cssText = `--stem-height:${f.stemH}px; --stem-width:${f.stemW}px; height:${f.stemH}px; width:${f.stemW}px;`;

  // Leaves
  ['left','right'].forEach((side, idx) => {
    const leaf = document.createElement('div');
    leaf.className = `leaf ${side}`;
    leaf.style.cssText = `--leaf-size:${f.leafSize}px; width:${f.leafSize}px; height:${f.leafSize * 0.55}px; --leaf-top:${45 + idx * 18}%;  top:${45 + idx * 18}%;`;
    stem.appendChild(leaf);
  });

  wrap.appendChild(bloom);
  wrap.appendChild(stem);
  return wrap;
}

// Populate garden
const garden = document.getElementById('garden');
FLOWERS.forEach(f => garden.appendChild(buildFlower(f)));


// ── Particle System (canvas) ──────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const PETAL_COLORS  = ['#ff79c6','#c792ea','#ffb3de','#e89fff','#ffd6e8','#a0e7ff'];
const STAR_COUNT    = 120;
const FIREFLY_COUNT = 28;
const FALL_COUNT    = 35;

// Stars
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random(),
  y: Math.random() * 0.7,
  r: Math.random() * 1.4 + 0.3,
  alpha: Math.random() * 0.5 + 0.3,
  twinkleSpeed: Math.random() * 0.02 + 0.005,
  twinkleOffset: Math.random() * Math.PI * 2,
}));

// Fireflies
const fireflies = Array.from({ length: FIREFLY_COUNT }, () => ({
  x: Math.random(),
  y: 0.4 + Math.random() * 0.5,
  r: Math.random() * 2.5 + 1,
  color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  vx: (Math.random() - 0.5) * 0.0008,
  vy: (Math.random() - 0.5) * 0.0005,
  alpha: Math.random(),
  alphaDir: Math.random() > 0.5 ? 1 : -1,
  alphaSpeed: Math.random() * 0.015 + 0.005,
}));

// Falling petals
const fallingPetals = Array.from({ length: FALL_COUNT }, () => spawnPetal());

function spawnPetal() {
  return {
    x: Math.random(),
    y: -0.05 - Math.random() * 0.1,
    size: Math.random() * 8 + 4,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    vy: Math.random() * 0.0012 + 0.0006,
    vx: (Math.random() - 0.5) * 0.0008,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.04,
    alpha: Math.random() * 0.6 + 0.3,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.04 + 0.01,
  };
}

function drawPetalShape(ctx, x, y, size, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.ellipse(0, -size / 2, size * 0.38, size * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

let t = 0;
function render() {
  t += 0.016;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height;

  // Stars
  stars.forEach(s => {
    const alpha = s.alpha + 0.25 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
    ctx.beginPath();
    ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0.1, alpha)})`;
    ctx.fill();
  });

  // Fireflies
  fireflies.forEach(f => {
    f.x += f.vx + Math.sin(t * 0.7 + f.twinkleOffset) * 0.0003;
    f.y += f.vy + Math.cos(t * 0.5 + f.twinkleOffset) * 0.0002;
    if (f.x < 0) f.x = 1; if (f.x > 1) f.x = 0;
    if (f.y < 0.3) f.vy = Math.abs(f.vy);
    if (f.y > 0.95) f.vy = -Math.abs(f.vy);
    f.alpha += f.alphaDir * f.alphaSpeed;
    if (f.alpha > 1) { f.alpha = 1; f.alphaDir = -1; }
    if (f.alpha < 0) { f.alpha = 0; f.alphaDir = 1; }

    const grd = ctx.createRadialGradient(f.x*W, f.y*H, 0, f.x*W, f.y*H, f.r * 6);
    grd.addColorStop(0, f.color.replace(')', `,${f.alpha})`).replace('rgb','rgba').replace('#', 'rgba(') );
    // simpler:
    ctx.beginPath();
    ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(f.color, f.alpha);
    ctx.shadowBlur = 14;
    ctx.shadowColor = f.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Falling petals
  fallingPetals.forEach((p, i) => {
    p.wobble += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobble) * 0.0004;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    if (p.y > 1.05) fallingPetals[i] = spawnPetal();

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    drawPetalShape(ctx, p.x * W, p.y * H, p.size, p.rot);
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(render);
}

// tiny hex→rgba helper
function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// patch firefly twinkle offset
fireflies.forEach(f => f.twinkleOffset = Math.random() * Math.PI * 2);

render();
