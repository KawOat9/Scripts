// ==UserScript==
// @name         Dark Mode PRO+
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      3.0.0
// @author       PRO + KawOatツ
// @description  💀 Dark mode ultimate (auto + presets + toggle + memory)
// ==/UserScript==

(function () {
  'use strict';

  // 🎨 THEME PRESETS
  const THEMES = {
    default: { brightness: 100, contrast: 95, sepia: 0 },
    amoled:  { brightness: 100, contrast: 100, sepia: 0 },
    soft:    { brightness: 95,  contrast: 90, sepia: 10 },
    gray:    { brightness: 90,  contrast: 85, sepia: 0 }
  };

  // ⚙️ SETTINGS
  const excludeList = ['youtube.com', 'google.com'];

  // 🧠 STATE
  let enabled = GM_getValue('enabled', true);
  let theme = GM_getValue('theme', 'default');
  let autoMode = GM_getValue('auto', true);

  const host = location.hostname;
  if (excludeList.some(d => host.includes(d))) return;

  // 🌗 AUTO TIME (18:00 - 06:00)
  function isNight() {
    const h = new Date().getHours();
    return h >= 18 || h < 6;
  }

  function apply() {
    if (autoMode) {
      enabled = isNight();
    }

    if (enabled) {
      DarkReader.enable(THEMES[theme]);
    } else {
      DarkReader.disable();
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
    padding: 10px;
    border-radius: 12px;
    font-size: 12px;
    opacity: 0.8;
  `;

  panel.innerHTML = `
    <div style="margin-bottom:5px; cursor:pointer;" id="toggle">🌙 Toggle</div>
    <div style="margin-bottom:5px; cursor:pointer;" id="auto">🕒 Auto: ${autoMode ? 'ON' : 'OFF'}</div>
    <div id="themes">
      🎨 Theme:
      <div data-t="default">Default</div>
      <div data-t="amoled">AMOLED</div>
      <div data-t="soft">Soft</div>
      <div data-t="gray">Gray</div>
    </div>
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

  panel.querySelectorAll('[data-t]').forEach(el => {
    el.onclick = () => {
      theme = el.dataset.t;
      GM_setValue('theme', theme);
      apply();
      updateUI();
    };
  });

  function updateUI() {
    panel.querySelector('#auto').textContent = `🕒 Auto: ${autoMode ? 'ON' : 'OFF'}`;
  }

})();