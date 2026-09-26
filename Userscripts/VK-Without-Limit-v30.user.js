// ==UserScript==
// @name         VK Without Limit v3.0
// @namespace    https://greasyfork.org/en/users/8-decembre
// @version      3.00
// @description  Hide VK login/unauthenticated overlays and restore page scrolling
// @author       decembre
// @license      Unlicense
// @run-at       document-start
// @match        *://vk.com/*
// @match        *://*.vk.com/*
// @match        *://vk.ru/*
// @match        *://*.vk.ru/*
// @grant        GM_addStyle
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/vk.png
// @downloadURL  
// @updateURL    
// ==/UserScript==

(function () {
    'use strict';

    const css = `
        /* =========================================
           VK Without Limit v3.0
           ========================================= */

        /* Login / unauthenticated overlays */
        #box_layer_bg,
        #box_layer,
        #box_layer_wrap,
        #layer_wrap,
        .scroll_fix_wrap #box_layer,
        .popup_box_container.UnauthActionBoxContainer,
        .UnauthActionBoxContainer,
        [class*="UnauthActionBox"],
        [class*="unauth"],
        [class*="login_popup"],
        [class*="LoginPopup"],
        [class*="AuthPopup"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }

        /* Bottom login banners */
        #page_bottom_banners_root,
        [class*="bottom_banner"],
        [class*="BottomBanner"] {
            display: none !important;
        }

        /* Restore scrolling */
        html,
        body,
        body.layers_shown,
        .anonym.anonym_nav,
        .anonym.anonym_nav.layers_shown,
        .anonym.anonym_nav.redesign_web.layers_shown,
        .anonym.anonym_nav.new_header_design.layers_shown {
            overflow: auto !important;
            overflow-x: hidden !important;
        }

        /* Don't let hidden VK layers block the page */
        #box_layer_wrap,
        #layer_wrap,
        .scroll_fix_wrap {
            pointer-events: none !important;
        }

        /* But keep the actual page interactive */
        #page_wrap,
        #page_body,
        #content,
        .page_block {
            pointer-events: auto !important;
        }
    `;

    if (typeof GM_addStyle === 'function') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    /*
     * VK เป็น SPA และสามารถสร้าง popup ใหม่หลังจากโหลดหน้า
     * จึงตรวจ DOM ที่ถูกเพิ่มเข้ามาอีกครั้ง
     */
    const selectors = [
        '#box_layer_bg',
        '#box_layer',
        '#box_layer_wrap',
        '#layer_wrap',
        '.UnauthActionBoxContainer',
        '[class*="UnauthActionBox"]',
        '[class*="login_popup"]',
        '[class*="LoginPopup"]',
        '[class*="AuthPopup"]'
    ];

    function clean() {
        for (const selector of selectors) {
            document.querySelectorAll(selector).forEach(el => {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('pointer-events', 'none', 'important');
            });
        }

        document.documentElement.style.setProperty(
            'overflow',
            'auto',
            'important'
        );

        if (document.body) {
            document.body.style.setProperty(
                'overflow',
                'auto',
                'important'
            );
        }
    }

    // Initial cleanup
    clean();

    // Watch dynamically-created VK dialogs
    const observer = new MutationObserver(() => {
        clean();
    });

    function startObserver() {
        if (!document.documentElement) return;

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        clean();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver, {
            once: true
        });
    } else {
        startObserver();
    }

})();