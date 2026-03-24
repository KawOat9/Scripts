// ==UserScript==
// @name         💀 Dark Mode Pro
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      2.0.0
// @author       PRO + KawOatツ
// @description  Dark mode ultimate (toggle + memory + exclude + AMOLED)
// ==/UserScript==

(function () {
  'use strict';

  // ⚙️ CONFIG
  const config = {
    brightness: 100,
    contrast: 95,
    sepia: 0
  };

  const AMOLED = {
    brightness: 100,
    contrast: 100,
    sepia: 0
  };

  const excludeList = [
    'youtube.com',
    'google.com',
    'facebook.com'
  ];

  const host = location.hostname;

  // 🚫 skip excluded sites
  if (excludeList.some(d => host.includes(d))) return;

  // 🔁 state
  let enabled = GM_getValue('dark_enabled', true);
  let amoled = GM_getValue('dark_amoled', false);

  function apply() {
    if (enabled) {
      DarkReader.enable(amoled ? AMOLED : config);
    } else {
      DarkReader.disable();
    }
  }

  apply();

  // 🎛️ Floating Button
  const btn = document.createElement('div');
  btn.innerHTML = '🌙';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #111;
    color: #fff;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.7;
  `;

  btn.onmouseover = () => btn.style.opacity = '1';
  btn.onmouseout = () => btn.style.opacity = '0.7';

  // 🔘 click = toggle dark
  btn.onclick = () => {
    enabled = !enabled;
    GM_setValue('dark_enabled', enabled);
    apply();
  };

  // 🔥 right click = toggle AMOLED
  btn.oncontextmenu = (e) => {
    e.preventDefault();
    amoled = !amoled;
    GM_setValue('dark_amoled', amoled);
    apply();
  };

  document.body.appendChild(btn);

})();