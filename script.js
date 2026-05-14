@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@300;400&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --sky-top: #1a0533;
  --sky-mid: #3b0f6e;
  --sky-low: #8b2fc9;
  --ground-color: #1a0533;
  --accent-pink: #ff79c6;
  --accent-gold: #f8d56b;
  --accent-lavender: #c792ea;
  --stem-green: #4caf78;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0d001a;
}

.scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    var(--sky-top) 0%,
    var(--sky-mid) 45%,
    var(--sky-low) 75%,
    #c2507a 90%,
    #e8887a 100%
  );
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* Particle canvas */
#particleCanvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* Message */
.message {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  animation: fadeInDown 2s ease forwards;
  opacity: 0;
}

.heart {
  display: block;
  font-size: 2.5rem;
  color: var(--accent-pink);
  animation: heartbeat 1.6s ease-in-out infinite;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 0 12px var(--accent-pink));
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%       { transform: scale(1.25); }
  28%       { transform: scale(1); }
  42%       { transform: scale(1.18); }
  70%       { transform: scale(1); }
}

.message h1 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  color: #fff;
  letter-spacing: 0.04em;
  text-shadow:
    0 0 30px rgba(255,121,198,0.7),
    0 0 80px rgba(199,146,234,0.4),
    0 2px 6px rgba(0,0,0,0.5);
  line-height: 1;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.35em;
  text-transform: lowercase;
  margin-top: 0.6rem;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Ground */
.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14vh;
  background: linear-gradient(180deg, #2a0d45 0%, #150826 100%);
  border-radius: 60% 60% 0 0 / 20% 20% 0 0;
  z-index: 5;
}

.ground::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 14px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,121,198,0.35) 30%,
    rgba(248,213,107,0.3) 60%,
    transparent 100%
  );
  filter: blur(4px);
}

/* Garden container */
.garden {
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 960px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0;
  z-index: 6;
}

/* ─── Individual Flower ─── */
.flower {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: bottom center;
  animation: sway var(--sway-duration, 3s) ease-in-out infinite alternate;
  animation-delay: var(--sway-delay, 0s);
  opacity: 0;
  animation-name: growIn, sway;
  animation-duration: 1.2s, var(--sway-duration, 3s);
  animation-delay: var(--grow-delay, 0s), calc(var(--grow-delay, 0s) + 1.2s);
  animation-timing-function: cubic-bezier(.22,1,.36,1), ease-in-out;
  animation-fill-mode: forwards, none;
  animation-iteration-count: 1, infinite;
}

@keyframes growIn {
  from { opacity: 0; transform: scaleY(0) translateY(30px); }
  to   { opacity: 1; transform: scaleY(1) translateY(0); }
}

@keyframes sway {
  from { transform: rotate(var(--lean, -2deg)); }
  to   { transform: rotate(calc(var(--lean, -2deg) + 6deg)); }
}

/* Stem */
.stem {
  width: var(--stem-width, 4px);
  height: var(--stem-height, 120px);
  background: linear-gradient(180deg, #5ecc88, var(--stem-green) 60%, #2d7a4f);
  border-radius: 4px 4px 2px 2px;
  position: relative;
}

/* Leaf */
.leaf {
  position: absolute;
  width: var(--leaf-size, 22px);
  height: calc(var(--leaf-size, 22px) * 0.55);
  background: linear-gradient(135deg, #5ecc88, #2d8a50);
  border-radius: 0 80% 0 80%;
  top: var(--leaf-top, 55%);
  transform-origin: left center;
  animation: leafSway 2.5s ease-in-out infinite alternate;
}

.leaf.left  { left: -140%; transform: scaleX(-1) rotate(-15deg); }
.leaf.right { right: -140%; transform: rotate(-15deg); }

@keyframes leafSway {
  from { transform: rotate(-15deg) scaleX(var(--lx, 1)); }
  to   { transform: rotate(5deg) scaleX(var(--lx, 1)); }
}
.leaf.left { --lx: -1; }

/* Bloom head */
.bloom {
  position: relative;
  width: var(--bloom-size, 54px);
  height: var(--bloom-size, 54px);
  margin-bottom: -4px;
}

/* Petals */
.petal {
  position: absolute;
  width: 40%;
  height: 52%;
  border-radius: 50% 50% 30% 30%;
  top: 50%; left: 50%;
  transform-origin: bottom center;
  background: var(--petal-color, #ff79c6);
  filter: drop-shadow(0 0 4px var(--petal-glow, rgba(255,121,198,0.5)));
  animation: petalBloom 1s ease forwards, petalFloat 3s ease-in-out infinite alternate;
  animation-delay: var(--petal-delay, 0s), calc(var(--petal-delay, 0s) + 1s);
  opacity: 0;
}

@keyframes petalBloom {
  from { opacity: 0; transform: translate(-50%, -100%) rotate(var(--rot)) scaleY(0); }
  to   { opacity: 0.92; transform: translate(-50%, -100%) rotate(var(--rot)) scaleY(1); }
}

@keyframes petalFloat {
  from { transform: translate(-50%, -100%) rotate(var(--rot)) scaleY(1); }
  to   { transform: translate(-50%, -100%) rotate(var(--rot)) scaleY(1.06) translateY(-2px); }
}

/* Center */
.center {
  position: absolute;
  width: 32%;
  height: 32%;
  border-radius: 50%;
  background: var(--center-color, #f8d56b);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 3px var(--center-glow, rgba(248,213,107,0.6));
  z-index: 2;
  animation: centerPulse 2s ease-in-out infinite alternate;
}

@keyframes centerPulse {
  from { box-shadow: 0 0 8px 2px var(--center-glow, rgba(248,213,107,0.5)); }
  to   { box-shadow: 0 0 16px 6px var(--center-glow, rgba(248,213,107,0.8)); }
}

/* Firefly / falling petal particles drawn on canvas */
