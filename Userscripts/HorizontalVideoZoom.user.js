// ==UserScript==
// @name         Horizontal Video Zoom
// @namespace    local.video.zoom
// @version      1.0
// @author       𝗞𝗮𝘄𝗢𝗮𝘁✨
// @description  Expand video horizontally without increasing height
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/addons_scripts.png
// @match        *://*/*
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const states = new WeakMap();
    let scale = 1.0;

    const button = document.createElement('button');

    button.textContent = '↔ ขยายแนวนอน: ปิด';

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
        cursor: 'pointer'
    });

    function findVideos() {
        return document.querySelectorAll('video');
    }

    function applyZoom() {
        findVideos().forEach(video => {
            if (!states.has(video)) {
                states.set(video, {
                    transform: video.style.transform,
                    origin: video.style.transformOrigin
                });
            }

            const original = states.get(video);

            if (scale === 1) {
                video.style.transform = original.transform;
                video.style.transformOrigin = original.origin;
            } else {
                video.style.setProperty(
                    'transform',
                    `scaleX(${scale})`,
                    'important'
                );

                video.style.setProperty(
                    'transform-origin',
                    'center center',
                    'important'
                );
            }
        });

        button.textContent =
            scale === 1
                ? '↔ ขยายแนวนอน: ปิด'
                : `↔ ขยายแนวนอน: ${Math.round(scale * 100)}%`;
    }

    button.addEventListener('click', () => {
        // กดวนเปลี่ยนขนาด: ปกติ → 120% → 140% → 160% → ปกติ
        if (scale === 1) {
            scale = 1.2;
        } else if (scale < 1.3) {
            scale = 1.4;
        } else if (scale < 1.5) {
            scale = 1.6;
        } else {
            scale = 1;
        }

        applyZoom();
    });

    function addButton() {
        if (!button.isConnected && document.body) {
            document.body.appendChild(button);
        }
    }

    addButton();

    // รองรับเว็บไซต์ที่โหลดวิดีโอเพิ่มภายหลัง
    const observer = new MutationObserver(() => {
        addButton();

        if (scale !== 1) {
            applyZoom();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
