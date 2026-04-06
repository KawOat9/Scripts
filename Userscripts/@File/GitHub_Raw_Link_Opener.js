// ==UserScript==
// @name         GitHub Raw Link Opener / Script-Hub Edit (Optimized)
// @namespace    GitHub / Script-Hub
// @version      5.0.0
// @description  Smart render, better dark mode detect, performance optimized
// @author       KawOat ✨
// @match        https://github.com/*
// @match        https://script.hub/*
// @match        http://127.0.0.1:9101/*
// @grant        none
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/scripthub.png
// ==/UserScript==

(function () {
  "use strict";

  const STACK_ID = "__gku_stack__";
  let mo, lastUrl = location.href;

  init();

  function init() {
    hookHistory();
    onReady(render);

    window.addEventListener("hashchange", render);

    // Detect theme change properly
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", render);

    setupObserver();
  }

  // 🔍 Smart observer (ลด spam)
  function setupObserver() {
    if (mo) return;

    mo = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        render();
      }
    });

    onReady(() => {
      mo.observe(document.body, { childList: true, subtree: true });
    });
  }

  function render() {
    if (!document.body) return;

    let stack = document.getElementById(STACK_ID);

    // ♻️ reuse stack (ไม่ลบ-สร้างใหม่)
    if (!stack) {
      stack = document.createElement("div");
      stack.id = STACK_ID;
      stack.style.cssText = `
        position:fixed;
        right:12px;
        bottom:calc(12px + env(safe-area-inset-bottom,0px));
        display:flex;
        flex-direction:column;
        gap:8px;
        z-index:2147483647;
      `;
      document.body.appendChild(stack);
    }

    stack.innerHTML = ""; // เคลียร์เฉพาะปุ่ม

    const isDark = document.documentElement.classList.contains("dark") ||
                   window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (location.host === "github.com") {
      stack.appendChild(createButton("Open Raw", openRawLink, [0, 200, 83], isDark));
      stack.appendChild(createButton("Open ScriptHub", openScriptHubLink, [156, 39, 176], isDark));
    }

    if (/script\.hub|127\.0\.0\.1:9101/.test(location.host)) {
      stack.appendChild(createButton("Open Editor", reEditLink, [255, 152, 0], isDark));
    }
  }

  function createButton(text, onClick, rgb, darkMode) {
    const [r, g, b] = rgb;

    const btn = document.createElement("button");
    btn.textContent = text;

    Object.assign(btn.style, {
      background: `rgba(${r},${g},${b},${darkMode ? 0.25 : 0.2})`,
      color: "#fff",
      border: `1px solid rgba(${r},${g},${b},${darkMode ? 0.65 : 0.55})`,
      borderRadius: "14px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: "600",
      backdropFilter: "blur(8px)",
      cursor: "pointer",
      transition: "all 0.15s ease",
      minWidth: "112px",
    });

    btn.onmouseenter = () => btn.style.transform = "translateY(-1px)";
    btn.onmouseleave = () => btn.style.transform = "none";
    btn.onclick = onClick;

    return btn;
  }

  // --- 功能 ---
  function getRawUrl() {
    let url = location.href;

    // รองรับหลายรูปแบบ
    if (url.includes("/blob/")) {
      return url.replace("/blob/", "/").replace("github.com", "raw.githubusercontent.com");
    }

    if (url.includes("/raw/")) {
      return url.replace("github.com", "raw.githubusercontent.com");
    }

    return url;
  }

  function openRawLink() {
    window.open(getRawUrl(), "_blank");
  }

  function openScriptHubLink() {
    const url = `https://script.hub/convert/_start_/${getRawUrl()}/_end_/plain.txt`;
    window.open(url, "_blank");
  }

  function reEditLink() {
    const url = location.href.replace(/\/(convert|file)\//, "/edit/");
    window.open(url, "_blank");
  }

  // --- 工具 ---
  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function hookHistory() {
    const push = history.pushState;
    const replace = history.replaceState;

    history.pushState = function (...args) {
      const r = push.apply(this, args);
      render();
      return r;
    };

    history.replaceState = function (...args) {
      const r = replace.apply(this, args);
      render();
      return r;
    };

    window.addEventListener("popstate", render);
  }

})();