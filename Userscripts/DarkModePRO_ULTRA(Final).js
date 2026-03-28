// ==UserScript==
// @name         Dark Mode ULTRA
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      4.1.0 Fix for iPhone (Touch Friendly)
// @author       ULTRA + KawOatツ (Modified)
// @description  🔥 Ultra: Auto + Day/Night + Dracula for iPhone
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/DarkModePlus.webp
// ==/UserScript==

(function () {
  'use strict';

  const THEMES = {
    default: { brightness: 100, contrast: 95, sepia: 0 },
    amoled:  { brightness: 100, contrast: 100, sepia: 0 },
    dracula: { brightness: 95, contrast: 90, sepia: 5 },
    soft:    { brightness: 95, contrast: 90, sepia: 10 }
  };

  const DRACULA_CSS = `
    html, body { background: #282a36 !important; color: #f8f8f2 !important; }
    a { color: #bd93f9 !important; }
    img, video { filter: brightness(0.9) contrast(1.05); }
  `;

  const excludeList = ['youtube.com', 'google.com'];
  let enabled = GM_getValue('enabled', true);
  let autoMode = GM_getValue('auto', true);
  let dayTheme = GM_getValue('dayTheme', 'soft');
  let nightTheme = GM_getValue('nightTheme', 'dracula');

  if (excludeList.some(d => location.hostname.includes(d))) return;

  function isNight() {
    const h = new Date().getHours();
    return h >= 18 || h < 6;
  }

  function apply() {
    DarkReader.disable();
    // ล้าง CSS Dracula เก่าออกก่อนถ้ามี (ป้องกันการซ้อนทับ)
    const oldStyle = document.getElementById('dracula-style');
    if (oldStyle) oldStyle.remove();

    let use = autoMode ? isNight() : enabled;

    if (use) {
      const t = isNight() ? nightTheme : dayTheme;
      DarkReader.enable(THEMES[t]);
      if (t === 'dracula') {
        const styleTag = GM_addStyle(DRACULA_CSS);
        if (styleTag) styleTag.id = 'dracula-style';
      }
    }
  }

  // --- UI PART ---
  const style = document.createElement('style');
  style.innerHTML = `
    #dm-mobile-btn { position: fixed; bottom: 20px; right: 20px; z-index: 1000000; width: 44px; height: 44px; background: #282a36; color: #bd93f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.4); border: 1px solid #444; -webkit-tap-highlight-color: transparent; }
    #dm-mobile-menu { position: fixed; bottom: 75px; right: 20px; z-index: 1000000; background: #191a21; color: #f8f8f2; padding: 15px; border-radius: 12px; width: 160px; display: none; box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid #444; font-family: sans-serif; }
    #dm-mobile-menu.show { display: block; }
    .dm-row { padding: 12px 0; border-bottom: 1px solid #333; cursor: pointer; font-size: 14px; }
    .dm-label { color: #6272a4; font-size: 11px; text-transform: uppercase; margin-top: 10px; }
    .dm-active { color: #50fa7b; font-weight: bold; }
  `;
  document.head.appendChild(style);

  const mainBtn = document.createElement('div');
  mainBtn.id = 'dm-mobile-btn';
  mainBtn.innerHTML = '🌓';
  document.body.appendChild(mainBtn);

  const menu = document.createElement('div');
  menu.id = 'dm-mobile-menu';
  document.body.appendChild(menu);

  const renderMenu = () => {
    menu.innerHTML = `
      <div class="dm-label">สถานะ</div>
      <div id="m-toggle" class="dm-row">${enabled ? '✅ เปิด' : '❌ ปิด'}</div>
      <div id="m-auto" class="dm-row">🕒 อัตโนมัติ: ${autoMode ? 'ON' : 'OFF'}</div>
      <div class="dm-label">🌞 กลางวัน</div>
      <div class="dm-row m-day ${dayTheme==='soft'?'dm-active':''}" data-val="soft">Soft</div>
      <div class="dm-row m-day ${dayTheme==='default'?'dm-active':''}" data-val="default">Default</div>
      <div class="dm-label">🌙 กลางคืน</div>
      <div class="dm-row m-night ${nightTheme==='dracula'?'dm-active':''}" data-val="dracula">Dracula</div>
      <div class="dm-row m-night ${nightTheme==='amoled'?'dm-active':''}" data-val="amoled">AMOLED</div>
    `;
    menu.querySelector('#m-toggle').onclick = () => { autoMode = false; enabled = !enabled; save(); };
    menu.querySelector('#m-auto').onclick = () => { autoMode = !autoMode; save(); };
    menu.querySelectorAll('.m-day').forEach(el => el.onclick = () => { dayTheme = el.dataset.val; save(); });
    menu.querySelectorAll('.m-night').forEach(el => el.onclick = () => { nightTheme = el.dataset.val; save(); });
  };

  function save() {
    GM_setValue('enabled', enabled);
    GM_setValue('auto', autoMode);
    GM_setValue('dayTheme', dayTheme);
    GM_setValue('nightTheme', nightTheme);
    apply();
    renderMenu();
  }

  mainBtn.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('show'); renderMenu(); };
  document.addEventListener('click', () => menu.classList.remove('show'));
  menu.onclick = (e) => e.stopPropagation();

  apply(); // รันครั้งแรกตอนโหลดเว็บ
})();
