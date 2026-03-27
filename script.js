/* Screens */
const screens = ["screen1","screen2","screen3","screen4","screen5"]
  .map(id => document.getElementById(id));

function showScreen(i){
  screens.forEach((s,idx)=>s.classList.toggle("active",idx===i));
}
/* 🎵 Music */
const music = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volumeSlider");

let musicStarted = false;

// Set the starting volume immediately
music.volume = volumeSlider.value / 100;

// Start music on first interaction (required for mobile)
function startMusic(){
  if (musicStarted) return;
  music.play().catch(()=>{});
  musicStarted = true;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value / 100;
  if (!musicStarted) startMusic();
});

document.addEventListener("pointerdown", startMusic, { once: true });

/* Buttons */
document.getElementById("toMiniBtn").onclick = () => {
  startMusic();
  showScreen(1);
};
document.getElementById("toMiniBtn2").onclick = () => showScreen(1);
document.getElementById("toQuestionBtn").onclick = () => showScreen(3);
/* YES button — send email 💌 */
document.getElementById("yesBtn").onclick = () => {

  const templateParams = {
    time: new Date().toLocaleString(),
    page: window.location.href,
    device: navigator.userAgent,
    language: navigator.language,
    screen: `${window.innerWidth}x${window.innerHeight}`
  };

  emailjs.send(
    "service_rnhqdk9",   // <-- paste service ID
    "YOUR_TEMPLATE_ID",  // <-- paste template ID
    templateParams
  )
  .then(() => {
    console.log("YES email sent 💗");
  })
  .catch((error) => {
    console.error("Email failed:", error);
  });

  // Continue to final screen
  showScreen(4);
};

/* Mini game */
let feeds = 0;
const max = 5;
const meter = document.getElementById("meterFill");
const hint = document.getElementById("hintText");
const feedBtn = document.getElementById("feedBtn");
const treat = document.getElementById("treat");

feedBtn.onclick = () => {
  feeds++;
  meter.style.width = (feeds / max * 100) + "%";
  treat.classList.remove("drop");
  void treat.offsetWidth;
  treat.classList.add("drop");
  if (feeds >= max) showScreen(2);
};

/* Shy No */
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("click", () => {
  const card = document.querySelector(".card");
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate a new safe position inside the card
  const maxX = cardRect.width - btnRect.width - 24;
  const maxY = cardRect.height - btnRect.height - 24;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // Convert to transform offsets
  const offsetX = x - (btnRect.left - cardRect.left);
  const offsetY = y - (btnRect.top - cardRect.top);

  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

/* Replay */
document.getElementById("replayBtn").onclick = () => location.reload();

/* Copy */
document.getElementById("copyBtn").onclick = async () => {
  const msg = "Open this 🩷🍓 " + location.href;
  try {
    await navigator.clipboard.writeText(msg);
    alert("Copied!");
  } catch {
    prompt("Copy this:", msg);
  }
};

/* 🌧️ Rain */
const rainWrap = document.getElementById("emojiRain");
const rainEmojis = ["🍓","🩷","🐸","🍄","🍰","✨"];
const rainImages = [
  "mooshroom.png",
  "/strawberry-shortcake.png",
  "—Pngtree—cute capybara hand drawn_21114346.PNG"
];

function spawnRain(){
  const el = document.createElement("div");
  el.className = "rainItem";
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = (6 + Math.random() * 6) + "s";

  if (Math.random() < 0.35){
    const img = document.createElement("img");
    img.src = rainImages[Math.floor(Math.random() * rainImages.length)];
    img.style.width = (28 + Math.random() * 50) + "px";
    el.appendChild(img);
  } else {
    el.textContent = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
    el.style.fontSize = (14 + Math.random() * 18) + "px";
  }

  rainWrap.appendChild(el);
  setTimeout(() => el.remove(), 14000);
}

setInterval(spawnRain, 240);
