/* ======================================================================
       KONFIGURASI ISI WEBSITE — edit bagian ini sesuai kebutuhanmu
       ====================================================================== */
const CONFIG = {
    loaderLabel: "hari bahagia mu",
    heroEyebrow: "untukmu",
    heroTitleMain: "happy",
    heroTitleEmphasis: "birthday",
    heroSub: "ada beberapa hal yang ingin aku sampaikan, geser pelan-pelan ya.",

    // Setiap objek di sini akan jadi satu "kertas sobek" berisi pesan.
    // style: "lined" (kertas garis) atau "gingham" (ada kain kotak-kotak di atas)
    memories: [
        {
            date: "01",
            text: "Selamat ulang tahun, Kaka 🤍🎂 Hari ini adalah hari spesialnya Kaka. Semoga Kaka selalu diberikan kesehatan, kebahagiaan, dan dimudahkan dalam setiap langkahnya.",
            style: "lined",
            tilt: "-2deg"
        },
        {
            date: "02",
            text: "Dede bersyukur bisa mengenal Kaka. Terima kasih sudah menjadi seseorang yang berarti buat Dede. Semoga semua harapan dan impian Kaka bisa tercapai.",
            style: "gingham",
            tilt: "2.5deg"
        },
        {
            date: "03",
            text: "Selamat ulang tahun, Kaka. Semoga hari ini dan hari-hari berikutnya selalu dipenuhi kebahagiaan. 🤍✨ -dari Dede, yang selalu mendoakan Kaka.",
            style: "lined",
            tilt: "-1.5deg"
        }
    ],

    // Placeholder foto — ganti isi array ini dengan URL foto asli kamu nanti
    // contoh: { src: "foto1.jpg", caption: "waktu itu..." }
    photos: [
        { src: "img/foto1.jpg", caption: "taruh foto pertama di sini" },
        { src: "img/foto2.jpg", caption: "taruh foto kedua di sini" },
        { src: "img/foto4.jpg", caption: "taruh foto ketiga di sini" }
    ],

    galleryEyebrow: "sekeping waktu",
    galleryTitle: "galeri kenangan",

    playlistTitle: "I lay my love on you",
    playlistLinkText: "putar sekarang",
    playlistUrl: "#",

    signoffText: "sampai jumpa di kenangan berikutnya.",
    fromText: "— dari aku, untukmu",

    // Pesan tambahan sebelum kartu playlist di bagian penutup — kosongkan ("")
    // kalau tidak mau pakai catatan tambahan ini.
    closingMessage: "Ini lagu yang selalu ngingetin aku sama kamu. Dengerin sambil inget semua yang udah kita lewati ya.",
    // Foto untuk kartu playlist penutup — isi path foto kamu, biarkan null kalau belum ada.
    closingCoverImage: null,

    // Widget musik melayang — ganti musicSrc dengan path file audio kamu (mp3),
    // biarkan null kalau belum ada filenya (widget tetap jalan secara visual).
    musicTitle: "I Lay My Love On You",
    musicSrc: "audio/soundTrack.mp3",
    // Gambar/foto untuk widget musik — pakai path file gambar kamu, contoh: "foto-kita.jpg"
    // Biarkan null kalau belum ada, nanti fallback ke ikon polos.
    musicCoverImage: "img/iconmusik..jpg"
};

/* ======================================================================
   RENDER CONTENT FROM CONFIG
   ====================================================================== */
document.getElementById('loaderLabel').textContent = CONFIG.loaderLabel;
document.getElementById('heroEyebrow').textContent = CONFIG.heroEyebrow;
document.getElementById('heroTitle').innerHTML = `${CONFIG.heroTitleMain} <em>${CONFIG.heroTitleEmphasis}</em>`;
document.getElementById('heroSub').textContent = CONFIG.heroSub;
document.getElementById('playlistTitle').textContent = CONFIG.playlistTitle;
document.getElementById('playlistLink').textContent = CONFIG.playlistLinkText;
document.getElementById('playlistLink').href = CONFIG.playlistUrl;
document.getElementById('signoffText').textContent = CONFIG.signoffText;
document.getElementById('fromText').textContent = CONFIG.fromText;

