// ==UserScript==
// @name               🚀YouTube Ad Skipper, SponsorBlock & HD Downloader- EasyTube V2
// @name:vi            EasyTube — Bỏ qua quảng cáo, SponsorBlock & Tải video HD
// @name:zh-CN         EasyTube — YouTube 广告跳过、SponsorBlock 和 HD 下载器
// @name:zh-TW         EasyTube — YouTube 廣告跳過、SponsorBlock 和 HD 下載器
// @name:ru            EasyTube — Пропуск рекламы, SponsorBlock и HD загрузчик
// @name:ja            EasyTube — 広告スキップ・SponsorBlock・HDダウンローダー
// @name:ko            EasyTube — 광고 건너뛰기, SponsorBlock, HD 다운로더
// @name:es            EasyTube — Saltar anuncios, SponsorBlock y descarga HD
// @name:pt-BR         EasyTube — Pular anúncios, SponsorBlock e download HD
// @name:fr            EasyTube — Ignorer pubs, SponsorBlock et téléchargeur HD
// @name:de            EasyTube — Werbung überspringen, SponsorBlock, HD-Download
// @name:tr            EasyTube — Reklam Atlama, SponsorBlock ve HD İndirici
// @name:pl            EasyTube — Pomijanie reklam, SponsorBlock, pobieranie HD
// @name:id            EasyTube — Lewati Iklan, SponsorBlock & Unduhan HD
// @name:th            EasyTube — ข้ามโฆษณา, SponsorBlock และดาวน์โหลด HD
// @name:ar            EasyTube — تخطي الإعلانات، SponsorBlock وتنزيل HD

// @description        🚫 Auto-skip ALL YouTube ads (skippable, unskippable, banner, overlay). ⏭ Skip sponsor/promo segments via SponsorBlock API (9 categories). 🎥 Force auto-highest quality (4K/1440p/1080p). ⬇ Download videos in HD/4K. Bypass adblock detection popup. Works with Tampermonkey & Violentmonkey. All-in-one YouTube enhancement toolkit — no bloat, no tracking.
// @description:vi     🚫 Tự động bỏ qua TẤT CẢ quảng cáo YouTube (có thể skip, không thể skip, banner, overlay). ⏭ Bỏ qua đoạn sponsor/promo qua SponsorBlock API (9 danh mục). 🎥 Tự động chất lượng cao nhất (4K/1440p/1080p). ⬇ Tải video HD/4K. Bypass popup chặn adblock. Bộ công cụ YouTube all-in-one — không rác, không theo dõi.
// @description:zh-CN  🚫 自动跳过所有 YouTube 广告（可跳过、不可跳过、横幅、叠加层）。⏭ 通过 SponsorBlock API 跳过赞助/推广片段（9种类别）。🎥 自动最高画质（4K/1440p/1080p）。⬇ 下载 HD/4K 视频。绕过广告拦截检测弹窗。
// @description:ru     🚫 Автоматически пропускает ВСЕ виды рекламы YouTube. ⏭ Пропускает спонсорские сегменты через SponsorBlock (9 категорий). 🎥 Форсирует максимальное качество (4K/1440p). ⬇ Скачивает HD/4K видео. Обходит блокировку adblock.
// @description:ja     🚫 全種類のYouTube広告を自動スキップ。⏭ SponsorBlock APIでスポンサー・プロモ部分をスキップ（9カテゴリ）。🎥 最高画質自動設定（4K/1440p）。⬇ HD/4K動画ダウンロード。adblock検出回避。
// @description:ko     🚫 모든 YouTube 광고 자동 건너뛰기. ⏭ SponsorBlock API로 스폰서/홍보 구간 건너뛰기. 🎥 최고 화질 자동 설정. ⬇ HD/4K 다운로드. 광고 차단 감지 우회.
// @description:es     🚫 Salta automáticamente todos los anuncios de YouTube. ⏭ Omite segmentos patrocinados con SponsorBlock. 🎥 Fuerza la máxima calidad. ⬇ Descarga HD/4K. Evita la detección de adblock.
// @description:fr     🚫 Ignore automatiquement toutes les publicités YouTube. ⏭ Saute les segments sponsorisés via SponsorBlock. 🎥 Force la qualité maximale. ⬇ Télécharge en HD/4K. Contourne la détection adblock.
// @description:de     🚫 Überspringt alle YouTube-Werbung automatisch. ⏭ Sponsor-Segmente via SponsorBlock. 🎥 Maximale Qualität erzwingen. ⬇ HD/4K Download. Adblock-Erkennung umgehen.
// @description:zh-TW  🚫 自動跳過所有 YouTube 廣告（可跳過、不可跳過、橫幅、疊加層）。⏭ 透過 SponsorBlock API 跳過贊助/推廣片段（9種類別）。🎥 自動最高畫質（4K/1440p/1080p）。⬇ 下載 HD/4K 影片。繞過廣告攔截偵測彈窗。
// @description:pt-BR  🚫 Pula automaticamente todos os anúncios do YouTube (puláveis, não puláveis, banners, sobreposições). ⏭ Ignora segmentos de patrocinadores via SponsorBlock API (9 categorias). 🎥 Força a qualidade máxima automática (4K/1440p/1080p). ⬇ Baixa vídeos HD/4K. Ignora o popup de detecção de adblock.
// @description:tr     🚫 Tüm YouTube reklamlarını otomatik atlar (atlanabilir, atlanamaz, banner, katman). ⏭ SponsorBlock API ile sponsor/tanıtım bölümlerini atlar (9 kategori). 🎥 En yüksek kaliteyi otomatik zorlar (4K/1440p/1080p). ⬇ HD/4K video indirir. Adblock algılama açılır penceresini kapatır.
// @description:pl     🚫 Automatycznie pomija wszystkie reklamy YouTube (pomijalne, niepomijalne, banery, nakładki). ⏭ Pomija segmenty sponsorów przez SponsorBlock API (9 kategorii). 🎥 Automatycznie wymusza najwyższą jakość (4K/1440p/1080p). ⬇ Pobiera filmy HD/4K. Zamyka popup wykrywania adblockera.
// @description:id     🚫 Lewati semua iklan YouTube secara otomatis (yang bisa dilewati, tidak bisa dilewati, banner, overlay). ⏭ Lewati segmen sponsor via SponsorBlock API (9 kategori). 🎥 Paksa kualitas tertinggi otomatis (4K/1440p/1080p). ⬇ Unduh video HD/4K. Tutup popup deteksi adblock.
// @description:ar     🚫 تخطي جميع إعلانات يوتيوب تلقائياً (قابلة للتخطي، غير قابلة، بانر، تراكب). ⏭ تخطي مقاطع الرعاية عبر SponsorBlock API (9 فئات). 🎥 فرض أعلى جودة تلقائياً (4K/1440p/1080p). ⬇ تنزيل فيديوهات HD/4K. إغلاق نافذة كشف أداة حجب الإعلانات.
// @description:th     🚫 ข้ามโฆษณา YouTube ทั้งหมดอัตโนมัติ (ข้ามได้, ข้ามไม่ได้, แบนเนอร์, โอเวอร์เลย์) ⏭ ข้ามส่วนสปอนเซอร์ผ่าน SponsorBlock API (9 หมวดหมู่) 🎥 บังคับคุณภาพสูงสุดอัตโนมัติ (4K/1440p/1080p) ⬇ ดาวน์โหลดวิดีโอ HD/4K ปิดป๊อปอัปตรวจจับ adblock

