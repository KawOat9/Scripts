// ==UserScript==
// @name         Force User-Agent
// @version      1.0.0
// @author       𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @match        *://ddgksf2013.top/*
// @match        *://*.ddgksf2013.top/*
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/Agent.png
// @description  Force User-Agent to Quantumult X for ddgksf2013.top
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const UA = "Quantumult X/1.5.0 (iPhone; iOS 16.0; Scale/3.00)";

    // 覆盖 navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
        get: function () {
            return UA;
        },
        configurable: true
    });

    // 兼容部分站点
    Object.defineProperty(navigator, 'appVersion', {
        get: function () {
            return UA;
        },
        configurable: true
    });

    console.log("[UA Spoofed]", navigator.userAgent);
})();