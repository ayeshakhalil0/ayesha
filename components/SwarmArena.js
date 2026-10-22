"use client";

import { useEffect, useRef } from "react";

const N = 4;
const COLORS = ["#e6a8bc", "#9fbfae", "#d4af7c", "#f3ede4"];
const VMAX = 88;

// every way of giving each drone one of the targets (N = M = 4)
const PERMS = (function perms(a) {
  if (a.length <= 1) return [a];
  return a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));
})([0, 1, 2, 3]);

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = "rgba(243,237,228,0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 48) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
  for (let y = 0; y <= h; y += 48) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
  ctx.stroke();
}

// Top-down quadcopter in an X frame. Local +x is the nose.
function drawDrone(ctx, d, color, t, sc) {
  const L = 24;
  ctx.save();
  ctx.translate(d.x, d.y);
  ctx.scale(sc, sc);

  // soft ground shadow
  const sh = ctx.createRadialGradient(9, 15, 2, 9, 15, 34);
  sh.addColorStop(0, "rgba(0,0,0,0.38)");
  sh.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sh;
  ctx.beginPath();
  ctx.arc(9, 15, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(d.ang);

  const arms = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

  // arms
  ctx.lineCap = "round";
  arms.forEach((a) => {
    ctx.strokeStyle = "#323b41";
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * L, Math.sin(a) * L);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -1);
    ctx.lineTo(Math.cos(a) * L, Math.sin(a) * L - 1);
    ctx.stroke();
  });

  // motors, spinning props, status LEDs
  arms.forEach((a, i) => {
    const mx = Math.cos(a) * L;
    const my = Math.sin(a) * L;
    ctx.save();
    ctx.translate(mx, my);

    const disc = ctx.createRadialGradient(0, 0, 2, 0, 0, 14);
    disc.addColorStop(0, "rgba(243,237,228,0.10)");
    disc.addColorStop(1, "rgba(243,237,228,0.02)");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(243,237,228,0.16)";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.rotate(t * 38 * (i % 2 ? 1 : -1));
    ctx.strokeStyle = "rgba(243,237,228,0.55)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-13.5, 0);
    ctx.lineTo(13.5, 0);
    ctx.stroke();
    ctx.strokeStyle = "rgba(243,237,228,0.18)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 0.7);
    ctx.stroke();
    ctx.rotate(-t * 38 * (i % 2 ? 1 : -1));

    ctx.fillStyle = "#171d21";
    ctx.strokeStyle = "#76828a";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, 4.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // nose arms glow in the drone's colour, tail arms stay white
    ctx.fillStyle = Math.cos(a) > 0 ? color : "rgba(243,237,228,0.85)";
    ctx.beginPath();
    ctx.arc(mx * 0.62, my * 0.62, 1.7, 0, Math.PI * 2);
    ctx.fill();
  });

  // body
  const body = ctx.createLinearGradient(0, -7, 0, 7);
  body.addColorStop(0, "#3a444b");
  body.addColorStop(1, "#1a2024");
  ctx.fillStyle = body;
  ctx.strokeStyle = "#69757d";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-11, -7.5, 22, 15, 4);
  ctx.fill();
  ctx.stroke();

  // battery stripe + top plate
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.85;
  ctx.fillRect(-7, -1.2, 11, 2.4);
  ctx.globalAlpha = 1;

  // gimbal camera at the nose
  ctx.fillStyle = "#0a0e10";
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(9.5, 0, 3.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function makeSim(w, h) {
  const targets = [];
  const spawn = (avoid = targets) => {
    for (let k = 0; k < 40; k++) {
      const p = { x: rand(70, w - 70), y: rand(60, h - 60) };
      if (avoid.every((o) => Math.hypot(o.x - p.x, o.y - p.y) > 110)) return p;
    }
    return { x: rand(70, w - 70), y: rand(60, h - 60) };
  };
  for (let i = 0; i < N; i++) targets.push({ ...spawn(), born: 0 });
  const drones = Array.from({ length: N }, (_, i) => ({
    x: rand(60, w - 60),
    y: rand(50, h - 50),
    vx: 0,
    vy: 0,
    ang: rand(0, Math.PI * 2),
    alpha: 0.1,
    tgt: i,
    trail: [],
  }));
  return { w, h, sc: w < 640 ? 1 : 1.4, t: 0, nextAssign: 0, targets, drones, edges: [], spawn };
}

function step(s, dt) {
  const { drones, targets } = s;
  s.t += dt;

  // minimum-cost assignment (brute force over permutations), with a small switching penalty
  if (s.t >= s.nextAssign) {
    s.nextAssign = s.t + 0.4;
    let best = Infinity;
    let pick = null;
    for (const p of PERMS) {
      let c = 0;
      for (let i = 0; i < N; i++) {
        const d = drones[i];
        const tg = targets[p[i]];
        c += Math.hypot(tg.x - d.x, tg.y - d.y) + (d.tgt !== p[i] ? 40 : 0);
      }
      if (c < best) { best = c; pick = p; }
    }
    drones.forEach((d, i) => (d.tgt = pick[i]));
  }

  // conflict graph: pairs whose closest approach within 3 s drops below the threshold
  const tau = Array(N).fill(3);
  const count = Array(N).fill(0);
  s.edges = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = drones[i], b = drones[j];
      const px = b.x - a.x, py = b.y - a.y;
      const vx = b.vx - a.vx, vy = b.vy - a.vy;
      const v2 = vx * vx + vy * vy || 1e-6;
      const tc = clamp(-(px * vx + py * vy) / v2, 0, 3);
      const dmin = Math.hypot(px + vx * tc, py + vy * tc);
      if (dmin < 70 * s.sc && Math.hypot(px, py) < 240 * s.sc) {
        s.edges.push([i, j]);
        tau[i] = Math.min(tau[i], tc);
        tau[j] = Math.min(tau[j], tc);
        count[i]++;
        count[j]++;
      }
    }
  }

  drones.forEach((d, i) => {
    const tg = targets[d.tgt];
    const dx = tg.x - d.x, dy = tg.y - d.y;
    const dist = Math.hypot(dx, dy) || 1;
    let ax = (dx / dist) * Math.min(VMAX, dist * 2.2);
    let ay = (dy / dist) * Math.min(VMAX, dist * 2.2);

    // avoidance: push away from close neighbours, with a sideways nudge to break head-on deadlocks
    drones.forEach((o, j) => {
      if (j === i) return;
      const rx = d.x - o.x, ry = d.y - o.y;
      const r = Math.hypot(rx, ry) || 1;
      const R = 115 * s.sc;
      if (r < R) {
        const k = Math.pow((R - r) / R, 1.3) * 190 * (r < 56 * s.sc ? 2.2 : 1);
        ax += (rx / r) * k + (-ry / r) * k * 0.55;
        ay += (ry / r) * k + (rx / r) * k * 0.55;
      }
    });

    // keep inside the arena
    const m = 36;
    if (d.x < m) ax += (m - d.x) * 4;
    if (d.x > s.w - m) ax -= (d.x - (s.w - m)) * 4;
    if (d.y < m) ay += (m - d.y) * 4;
    if (d.y > s.h - m) ay -= (d.y - (s.h - m)) * 4;

    const sp = Math.hypot(ax, ay);
    if (sp > VMAX * 1.25) { ax = (ax / sp) * VMAX * 1.25; ay = (ay / sp) * VMAX * 1.25; }

    const k = Math.min(1, dt * 3);
    d.vx += (ax - d.vx) * k;
    d.vy += (ay - d.vy) * k;
    d.x += d.vx * dt;
    d.y += d.vy * dt;

    if (Math.hypot(d.vx, d.vy) > 8) {
      const want = Math.atan2(d.vy, d.vx);
      let diff = want - d.ang;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      d.ang += diff * Math.min(1, dt * 4);
    }

    // priority weight: leans towards avoidance as time-to-collision shrinks
    const a = count[i] ? clamp(1 - tau[i] / 3, 0.25, 0.96) : 0.06 + 0.12 * clamp(dist / 300, 0, 1);
    d.alpha += (a - d.alpha) * Math.min(1, dt * 4);

    d.trail.push([d.x, d.y]);
    if (d.trail.length > 46) d.trail.shift();

    if (dist < 14) {
      const others = targets.filter((_, k) => k !== d.tgt);
      Object.assign(tg, s.spawn(others), { born: s.t });
    }
  });
}

