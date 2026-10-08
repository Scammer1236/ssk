/* ====== EDIT HERE: all your words and file names live in this block ====== */
const CONFIG = {
  her: "Shreyu",
  me: "Ganman",
  heroSub: "My heroine, on stage and off it.",
  began: "It started at natak practice: rehearsals, forgotten lines and a lot of laughing. Somewhere between the scripts and the stage, you became one of my favourite people.",
  scenes: "So many hero and heroine roles together that I stopped counting. In every story, you were the one the audience remembered.",

  // Original file names. The two .heic files must be converted to .jpg (same name).
  photos: [
    { src: "media/IMG_20210803_145933_457.jpg", cap: "Lights, camera, Shreyu" },
    { src: "media/Screenshot_20220324-101002_Snapchat.jpg", cap: "My favourite heroine" },
    { src: "media/Screenshot_20230206-142830_Chrome.jpg", cap: "Every scene was better with you" },
    { src: "media/Screenshot_20230209-025951_WhatsApp.jpg", cap: "That smile stole the whole show" },
    { src: "media/Screenshot_20230508-165956_WhatsApp.jpg", cap: "Grace, even without a script" },
    { src: "media/-6136224586614812148_120.jpg", cap: "Rehearsal faces, my favourite faces" },
    { src: "media/-6325571376659934375_120.jpg", cap: "Still the best co-star" },
    { src: "media/-6332123100161879826_120.jpg", cap: "Never needed a second take" },
    { src: "media/-6339345164979514671_120.jpg", cap: "Main character, always" },
    { src: "media/20260920_195951.jpg", cap: "Look who's turning 19" },
    { src: "media/20260920_203923.jpg", cap: "Hero and heroine, forever" }
  ],

  chats: [
    { src: "media/Screenshot_20210803-192320_Telegram.jpg", cap: "Even on a screen, you light up the frame" },
    { src: "media/Screenshot_20260919_004917_WhatsApp.jpg", cap: "My favourite kind of call" },
    { src: "media/Screenshot_20261009_002630_Instagram.jpg", cap: "A gallery of you" },
    { src: "media/Screenshot_20261009_002636_Instagram.jpg", cap: "Your best takes" },
    { src: "media/Screenshot_20261009_002648_Instagram.jpg", cap: "Behind the scenes" }
  ],

  videos: [
    { src: "media/5_6055618387998934155.mp4", cap: "Roll the camera" },
    { src: "media/20260920_175449.mp4", cap: "A scene I'd replay forever" },
    { src: "media/20260922_151411.mp4", cap: "No retakes needed" }
  ],

  letter: [
    "Shreyu,",
    "We met at natak practice, and somehow I got lucky enough to play hero to your heroine again and again.",
    "Scripts change, roles change, and a lot has changed between us. But the friendship we built backstage is the best thing we ever rehearsed.",
    "You are talented, kind, and you make any room feel like a stage with the lights just right.",
    "So today, take the spotlight. You've earned every bit of it.",
    "Happy 19th birthday, my heroine."
  ],
  finalLine: "Happy birthday, Shreyu.",
  ovation: "A standing ovation for you."
};
/* ======================================================================= */

const $ = s => document.querySelector(s);
const song = $("#song"), musicBtn = $("#music");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- build page content ---------- */
$("#herName").innerHTML = [...CONFIG.her].map((c, i) => `<span style="--i:${i}">${c}</span>`).join("");
$("#introName").textContent = CONFIG.her;
$("#heroSub").textContent = CONFIG.heroSub;
$("#beganText").textContent = CONFIG.began;
$("#scenesText").textContent = CONFIG.scenes;
$("#finalLine").textContent = CONFIG.finalLine;
$("#sign").textContent = "Yours, " + CONFIG.me;
$("#letter").innerHTML = CONFIG.letter.map(() => "<p></p>").join("");

