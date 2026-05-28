// ==UserScript==
// @name         Force User-Agent X Spoof
// @version      1.2.0
// @author       𝗞𝗮𝘄𝗢𝗮𝘁.𝗗𝗘𝗩 ✨
// @match        *://ddgksf2013.top/*
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/Agent.png
// @description  v1.2.0 Advanced Quantumult X Spoof Force User-Agent for ddgksf2013.top
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const UA = "Quantumult X/1.5.0 (iPhone; iOS 16.0; Scale/3.00)";

    function spoof(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            get: () => value,
            configurable: false,
            enumerable: true
        });
    }

    // Basic navigator spoof
    spoof(navigator, 'userAgent', UA);
    spoof(navigator, 'appVersion', UA);
    spoof(navigator, 'platform', 'iPhone');
    spoof(navigator, 'vendor', 'Apple Computer, Inc.');
    spoof(navigator, 'maxTouchPoints', 5);

    // Chromium UAData spoof
    spoof(navigator, 'userAgentData', {
        brands: [
            { brand: "Apple", version: "16" }
        ],
        mobile: true,
        platform: "iOS"
    });

    // Screen spoof
    spoof(screen, 'width', 390);
    spoof(screen, 'height', 844);

    // Touch support
    window.ontouchstart = true;

    // fetch spoof
    const originalFetch = window.fetch;

    window.fetch = function(resource, config = {}) {
        config.headers = config.headers || {};

        if (!config.headers['User-Agent']) {
            config.headers['User-Agent'] = UA;
        }

        return originalFetch(resource, config);
    };

    // XHR spoof
    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function () {
        this.addEventListener('readystatechange', function () {
            try {
                this.setRequestHeader('User-Agent', UA);
            } catch (e) {}
        });

        return originalOpen.apply(this, arguments);
    };

    console.log("[Quantumult X Advanced Spoof Enabled]");
})();