function render(ctx, s, font) {
  const { w, h, drones, targets, t } = s;
  ctx.clearRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  // trails
  drones.forEach((d, i) => {
    if (d.trail.length < 2) return;
    for (let k = 1; k < d.trail.length; k++) {
      ctx.strokeStyle = COLORS[i];
      ctx.globalAlpha = (k / d.trail.length) * 0.35;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(...d.trail[k - 1]);
      ctx.lineTo(...d.trail[k]);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;

  // assignment lines
  ctx.setLineDash([2, 6]);
  drones.forEach((d, i) => {
    const tg = targets[d.tgt];
    ctx.strokeStyle = COLORS[i];
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(tg.x, tg.y);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // targets
  targets.forEach((tg, k) => {
    const owner = drones.findIndex((d) => d.tgt === k);
    const col = owner >= 0 ? COLORS[owner] : "#e6a8bc";
    const age = t - tg.born;
    if (age < 1.2) {
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.6 * (1 - age / 1.2);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(tg.x, tg.y, 10 + age * 40, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(tg.x, tg.y, 11, 0, Math.PI * 2);
    ctx.moveTo(tg.x - 17, tg.y); ctx.lineTo(tg.x - 6, tg.y);
    ctx.moveTo(tg.x + 6, tg.y); ctx.lineTo(tg.x + 17, tg.y);
    ctx.moveTo(tg.x, tg.y - 17); ctx.lineTo(tg.x, tg.y - 6);
    ctx.moveTo(tg.x, tg.y + 6); ctx.lineTo(tg.x, tg.y + 17);
    ctx.stroke();
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(tg.x, tg.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.7;
    ctx.font = `10px ${font}`;
    ctx.fillText(`T${k + 1}`, tg.x + 14, tg.y - 12);
    ctx.globalAlpha = 1;
  });

  // conflict edges
  ctx.setLineDash([5, 5]);
  s.edges.forEach(([i, j]) => {
    ctx.strokeStyle = "#e6a8bc";
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(drones[i].x, drones[i].y);
    ctx.lineTo(drones[j].x, drones[j].y);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  drones.forEach((d, i) => drawDrone(ctx, d, COLORS[i], t, s.sc));

  // α readout
  drones.forEach((d, i) => {
    ctx.font = `11px ${font}`;
    ctx.fillStyle = COLORS[i];
    ctx.globalAlpha = 0.9;
    ctx.fillText(`α ${d.alpha.toFixed(2)}`, d.x + 30 * s.sc, d.y - 26 * s.sc);
    ctx.globalAlpha = 1;
  });
}

export default function SwarmArena() {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    const font = getComputedStyle(document.body).fontFamily;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sim = null;
    let visible = true;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!sim) {
        sim = makeSim(r.width, r.height);
        if (reduced) for (let i = 0; i < 200; i++) step(sim, 1 / 60);
      } else {
        const fx = r.width / sim.w, fy = r.height / sim.h;
        [...sim.drones, ...sim.targets].forEach((o) => { o.x *= fx; o.y *= fy; });
        sim.drones.forEach((d) => (d.trail = []));
        sim.w = r.width;
        sim.h = r.height;
        sim.sc = r.width < 640 ? 1 : 1.4;
      }
      render(ctx, sim, font);
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      step(sim, dt);
      render(ctx, sim, font);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      role="img"
      aria-label="Simulation of four quadcopter drones flying to assigned targets while avoiding each other"
      className="relative h-[340px] w-full md:h-[480px]"
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