if (CONFIG.closingMessage && CONFIG.closingMessage.trim()) {
    const note = document.createElement('div');
    note.className = 'torn-note memory-card closing-note reveal lined';
    note.style.setProperty('--tilt', '-1.2deg');
    note.innerHTML = `<p>${CONFIG.closingMessage}</p>`;
    document.getElementById('closingMessage').appendChild(note);
}

if (CONFIG.closingCoverImage) {
    const win = document.getElementById('cassetteWindow');
    win.style.backgroundImage = `url('${CONFIG.closingCoverImage}')`;
    win.classList.add('has-image');
    win.textContent = '';
}

document.getElementById('musicWidgetTitle').textContent = CONFIG.musicTitle;
if (CONFIG.musicCoverImage) {
    document.getElementById('musicThumb').style.backgroundImage = `url('${CONFIG.musicCoverImage}')`;
    document.getElementById('musicThumb').classList.add('has-image');
    document.getElementById('discLabel').style.backgroundImage = `url('${CONFIG.musicCoverImage}')`;
    document.getElementById('discLabel').classList.add('has-image');
}

const memoriesEl = document.getElementById('memories');
CONFIG.memories.forEach((m) => {
    const wrap = document.createElement('div');
    wrap.className = 'memory';
    const isGingham = m.style === 'gingham';
    wrap.innerHTML = `
    <div class="torn-note memory-card reveal ${isGingham ? 'gingham' : 'lined'}" style="--tilt:${m.tilt || '0deg'}">
      ${isGingham ? '<div class="gingham-strip"></div>' : '<div class="pin" style="top:-12px;left:20px;"></div>'}
      <span class="date">#${m.date}</span>
      <p>${m.text}</p>
    </div>
  `;
    memoriesEl.appendChild(wrap);
});

const gridEl = document.getElementById('polaroidGrid');
CONFIG.photos.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'polaroid reveal';
    card.innerHTML = `
    <div class="polaroid-photo">${p.src ? `<img src="${p.src}" alt="" style="width:100%;height:100%;object-fit:cover;">` : '♡'}</div>
    <div class="polaroid-caption">${p.caption}</div>
  `;
    gridEl.appendChild(card);
});

/* ======================================================================
   LOADER SEQUENCE
   ====================================================================== */
const fill = document.getElementById('loaderFill');
const percentEl = document.getElementById('loaderPercent');
const loader = document.getElementById('loader');
let pct = 0;
const loadInterval = setInterval(() => {
    pct += Math.random() * 18 + 6;
    if (pct >= 100) {
        pct = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => {
                musicWidget.classList.add('show');
                scheduleCollapse(4800);
                togglePlay();
            }, 700);
        }, 350);
    }
    fill.style.width = pct + '%';
    percentEl.textContent = Math.floor(pct) + '%';
}, 220);

/* ======================================================================
   SCROLL REVEAL
   ====================================================================== */
