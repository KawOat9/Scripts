// ==UserScript==
// @name         YouTube / YouTube Music Premium Logo
// @namespace    YouTube / YouTube Music Premium Ultimate
// @version      5.1.1
// @description  เปลี่ยนโลโก้ YouTube / YouTube Music เป็น Premium รองรับ iPhone (m.youtube.com), www.youtube.com และ music.youtube.com, Light/Dark mode, SPA navigation
// @author       𝗞𝗮𝘄𝗢𝗮𝘁✨ (based on Hasan-Abbas, Chokiproai)
// @license      MIT
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/YT-Premium-Logo.png
// @match        https://m.youtube.com/*
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @match        https://music.youtube.com/*
// @exclude      https://www.youtube.com/embed/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ------------------------------------------------------------
    // ค่าคงที่ (ชื่อ class ใช้ prefix "ytpl-" กันชนกับ CSS ของ YouTube)
    // ------------------------------------------------------------
    const LOGO_CLASS = 'ytpl-logo';   // กล่องที่ครอบโลโก้ใหม่
    const HOST_CLASS = 'ytpl-host';   // ตัวโลโก้เดิมของ YouTube ที่ถูกแทนที่
    const STYLE_ID   = 'ytpl-style';

    // ------------------------------------------------------------
    // SVG ต้นฉบับจากไฟล์แรก (viewBox 846x174)
    // - ไอคอนแดง/สามเหลี่ยมขาว: สีคงที่
    // - ตัวอักษร "Premium": fill="currentColor" -> เปลี่ยนสีตามธีมอัตโนมัติ
    //   (ดำใน Light mode / ขาวใน Dark mode)
    // ------------------------------------------------------------
    const SVG_SOURCE = `
<svg xmlns="http://www.w3.org/2000/svg" class="ytpl-svg" viewBox="0 0 846 174"
     role="img" aria-label="YouTube Premium" focusable="false">
  <g transform="translate(0,0.36)">
    <path fill="#ff0000" d="M 242.88,27.11 A 31.07,31.07 0 0 0 220.95,5.18 C 201.6,0 124,0 124,0 124,0 46.46,0 27.11,5.18 A 31.07,31.07 0 0 0 5.18,27.11 C 0,46.46 0,86.82 0,86.82 c 0,0 0,40.36 5.18,59.71 a 31.07,31.07 0 0 0 21.93,21.93 c 19.35,5.18 96.92,5.18 96.92,5.18 0,0 77.57,0 96.92,-5.18 a 31.07,31.07 0 0 0 21.93,-21.93 c 5.18,-19.35 5.18,-59.71 5.18,-59.71 0,0 0,-40.36 -5.18,-59.71 z"/>
    <path fill="#ffffff" d="M 99.22,124.03 163.67,86.82 99.22,49.61 Z"/>
    <path fill="currentColor" d="m 358.29,55.1 v 6 c 0,30 -13.3,47.53 -42.39,47.53 h -4.43 v 52.5 H 287.71 V 12.36 H 318 c 27.7,0 40.29,11.71 40.29,42.74 z m -25,2.13 c 0,-21.64 -3.9,-26.78 -17.38,-26.78 h -4.43 v 60.48 h 4.08 c 12.77,0 17.74,-9.22 17.74,-29.26 z m 81.22,-6.56 -1.24,28.2 c -10.11,-2.13 -18.45,-0.53 -22.17,6 v 76.26 H 367.52 V 52.44 h 18.8 L 388.45,76 h 0.89 c 2.48,-17.2 10.46,-25.89 20.75,-25.89 a 22.84,22.84 0 0 1 4.42,0.56 z M 441.64,115 v 5.5 c 0,19.16 1.06,25.72 9.22,25.72 7.8,0 9.58,-6 9.75,-18.44 l 21.1,1.24 c 1.6,23.41 -10.64,33.87 -31.39,33.87 -25.18,0 -32.63,-16.49 -32.63,-46.46 v -19 c 0,-31.57 8.34,-47 33.34,-47 25.18,0 31.57,13.12 31.57,45.93 V 115 Z m 0,-22.35 v 7.8 h 17.91 V 92.7 c 0,-20 -1.42,-25.72 -9,-25.72 -7.58,0 -8.91,5.86 -8.91,25.72 z M 604.45,79 v 82.11 H 580 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 a 35.59,35.59 0 0 1 0.18,4.43 v 82.11 H 537.24 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 494.5 V 52.44 h 19.33 L 516,66.28 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.86,0 20.53,10.64 20.53,28.86 z m 12.24,-54.4 c 0,-11.71 4.26,-15.07 13.3,-15.07 9.22,0 13.3,3.9 13.3,15.07 0,12.06 -4.08,15.08 -13.3,15.08 -9.04,-0.01 -13.3,-3.02 -13.3,-15.08 z m 1.42,27.84 h 23.41 v 108.72 h -23.41 z m 103.39,0 v 108.72 h -19.15 l -2.13,-13.3 h -0.53 c -5.5,10.64 -13.48,15.07 -23.41,15.07 -14.54,0 -21.11,-9.22 -21.11,-29.26 V 52.44 h 24.47 v 79.81 c 0,9.58 2,13.48 6.92,13.48 A 12.09,12.09 0 0 0 697,138.81 V 52.44 Z M 845.64,79 v 82.11 H 821.17 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8.16,2.48 -10.82,7.09 A 35.59,35.59 0 0 1 802.9,79 v 82.11 H 778.43 V 80.82 c 0,-8.87 -2.31,-13.3 -7.63,-13.3 -4.26,0 -8,2.48 -10.64,6.92 v 86.72 H 735.69 V 52.44 H 755 l 2.13,13.83 h 0.35 c 5.5,-10.46 14.37,-16.14 24.83,-16.14 10.29,0 16.14,5.14 18.8,14.37 5.68,-9.4 14.19,-14.37 23.94,-14.37 14.95,0.01 20.59,10.65 20.59,28.87 z"/>
  </g>
</svg>`;

    // ------------------------------------------------------------
    // SVG โลโก้ YouTube Music Premium (viewBox 0 0 98.543 24)
    // - YouTube Music เป็นธีมมืดเสมอ จึงใช้ตัวอักษรสีขาวคงที่
    // - ใช้ id ของ clipPath เป็น "ytpl-music-clip" กัน id ชนกับของ YouTube
    // ------------------------------------------------------------
    const MUSIC_SVG_SOURCE = `
<svg xmlns="http://www.w3.org/2000/svg" class="ytpl-svg ytpl-music-svg" viewBox="0 0 98.543 24"
     role="img" aria-label="YouTube Music Premium" focusable="false">
  <clipPath id="ytpl-music-clip"><path d="M0 0h77v26H0Z"/></clipPath>
  <g clip-path="url(#ytpl-music-clip)" transform="scale(.92308)">
    <path fill="#f03" d="M13 26c7.176 0 13-5.824 13-13S20.176 0 13 0 0 5.824 0 13s5.824 13 13 13"/>
    <path fill="none" stroke="#fff" d="M20.5 13c0 4.144-3.356 7.5-7.5 7.5A7.5 7.5 0 0 1 5.5 13c0-4.144 3.356-7.5 7.5-7.5s7.5 3.356 7.5 7.5z"/>
    <path fill="#fff" d="m17.75 13-7.5-4.25v8.5z"/>
  </g>
  <g fill="#fff">
    <path d="M32.182 2.1v16.8h2.58v-5.99h.69c3.35 0 5.11-1.8 5.11-5.34v-.69c0-3.57-1.56-4.78-4.84-4.78zm5.68 5.53c0 2.37-.72 3.45-2.46 3.45h-.64V3.95h.69c1.97 0 2.41.81 2.41 3.18zM41.982 18.9h2.55v-8.81c.42-.72 1.46-1.04 2.77-.77l.16-2.99c-.17-.02-.32-.04-.46-.04-1.2 0-2.17.91-2.66 2.57h-.18l-.21-2.32h-1.97zM55.746 11.5c0-2.98-.3-5.19-3.73-5.19-3.23 0-3.95 2.15-3.95 5.31v2.17c0 3.08.66 5.32 3.87 5.32 2.54 0 3.85-1.27 3.7-3.73l-2.25-.12c-.03 1.52-.38 2.14-1.39 2.14-1.27 0-1.33-1.21-1.33-3.01v-.84h5.08zm-3.79-3.53c1.22 0 1.31 1.15 1.31 3.1v1.01h-2.6v-1.01c0-1.93.08-3.1 1.29-3.1M60.195 18.9V8.92c.38-.53 1-.85 1.6-.85.77 0 1.05.54 1.05 1.62v9.21h2.66l-.02-9.97c.37-.56 1-.89 1.62-.89.67 0 1.04.57 1.04 1.65v9.21h2.66V9.49c0-2.21-.79-3.22-2.46-3.22-1.16 0-2.15.42-3.06 1.4-.38-.91-1.13-1.4-2.2-1.4-1.21 0-2.35.52-3.15 1.49h-.15l-.19-1.22h-2.05V18.9ZM74.086 4.97c.9 0 1.32-.3 1.32-1.54 0-1.16-.45-1.52-1.32-1.52-.88 0-1.31.32-1.31 1.52 0 1.24.41 1.54 1.31 1.54m-1.22 13.93h2.53V6.54h-2.53zM79.952 19.09c1.46 0 2.37-.61 3.12-1.71h.11l.11 1.52h1.99V6.54h-2.64v9.93c-.28.49-.93.85-1.54.85-.77 0-1.01-.61-1.01-1.63V6.54h-2.63v9.27c0 2.01.58 3.28 2.49 3.28M90.003 18.9V8.92c.38-.53 1-.85 1.6-.85.77 0 1.05.54 1.05 1.62v9.21h2.66l-.02-9.97c.37-.56 1-.89 1.62-.89.67 0 1.04.57 1.04 1.65v9.21h2.66V9.49c0-2.21-.79-3.22-2.46-3.22-1.16 0-2.15.42-3.06 1.4-.38-.91-1.13-1.4-2.2-1.4-1.21 0-2.35.52-3.15 1.49h-.15l-.19-1.22h-2.05V18.9Z" transform="matrix(.92322 0 0 .9259 -1.911 2.734)"/>
  </g>
</svg>`;

    // เช็กว่ากำลังอยู่บน YouTube Music หรือไม่
    const IS_MUSIC = location.hostname === 'music.youtube.com';

    // ------------------------------------------------------------
    // ตำแหน่งโลโก้เดิมที่จะแทนที่
    // เจาะจงเฉพาะโลโก้ใน topbar เท่านั้น เพื่อไม่ไปทับไอคอนอื่น
    // ------------------------------------------------------------
    const HOST_SELECTORS = [
        // เดสก์ท็อป / www.youtube.com
        'ytd-topbar-logo-renderer a#logo',
        // มือถือ / m.youtube.com
        'ytm-mobile-topbar-renderer ytm-home-logo',
        'ytm-mobile-topbar-renderer a.mobile-topbar-logo',
        'ytm-mobile-topbar-renderer .mobile-topbar-logo',
        'ytm-mobile-topbar-renderer .mobile-topbar-logo-container',
    ];

    // ตำแหน่งที่ห้ามแตะ (ปุ่ม/เมนูต่างๆ)
    const FORBIDDEN_ANCESTORS = 'button, [role="button"], ytm-pivot-bar-renderer, ytd-guide-entry-renderer';

    // ------------------------------------------------------------
    // CSS
    // - โลโก้เดิมถูกซ่อนด้วย CSS (ไม่ลบ DOM) เพื่อไม่ให้ YouTube error
    // - สีตัวอักษรใช้ตัวแปรของ YouTube เอง จึงตามธีมได้ทั้งสองโหมด
    // ------------------------------------------------------------
    const CSS = `
    .${HOST_CLASS} {
        display: inline-flex !important;
        align-items: center !important;
    }
    .${HOST_CLASS} > :not(.${LOGO_CLASS}) {
        display: none !important;
    }
    .${LOGO_CLASS} {
        display: inline-flex;
        align-items: center;
        line-height: 0;
        color: var(--yt-spec-text-primary, #0f0f0f);
        margin: 0 4px;
        pointer-events: none; /* ให้ลิงก์ของโลโก้เดิมรับการกดแทน */
    }
    .${LOGO_CLASS} .ytpl-svg {
        height: 20px;
        width: auto;
        display: block;
    }
    /* Fallback ถ้า YouTube ไม่ได้กำหนดตัวแปรสี: ดูจาก Dark mode */
    html[dark] .${LOGO_CLASS},
    [dark] .${LOGO_CLASS} {
        color: var(--yt-spec-text-primary, #ffffff);
    }
    @media (prefers-color-scheme: dark) {
        html:not([light]) .${LOGO_CLASS} {
            color: var(--yt-spec-text-primary, #ffffff);
        }
    }
    /* YouTube Music: โลโก้สูง 24px, สีขาวคงที่ (ธีมมืดเสมอ) */
    .${LOGO_CLASS} .ytpl-music-svg {
        height: 24px;
        width: auto;
    }
    /* หน้าจอ iPhone ขนาดเล็ก */
    @media (max-width: 640px) {
        .${LOGO_CLASS} .ytpl-svg { height: 18px; }
    }
    @media (max-width: 360px) {
        .${LOGO_CLASS} .ytpl-svg { height: 16px; }
    }`;

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const root = document.head || document.documentElement;
        if (!root) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = CSS;
        root.appendChild(style);
    }

    // ------------------------------------------------------------
    // สร้าง SVG ด้วย DOMParser
    // (YouTube เปิด Trusted Types จึงใช้ innerHTML ไม่ได้)
    // ------------------------------------------------------------
    function buildLogo(source) {
        const doc = new DOMParser().parseFromString((source || SVG_SOURCE).trim(), 'image/svg+xml');
        const svg = document.importNode(doc.documentElement, true);
        const wrap = document.createElement('span');
        wrap.className = LOGO_CLASS;
        wrap.appendChild(svg);
        return wrap;
    }

    // ------------------------------------------------------------
    // ใส่โลโก้ใหม่ใน host หนึ่งตัว (ทำซ้ำได้ ไม่ซ้อนกัน)
    // ------------------------------------------------------------
    function inject(host, source) {
        if (host.closest(FORBIDDEN_ANCESTORS)) return;
        if (host.querySelector('.' + LOGO_CLASS)) return;           // มีโลโก้ใหม่แล้ว
        if (host.parentElement && host.parentElement.closest('.' + HOST_CLASS)) return; // อยู่ใน host อื่น
        // สร้างโลโก้ใหม่ให้สำเร็จก่อน แล้วค่อยซ่อนของเดิม (กันกรณีพังแล้วโลโก้หายทั้งคู่)
        const logo = buildLogo(typeof source === 'string' ? source : undefined);
        host.classList.add(HOST_CLASS);
        host.appendChild(logo);
    }

    // Fallback สำหรับ m.youtube.com เวอร์ชันที่เปลี่ยนชื่อ element:
    // หา <a href="/"> ใน topbar ที่มีรูปโลโก้อยู่ข้างใน
    function findMobileFallback() {
        const bar = document.querySelector('ytm-mobile-topbar-renderer, header.mobile-topbar-header');
        if (!bar) return [];
        return Array.from(bar.querySelectorAll('a[href="/"], a[href^="/?"]')).filter(a =>
            a.querySelector('img, svg, c3-icon, yt-icon, .yt-icon-shape')
        );
    }

    function apply() {
        injectStyle();

        // YouTube Music: แทนที่โลโก้ใน ytmusic-logo > a (ซ่อนของเดิม ไม่ลบ DOM)
        if (IS_MUSIC) {
            document.querySelectorAll('ytmusic-logo > a, ytmusic-logo a').forEach(el => inject(el, MUSIC_SVG_SOURCE));
            return;
        }

        const hosts = new Set();
        HOST_SELECTORS.forEach(sel => document.querySelectorAll(sel).forEach(el => hosts.add(el)));
        if (hosts.size === 0) findMobileFallback().forEach(el => hosts.add(el));
        // ห้ามส่ง inject ตรงๆ: forEach จะส่ง index เป็นอาร์กิวเมนต์ที่สอง (source) ทำให้พัง
        hosts.forEach(el => inject(el));
    }

    // ------------------------------------------------------------
    // ตรวจจับการเปลี่ยนแปลงของหน้า (SPA navigation / โลโก้ถูกสร้างใหม่)
    // ใช้ requestAnimationFrame รวมการเรียกถี่ๆ ให้เหลือครั้งเดียวต่อเฟรม
    // ------------------------------------------------------------
    let queued = false;
    function schedule() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            apply();
        });
    }

    function start() {
        apply();
        new MutationObserver(schedule).observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
        // เหตุการณ์เปลี่ยนหน้าของ YouTube
        ['yt-navigate-finish', 'yt-page-data-updated', 'state-navigatefinish', 'popstate', 'pageshow']
            .forEach(evt => window.addEventListener(evt, schedule, true));
    }

    if (document.documentElement) {
        start();
    } else {
        // run-at document-start: รอให้มี <html> ก่อน
        const wait = new MutationObserver(() => {
            if (document.documentElement) {
                wait.disconnect();
                start();
            }
        });
        wait.observe(document, { childList: true });
    }
})();
