// ==UserScript==
// @name         Dark Mode Pro
// @namespace    darkreader.org
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @version      2.1.0
// @author       PRO + KawOatツ (Modified)
// @description  💀 Dark mode ultimate (toggle + memory + exclude + AMOLED + Auto Icon)
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/DarkMode.webp
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
  
  // กำหนดไอคอนเริ่มต้นตามสถานะที่บันทึกไว้
  btn.innerHTML = enabled ? '☀️' : '🌙'; 
  
  // ปรับสีพื้นหลังปุ่มให้ตรงกับสถานะเพื่อความสวยงาม
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${enabled ? '#333' : '#f0f0f0'};
    color: ${enabled ? '#fff' : '#000'};
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
  `;

  btn.onmouseover = () => btn.style.opacity = '1';
  btn.onmouseout = () => btn.style.opacity = '0.7';

  // 🔘 click = toggle dark
  btn.onclick = () => {
    enabled = !enabled;
    GM_setValue('dark_enabled', enabled);
    
    // เปลี่ยนไอคอนและสีปุ่มตอนกด
    btn.innerHTML = enabled ? '☀️' : '🌙';
    btn.style.background = enabled ? '#333' : '#f0f0f0';
    btn.style.color = enabled ? '#fff' : '#000';
    
    apply();
  };

  // 🔥 right click = toggle AMOLED
  btn.oncontextmenu = (e) => {
    e.preventDefault();
    if (!enabled) return; // ป้องกันการเปิด AMOLED ตอนโหมดมืดปิดอยู่
    amoled = !amoled;
    GM_setValue('dark_amoled', amoled);
    
    // ลูกเล่นเล็กน้อย: เปลี่ยนไอคอนแป๊บเดียวเพื่อให้รู้ว่าสลับโหมด AMOLED แล้ว
    const tempIcon = btn.innerHTML;
    btn.innerHTML = amoled ? '🖤' : tempIcon;
    setTimeout(() => { btn.innerHTML = tempIcon; }, 500);
    
    apply();
  };

  document.body.appendChild(btn);

})();