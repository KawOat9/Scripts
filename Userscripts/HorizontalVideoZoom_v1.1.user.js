// ==UserScript==
// @name         Horizontal Video Zoom
// @namespace    local.video.zoom
// @version      1.1
// @author       𝗞𝗮𝘄𝗢𝗮𝘁✨
// @description  Expand video horizontally without increasing height
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/addons_scripts.png
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ระดับการขยายที่กดวนได้: ปกติ → 120% → 140% → 160% → 180% → ปกติ
    const LEVELS = [1, 1.2, 1.4, 1.6, 1.8];
    const KEY_SCALE = 'hvz_scale_' + location.hostname; // จำค่าแยกตามเว็บ
    const KEY_POS = 'hvz_pos';                          // จำตำแหน่งปุ่มรวมทุกเว็บ
    const LONG_PRESS_MS = 600;                          // กดค้างเพื่อรีเซ็ต
    const DRAG_THRESHOLD = 6;                           // ขยับเกินกี่ px ถึงนับว่าลาก

    const states = new WeakMap(); // เก็บ style เดิมของแต่ละวิดีโอ

    // อ่าน/เขียน localStorage แบบกันพัง (บางเว็บบล็อกไว้)
    function load(key) {
        try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
    }
    function save(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ข้าม */ }
    }

    let scale = LEVELS.includes(load(KEY_SCALE)) ? load(KEY_SCALE) : 1.0;

    const button = document.createElement('button');

    Object.assign(button.style, {
        position: 'fixed',
        top: '12px',
        right: '12px',
        zIndex: '2147483647',
        padding: '10px 14px',
        background: '#171717',
        color: '#ffffff',
        border: '1px solid #888',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        touchAction: 'none',        // กัน browser แย่ง gesture ตอนลาก
        userSelect: 'none',
        webkitUserSelect: 'none'
    });

    // คืนตำแหน่งปุ่มที่เคยลากไว้
    const savedPos = load(KEY_POS);
    if (savedPos && typeof savedPos.left === 'number') {
        button.style.left = savedPos.left + 'px';
        button.style.top = savedPos.top + 'px';
        button.style.right = 'auto';
    }

    function findVideos() {
        return document.querySelectorAll('video');
    }

    // วิดีโอที่มีขนาดจริง (ไม่นับตัวที่ซ่อนอยู่)
    function hasVisibleVideo() {
        return Array.from(findVideos()).some(v => v.offsetWidth > 0 && v.offsetHeight > 0);
    }

    function updateLabel() {
        button.textContent =
            scale === 1
                ? '↔ ขยายแนวนอน: ปิด'
                : `↔ ขยายแนวนอน: ${Math.round(scale * 100)}%`;
    }

    function applyZoom() {
        findVideos().forEach(video => {
            // เก็บค่าเดิมครั้งแรกที่เจอวิดีโอ
            if (!states.has(video)) {
                states.set(video, {
                    transform: video.style.getPropertyValue('transform'),
                    transformPriority: video.style.getPropertyPriority('transform'),
                    origin: video.style.getPropertyValue('transform-origin'),
                    originPriority: video.style.getPropertyPriority('transform-origin')
                });
            }

            const original = states.get(video);

            if (scale === 1) {
                // ล้างค่าที่เราตั้ง แล้วคืนค่าเดิม (รวม !important ถ้ามี)
                video.style.removeProperty('transform');
                video.style.removeProperty('transform-origin');

                if (original.transform) {
                    video.style.setProperty('transform', original.transform, original.transformPriority);
                }
                if (original.origin) {
                    video.style.setProperty('transform-origin', original.origin, original.originPriority);
                }
            } else {
                video.style.setProperty('transform', `scaleX(${scale})`, 'important');
                video.style.setProperty('transform-origin', 'center center', 'important');
            }
        });

        updateLabel();
    }

    function setScale(next) {
        scale = next;
        save(KEY_SCALE, scale);
        applyZoom();
    }

    function nextScale() {
        const i = LEVELS.indexOf(scale);
        return LEVELS[(i + 1) % LEVELS.length];
    }

    // ---------- การควบคุมปุ่ม: คลิก / กดค้าง / ลาก ----------
    let pressTimer = null;
    let dragging = false;
    let longPressed = false;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;

    button.addEventListener('pointerdown', e => {
        dragging = false;
        longPressed = false;
        startX = e.clientX;
        startY = e.clientY;

        const rect = button.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;

        button.setPointerCapture(e.pointerId);

        // กดค้างโดยไม่ขยับ = รีเซ็ตเป็นปกติ
        pressTimer = setTimeout(() => {
            if (!dragging) {
                longPressed = true;
                setScale(1);
            }
        }, LONG_PRESS_MS);
    });

    button.addEventListener('pointermove', e => {
        if (!button.hasPointerCapture(e.pointerId)) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
            dragging = true;
            clearTimeout(pressTimer);
        }

        if (dragging) {
            // จำกัดไม่ให้ลากออกนอกหน้าจอ
            const maxLeft = window.innerWidth - button.offsetWidth;
            const maxTop = window.innerHeight - button.offsetHeight;
            const left = Math.min(Math.max(0, startLeft + dx), maxLeft);
            const top = Math.min(Math.max(0, startTop + dy), maxTop);

            button.style.left = left + 'px';
            button.style.top = top + 'px';
            button.style.right = 'auto';
        }
    });

    button.addEventListener('pointerup', e => {
        clearTimeout(pressTimer);

        if (button.hasPointerCapture(e.pointerId)) {
            button.releasePointerCapture(e.pointerId);
        }

        if (dragging) {
            // บันทึกตำแหน่งใหม่
            save(KEY_POS, {
                left: parseFloat(button.style.left),
                top: parseFloat(button.style.top)
            });
            return;
        }

        if (longPressed) return; // รีเซ็ตไปแล้ว ไม่ต้องนับเป็นคลิก

        setScale(nextScale());
    });

    button.addEventListener('pointercancel', () => clearTimeout(pressTimer));

    // กันเมนูคลิกขวา/กดค้างของ browser เด้งทับ
    button.addEventListener('contextmenu', e => e.preventDefault());

    // ---------- จัดการการแสดงปุ่ม ----------
    // ตอนเต็มจอ ปุ่มต้องอยู่ใน element ที่เต็มจอ ไม่งั้นมองไม่เห็น
    function getHost() {
        const fs = document.fullscreenElement || document.webkitFullscreenElement;
        if (fs && fs.tagName !== 'VIDEO') return fs;
        return document.body;
    }

    function syncButton() {
        const show = hasVisibleVideo();

        if (!show) {
            if (button.isConnected) button.remove();
            return;
        }

        const host = getHost();
        if (host && button.parentNode !== host) {
            host.appendChild(button);
        }

        updateLabel();
    }

    updateLabel();

    // ---------- รองรับเว็บที่โหลดวิดีโอเพิ่มภายหลัง ----------
    let scheduled = false;

    function onChange() {
        if (scheduled) return;
        scheduled = true;

        // รวมการเปลี่ยนแปลงถี่ ๆ ให้ทำครั้งเดียวต่อเฟรม
        requestAnimationFrame(() => {
            scheduled = false;
            syncButton();

            if (scale !== 1) {
                applyZoom();
            }
        });
    }

    const observer = new MutationObserver(onChange);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);

    syncButton();

    if (scale !== 1) {
        applyZoom();
    }
})();
