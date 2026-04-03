// ==UserScript==
// @name         Dark Mode ULTIMATE+
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      api.sunrise-sunset.org
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      5.0.0
// @description  🚀 Ultimate+: GPS auto + slider + export/import + smart exclude
// ==/UserScript==

(function () {
  'use strict';

  // 🎨 THEMES BASE
  let settings = GM_getValue('settings', {
    enabled: true,
    auto: true,
    lat: null,
    lon: null,
    sunrise: 6,
    sunset: 18,
    theme: { brightness: 100, contrast: 95, sepia: 0 }
  });

  const excludeList = ['youtube.com', 'google.com'];

  const host = location.hostname;

  // 🧠 SMART EXCLUDE (เว็บที่มี dark อยู่แล้ว)
  if (excludeList.some(d => host.includes(d)) ||
      document.documentElement.className.toLowerCase().includes('dark')) {
    return;
  }

  // 🌍 GET LOCATION
  function getLocation() {
    if (settings.lat && settings.lon) return;

    navigator.geolocation.getCurrentPosition(pos => {
      settings.lat = pos.coords.latitude;
      settings.lon = pos.coords.longitude;
      GM_setValue('settings', settings);
      getSunTime();
    });
  }

  // 🌅 GET SUN DATA
  function getSunTime() {
    if (!settings.lat) return;

    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://api.sunrise-sunset.org/json?lat=${settings.lat}&lng=${settings.lon}&formatted=0`,
      onload: (res) => {
        const data = JSON.parse(res.responseText).results;
        settings.sunrise = new Date(data.sunrise).getHours();
        settings.sunset  = new Date(data.sunset).getHours();
        GM_setValue('settings', settings);
        apply();
      }
    });
  }

  // 🌗 CHECK NIGHT
  function isNight() {
    const h = new Date().getHours();
    return h >= settings.sunset || h < settings.sunrise;
  }

  // 🎛️ APPLY
  function apply() {
    DarkReader.disable();

    let use = settings.enabled;
    if (settings.auto) {
      use = isNight();
    }

    if (use) {
      DarkReader.enable(settings.theme);
    }
  }

  apply();
  getLocation();

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
    width: 180px;
  `;

  panel.innerHTML = `
    <div id="toggle">🌙 Toggle</div>
    <div id="auto">🕒 Auto: ${settings.auto?'ON':'OFF'}</div>
    <hr>
    <div>🎚️ Brightness <input id="b" type="range" min="50" max="120" value="${settings.theme.brightness}"></div>
    <div>🎚️ Contrast <input id="c" type="range" min="50" max="120" value="${settings.theme.contrast}"></div>
    <div>🎚️ Sepia <input id="s" type="range" min="0" max="50" value="${settings.theme.sepia}"></div>
    <hr>
    <div id="export">💾 Export</div>
    <div id="import">📂 Import</div>
  `;

  document.body.appendChild(panel);

  // 🎯 EVENTS
  panel.querySelector('#toggle').onclick = () => {
    settings.enabled = !settings.enabled;
    settings.auto = false;
    save();
  };

  panel.querySelector('#auto').onclick = () => {
    settings.auto = !settings.auto;
    save();
  };

  ['b','c','s'].forEach(id => {
    panel.querySelector('#'+id).oninput = (e) => {
      if (id==='b') settings.theme.brightness = +e.target.value;
      if (id==='c') settings.theme.contrast = +e.target.value;
      if (id==='s') settings.theme.sepia = +e.target.value;
      save(false);
    };
  });

  panel.querySelector('#export').onclick = () => {
    prompt('Copy config:', JSON.stringify(settings));
  };

  panel.querySelector('#import').onclick = () => {
    const data = prompt('Paste config:');
    if (data) {
      settings = JSON.parse(data);
      save();
    }
  };

  function save(reapply=true) {
    GM_setValue('settings', settings);
    if (reapply) apply();
    panel.querySelector('#auto').textContent = `🕒 Auto: ${settings.auto?'ON':'OFF'}`;
  }

  // ⌨️ HOTKEY
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'd') {
      settings.enabled = !settings.enabled;
      save();
    }
  });

})();