// ==UserScript==
// @name         JS Beautify Helper Pro (pxxjs & de4js)
// @namespace    https://github.com/yourusername/js-beautify-helper
// @description  Beautify/unreadable code helper with online/offline and loading spinner for pxxjs & de4js
// @version      1.1.0
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

function initBeautifyHelperPro() {
    const nicify = document.getElementById('nicify');
    if (!nicify) return;

    const label = nicify.nextSibling.nextSibling?.textContent || '';
    const none = document.getElementById('none');
    const input = document.getElementById('input');
    const output = document.getElementById('readable');
    const view = document.getElementById('view');

    if (!input || !output || !view || !none) return;

    // สร้าง spinner สำหรับ loading
    let spinner = document.createElement('span');
    spinner.textContent = '⏳ Loading...';
    spinner.style.display = 'none';
    spinner.style.marginLeft = '10px';
    spinner.style.color = '#f39c12';
    view.parentNode.insertBefore(spinner, view.nextSibling);

    function isOnline() {
        nicify.disabled = !navigator.onLine;
        if (!navigator.onLine) {
            spinner.style.display = 'none';
            view.textContent = '⚠ Offline: JSNice not available';
        }
        return navigator.onLine;
    }

    function jsnice() {
        if (!isOnline()) return;

        const txt = view.textContent.trim() || input.value.trim();
        if (!txt) return;

        spinner.style.display = 'inline';
        view.classList.add('waiting');

        GM.xmlHttpRequest({
            method: 'POST',
            url: 'http://jsnice.org/beautify?pretty=0&rename=1&types=0&packers=0&transpile=0&suggest=0',
            responseType: 'json',
            data: txt,
            onload: (response) => {
                spinner.style.display = 'none';
                view.classList.remove('waiting');

                let source = response?.response?.js || null;

                nicify.checked = false;
                none.checked = true;

                if (!source) {
                    view.textContent = '❌ JSNice error: cannot beautify';
                } else {
                    output.value = source;
                    output.dispatchEvent(new Event('change'));
                }
            },
            onerror: (err) => {
                spinner.style.display = 'none';
                view.classList.remove('waiting');
                console.error('JSNice request failed:', err);
                view.textContent = '❌ JSNice request failed';
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

// เรียกใช้งานเมื่อ DOM โหลดเสร็จ
window.addEventListener('DOMContentLoaded', initBeautifyHelperPro);