$("#polaroids").innerHTML = CONFIG.photos.map(p =>
  `<figure class="polaroid"><img src="${p.src}" loading="lazy" alt="" onerror="this.closest('.polaroid').remove()"><p>${p.cap}</p></figure>`).join("");
$("#chats").innerHTML = CONFIG.chats.map(c =>
  `<figure class="chat"><img src="${c.src}" loading="lazy" alt="" onerror="this.closest('.chat').remove()"><p>${c.cap}</p></figure>`).join("");
$("#videos").innerHTML = CONFIG.videos.map(v =>
  `<figure class="vid"><video src="${v.src}" controls playsinline preload="metadata" onerror="this.closest('.vid').remove()"></video><p>${v.cap}</p></figure>`).join("");

document.querySelectorAll(".vid video").forEach(v => {
  v.addEventListener("play", () => song.pause());
  v.addEventListener("pause", () => { if (!musicBtn.classList.contains("off")) song.play().catch(() => {}); });
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in"); io.unobserve(e.target);
}), { threshold: .45 });
document.querySelectorAll(".reveal,.polaroid,.chat").forEach(el => io.observe(el));

/* typewriter letter, starts when the letter scrolls into view */
let typed = false;
new IntersectionObserver((es, ob) => {
  if (!es[0].isIntersecting || typed) return;
  typed = true; ob.disconnect();
  const ps = [...document.querySelectorAll("#letter p")];
  (async () => {
    for (let i = 0; i < ps.length; i++) {
      ps[i].classList.add("caret");
      for (const ch of CONFIG.letter[i]) { ps[i].textContent += ch; await sleep(reduce ? 0 : 24); }
      ps[i].classList.remove("caret"); await sleep(reduce ? 0 : 350);
    }
    $("#sign").classList.add("in");
  })();
}, { threshold: .5 }).observe($("#letter"));
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* count 0 -> 19 on the finale */
let counted = false;
new IntersectionObserver((es, ob) => {
  if (!es[0].isIntersecting || counted) return;
  counted = true; ob.disconnect();
  let n = 0; const t = setInterval(() => { $("#big19").textContent = ++n; if (n >= 19) clearInterval(t); }, 110);
}, { threshold: .6 }).observe($("#big19"));

/* ---------- curtain opens: the big surprise ---------- */
$("#raise").addEventListener("click", () => {
  song.volume = .7; song.play().catch(() => {});
  $("#curtains").classList.add("open");
  musicBtn.hidden = false;
  if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
  setTimeout(() => sparkleBurst(), 900);
  setTimeout(() => { document.body.classList.remove("locked"); document.body.classList.add("go"); }, 700);
  setTimeout(() => $("#curtains").classList.add("done"), 3000);
});
musicBtn.addEventListener("click", () => {
  const off = musicBtn.classList.toggle("off"); off ? song.pause() : song.play();
});

/* ---------- tap anywhere on a photo: hearts pop ---------- */
document.addEventListener("click", e => {
  if (!e.target.closest(".polaroid,.chat")) return;
  for (let i = 0; i < 6; i++) {
    const h = document.createElement("span");
    h.className = "pop"; h.textContent = ["❤", "💖", "✨"][i % 3];
    h.style.left = e.clientX + "px"; h.style.top = e.clientY + "px";
    h.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    document.body.appendChild(h); setTimeout(() => h.remove(), 1300);
  }
});

/* ---------- background: drifting hearts and sparks ---------- */
const sky = $("#sky"), sc = sky.getContext("2d"), fx = $("#fx"), fc = fx.getContext("2d");
let W, H, dpr = devicePixelRatio || 1;
function size() { W = sky.width = fx.width = innerWidth * dpr; H = sky.height = fx.height = innerHeight * dpr; }
addEventListener("resize", size); size();

