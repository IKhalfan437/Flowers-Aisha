/* =============================================
   BLOOMING GARDEN — script.js
   ============================================= */

// ── Stars ─────────────────────────────────────
(function createStars() {
  const container = document.getElementById('stars');
  const count = 120;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 60}%;
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${1.5 + Math.random() * 2}s;
    `;
    container.appendChild(star);
  }
})();

// ── Grass blades ──────────────────────────────
(function createGrass() {
  const container = document.getElementById('grassBlades');
  const count = 90;
  for (let i = 0; i < count; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    const height = 20 + Math.random() * 45;
    const hue = 100 + Math.random() * 30;
    const swayFrom = (Math.random() - 0.5) * 18 + 'deg';
    const swayTo   = (Math.random() - 0.5) * 18 + 'deg';
    blade.style.cssText = `
      left: ${Math.random() * 100}%;
      height: ${height}px;
      background: linear-gradient(to top, hsl(${hue},60%,22%), hsl(${hue + 10},65%,50%));
      --sway-from: ${swayFrom};
      --sway-to: ${swayTo};
      --sway-dur: ${1.5 + Math.random() * 2.5}s;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(blade);
  }
})();

// ── Floating petals ───────────────────────────
(function createFloatingPetals() {
  const container = document.getElementById('floatingPetals');
  const colors = [
    'linear-gradient(135deg, #ff8a65, #ff5722)',
    'linear-gradient(135deg, #ffe082, #ffca28)',
    'linear-gradient(135deg, #ef9a9a, #e57373)',
    'linear-gradient(135deg, #ffccbc, #ff8a65)',
    'linear-gradient(135deg, #fff9c4, #fdd835)',
  ];

  function spawnPetal() {
    const petal = document.createElement('div');
    petal.className = 'float-petal';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const drift = (Math.random() - 0.5) * 200 + 'px';
    const spin  = (Math.random() - 0.5) * 540 + 'deg';
    const dur   = 4 + Math.random() * 5 + 's';
    const delay = Math.random() * 2 + 's';
    petal.style.cssText = `
      left: ${30 + Math.random() * 40}%;
      bottom: ${25 + Math.random() * 10}%;
      background: ${color};
      transform: rotate(${Math.random() * 360}deg);
      --drift: ${drift};
      --spin: ${spin};
      --dur: ${dur};
      --delay: ${delay};
    `;
    container.appendChild(petal);

    // Remove after a few cycles to avoid DOM bloat
    setTimeout(() => petal.remove(), 25000);
  }

  // Start spawning petals after flower blooms
  setTimeout(() => {
    spawnPetal();
    setInterval(spawnPetal, 800);
  }, 6000);
})();

// ── Sparkles ──────────────────────────────────
(function createSparkles() {
  const container = document.getElementById('sparkles');
  const sparkleColors = ['#fff9c4', '#ffe082', '#e1f5fe', '#ffffff', '#f3e5f5'];

  function spawnSparkle() {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    // Cluster them around the flower area
    const cx = 45 + Math.random() * 10;
    const cy = 15 + Math.random() * 30;
    s.style.cssText = `
      left: ${cx}%;
      top: ${cy}%;
      background: ${color};
      box-shadow: 0 0 6px 2px ${color};
      --s-dur: ${1 + Math.random() * 1.5}s;
      --s-delay: 0s;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }

  setTimeout(() => {
    spawnSparkle();
    setInterval(spawnSparkle, 400);
  }, 5500);
})();

// ── Gentle stem sway after grow ───────────────
setTimeout(() => {
  const container = document.getElementById('flowerContainer');
  if (container) {
    container.style.animation = 'gentleSway 4s ease-in-out infinite alternate';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleSway {
        from { transform: translateX(-50%) rotate(-2deg); transform-origin: bottom center; }
        to   { transform: translateX(-50%) rotate(2deg);  transform-origin: bottom center; }
      }
      #flowerContainer { transform-origin: bottom center; }
    `;
    document.head.appendChild(style);
  }
}, 5500);

// ── Interactive: click/tap to make petals burst ──
document.addEventListener('click', function(e) {
  burstPetals(e.clientX, e.clientY);
});

function burstPetals(x, y) {
  const colors = ['#ff7043','#ffca28','#ef9a9a','#ff8a65','#fff176'];
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div');
    const angle = (i / 8) * Math.PI * 2;
    const dist  = 40 + Math.random() * 60;
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 14px;
      border-radius: 50% 50% 20% 20%;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 100;
      transform: rotate(${Math.random() * 360}deg);
      transition: transform 0.6s ease-out, opacity 0.6s ease-out, top 0.6s ease-out, left 0.6s ease-out;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.left  = (x + Math.cos(angle) * dist) + 'px';
      dot.style.top   = (y + Math.sin(angle) * dist - 30) + 'px';
      dot.style.opacity = '0';
      dot.style.transform = `rotate(${Math.random() * 720}deg) scale(0.2)`;
    });
    setTimeout(() => dot.remove(), 700);
  }
}

// ── Petal color cycling ───────────────────────
const petalColors = [
  ['#ff8a65', '#ff5722', '#ffcc80'],
  ['#ce93d8', '#9c27b0', '#f3e5f5'],
  ['#80cbc4', '#00897b', '#b2dfdb'],
  ['#ef9a9a', '#e53935', '#fce4ec'],
  ['#ffb74d', '#f57c00', '#fff8e1'],
  ['#a5d6a7', '#388e3c', '#e8f5e9'],
];
let colorIndex = 0;

function cyclePetalColors() {
  colorIndex = (colorIndex + 1) % petalColors.length;
  const [from, mid, to] = petalColors[colorIndex];
  const petals = document.querySelectorAll('.petal:not(.inner-petal)');
  petals.forEach(p => {
    p.style.background = `radial-gradient(ellipse at 50% 90%, ${from}, ${mid} 40%, ${from} 80%, ${to} 100%)`;
  });
}

// Cycle every 5 seconds after bloom
setTimeout(() => {
  setInterval(cyclePetalColors, 5000);
}, 8000);
