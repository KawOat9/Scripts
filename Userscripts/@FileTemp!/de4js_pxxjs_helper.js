// ==UserScript==
// @name         JS Beautify Helper (pxxjs & de4js)
// @namespace    https://github.com/yourusername/js-beautify-helper
// @description  Beautify and unreadable code helper for pxxjs & de4js
// @version      1.0.0
// @icon         https://i.imgur.com/CJ5MfxV.png
// @author       YourName
// @license      MIT
// @match        *://*/pxxjs/
// @match        *://*/de4js/
// @include      http://127.0.0.1:4000/pxxjs/
// @include      http://localhost:4000/pxxjs/
// @include      https://lelinhtinh.github.io/de4js/
// @include      http://127.0.0.1:4000/de4js/
// @include      http://localhost:4000/de4js/
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js?v=a834d46
// @noframes
// @connect      jsnice.org
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// ==/UserScript==

'use strict';

function initBeautifyHelper() {
    const nicify = document.getElementById('nicify');
    if (!nicify) return;

    const label = nicify.nextSibling.nextSibling?.textContent || '';
    const none = document.getElementById('none');
    const input = document.getElementById('input');
    const output = document.getElementById('readable');
    const view = document.getElementById('view');

    if (!input || !output || !view || !none) return;

    function isOnline() {
        nicify.disabled = !navigator.onLine;
        return navigator.onLine;
    }

    function jsnice() {
        if (!isOnline()) return;

        const txt = view.textContent.trim() || input.value.trim();
        if (!txt) return;

        view.classList.add('waiting');

        GM.xmlHttpRequest({
            method: 'POST',
            url: 'http://jsnice.org/beautify?pretty=0&rename=1&types=0&packers=0&transpile=0&suggest=0',
            responseType: 'json',
            data: txt,
            onload: (response) => {
                let source = response?.response?.js || null;

                nicify.checked = false;
                none.checked = true;
                view.classList.remove('waiting');

                if (!source) {
                    view.textContent = 'Unknown error from JSNice';
                } else {
                    output.value = source;
                    output.dispatchEvent(new Event('change'));
                }
            },
            onerror: (err) => {
                console.error('JSNice request failed:', err);
                view.textContent = 'JSNice request failed';
                view.classList.remove('waiting');
            },
        });
    }

    nicify.disabled = false;
    nicify.nextSibling.nextSibling.textContent = label;

    // Event listeners
    input.addEventListener('input', () => { if (nicify.checked) jsnice(); });
    nicify.addEventListener('click', () => { if (nicify.checked) jsnice(); });
    nicify.addEventListener('change', () => { if (nicify.checked) jsnice(); });
    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOnline);

    isOnline();
}

// Delay init to make sure page elements are loaded
window.addEventListener('DOMContentLoaded', initBeautifyHelper);