function heart(c, x, y, s) {
  c.beginPath(); c.moveTo(x, y + s * .3);
  c.bezierCurveTo(x, y - s * .3, x - s, y - s * .3, x - s, y + s * .3);
  c.bezierCurveTo(x - s, y + s, x, y + s * 1.2, x, y + s * 1.6);
  c.bezierCurveTo(x, y + s * 1.2, x + s, y + s, x + s, y + s * .3);
  c.bezierCurveTo(x + s, y - s * .3, x, y - s * .3, x, y + s * .3); c.fill();
}
const floaters = Array.from({ length: 26 }, () => ({
  x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 3 + 1.5) * dpr,
  vy: -(Math.random() * .5 + .2) * dpr, a: Math.random() * .45 + .15, heart: Math.random() < .4, ph: Math.random() * 6
}));

/* fireworks + confetti on the same loop */
let sparks = [], confetti = [];
function sparkleBurst() { for (let i = 0; i < 3; i++) setTimeout(() => firework(W * (.25 + .25 * i), H * (.3 + Math.random() * .1)), i * 280); }
function firework(x, y) {
  const hue = [340, 20, 45, 310][Math.floor(Math.random() * 4)];
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * 6.283, s = (Math.random() * 4 + 1.5) * dpr;
    sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 70 + Math.random() * 30, hue });
  }
}
function rain() {
  for (let i = 0; i < 140; i++) confetti.push({
    x: Math.random() * W, y: -Math.random() * H * .5, vy: (Math.random() * 2 + 1.5) * dpr, vx: (Math.random() - .5) * 1.5 * dpr,
    w: (Math.random() * 6 + 4) * dpr, rot: Math.random() * 6, vr: Math.random() * .2 - .1, hue: [340, 40, 15, 300, 50][i % 5]
  });
}
(function loop() {
  sc.clearRect(0, 0, W, H); fc.clearRect(0, 0, W, H);
  floaters.forEach(b => {
    b.y += b.vy; b.ph += .02; b.x += Math.sin(b.ph) * .3 * dpr; if (b.y < -30) { b.y = H + 20; b.x = Math.random() * W; }
    sc.fillStyle = `hsla(345,80%,78%,${b.a})`;
    b.heart ? heart(sc, b.x, b.y, b.r * 1.6) : (sc.beginPath(), sc.arc(b.x, b.y, b.r, 0, 7), sc.fill());
  });
  sparks = sparks.filter(p => p.life > 0);
  sparks.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .06 * dpr; p.vx *= .985; p.life--;
    fc.fillStyle = `hsla(${p.hue},95%,70%,${Math.min(1, p.life / 30)})`; fc.beginPath(); fc.arc(p.x, p.y, 2.2 * dpr, 0, 7); fc.fill(); });
  confetti = confetti.filter(p => p.y < H + 30);
  confetti.forEach(p => { p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    fc.save(); fc.translate(p.x, p.y); fc.rotate(p.rot); fc.fillStyle = `hsl(${p.hue},85%,65%)`; fc.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2); fc.restore(); });
  requestAnimationFrame(loop);
})();

/* ---------- finale: take a bow ---------- */
function balloons() {
  const cols = ["#e8566f", "#f4a3b5", "#e0b877", "#b03a5b", "#f7c6a3", "#c76b98"];
  for (let i = 0; i < 16; i++) setTimeout(() => {
    const b = document.createElement("div"); b.className = "balloon";
    b.style.cssText = `--x:${Math.random() * 88 + 2}vw;--c:${cols[i % cols.length]};--t:${6 + Math.random() * 4}s;--sw:${Math.random() * 60 - 30}px`;
    document.body.appendChild(b); setTimeout(() => b.remove(), 11000);
  }, i * 220);
}
$("#bow").addEventListener("click", e => {
  $("#finalLine").textContent = CONFIG.ovation;
  e.target.textContent = "Encore!";
  rain(); balloons();
  for (let i = 0; i < 7; i++) setTimeout(() => firework(W * (.15 + Math.random() * .7), H * (.15 + Math.random() * .4)), i * 420);
  if (navigator.vibrate) navigator.vibrate([60, 40, 60, 40, 120]);
});