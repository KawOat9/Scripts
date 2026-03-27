  // #1.
  // 🎛️ UI PANEL (แบบย่อส่วน + ขยายเมื่อเอาเมาส์ชี้)
  const style = document.createElement('style');
  style.innerHTML = `
    #dm-panel-ultra {
      position: fixed;
      bottom: 15px;
      right: 15px;
      z-index: 999999;
      background: rgba(20, 20, 20, 0.3); /* ปกติจะโปร่งแสง ไม่บังตา */
      color: #eee;
      font-family: sans-serif;
      font-size: 11px;
      border-radius: 8px;
      backdrop-filter: blur(3px);
      transition: all 0.3s ease;
      overflow: hidden;
      width: 80px;
      height: 24px; /* ขนาดตอนหด จะเป็นแค่ปุ่มเล็กๆ */
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    #dm-panel-ultra:hover {
      background: rgba(20, 20, 20, 0.95); /* เข้มขึ้นเมื่อเอาเมาส์ชี้ */
      width: 120px;
      height: 200px; /* ขนาดตอนขยายเพื่อแสดงเมนู */
    }
    #dm-panel-header {
      text-align: center;
      padding: 5px 0;
      cursor: default;
      font-weight: bold;
    }
    #dm-panel-content {
      padding: 0 10px 10px 10px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    #dm-panel-ultra:hover #dm-panel-content {
      opacity: 1;
    }
    .dm-btn { cursor: pointer; margin: 4px 0; padding: 2px 0; }
    .dm-btn:hover { color: #bd93f9; } /* สีม่วง Dracula ตอนชี้ */
    .dm-hr { margin: 6px 0; border: 0; border-top: 1px solid #444; }
    .dm-label { color: #888; font-size: 10px; margin-top: 5px; }
  `;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'dm-panel-ultra';
  panel.innerHTML = `
    <div id="dm-panel-header">⚙️ ธีมมืด</div>
    <div id="dm-panel-content">
      <div id="toggle" class="dm-btn">🌙 เปิดใช้งาน: ${enabled ? 'ON' : 'OFF'}</div>
      <div id="auto" class="dm-btn">🕒 Auto: ${autoMode ? 'ON' : 'OFF'}</div>
      <hr class="dm-hr">
      <div class="dm-label">🌞 กลางวัน:</div>
      <div class="dm-btn" data-day="soft">» Soft</div>
      <div class="dm-btn" data-day="default">» Default</div>
      <hr class="dm-hr">
      <div class="dm-label">🌙 กลางคืน:</div>
      <div class="dm-btn" data-night="dracula">» Dracula</div>
      <div class="dm-btn" data-night="amoled">» AMOLED</div>
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
    panel.querySelector('#auto').textContent = `🕒 Auto: ${autoMode ? 'ON' : 'OFF'}`;
    panel.querySelector('#toggle').textContent = `🌙 เปิดใช้งาน: ${enabled ? 'ON' : 'OFF'}`;
  }

  // #2.
    // 📱 UI PANEL สำหรับ iPhone (Touch Friendly)
  const style = document.createElement('style');
  style.innerHTML = `
    #dm-mobile-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000000;
      width: 44px;
      height: 44px;
      background: #282a36;
      color: #bd93f9;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      border: 1px solid #444;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    #dm-mobile-menu {
      position: fixed;
      bottom: 75px;
      right: 20px;
      z-index: 1000000;
      background: #191a21;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 12px;
      width: 160px;
      display: none; /* ซ่อนไว้ก่อน */
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      border: 1px solid #444;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica;
    }
    #dm-mobile-menu.show { display: block; }
    .dm-row { padding: 10px 0; border-bottom: 1px solid #333; cursor: pointer; font-size: 14px; }
    .dm-row:last-child { border-bottom: none; }
    .dm-label { color: #6272a4; font-size: 11px; text-transform: uppercase; margin-bottom: 4px; }
    .dm-active { color: #50fa7b; font-weight: bold; }
  `;
  document.head.appendChild(style);

  // สร้างปุ่มกดหลัก
  const mainBtn = document.createElement('div');
  mainBtn.id = 'dm-mobile-btn';
  mainBtn.innerHTML = '🌓';
  document.body.appendChild(mainBtn);

  // สร้างเมนู
  const menu = document.createElement('div');
  menu.id = 'dm-mobile-menu';
  document.body.appendChild(menu);

  const renderMenu = () => {
    menu.innerHTML = `
      <div class="dm-label">สถานะ</div>
      <div id="m-toggle" class="dm-row">${enabled ? '✅ เปิดใช้งาน' : '❌ ปิดใช้งาน'}</div>
      <div id="m-auto" class="dm-row">🕒 อัตโนมัติ: ${autoMode ? 'ON' : 'OFF'}</div>
      
      <div class="dm-label" style="margin-top:10px;">🌞 กลางวัน</div>
      <div class="dm-row m-day ${dayTheme==='soft'?'dm-active':''}" data-val="soft">Soft</div>
      <div class="dm-row m-day ${dayTheme==='default'?'dm-active':''}" data-val="default">Default</div>
      
      <div class="dm-label" style="margin-top:10px;">🌙 กลางคืน</div>
      <div class="dm-row m-night ${nightTheme==='dracula'?'dm-active':''}" data-val="dracula">Dracula</div>
      <div class="dm-row m-night ${nightTheme==='amoled'?'dm-active':''}" data-val="amoled">AMOLED</div>
    `;

    // ผูก Event คืนให้ปุ่มในเมนู
    menu.querySelector('#m-toggle').onclick = () => { autoMode = false; enabled = !enabled; saveAndApply(); };
    menu.querySelector('#m-auto').onclick = () => { autoMode = !autoMode; saveAndApply(); };
    menu.querySelectorAll('.m-day').forEach(el => { el.onclick = () => { dayTheme = el.dataset.val; saveAndApply(); }; });
    menu.querySelectorAll('.m-night').forEach(el => { el.onclick = () => { nightTheme = el.dataset.val; saveAndApply(); }; });
  };

  function saveAndApply() {
    GM_setValue('enabled', enabled);
    GM_setValue('auto', autoMode);
    GM_setValue('dayTheme', dayTheme);
    GM_setValue('nightTheme', nightTheme);
    apply();
    renderMenu();
  }

  // เปิด-ปิดเมนู
  mainBtn.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
    renderMenu();
  };

  // ปิดเมนูเมื่อแตะที่อื่น
  document.addEventListener('click', () => menu.classList.remove('show'));
  menu.onclick = (e) => e.stopPropagation();
