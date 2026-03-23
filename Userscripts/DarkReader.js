// ==UserScript==
// @name        Dark Reader✨
// @namespace   darkreader.org
// @version     1.0.0
// @description Dark Mode for every website
// @author      KawOatツ
// @match       *://*/*
// @grant       GM_addStyle
// @icon        https://raw.githubusercontent.com/darkreader/darkreader.github.io/master/images/darkreader-mascot.svg
// @require https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js
// @license MIT
// ==/UserScript==

// Enable when the system color scheme is dark.
DarkReader.auto({
    brightness: 100,
    contrast: 90,
    sepia: 10
});