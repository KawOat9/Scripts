// ==UserScript==
// @name         Force User-Agent
// @version      1.1.0
// @author       KawOatツ
// @match        *://ddgksf2013.top/*
// @match        *://*.ddgksf2013.top/*
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/Agent.png
// @description  Force User-Agent to Quantumult X for ddgksf2013.top
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const UA = "Quantumult X/1.5.0 (iPhone; iOS 16.0; Scale/3.00)";
    const platform = "iPhone";  // Platform for spoofing
    const appVersion = "5.0 (iPhone; iOS 16.0; Scale/3.00)";

    // Overriding navigator.userAgent
    try {
        Object.defineProperty(navigator, 'userAgent', {
            get: function () {
                return UA;
            },
            configurable: true
        });

        // Overriding navigator.appVersion
        Object.defineProperty(navigator, 'appVersion', {
            get: function () {
                return appVersion;
            },
            configurable: true
        });

        // Overriding navigator.platform (optional, but good for consistency)
        Object.defineProperty(navigator, 'platform', {
            get: function () {
                return platform;
            },
            configurable: true
        });

        console.log("[UA Spoofed]", navigator.userAgent);
    } catch (e) {
        console.error("Failed to override userAgent properties:", e);
    }
})();