// ==UserScript==
// @name         YT Premium Client Side
// @namespace    https://github.com/yt-premium-client
// @version      1.2.4
// @description  Client-side YouTube Premium features: ad removal, sponsor skip, quality unlock, background play hint, and more
// @author       Mysticatten
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @icon         https://i.ibb.co/fdfnXr3C/image-2026-03-06-154548869.png
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// @grant        GM_addStyle
// @run-at       document-start
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/568620/YT%20Premium%20Client%20Side.user.js
// @updateURL https://update.greasyfork.org/scripts/568620/YT%20Premium%20Client%20Side.meta.js
// ==/UserScript==

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  //  CONFIG  (saved per-session via GM storage)
  // ─────────────────────────────────────────────
  const CFG = {
    blockAds:          GM_getValue('blockAds',          true),
    skipSponsors:      GM_getValue('skipSponsors',      true),
    autoMaxQuality:    GM_getValue('autoMaxQuality',    true),
    hideUpsells:       GM_getValue('hideUpsells',       true),
    persistVolume:     GM_getValue('persistVolume',     true),
    autoSkipEndscreen: GM_getValue('autoSkipEndscreen', false),
    autoTheaterMode:   GM_getValue('autoTheaterMode',   false),
  };

  // ─────────────────────────────────────────────
  //  AD BLOCKING
  // ─────────────────────────────────────────────
  if (CFG.blockAds) {
    // Intercept XHR / fetch to neutralise ad-serving calls
    const AD_URL_PATTERNS = [
      /doubleclick\.net/,
      /googlesyndication\.com/,
      /googleadservices\.com/,
      /\/pagead\//,
      /\/ads\//,
      /adformat/,
    ];

    // Patch fetch
    const _fetch = window.fetch;
    window.fetch = function (input, init) {
      const url = (typeof input === 'string') ? input : (input && input.url) || '';
      if (AD_URL_PATTERNS.some(p => p.test(url))) {
        return Promise.resolve(new Response('', { status: 200 }));
      }
      return _fetch.apply(this, arguments);
    };

    // Patch XHR
    const _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      if (AD_URL_PATTERNS.some(p => p.test(url))) {
        // Redirect to a harmless empty endpoint
        arguments[1] = 'about:blank';
      }
      return _open.apply(this, arguments);
    };

    // DOM-level: skip / remove injected ad elements
    function removeAdElements() {
      const adSelectors = [
        '.ad-showing',
        '.ad-interrupting',
        '#player-ads',
        '#masthead-ad',
        'ytd-banner-promo-renderer',
        'ytd-video-masthead-ad-v3-renderer',
        'ytd-in-feed-ad-layout-renderer',
        'ytd-ad-slot-renderer',
        'ytd-statement-banner-renderer',
        '.ytd-promoted-sparkles-web-renderer',
        '#offer-module',
        'tp-yt-paper-dialog.ytd-mealbar-promo-renderer',
      ];
      adSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });

      // Auto-skip skippable video ads
      const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
      if (skipBtn) skipBtn.click();

      // If an ad is playing, mute + fast-forward it
      const video = document.querySelector('video');
      if (video && document.querySelector('.ad-showing')) {
        video.muted = true;
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = video.duration;
        }
      }
    }

    // Run on every DOM mutation
    const adObserver = new MutationObserver(removeAdElements);
    document.addEventListener('DOMContentLoaded', () => {
      adObserver.observe(document.body, { childList: true, subtree: true });
      removeAdElements();
    });
    // Also run immediately in case DOMContentLoaded already fired
    if (document.readyState !== 'loading') {
      adObserver.observe(document.body, { childList: true, subtree: true });
      removeAdElements();
    }
  }

  // ─────────────────────────────────────────────
  //  HIDE PREMIUM UPSELL BANNERS / DIALOGS
  // ─────────────────────────────────────────────
  if (CFG.hideUpsells) {
    GM_addStyle(`
      /* Premium upsell overlays */
      ytd-mealbar-promo-renderer,
      ytd-banner-promo-renderer,
      #offer-module,
      .ytd-premium-yva-upsell-renderer,
      ytd-primetime-promo-renderer,
      .ytd-ypc-shelf-renderer,
      tp-yt-paper-dialog.ytd-mealbar-promo-renderer,
      #yt-masthead-premium,
      ytd-statement-banner-renderer { display: none !important; }

      /* "Try YouTube Premium" on homepage */
      ytd-rich-section-renderer:has(ytd-statement-banner-renderer) { display: none !important; }

      /* Sidebar recommendation upsell */
      #secondary ytd-compact-promoted-item-renderer { display: none !important; }

      /* "Sign up for Premium" button in menus */
      yt-upsell-dialog-renderer { display: none !important; }

      /* Hide "Members only" lock icons */
      .ytd-sponsorships-tier-renderer .yt-icon[aria-label*="lock"],
      .badge-style-type-members-only { opacity: 0.4; }
    `);
  }

  // ─────────────────────────────────────────────
  //  QUALITY: auto-select highest available
  // ─────────────────────────────────────────────
  if (CFG.autoMaxQuality) {
    function setMaxQuality() {
      try {
        const player = document.getElementById('movie_player');
        if (!player || typeof player.getAvailableQualityLevels !== 'function') return;

        const levels = player.getAvailableQualityLevels();
        if (!levels || levels.length === 0) return;

        const preferred = ['hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium'];
        const best = preferred.find(q => levels.includes(q)) || levels[0];

        if (player.getPlaybackQuality() !== best) {
          player.setPlaybackQualityRange(best, best);
          console.log('[YT-Premium] Quality set to', best);
        }
      } catch (e) { /* player not ready yet */ }
    }

    // Poll until player is ready, then watch navigation
    let qualityInterval = setInterval(() => {
      if (document.getElementById('movie_player')) {
        setMaxQuality();
        clearInterval(qualityInterval);
      }
    }, 500);

    // YouTube is an SPA — re-apply on navigation
    document.addEventListener('yt-navigate-finish', () => {
      setTimeout(setMaxQuality, 1500);
    });
  }

  // ─────────────────────────────────────────────
  //  PERSIST VOLUME across page navigations
  // ─────────────────────────────────────────────
  if (CFG.persistVolume) {
    let savedVolume = parseFloat(GM_getValue('ytVolume', 1));
    let savedMuted  = GM_getValue('ytMuted', false);

    function applyVolume() {
      const video = document.querySelector('video');
      const player = document.getElementById('movie_player');
      if (!video) return;
      video.volume = savedVolume;
      video.muted  = savedMuted;
      if (player && typeof player.setVolume === 'function') {
        player.setVolume(savedVolume * 100);
        if (savedMuted) player.mute(); else player.unMute();
      }
    }

    function saveVolume() {
      const video = document.querySelector('video');
      if (!video) return;
      savedVolume = video.volume;
      savedMuted  = video.muted;
      GM_setValue('ytVolume', savedVolume);
      GM_setValue('ytMuted',  savedMuted);
    }

    document.addEventListener('yt-navigate-finish', () => {
      setTimeout(() => {
        applyVolume();
        const video = document.querySelector('video');
        if (video) video.addEventListener('volumechange', saveVolume, { passive: true });
      }, 1000);
    });
  }

  // ─────────────────────────────────────────────
  //  AUTO THEATER MODE
  // ─────────────────────────────────────────────
  if (CFG.autoTheaterMode) {
    function enableTheater() {
      const player = document.getElementById('movie_player');
      if (player && typeof player.getPlayerSize === 'function') {
        const sizeBtn = document.querySelector('.ytp-size-button');
        // Only click if we're NOT already in theater
        if (sizeBtn && !document.querySelector('ytd-watch-flexy[theater]')) {
          sizeBtn.click();
        }
      }
    }
    document.addEventListener('yt-navigate-finish', () => setTimeout(enableTheater, 800));
  }

  // ─────────────────────────────────────────────
  //  AUTO SKIP ENDSCREEN / OUTRO (last 20 s)
  // ─────────────────────────────────────────────
  if (CFG.autoSkipEndscreen) {
    document.addEventListener('yt-navigate-finish', () => {
      setTimeout(() => {
        const video = document.querySelector('video');
        if (!video) return;
        video.addEventListener('timeupdate', function skipEnd() {
          if (video.duration && video.currentTime >= video.duration - 20) {
            const nextBtn = document.querySelector('.ytp-next-button');
            if (nextBtn) {
              nextBtn.click();
              video.removeEventListener('timeupdate', skipEnd);
            }
          }
        }, { passive: true });
      }, 1500);
    });
  }

  // ─────────────────────────────────────────────
  //  SPONSOR SKIP (self-hosted simple heuristic)
  //  For real SponsorBlock integration, see
  //  https://sponsor.ajay.app — this is a minimal
  //  local version using in-page chapter data.
  // ─────────────────────────────────────────────
  if (CFG.skipSponsors) {
    const SPONSOR_KEYWORDS = /sponsor|promo|promotion|ad|advertisement|merch|affiliate/i;

    function getChapters() {
      // YT exposes chapters via the player API on ytInitialData
      try {
        const chapters = [];
        const panels = document.querySelectorAll('ytd-macro-markers-list-item-renderer');
        panels.forEach(panel => {
          const label = panel.querySelector('#title')?.textContent?.trim() || '';
          const timeEl = panel.querySelector('#time')?.textContent?.trim() || '';
          const [m, s] = timeEl.split(':').map(Number);
          if (!isNaN(m) && !isNaN(s)) {
            chapters.push({ label, start: m * 60 + s });
          }
        });
        return chapters;
      } catch { return []; }
    }

    function watchForSponsors() {
      const video = document.querySelector('video');
      if (!video) return;

      const chapters = getChapters();
      if (chapters.length === 0) return;

      video.addEventListener('timeupdate', function () {
        const ct = video.currentTime;
        for (let i = 0; i < chapters.length; i++) {
          const ch = chapters[i];
          const next = chapters[i + 1];
          const end = next ? next.start : video.duration;
          if (ct >= ch.start && ct < end && SPONSOR_KEYWORDS.test(ch.label)) {
            console.log('[YT-Premium] Skipping sponsor chapter:', ch.label);
            video.currentTime = end;
            showSkipToast(ch.label);
            break;
          }
        }
      }, { passive: true });
    }

    function showSkipToast(label) {
      const existing = document.getElementById('ytp-skip-toast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'ytp-skip-toast';
      toast.textContent = `⏭ Skipped: ${label}`;
      Object.assign(toast.style, {
        position: 'fixed', bottom: '80px', right: '24px',
        background: 'rgba(0,0,0,0.82)', color: '#fff',
        padding: '8px 16px', borderRadius: '4px',
        fontFamily: 'Roboto, sans-serif', fontSize: '13px',
        zIndex: 99999, pointerEvents: 'none',
        animation: 'ytpFadeIn .2s ease',
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    GM_addStyle(`
      @keyframes ytpFadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }
    `);

    document.addEventListener('yt-navigate-finish', () => setTimeout(watchForSponsors, 2000));
  }

  // ─────────────────────────────────────────────
  //  SETTINGS PANEL  (press Alt+P to open)
  // ─────────────────────────────────────────────
  GM_addStyle(`
    #ytpc-panel {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
      background: #0f0f0f; color: #fff; border: 1px solid #333;
      border-radius: 12px; padding: 24px 28px; width: 340px;
      font-family: Roboto, sans-serif; font-size: 14px;
      z-index: 999999; box-shadow: 0 8px 40px rgba(0,0,0,.7);
      display: none;
    }
    #ytpc-panel.visible { display: block; }
    #ytpc-panel h2 {
      margin: 0 0 18px; font-size: 16px; font-weight: 600;
      display: flex; align-items: center; gap: 8px;
    }
    #ytpc-panel h2 span { color: #ff0000; }
    .ytpc-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 9px 0; border-bottom: 1px solid #222;
    }
    .ytpc-row:last-of-type { border-bottom: none; }
    .ytpc-label { line-height: 1.3; }
    .ytpc-label small { color: #aaa; font-size: 11px; display: block; }

    /* Toggle switch */
    .ytpc-toggle { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
    .ytpc-toggle input { opacity: 0; width: 0; height: 0; }
    .ytpc-slider {
      position: absolute; cursor: pointer; inset: 0;
      background: #333; border-radius: 22px; transition: .25s;
    }
    .ytpc-slider:before {
      content: ''; position: absolute;
      height: 16px; width: 16px; left: 3px; top: 3px;
      background: #fff; border-radius: 50%; transition: .25s;
    }
    .ytpc-toggle input:checked + .ytpc-slider { background: #ff0000; }
    .ytpc-toggle input:checked + .ytpc-slider:before { transform: translateX(18px); }

    #ytpc-close {
      margin-top: 18px; width: 100%; padding: 9px;
      background: #222; color: #fff; border: none;
      border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    #ytpc-close:hover { background: #333; }
    #ytpc-hint {
      position: fixed; bottom: 12px; right: 16px;
      background: rgba(0,0,0,.6); color: #aaa;
      font-family: Roboto, sans-serif; font-size: 11px;
      padding: 4px 10px; border-radius: 4px; z-index: 99990;
      pointer-events: none;
    }
  `);

  const FEATURES = [
    { key: 'blockAds',          label: 'Block Ads',            desc: 'Remove video & banner ads'          },
    { key: 'skipSponsors',      label: 'Skip Sponsor Chapters', desc: 'Auto-skip labelled sponsor segments' },
    { key: 'autoMaxQuality',    label: 'Max Quality',          desc: 'Always pick highest available'       },
    { key: 'hideUpsells',       label: 'Hide Upsells',         desc: 'Remove Premium promo banners'        },
    { key: 'persistVolume',     label: 'Persist Volume',       desc: 'Remember volume across videos'       },
    { key: 'autoSkipEndscreen', label: 'Skip End Screen',      desc: 'Skip last 20 s outro'                },
    { key: 'autoTheaterMode',   label: 'Theater Mode',         desc: 'Auto-enable theater on watch pages'  },
  ];

  function buildPanel() {
    if (document.getElementById('ytpc-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'ytpc-panel';
    panel.innerHTML = `<h2>▶ <span>YT</span> Premium Client</h2>`;

    FEATURES.forEach(({ key, label, desc }) => {
      const row = document.createElement('div');
      row.className = 'ytpc-row';
      row.innerHTML = `
        <div class="ytpc-label">${label}<small>${desc}</small></div>
        <label class="ytpc-toggle">
          <input type="checkbox" data-key="${key}" ${CFG[key] ? 'checked' : ''}>
          <span class="ytpc-slider"></span>
        </label>`;
      panel.appendChild(row);
    });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'ytpc-close';
    closeBtn.textContent = 'Close  (Alt+G)';
    closeBtn.onclick = () => panel.classList.remove('visible');
    panel.appendChild(closeBtn);

    panel.querySelectorAll('input[data-key]').forEach(input => {
      input.addEventListener('change', () => {
        const k = input.dataset.key;
        CFG[k] = input.checked;
        GM_setValue(k, input.checked);
      });
    });

    // Close on outside click
    document.addEventListener('mousedown', e => {
      if (!panel.contains(e.target)) panel.classList.remove('visible');
    });

    document.body.appendChild(panel);

    // Keyboard hint
    const hint = document.createElement('div');
    hint.id = 'ytpc-hint';
    hint.textContent = 'Alt+G  YT Premium';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 5000);
  }

  document.addEventListener('keydown', e => {
    if (e.altKey && e.key === 'g') {
      buildPanel();
      document.getElementById('ytpc-panel').classList.toggle('visible');
    }
  });

  // Build panel DOM once page is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPanel);
  } else {
    buildPanel();
  }

})();