// @namespace          https://greasyfork.org/users/1510019
// @version            2.0.0
// @author             2pixel
// @license            MIT
// @homepageURL        https://greasyfork.org/en/scripts/561432-youtube-video-4k-hd-downloader-no-ads-easytube-v1
// @supportURL         https://greasyfork.org/en/scripts/561432-youtube-video-4k-hd-downloader-no-ads-easytube-v1/feedback
// @icon               https://raw.githubusercontent.com/not2pixel/TampermonkeyProjects/refs/heads/main/EasyTube.png
// @icon64             https://raw.githubusercontent.com/not2pixel/TampermonkeyProjects/refs/heads/main/EasyTube.png

// @match              https://*.youtube.com/*
// @exclude            https://www.youtube.com/live_chat*
// @exclude            https://studio.youtube.com/*

// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @connect            sponsor.ajay.app

// @run-at             document-end
// @compatible         chrome   Tested on Chrome 120+ with Tampermonkey
// @compatible         firefox  Tested on Firefox 120+ with Tampermonkey / Violentmonkey
// @compatible         edge     Tested on Edge 120+ with Tampermonkey
// @compatible         opera    Supported via Tampermonkey / Violentmonkey
// @downloadURL https://update.greasyfork.org/scripts/561432/%F0%9F%9A%80YouTube%20Ad%20Skipper%2C%20SponsorBlock%20%20HD%20Downloader-%20EasyTube%20V2.user.js
// @updateURL https://update.greasyfork.org/scripts/561432/%F0%9F%9A%80YouTube%20Ad%20Skipper%2C%20SponsorBlock%20%20HD%20Downloader-%20EasyTube%20V2.meta.js
// ==/UserScript==

'use strict';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CFG = {
    panelId:    'et_panel',
    toggleId:   'et_toggle',
    downloadUrl:'//evdfrance.fr//convert/?id=',
    supportUrl: 'https://twisk.fun/discord',
    // Privacy endpoint: hash prefix hides exact videoID from server
    sbApi:      'https://sponsor.ajay.app/api/skipSegments',
    // Full category list per API docs (sponsor.ajay.app/w/Types)
    sbCats:     [
        'sponsor',        // Paid promotion
        'selfpromo',      // Self-promotion (unpaid)
        'interaction',    // Sub/like/follow reminders
        'intro',          // Intro animation/title card
        'outro',          // Endcard/credits
        'preview',        // Preview/recap of upcoming content
        'music_offtopic', // Non-music section in music videos
        'filler',         // Filler tangent/jokes (optional but common)
        'exclusive_access',// Behind-the-scenes/exclusive content
    ],
    // actionTypes to handle (skip = seek over, mute = mute only)
    sbActionTypes: ['skip', 'mute'],
};

