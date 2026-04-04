// ==UserScript==
// @name         GitHub Raw Link Opener / Script-Hub Edit (Full Dark/Light Mode)
// @namespace    GitHub / Script-Hub
// @version      4.0.0
// @description  持续渲染按钮；兼容 GitHub SPA；支持 Dark/Light 模式；右下角栈叠；按钮底色 20% 透明；移除 Code Hub 按钮
// @author       𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @match        https://github.com/*
// @match        https://script.hub/*
// @match        http://script.hub/*
// @match        http://127.0.0.1:9101/*
// @grant        none
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/scripthub.png
// @updateURL    https://raw.githubusercontent.com/KawOat9/Scripts/main/Userscripts/github_rawlink_opener.user.js
// ==/UserScript==

(function () {
  "use strict";

  const STACK_ID = "__gku_stack__";
  let mo;

  init();

  function init() {
    hookHistory();
    onReady(render);
    window.addEventListener("hashchange", render);
    setupMutationObserver();
    // Detect dark/light mode changes
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkQuery.addEventListener("change", render);
  }

  function setupMutationObserver() {
    if (mo) return;
    mo = new MutationObserver(() => {
      if (!document.getElementById(STACK_ID)) render();
    });
    onReady(() => mo.observe(document.documentElement || document.body, { childList: true, subtree: true }));
  }

  function render() {
    if (!document.body) return;

    const oldStack = document.getElementById(STACK_ID);
    if (oldStack) oldStack.remove();

    const stack = document.createElement("div");
    stack.id = STACK_ID;
    stack.style.cssText = [
      "position:fixed",
      "right:12px",
      "bottom:calc(12px + env(safe-area-inset-bottom,0px))",
      "display:flex",
      "flex-direction:column",
      "gap:8px",
      "z-index:2147483647",
      "pointer-events:auto",
    ].join(";") + ";";

    document.body.appendChild(stack);

    const isDark = getComputedStyle(document.documentElement).getPropertyValue('--color-bg-primary') || false;

    if (location.host === "github.com") {
      stack.appendChild(createButton("Open Raw", openRawLink, [0, 200, 83], isDark));
      stack.appendChild(createButton("Open ScriptHub", openScriptHubLink, [156, 39, 176], isDark));
    }

    if (/script\.hub|127\.0\.0\.1:9101/.test(location.host)) {
      stack.appendChild(createButton("Open Script-Hub Editor", reEditLink, [255, 152, 0], isDark));
    }
  }

  function createButton(text, onClick, rgb, darkMode) {
    const [r, g, b] = rgb;
    const bgAlpha = darkMode ? 0.25 : 0.2;
    const borderAlpha = darkMode ? 0.65 : 0.55;
    const shadowAlpha = darkMode ? 0.5 : 0.35;
    const rgba = `rgba(${r},${g},${b},${bgAlpha})`;
    const border = `rgba(${r},${g},${b},${borderAlpha})`;
    const shadow = `rgba(${r},${g},${b},${shadowAlpha})`;

    const btn = document.createElement("button");
    btn.textContent = text;
    btn.type = "button";

    Object.assign(btn.style, {
      background: rgba,
      color: "#fff",
      border: `1px solid ${border}`,
      borderRadius: "14px",
      padding: "8px 14px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: ".2px",
      textShadow: "0 1px 1px rgba(0,0,0,.5)",
      boxShadow: `0 6px 16px ${shadow}`,
      cursor: "pointer",
      userSelect: "none",
      outline: "none",
      minWidth: "112px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      transition: "all 0.15s ease",
    });

    btn.addEventListener("mouseenter", () => btn.style.boxShadow = `0 10px 22px ${shadow}`);
    btn.addEventListener("mouseleave", () => btn.style.boxShadow = `0 6px 16px ${shadow}`);
    btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.98)");
    btn.addEventListener("mouseup", () => btn.style.transform = "none");
    btn.addEventListener("click", onClick);

    return btn;
  }

  // --- 功能 ---
  function getRawUrl() {
    return location.href.replace("/blob", "").replace("github.com", "raw.githubusercontent.com");
  }

  function openRawLink() {
    window.open(getRawUrl(), "_blank");
  }

  function openScriptHubLink() {
    const url = `http://script.hub/convert/_start_/${getRawUrl()}/_end_/plain.txt?type=plain-text&target=plain-text`;
    window.open(url, "_blank");
  }

  function reEditLink() {
    const url = location.href.replace(/\/(convert|file)\//, "/edit/");
    window.open(url, "_blank");
  }

  // --- 工具 ---
  function onReady(fn) {
    if (["complete", "interactive"].includes(document.readyState)) fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  }

  function hookHistory() {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (...args) {
      const ret = pushState.apply(this, args);
      setTimeout(render, 0);
      return ret;
    };

    history.replaceState = function (...args) {
      const ret = replaceState.apply(this, args);
      setTimeout(render, 0);
      return ret;
    };

    window.addEventListener("popstate", render);
  }

})();