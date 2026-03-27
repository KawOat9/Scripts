// ==UserScript==
// @name         Dark Mode ULTRA
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      4.0.0
// @description  🔥 Ultra: Auto + Day/Night theme + Dracula real + UI + Hotkey
// ==/UserScript==

(function () {
  'use strict';

  // 🎨 THEMES
  const THEMES = {
    default: { brightness: 100, contrast: 95, sepia: 0 },
    amoled:  { brightness: 100, contrast: 100, sepia: 0 },
    dracula: { brightness: 95, contrast: 90, sepia: 5 },
    soft:    { brightness: 95, contrast: 90, sepia: 10 }
  };

  // 🧛 Dracula REAL CSS (โทนแท้)
  const DRACULA_CSS = `
    html, body {
      background: #282a36 !important;
      color: #f8f8f2 !important;
    }
    a { color: #bd93f9 !important; }
    img, video { filter: brightness(0.9) contrast(1.05); }
  `;

  // ⚙️ SETTINGS
  const excludeList = ['youtube.com', 'google.com'];

  // 🧠 STATE
  let enabled   = GM_getValue('enabled', true);
  let autoMode  = GM_getValue('auto', true);
  let dayTheme  = GM_getValue('dayTheme', 'soft');
  let nightTheme= GM_getValue('nightTheme', 'dracula');

  const host = location.hostname;
  if (excludeList.some(d => host.includes(d))) return;

  // 🌗 TIME
  function isNight() {
    const h = new Date().getHours();
    return h >= 18 || h < 6;
  }

  function getTheme() {
    return isNight() ? nightTheme : dayTheme;
  }

  function apply() {
    let use = enabled;

    if (autoMode) {
      use = isNight();
    }

    DarkReader.disable();

    if (use) {
      const t = getTheme();

      DarkReader.enable(THEMES[t]);

      // 🧛 apply Dracula CSS เพิ่ม
      if (t === 'dracula') {
        GM_addStyle(DRACULA_CSS);
      }
    }
  }

  apply();

  // 🎛️ UI PANEL
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    background: #111;
    color: #fff;
    padding: 12px;
    border-radius: 14px;
    font-size: 12px;
    opacity: 0.85;
    min-width: 140px;
  `;

  panel.innerHTML = `
    <div id="toggle" style="cursor:pointer;">🌙 Toggle</div>
    <div id="auto" style="cursor:pointer;">🕒 Auto: ${autoMode?'ON':'OFF'}</div>
    <hr>
    <div>🌞 Day:</div>
    <div data-day="soft">Soft</div>
    <div data-day="default">Default</div>
    <hr>
    <div>🌙 Night:</div>
    <div data-night="dracula">Dracula</div>
    <div data-night="amoled">AMOLED</div>
  `;

  document.body.appendChild(panel);

  // 🎯 EVENTS
  panel.querySelector('#toggle').onclick = () => {
    autoMode = false;
    enabled = !enabled;
    GM_setValue('enabled', enabled);
    GM_setValue('auto', autoMode);
    apply();
    updateUI();
  };

  panel.querySelector('#auto').onclick = () => {
    autoMode = !autoMode;
    GM_setValue('auto', autoMode);
    apply();
    updateUI();
  };

  panel.querySelectorAll('[data-day]').forEach(el => {
    el.onclick = () => {
      dayTheme = el.dataset.day;
      GM_setValue('dayTheme', dayTheme);
      apply();
    };
  });

  panel.querySelectorAll('[data-night]').forEach(el => {
    el.onclick = () => {
      nightTheme = el.dataset.night;
      GM_setValue('nightTheme', nightTheme);
      apply();
    };
  });

  function updateUI() {
    panel.querySelector('#auto').textContent = `🕒 Auto: ${autoMode?'ON':'OFF'}`;
  }

  // ⌨️ HOTKEY (Alt + D)
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'd') {
      enabled = !enabled;
      GM_setValue('enabled', enabled);
      apply();
    }
  });

})();