// ─── STATE ───────────────────────────────────────────────────────────────────
const S = {
    adEnabled:      false,  // default OFF
    sbEnabled:      false,  // default OFF
    qualityEnabled: false,  // default OFF
    adCount:        0,
    sbCount:        0,
    adMuted:        false,
    sbSegments:     [],     // { start, end, cat, actionType }
    sbVideoId:      null,
    sbMutedSeg:     null,   // track currently muted segment
    qualityVideoId: null,
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. AD SKIP  (tientq64/Auto-Skip-YouTube-Ads method — MIT, 57k installs)
// ═══════════════════════════════════════════════════════════════════════════
const AD_CSS = `
    ytd-action-companion-ad-renderer,ytd-display-ad-renderer,
    ytd-video-masthead-ad-v3-renderer,ytd-overlay-ad-renderer,
    ytd-promoted-sparkles-web-renderer,ytd-promoted-video-renderer,
    ytd-search-pyv-renderer,ytd-ad-slot-renderer,yt-about-this-ad-renderer,
    .ytd-banner-promo-renderer,#masthead-ad,ytd-mealbar-promo-renderer,
    tp-yt-paper-dialog:has(ytd-mealbar-promo-renderer),
    ytd-in-feed-ad-layout-renderer,ytd-statement-banner-renderer,
    #player-ads,.ytd-ad-slot-renderer { display:none !important; }
    .ytp-ad-text-overlay,.ytp-ad-timed-pie-countdown-container
    { visibility:hidden !important; opacity:0 !important; }
`;

function skipAd() {
    if (!S.adEnabled) return;
    const video = document.querySelector('video');

    // 1. Skippable ad — click + seek to end
    const skipBtn = document.querySelector(
        '.ytp-skip-ad-button,.ytp-ad-skip-button,.ytp-ad-skip-button-modern'
    );
    if (skipBtn) {
        if (video && isFinite(video.duration) && video.duration > 0)
            video.currentTime = video.duration;
        skipBtn.click();
        S.adCount++;
        uiSync();
        if (video && !S.adMuted) video.muted = false;
        S.adMuted = false;
        return;
    }

    // 2. Unskippable ad — mute only, no seek
    const adBadge = document.querySelector(
        '.ytp-ad-preview-container,.ytp-ad-preview-text,.ytp-ad-simple-ad-badge'
    );
    if (video && adBadge) {
        if (typeof S.adMuted !== 'boolean') S.adMuted = video.muted;
        video.muted = true;
        return;
    }

    // 3. Post-ad restore
    if (video && typeof S.adMuted === 'boolean') {
        if (!S.adMuted) video.muted = false;
        S.adMuted = false;
    }

    // 4. Close overlay ad banners
    document.querySelectorAll(
        '.ytp-ad-overlay-close-button,.ytp-ad-overlay-slot-close-button'
    ).forEach(b => b?.click());

    // 5. Dismiss adblock enforcement popup
    //    (TheRealJoelmatic/RemoveAdblockThing — MIT)
    const modal = document.querySelector('ytd-enforcement-message-view-model');
    if (modal) {
        const btn = modal.querySelector('yt-button-shape button, button');
        btn ? btn.click() : modal.closest('tp-yt-paper-dialog')?.remove();
    }
}

function removeAdElements() {
    if (!S.adEnabled) return;
    const dialog = document.querySelector('tp-yt-paper-dialog');
    if (dialog?.querySelector('ytd-mealbar-promo-renderer')) dialog.remove();
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SPONSORBLOCK  (ajayyy/SponsorBlock API — CC BY-NC-SA 4.0)
//    Full categories + actionType mute support + privacy hash endpoint
// ═══════════════════════════════════════════════════════════════════════════

// Simple SHA-256 prefix for privacy (first 4 chars of hash = recommended by API docs)
async function sha256Prefix(str) {
    try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0, 4);
    } catch { return null; }
}

function fetchSB(videoId) {
    if (!S.sbEnabled || !videoId || videoId === S.sbVideoId) return;
    S.sbVideoId  = videoId;
    S.sbSegments = [];

    const cats   = CFG.sbCats.map(c => `&category=${c}`).join('');
    const types  = CFG.sbActionTypes.map(t => `&actionType=${t}`).join('');

    // Try privacy hash endpoint first, fallback to direct videoID
    sha256Prefix(videoId).then(prefix => {
        const url = prefix
            ? `https://sponsor.ajay.app/api/skipSegments/${prefix}?${cats.slice(1)}${types}`
            : `${CFG.sbApi}?videoID=${videoId}${cats}${types}`;

        GM_xmlhttpRequest({
            method: 'GET',
            url,
            onload(r) {
                try {
                    const data = JSON.parse(r.responseText);
                    // Privacy endpoint returns array of {videoID, segments:[]}
                    // Direct endpoint returns array of segment objects
                    let segs = [];
                    if (Array.isArray(data) && data[0]?.segments) {
                        // Privacy endpoint — find matching videoID
                        const match = data.find(d => d.videoID === videoId);
                        segs = match?.segments || [];
                    } else if (Array.isArray(data) && data[0]?.segment) {
                        // Direct endpoint
                        segs = data;
                    }
                    S.sbSegments = segs.map(s => ({
                        start:      s.segment[0],
                        end:        s.segment[1],
                        cat:        s.category,
                        actionType: s.actionType || 'skip',
                        uuid:       s.UUID,
                    }));
                } catch { S.sbSegments = []; }
            },
            onerror() {
                // Fallback to direct endpoint if privacy hash fails
                if (!url.includes('videoID')) {
                    const fallbackUrl = `${CFG.sbApi}?videoID=${videoId}${cats}${types}`;
                    GM_xmlhttpRequest({
                        method: 'GET', url: fallbackUrl,
                        onload(r2) {
                            try {
                                S.sbSegments = JSON.parse(r2.responseText).map(s => ({
                                    start: s.segment[0], end: s.segment[1],
                                    cat: s.category, actionType: s.actionType || 'skip', uuid: s.UUID,
                                }));
                            } catch { S.sbSegments = []; }
                        },
                        onerror() { S.sbSegments = []; },
                    });
                }
            },
        });
    });
}

