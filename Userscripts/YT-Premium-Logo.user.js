// ==UserScript==
// @name         YouTube Premium Logo - Ultimate iOS Edition
// @namespace    YouTubePremiumUltimate
// @version      5.0.0
// @description  เปลี่ยนโลโก้ YouTube เป็น YouTube Premium (SVG ต้นฉบับ) รองรับ iPhone (m.youtube.com) และ www.youtube.com, Light/Dark mode, SPA navigation
// @author       𝗞𝗮𝘄𝗢𝗮𝘁✨ (based on Hasan-Abbas)
// @license      MIT
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/YT-Premium-Logo.png
// @match        https://m.youtube.com/*
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
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
    function buildLogo() {
        const doc = new DOMParser().parseFromString(SVG_SOURCE.trim(), 'image/svg+xml');
        const svg = document.importNode(doc.documentElement, true);
        const wrap = document.createElement('span');
        wrap.className = LOGO_CLASS;
        wrap.appendChild(svg);
        return wrap;
    }

    // ------------------------------------------------------------
    // ใส่โลโก้ใหม่ใน host หนึ่งตัว (ทำซ้ำได้ ไม่ซ้อนกัน)
    // ------------------------------------------------------------
    function inject(host) {
        if (host.closest(FORBIDDEN_ANCESTORS)) return;
        if (host.querySelector('.' + LOGO_CLASS)) return;           // มีโลโก้ใหม่แล้ว
        if (host.parentElement && host.parentElement.closest('.' + HOST_CLASS)) return; // อยู่ใน host อื่น
        host.classList.add(HOST_CLASS);
        host.appendChild(buildLogo());
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
        const hosts = new Set();
        HOST_SELECTORS.forEach(sel => document.querySelectorAll(sel).forEach(el => hosts.add(el)));
        if (hosts.size === 0) findMobileFallback().forEach(el => hosts.add(el));
        hosts.forEach(inject);
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