const revealEls = document.querySelectorAll('.reveal');
function activateReveal(el){
    el.style.setProperty('--sway-dur', (4.6 + Math.random() * 2.4).toFixed(2) + 's');
    el.style.setProperty('--sway-delay', (Math.random() * 1.6).toFixed(2) + 's');
    el.classList.add('in');
}
function deactivateReveal(el){
    el.classList.remove('in');
}
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateReveal(entry.target);
        } else {
            deactivateReveal(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

/* ======================================================================
   AMBIENT FLOATING PARTICLES (subtle drifting hearts/petals in the bg)
   ====================================================================== */
const ambientLayer = document.getElementById('ambientLayer');
const ambientSymbols = ['♥', '✦', '❀'];
const AMBIENT_COUNT = 9;
for (let i = 0; i < AMBIENT_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'ambient-heart';
    el.textContent = ambientSymbols[i % ambientSymbols.length];
    const size = 10 + Math.random() * 12;
    const duration = 16 + Math.random() * 14;
    const delay = -Math.random() * duration; // negative delay = starts mid-cycle, staggers immediately
    el.style.left = (4 + Math.random() * 92) + '%';
    el.style.fontSize = size + 'px';
    el.style.setProperty('--drift-x', (Math.random() * 60 - 30) + 'px');
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    ambientLayer.appendChild(el);
}

/* ======================================================================
   FLOATING MUSIC WIDGET — morphs into a spinning vinyl disc
   ====================================================================== */
const musicWidget = document.getElementById('musicWidget');
let audio = null;
if (CONFIG.musicSrc) {
    audio = new Audio(CONFIG.musicSrc);
    audio.loop = true;
    audio.preload = 'auto';
}
let visualPlaying = false; // only used when there's no audio file — lets the disc still spin visually
let collapseTimer = null;
let pendingResume = null; // holds the single pending "resume on next tap" listener, if any
let playPromisePending = false; // true while audio.play() hasn't resolved/rejected yet

function scheduleCollapse(delay = 4200) {
    clearTimeout(collapseTimer);
    collapseTimer = setTimeout(() => {
        musicWidget.classList.add('collapsed');
    }, delay);
}

function expandWidget() {
    musicWidget.classList.remove('collapsed');
    scheduleCollapse();
}

function clearPendingResume() {
    if (pendingResume) {
        document.removeEventListener('click', pendingResume);
        document.removeEventListener('touchstart', pendingResume);
        pendingResume = null;
    }
}

function isCurrentlyPlaying() {
    return audio ? !audio.paused : visualPlaying;
}

function syncPlayingClass() {
    musicWidget.classList.toggle('playing', isCurrentlyPlaying());
}

function startPlayback() {
    if (!audio) {
        visualPlaying = true;
        syncPlayingClass();
        return;
    }
    if (!audio.paused) return; // already playing — never call play() again on top of itself
    playPromisePending = true;
    audio.play().then(() => {
        playPromisePending = false;
        clearPendingResume();
        syncPlayingClass();
    }).catch((err) => {
        playPromisePending = false;
        syncPlayingClass(); // browser blocked it — UI reflects the real (paused) state
        // AbortError = play() ini sengaja diinterupsi oleh pause() kita sendiri
        // (misalnya user tap pause dengan cepat). Itu BUKAN autoplay yang diblokir,
        // jadi jangan pasang listener resume — kalau tidak, musik akan nyala lagi
        // sendiri di tap berikutnya walau user baru saja memilih pause.
        if (err && err.name === 'AbortError') return;
        if (pendingResume) return; // a resume listener is already waiting, don't stack another
        pendingResume = () => {
            clearPendingResume();
            startPlayback();
        };
        document.addEventListener('click', pendingResume, { once: true });
        document.addEventListener('touchstart', pendingResume, { once: true });
    });
}

function stopPlayback() {
    clearPendingResume();
    if (audio) {
        if (playPromisePending) {
            // play() masih diproses browser — tunda pause() sampai selesai,
            // supaya tidak memicu AbortError dan status play/pause tetap konsisten
            audio.play().finally(() => audio.pause());
        } else {
            audio.pause();
        }
    } else {
        visualPlaying = false;
    }
    syncPlayingClass();
}

function togglePlay() {
    expandWidget();
    if (isCurrentlyPlaying()) {
        stopPlayback();
    } else {
        startPlayback();
    }
}

if (audio) {
    audio.addEventListener('play', syncPlayingClass);
    audio.addEventListener('pause', syncPlayingClass);
}

musicWidget.addEventListener('click', (e) => {
    e.stopPropagation();
    if (musicWidget.classList.contains('collapsed')) {
        // first tap while collapsed just re-opens the label; second tap toggles play
        if (!musicWidget.dataset.justOpened) {
            expandWidget();
            musicWidget.dataset.justOpened = '1';
            setTimeout(() => { delete musicWidget.dataset.justOpened; }, 600);
            return;
        }
    }
    togglePlay();
});

// let the "putar sekarang" link in the closing card control the same player
const playlistLinkEl = document.getElementById('playlistLink');
playlistLinkEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isCurrentlyPlaying()) togglePlay();
    musicWidget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

/* ======================================================================
   TAP HEART BURST
   ====================================================================== */
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.textContent = '♥';
    heart.style.left = (e.clientX - 9) + 'px';
    heart.style.top = (e.clientY - 9) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
});