function checkSB() {
    if (!S.sbEnabled || !S.sbSegments.length) return;
    const video = document.querySelector('video');
    if (!video) return;
    const t = video.currentTime;

    for (const seg of S.sbSegments) {
        const inSeg = t >= seg.start && t < seg.end - 0.1;

        if (seg.actionType === 'mute') {
            // Mute segment: mute while inside, unmute when leaving
            if (inSeg) {
                if (!S.sbMutedSeg || S.sbMutedSeg !== seg.uuid) {
                    S.sbMutedSeg = seg.uuid;
                    if (!video.muted) {
                        video.muted = true;
                        S.sbCount++;
                        uiSync();
                        toast(`🔇 SponsorBlock muted: [${seg.cat}]`, '#7b1fa2');
                    }
                }
                return;
            } else if (S.sbMutedSeg === seg.uuid) {
                // Left the muted segment
                video.muted = false;
                S.sbMutedSeg = null;
            }
        } else {
            // Skip (seek over) segment — only when video is playing
            if (inSeg && !video.paused) {
                video.currentTime = seg.end;
                S.sbCount++;
                uiSync();
                toast(`⏭ SponsorBlock: [${seg.cat}]`, '#1a73e8');
                break;
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. AUTO QUALITY
// ═══════════════════════════════════════════════════════════════════════════
function setQuality() {
    if (!S.qualityEnabled) return;
    try {
        const player = document.getElementById('movie_player');
        if (!player?.getAvailableQualityLevels) return;
        const levels = player.getAvailableQualityLevels();
        if (!levels?.length) return;
        const best = levels[0];
        if (player.getPlaybackQuality() !== best) {
            player.setPlaybackQualityRange(best, best);
            player.setPlaybackQuality(best);
            const label = { hd2160:'4K 2160p', hd1440:'1440p', hd1080:'1080p HD',
                            hd720:'720p HD', large:'480p', medium:'360p' }[best] || best;
            toast(`✨ Quality: ${label}`, '#e53935');
        }
    } catch {}
}

function onNavigate() {
    const vid = getVideoId();
    if (vid && vid !== S.qualityVideoId) {
        S.qualityVideoId = vid;
        setTimeout(setQuality, 1500);
        setTimeout(setQuality, 3500);
    }
    if (vid && vid !== S.sbVideoId) fetchSB(vid);
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. PANEL UI
// ═══════════════════════════════════════════════════════════════════════════
function getVideoId(url = location.href) {
    return (url.match(/[?&]v=([^&#]{11})/) ||
            url.match(/shorts\/([^?&#]{11})/) ||
            url.match(/youtu\.be\/([^?&#]{11})/))?.[1] || null;
}

function getTitle() {
    const sels = [
        'ytd-watch-metadata h1 yt-formatted-string',
        'h1.ytd-watch-metadata yt-formatted-string',
        '#title h1 yt-formatted-string',
        'h2 span.yt-core-attributed-string[role="text"]',
    ];
    for (const s of sels) {
        const t = document.querySelector(s)?.textContent?.trim();
        if (t && t.length > 1) return t;
    }
    return document.title?.replace(/\s*-\s*YouTube\s*$/i, '').trim() || 'EasyTube';
}

function toast(msg, color = '#333') {
    document.getElementById('et_toast')?.remove();
    const el = document.createElement('div');
    el.id = 'et_toast';
    el.textContent = msg;
    Object.assign(el.style, {
        position:'fixed', bottom:'80px', left:'50%',
        transform:'translateX(-50%)',
        background: color, color:'#fff',
        padding:'7px 18px', borderRadius:'999px',
        fontSize:'13px', fontWeight:'700',
        zIndex:'999999', pointerEvents:'none',
        animation:'et_fade 2.8s forwards',
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2900);
}

function uiSync() {
    document.getElementById('et_ad_n')?.replaceChildren(document.createTextNode(S.adCount));
    document.getElementById('et_sb_n')?.replaceChildren(document.createTextNode(S.sbCount));
    syncToggle('et_sw_ad',  S.adEnabled);
    syncToggle('et_sw_sb',  S.sbEnabled);
    syncToggle('et_sw_q',   S.qualityEnabled);
    const vid = getVideoId();
    const dlBtn = document.getElementById('et_dl_btn');
    if (dlBtn) dlBtn.style.opacity = vid ? '1' : '0.45';
    const titleEl = document.getElementById('et_title');
    if (titleEl) titleEl.textContent = getTitle();
    const idEl = document.getElementById('et_vid_id');
    if (idEl) idEl.textContent = vid || 'N/A';
}

function syncToggle(id, state) {
    const sw = document.getElementById(id);
    if (!sw) return;
    sw.classList.toggle('on', !!state);
    sw.setAttribute('aria-pressed', state ? 'true' : 'false');
    const st = document.getElementById(id + '_st');
    if (st) st.textContent = state ? 'ON' : 'OFF';
}

// ── SVG helper ─────────────────────────────────────────────────────────────
function ytSvg(cls) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    if (cls) svg.setAttribute('class', cls);
    const p1 = document.createElementNS(NS,'path');
    p1.setAttribute('d','M23.5 6.3a3.1 3.1 0 0 0-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.6A3.1 3.1 0 0 0 .5 6.3 32.7 32.7 0 0 0 0 12a32.7 32.7 0 0 0 .5 5.7 3.1 3.1 0 0 0 2.2 2.2c1.9.6 9.3.6 9.3.6s7.4 0 9.3-.6a3.1 3.1 0 0 0 2.2-2.2A32.7 32.7 0 0 0 24 12a32.7 32.7 0 0 0-.5-5.7Z');
    p1.setAttribute('fill','#FF0000');
    const p2 = document.createElementNS(NS,'path');
    p2.setAttribute('d','M9.75 15.5V8.5L16 12l-6.25 3.5Z');
    p2.setAttribute('fill','#FFFFFF');
    svg.appendChild(p1); svg.appendChild(p2);
    return svg;
}

function makeSwitch(id) {
    const btn = document.createElement('button');
    btn.className = 'et-sw'; btn.id = id; btn.type = 'button';
    btn.setAttribute('aria-pressed','false');
    const thumb = document.createElement('span');
    thumb.className = 'et-thumb';
    btn.appendChild(thumb);
    return btn;
}

// ── Build panel DOM ─────────────────────────────────────────────────────────
function buildPanel() {
    // Toggle button
    const tog = document.createElement('div');
    tog.id = CFG.toggleId;
    const togIcon = document.createElement('div');
    togIcon.className = 'et-tog-icon';
    togIcon.appendChild(ytSvg());
    tog.appendChild(togIcon);
    document.body.appendChild(tog);

    // Panel
    const panel = document.createElement('div');
    panel.id = CFG.panelId;

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'et-hdr';
    const hdrL = document.createElement('div');
    hdrL.className = 'et-hdr-l';
    const logoBox = document.createElement('div');
    logoBox.className = 'et-logo';
    logoBox.textContent = '▶';
    const hdrText = document.createElement('div');
    const hdrTitle = document.createElement('div');
    hdrTitle.className = 'et-hdr-title';
    hdrTitle.textContent = 'EasyTube V2';
    const hdrSub = document.createElement('div');
    hdrSub.className = 'et-hdr-sub';
    hdrSub.textContent = 'Ad Skip · SponsorBlock · 4K · Download';
    hdrText.appendChild(hdrTitle); hdrText.appendChild(hdrSub);
    hdrL.appendChild(logoBox); hdrL.appendChild(hdrText);
    const dragDot = document.createElement('div');
    dragDot.className = 'et-drag-dot';
    dragDot.textContent = '⋮';
    hdr.appendChild(hdrL); hdr.appendChild(dragDot);

    // Stats bar
    const stats = document.createElement('div');
    stats.className = 'et-stats';
    const adPill = document.createElement('div');
    adPill.className = 'et-pill';
    adPill.textContent = '🚫 Ads: ';
    const adN = document.createElement('span');
    adN.id = 'et_ad_n'; adN.textContent = '0';
    adPill.appendChild(adN);
    const sbPill = document.createElement('div');
    sbPill.className = 'et-pill';
    sbPill.textContent = '⏭ Sponsors: ';
    const sbN = document.createElement('span');
    sbN.id = 'et_sb_n'; sbN.textContent = '0';
    sbPill.appendChild(sbN);
    stats.appendChild(adPill); stats.appendChild(sbPill);

    // Content
    const body = document.createElement('div');
    body.className = 'et-body';

    // Video card
    const card = document.createElement('div');
    card.className = 'et-card';
    const cardRow = document.createElement('div');
    cardRow.className = 'et-card-row';
    const cardLabel = document.createElement('span');
    cardLabel.className = 'et-label';
    cardLabel.textContent = 'NOW PLAYING';
    const readyBadge = document.createElement('span');
    readyBadge.className = 'et-badge';
    readyBadge.textContent = '● Ready';
    cardRow.appendChild(cardLabel); cardRow.appendChild(readyBadge);
    const cardTitle = document.createElement('div');
    cardTitle.className = 'et-card-title';
    cardTitle.id = 'et_title';
    cardTitle.textContent = 'Open a video to get started';
    const cardId = document.createElement('div');
    cardId.className = 'et-card-id';
    const idLabel = document.createElement('span');
    idLabel.className = 'et-label';
    idLabel.textContent = 'ID: ';
    const idVal = document.createElement('code');
    idVal.id = 'et_vid_id'; idVal.textContent = 'N/A';
    cardId.appendChild(idLabel); cardId.appendChild(idVal);
    card.appendChild(cardRow); card.appendChild(cardTitle); card.appendChild(cardId);

    // Download button
    const dlBtn = document.createElement('a');
    dlBtn.id = 'et_dl_btn';
    dlBtn.href = '#';
    dlBtn.className = 'et-btn et-btn-red';
    const dlIcon = document.createElement('span');
    dlIcon.textContent = '⬇';
    const dlTxt = document.createElement('span');
    dlTxt.textContent = 'Download Video (HD/4K)';
    dlBtn.appendChild(dlIcon); dlBtn.appendChild(dlTxt);

    // Toggles grid
    const grid = document.createElement('div');
    grid.className = 'et-grid';

    const makeCard = (emoji, title, swId) => {
        const c = document.createElement('div');
        c.className = 'et-toggle-card';
        const top = document.createElement('div');
        top.className = 'et-tc-top';
        const ico = document.createElement('span');
        ico.className = 'et-tc-ico';
        ico.textContent = emoji;
        const sw = makeSwitch(swId);
        top.appendChild(ico); top.appendChild(sw);
        const bot = document.createElement('div');
        bot.className = 'et-tc-bot';
        const ttl = document.createElement('span');
        ttl.className = 'et-tc-title';
        ttl.textContent = title;
        const st = document.createElement('span');
        st.className = 'et-tc-st';
        st.id = swId + '_st';
        st.textContent = 'OFF';
        bot.appendChild(ttl); bot.appendChild(st);
        c.appendChild(top); c.appendChild(bot);
        return c;
    };

    grid.appendChild(makeCard('🚫', 'Ad Skip',     'et_sw_ad'));
    grid.appendChild(makeCard('⏭', 'SponsorBlock', 'et_sw_sb'));
    grid.appendChild(makeCard('✨', 'Auto 4K',      'et_sw_q'));

    // Community button
    const comBtn = document.createElement('a');
    comBtn.href = CFG.supportUrl;
    comBtn.target = '_blank';
    comBtn.rel = 'noopener noreferrer';
    comBtn.className = 'et-btn et-btn-blue';
    const comIcon = document.createElement('span');
    comIcon.textContent = '💬';
    const comTxt = document.createElement('span');
    comTxt.textContent = 'Join Community / Report Bug';
    comBtn.appendChild(comIcon); comBtn.appendChild(comTxt);

    body.appendChild(card);
    body.appendChild(dlBtn);
    body.appendChild(grid);
    body.appendChild(comBtn);

    // Footer
    const foot = document.createElement('div');
    foot.className = 'et-foot';
    const footTxt = document.createElement('div');
    footTxt.className = 'et-foot-txt';
    footTxt.textContent = '© EasyTube V2 by 2pixel • Ad-Free & Fast';
    foot.appendChild(footTxt);

    panel.appendChild(hdr);
    panel.appendChild(stats);
    panel.appendChild(body);
    panel.appendChild(foot);
    document.body.appendChild(panel);

    return { panel, tog };
}

// ── Drag ───────────────────────────────────────────────────────────────────
function initDrag(panel) {
    let ox = 0, oy = 0, ix = 0, iy = 0, dragging = false, pid = null, pw, ph;
    const hdr = panel.querySelector('.et-hdr');

    // default position
    const setPos = (x, y) => { panel.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const vw = window.innerWidth, vh = window.innerHeight;
    let cx = vw - 380, cy = vh - 600;
    cx = Math.max(8, cx); cy = Math.max(8, cy);
    ox = cx; oy = cy; setPos(cx, cy);

    hdr.addEventListener('pointerdown', e => {
        if (!e.target.closest('.et-hdr')) return;
        e.preventDefault();
        dragging = true; pid = e.pointerId;
        panel.classList.add('et-dragging');
        const r = panel.getBoundingClientRect();
        pw = r.width; ph = r.height;
        ix = e.clientX - ox; iy = e.clientY - oy;
        try { hdr.setPointerCapture(pid); } catch {}
        window.addEventListener('pointermove', onMove, { passive:false });
        window.addEventListener('pointerup',   onUp,   { passive:true });
        window.addEventListener('pointercancel', onUp, { passive:true });
    }, { passive:false });

    let raf = false;
    const onMove = e => {
        if (!dragging || e.pointerId !== pid) return;
        e.preventDefault();
        const nx = e.clientX - ix, ny = e.clientY - iy;
        if (raf) return; raf = true;
        requestAnimationFrame(() => {
            const maxX = window.innerWidth  - pw - 8;
            const maxY = window.innerHeight - ph - 8;
            cx = Math.max(8, Math.min(maxX, nx));
            cy = Math.max(8, Math.min(maxY, ny));
            ox = cx; oy = cy; setPos(cx, cy); raf = false;
        });
    };
    const onUp = e => {
        if (e.pointerId !== pid) return;
        dragging = false;
        panel.classList.remove('et-dragging');
        try { hdr.releasePointerCapture(pid); } catch {}
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup',   onUp);
        window.removeEventListener('pointercancel', onUp);
    };
}

// ── Events ─────────────────────────────────────────────────────────────────
function bindEvents(panel, tog) {
    let visible = false;
    tog.addEventListener('click', () => {
        visible = !visible;
        panel.classList.toggle('et-show', visible);
        tog.classList.toggle('et-active', visible);
    });

    document.getElementById('et_dl_btn').addEventListener('click', e => {
        e.preventDefault();
        const vid = getVideoId();
        if (vid) window.open(CFG.downloadUrl + vid, '_blank');
    });

    document.getElementById('et_sw_ad').addEventListener('click', e => {
        e.preventDefault();
        S.adEnabled = !S.adEnabled;
        uiSync();
    });
    document.getElementById('et_sw_sb').addEventListener('click', e => {
        e.preventDefault();
        S.sbEnabled = !S.sbEnabled;
        if (S.sbEnabled) { S.sbVideoId = null; fetchSB(getVideoId()); }
        uiSync();
    });
    document.getElementById('et_sw_q').addEventListener('click', e => {
        e.preventDefault();
        S.qualityEnabled = !S.qualityEnabled;
        if (S.qualityEnabled) setQuality();
        uiSync();
    });
}

// ── CSS ─────────────────────────────────────────────────────────────────────
GM_addStyle(`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
@keyframes et_fade {
    0%   { opacity:1; transform:translateX(-50%) translateY(0); }
    70%  { opacity:1; }
    100% { opacity:0; transform:translateX(-50%) translateY(-8px); }
}
#et_panel, #et_panel * { box-sizing:border-box; font-family:'Nunito',system-ui,sans-serif; }

/* Toggle button */
#${CFG.toggleId} {
    position:fixed; bottom:90px; right:18px;
    width:58px; height:38px; border-radius:999px;
    background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.25);
    box-shadow:0 8px 24px rgba(0,0,0,0.22); z-index:99998; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    transition:transform .18s, box-shadow .18s, background .18s;
}
#${CFG.toggleId}:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,0.3); }
#${CFG.toggleId}:active { transform:scale(0.97); }
.et-tog-icon svg { width:20px; height:20px; display:block; transition:transform .3s; }
#${CFG.toggleId}.et-active .et-tog-icon svg { transform:rotate(180deg); }

/* Panel */
#${CFG.panelId} {
    position:fixed; top:0; left:0; right:auto; bottom:auto;
    width:355px; max-width:93vw;
    max-height:min(560px, calc(100vh - 160px));
    display:flex; flex-direction:column;
    background:rgba(255,255,255,0.14);
    backdrop-filter:blur(32px) saturate(180%);
    -webkit-backdrop-filter:blur(32px) saturate(180%);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:26px;
    box-shadow:0 16px 48px rgba(0,0,0,0.28);
    z-index:99999; overflow:hidden;
    opacity:0; pointer-events:none;
    transform:translateY(20px) scale(0.97);
    transition:opacity .35s ease, transform .4s cubic-bezier(.25,.46,.45,.94);
}
#${CFG.panelId}.et-show { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
#${CFG.panelId}.et-dragging { transition:none !important; }

/* Header */
.et-hdr {
    background:linear-gradient(135deg,#ff0000,#b80000);
    padding:13px 15px; cursor:move; user-select:none;
    display:flex; align-items:center; justify-content:space-between;
    flex:0 0 auto; border-radius:26px 26px 0 0;
}
.et-hdr-l { display:flex; align-items:center; gap:10px; }
.et-logo {
    width:50px; height:34px; background:rgba(255,255,255,0.18);
    border-radius:10px; display:flex; align-items:center; justify-content:center;
    font-size:22px; color:#fff; font-weight:900;
}
.et-hdr-title { color:#fff; font-size:16px; font-weight:800; line-height:1.2; }
.et-hdr-sub { color:rgba(255,255,255,0.8); font-size:10.5px; font-weight:600; letter-spacing:.2px; }
.et-drag-dot { color:rgba(255,255,255,0.85); font-size:22px; cursor:move; }

/* Stats */
.et-stats {
    display:flex; gap:6px; padding:8px 14px;
    background:rgba(0,0,0,0.07); border-bottom:1px solid rgba(255,255,255,0.08);
    flex:0 0 auto;
}
.et-pill {
    flex:1; background:rgba(255,255,255,0.22); border:1px solid rgba(255,255,255,0.18);
    border-radius:999px; padding:5px 10px; font-size:11px; font-weight:800;
    color:#0f0f0f; display:flex; align-items:center; justify-content:center; gap:3px;
}
.et-pill span { font-size:13px; font-weight:900; }

/* Body */
.et-body {
    padding:12px 14px 14px; overflow-y:auto; flex:1 1 auto;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.3) transparent;
    display:flex; flex-direction:column; gap:10px;
}
.et-body::-webkit-scrollbar { width:8px; }
.et-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.25); border-radius:999px; }

/* Video card */
.et-card {
    background:rgba(255,255,255,0.24); border:1px solid rgba(255,255,255,0.2);
    border-radius:20px; padding:12px;
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
}
.et-card-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:7px; }
.et-label { font-size:10px; font-weight:800; color:#606060; text-transform:uppercase; letter-spacing:.7px; }
.et-badge { font-size:10.5px; font-weight:700; color:#00a152; background:rgba(232,245,233,.9); padding:3px 9px; border-radius:999px; }
.et-card-title { font-size:14px; font-weight:700; color:#0f0f0f; line-height:1.4; margin-bottom:7px; word-break:break-word; }
.et-card-id { display:flex; align-items:center; gap:6px; }
.et-card-id code { font-size:11px; background:rgba(255,255,255,0.65); padding:3px 10px; border-radius:999px; font-weight:600; }

/* Buttons */
.et-btn {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:13px 16px; border:none; border-radius:20px;
    font-size:14px; font-weight:800; cursor:pointer; color:#fff;
    text-decoration:none; position:relative; overflow:hidden; letter-spacing:.2px;
    transition:transform .2s, box-shadow .2s;
}
.et-btn:hover { transform:translateY(-2px); }
.et-btn:active { transform:translateY(0) scale(.98); }
.et-btn::after {
    content:''; position:absolute; inset:0;
    background:rgba(255,255,255,0.15); opacity:0; transition:opacity .2s;
}
.et-btn:hover::after { opacity:1; }
.et-btn-red { background:linear-gradient(135deg,#ff0000,#cc0000); box-shadow:0 4px 14px rgba(255,0,0,.28); }
.et-btn-blue { background:linear-gradient(135deg,#065fd4,#0448a3); box-shadow:0 4px 14px rgba(6,95,212,.28); }
.et-btn span:first-child { font-size:18px; }

/* Toggle grid — 3 cards in 1 row */
.et-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.et-toggle-card {
    background:rgba(255,255,255,0.22); border:1px solid rgba(255,255,255,0.18);
    border-radius:17px; padding:11px 10px;
    display:flex; flex-direction:column; gap:8px;
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
    transition:transform .18s, box-shadow .18s;
}
.et-toggle-card:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(0,0,0,.1); }
.et-tc-top { display:flex; align-items:center; justify-content:space-between; }
.et-tc-ico { font-size:20px; line-height:1; }
.et-tc-bot { display:flex; align-items:center; justify-content:space-between; gap:4px; }
.et-tc-title { font-size:11.5px; font-weight:800; color:#0f0f0f; line-height:1.2; }
.et-tc-st { font-size:10px; font-weight:800; color:rgba(15,15,15,.45); letter-spacing:.4px; }

/* Mac switch */
.et-sw {
    width:42px; height:26px; border-radius:999px; border:none;
    background:rgba(120,120,128,.28); position:relative; cursor:pointer;
    flex:0 0 auto; transition:background .18s;
    box-shadow:inset 0 0 0 1px rgba(0,0,0,.06);
}
.et-sw.on { background:rgba(52,199,89,.95); }
.et-thumb {
    position:absolute; top:2px; left:2px; width:22px; height:22px;
    border-radius:999px; background:#fff; box-shadow:0 4px 10px rgba(0,0,0,.18);
    transition:transform .18s;
}
.et-sw.on .et-thumb { transform:translateX(16px); }

/* Footer */
.et-foot {
    padding:9px 14px; background:rgba(255,255,255,0.12);
    border-top:1px solid rgba(255,255,255,0.1);
    border-radius:0 0 26px 26px; flex:0 0 auto; text-align:center;
}
.et-foot-txt { font-size:10.5px; color:#606060; font-weight:600; }
`);

// ── Ad CSS (inject early) ───────────────────────────────────────────────────
const adStyleEl = document.createElement('style');
adStyleEl.textContent = AD_CSS;
document.documentElement.appendChild(adStyleEl);

// ── Toast animation ─────────────────────────────────────────────────────────
const toastStyle = document.createElement('style');
toastStyle.textContent = `@keyframes et_fade{0%{opacity:1;transform:translateX(-50%) translateY(0)}70%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-8px)}}`;
document.documentElement.appendChild(toastStyle);

// ─── BOOT ─────────────────────────────────────────────────────────────────────
function boot() {
    const { panel, tog } = buildPanel();
    initDrag(panel);
    bindEvents(panel, tog);

    // Initial sync
    uiSync();
    syncToggle('et_sw_ad', S.adEnabled);
    syncToggle('et_sw_sb', S.sbEnabled);
    syncToggle('et_sw_q',  S.qualityEnabled);

    // Intervals
    setInterval(skipAd,         500);   // ad skip
    setInterval(removeAdElements,1000); // remove ad DOM
    setInterval(checkSB,        500);   // sponsorblock
    setInterval(uiSync,         2000);  // UI refresh

    // Navigation listener (SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            setTimeout(onNavigate, 600);
        }
    }).observe(document.body, { childList:true, subtree:true });
    window.addEventListener('yt-navigate-finish', () => setTimeout(onNavigate, 600));

    // First load
    onNavigate();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}