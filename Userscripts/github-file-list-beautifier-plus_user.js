// ==UserScript==
// @name               GitHub file list beautifier
// @name:th            GitHub โปรแกรมตกแต่งรายการไฟล์
// @description        Adds colors to files by type, displays small images in place of file-type icons in a repository source tree
// @description:th     GitHub File List Beautifier เป็นสคริปต์ผู้ใช้，ใช้เพื่อเพิ่มประสิทธิภาพ GitHub แสดงเอฟเฟกต์ของไฟล์ในคลังสินค้า
// @license            MIT
// @version            2026.5.23.4
// @match              https://github.com/*
// @run-at             document-idle
// @grant              GM_getValue
// @grant              GM_setValue
// @compatible         chrome
// @compatible         firefox
// @compatible         edge
// @compatible         opera
// @compatible         safari
// @author             𝗞𝗮𝘄𝗢𝗮𝘁✨
// @icon               https://raw.githubusercontent.com/KawOat9/icons/main/Git/ChinaGodMan.png
// ==/UserScript==

'use strict';

// ── Inline color/icon map (no network request needed) ─────────────────────────
const BUILTIN_COLORS = {
  "js":        { "color": "#b07219", "icon": "javascript" },
  "license":   { "color": "red",     "icon": "license" },
  "jsx":       { "color": "#b07219", "icon": "javascript" },
  "ts":        { "color": "#007acc", "icon": "typescript" },
  "docs":      { "color": "#e67e22", "icon": "typescript" },
  "css":       { "color": "#e67e22", "icon": "css" },
  "html":      { "color": "#3498db", "icon": "html" },
  "md":        { "color": "#6e5494", "icon": "markdown" },
  "readme.md": { "color": "#e67e22", "icon": "readme" },
  "json":      { "color": "#e44b23", "icon": "json" },
  "xml":       { "color": "#e44b23", "icon": "xml" },
  "yml":       { "color": "#e44b23", "icon": "yaml" },
  "yaml":      { "color": "#e44b23", "icon": "yaml" },
  "py":        { "color": "#3572a5", "icon": "python" },
  "java":      { "color": "#b07219", "icon": "java" },
  "c":         { "color": "#555555", "icon": "c" },
  "cpp":       { "color": "#f34b7d", "icon": "cpp" },
  "h":         { "color": "#f34b7d", "icon": "h" },
  "go":        { "color": "#00add8", "icon": "go" },
  "rb":        { "color": "#701516", "icon": "ruby" },
  "php":       { "color": "#4f5d95", "icon": "php" },
  "swift":     { "color": "#ffac45", "icon": "swift" },
  "pl":        { "color": "#0298c3", "icon": "pl" },
  "sh":        { "color": "#89e051", "icon": "console" },
  "bat":       { "color": "#4eaa25", "icon": "console" },
  "ps1":       { "color": "#0298c3", "icon": "powershell" },
  "ttf":       { "color": "#f39c12", "icon": "font" },
  "exe":       { "color": "#f39c12", "icon": "exe" },
  "dll":       { "color": "#f39c12", "icon": "dll" },
  "apk":       { "color": "#4caf50", "icon": "android" },
  "img":       { "color": "#ff5722", "icon": "image" },
  "doc":       { "color": "#2e77c0", "icon": "document" },
  "zip":       { "color": "#9b59b6", "icon": "zip" },
  "rar":       { "color": "#9b59b6", "icon": "zip" },
  "7z":        { "color": "#9b59b6", "icon": "zip" },
  "tar":       { "color": "#9b59b6", "icon": "zip" },
  "gz":        { "color": "#9b59b6", "icon": "zip" },
  "bz2":       { "color": "#9b59b6", "icon": "zip" },
  "xz":        { "color": "#9b59b6", "icon": "zip" },
  "log":       { "color": "#7f8c8d", "icon": "log" },
  "txt":       { "color": "#42a5f5", "icon": "document" },

  // ── Loon ──────────────────────────────────────────────────────────────────
  // Loon proxy app (iOS) – orange brand color
  "lpx":       { "color": "#ff7f00", "icon": "zip" },        // Loon plugin bundle (zip-like)
  "plugin":    { "color": "#ff7f00", "icon": "settings" },  // Loon plugin config

  // ── Shadowrocket ──────────────────────────────────────────────────────────
  // Shadowrocket proxy app (iOS) – red rocket brand color
  "sgmodule":  { "color": "#e74c3c", "icon": "settings" },  // Shadowrocket module
  "module":    { "color": "#c0392b", "icon": "settings" }   // generic module (shared with Surge etc.)
};

// ── Folder name → color/icon map ──────────────────────────────────────────────
const FOLDER_COLORS = {
  // Your repo folders (KawOat9/Scripts)
  "loon":          { "color": "#ff7f00", "icon": "folder-loon" },
  "shadowrocket":  { "color": "#e74c3c", "icon": "folder-shadowrocket" },
  "scriptable":    { "color": "#1e90ff", "icon": "folder-javascript" },
  "userscripts":   { "color": "#b07219", "icon": "folder-javascript" },
  "@mobileconfig": { "color": "#34c759", "icon": "folder-config" },
  "css":           { "color": "#e67e22", "icon": "folder-css" },
  // Common dev folders
  "src":           { "color": "#4fc3f7", "icon": "folder-src" },
  "dist":          { "color": "#81c784", "icon": "folder-dist" },
  "docs":          { "color": "#9575cd", "icon": "folder-docs" },
  "test":          { "color": "#ff8a65", "icon": "folder-test" },
  "tests":         { "color": "#ff8a65", "icon": "folder-test" },
  "scripts":       { "color": "#b07219", "icon": "folder-scripts" },
  "public":        { "color": "#4db6ac", "icon": "folder-public" },
  "assets":        { "color": "#f06292", "icon": "folder-images" },
  "images":        { "color": "#f06292", "icon": "folder-images" },
  "img":           { "color": "#f06292", "icon": "folder-images" },
  "config":        { "color": "#90a4ae", "icon": "folder-config" },
  "node_modules":  { "color": "#616161", "icon": "folder-node" },
  ".github":       { "color": "#aaaaaa", "icon": "folder-github" },
};

// ── Merge with any user-saved overrides (GM_getValue safe on iOS) ─────────────
let customColors = BUILTIN_COLORS;
try {
  const saved = (typeof GM_getValue === 'function') ? GM_getValue('fileTypesColors', {}) : {};
  if (saved && typeof saved === 'object' && Object.keys(saved).length > 0) {
    customColors = Object.assign({}, BUILTIN_COLORS, saved);
  }
} catch (e) { /* GM_getValue not available – use builtin only */ }

// ── Config ────────────────────────────────────────────────────────────────────
var addIcon = true;

let savedConfig = {};
try { savedConfig = JSON.parse(localStorage.FileListBeautifier) || {}; } catch (e) {}
const config = Object.assign({},
  ...Object.entries({
    iconSize: 24,
    colorSeed1: 13,
    colorSeed2: 1299721,
    colorSeed3: 179426453
  }).map(([k, v]) => ({ [k]: +savedConfig[k] || v }))
);

const IMG_CLS = 'wOxxOm-image-icon';
const rxImages = /^(png|jpe?g|bmp|gif|webp|cur|ico|svg)$/i;
const styleQueue = [];

const styleEl = document.createElement('style');
styleEl.textContent = `
  .${IMG_CLS} {
    width: ${config.iconSize}px !important;
    height: ${config.iconSize}px !important;
    object-fit: scale-down !important;
    margin: 0 -4px !important;
  }
  .qinwuyuan-file-icon {
    width: 16px !important;
    height: 16px !important;
    object-fit: scale-down !important;
    margin: 0 -4px !important;
  }
  a[file-type=":folder"] {
    font-weight: bold !important;
  }
`;
(document.head || document.documentElement).appendChild(styleEl);
const sheet = styleEl.sheet;

const filetypes = {};
const ME = 'ghflb_processed';
let lumaBias, lumaFix, lumaAmp;
let obStarted = false;

// ── Selectors: support both old and new GitHub DOM ────────────────────────────
// New React GitHub: .react-directory-truncate inside [role="row"] or <tr>
// Old GitHub:       .js-navigation-open (anchor directly)
const ITEM_SELECTORS = [
  '.react-directory-truncate',   // new GitHub
  '.js-navigation-open',         // old GitHub
  '[data-testid="file-row-name-cell"] a', // another GitHub variant
  'a.Link--primary[href*="/blob/"]',       // fallback blob links
  'a.Link--primary[href*="/tree/"]',       // fallback tree (folder) links
].join(', ');

function start() {
  beautify();
  if (!obStarted) {
    obStarted = true;
    new MutationObserver(() => beautify())
      .observe(document.body || document.documentElement, { subtree: true, childList: true });
  }
}

function beautify() {
  const candidates = document.querySelectorAll(ITEM_SELECTORS);
  for (const el of candidates) {
    // Deduplicate
    if (el[ME]) continue;
    el[ME] = true;

    const isAnchor = el.tagName === 'A';
    const a = isAnchor ? el : el.querySelector('a') || el.closest('a');
    const url = a && a.href;
    if (!url) continue;

    // Find the nearest SVG icon (file/folder indicator)
    const row = el.closest('tr, [role="row"], .js-navigation-item, td');
    const icon = row ? row.querySelector('svg') : null;

    // Folder detection
    if (icon) {
      const cls = icon.className && (typeof icon.className === 'string'
        ? icon.className
        : icon.className.baseVal || '');
      if (
        cls.includes('octicon-file-directory') ||
        cls.includes('icon-directory') ||
        icon.getAttribute('aria-label') === 'Directory'
      ) {
        // Get folder name from URL
        const folderName = url.split('/').pop().split('?')[0].toLowerCase();
        const folderCfg = FOLDER_COLORS[folderName];

        a.setAttribute('file-type', ':folder');

        if (folderCfg) {
          // Apply folder color via inline style (simpler than dynamic CSS rule)
          a.style.setProperty('color', folderCfg.color, 'important');

          // Replace folder icon if configured
          if (addIcon && folderCfg.icon) {
            // Try vscode-material-icon-theme folder icons
            // folder icons use the pattern: folder-name.svg (open variant available too)
            const iconName = folderCfg.icon.startsWith('folder-')
              ? folderCfg.icon          // e.g. folder-src, folder-css
              : `folder-${folderCfg.icon}`;
            const iconUrl = `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${iconName}.svg`;
            const img = createElement('img', {
              className: 'qinwuyuan-file-icon',
              src: iconUrl,
              alt: folderName
            });
            // Fallback: if icon 404s, revert to default SVG
            img.onerror = () => img.replaceWith(icon);
            icon.replaceWith(img);
          }
        }
        continue;
      }
    }

    // Resolve extension / filename
    const rawName = url.split('/').pop().split('?')[0].toLowerCase();
    const extMatch = rawName.match(/\.(\w+)$/);
    let ext = extMatch ? extMatch[1] : rawName;
    if (customColors[rawName]) ext = rawName; // full-filename override (e.g. readme.md)

    a.setAttribute('file-type', ext);

    const cfg = customColors[rawName] || customColors[ext];
    const customIcon = cfg && cfg.icon ? cfg.icon : null;

    if (!filetypes[ext]) addFileTypeStyle(ext);

    // Replace icon
    if (icon && customIcon && addIcon) {
      let iconUrl = customIcon;
      if (!iconUrl.startsWith('https://') && !iconUrl.startsWith('data:image')) {
        iconUrl = `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${iconUrl}.svg`;
      }
      const img = createElement('img', {
        className: 'qinwuyuan-file-icon',
        src: iconUrl,
        alt: ext
      });
      icon.replaceWith(img);
    } else if (icon && rxImages.test(ext)) {
      const m = url.match(/github\.com\/(.+?\/)blob\/(.*)$/);
      const next = icon.nextElementSibling;
      if (!m || (next && next[ME])) continue;
      const img = createElement('img', {
        className: IMG_CLS,
        src: `https://raw.githubusercontent.com/${m[1]}${m[2]}`
      });
      img[ME] = true;
      icon.replaceWith(img);
    }
  }
}

function addFileTypeStyle(type) {
  filetypes[type] = true;
  styleQueue.push(type);
  requestAnimationFrame(commitStyleQueue);
}

function commitStyleQueue() {
  if (!lumaAmp) initLumaScale();
  const seed2 = config.colorSeed2;
  const seed3 = config.colorSeed3;
  for (const type of styleQueue) {
    const colorConfig = customColors[type];
    try {
      if (colorConfig && colorConfig.color) {
        sheet.insertRule(`a[file-type="${type}"]:not(#foo) { color: ${colorConfig.color} !important; }`);
      } else {
        const hash = calcSimpleHash(type);
        const H = hash % 360;
        const Hq = H / 60;
        const S = hash * seed2 % 50 + 50 | 0;
        const redFix = (Hq < 1 ? 1 - Hq : Hq > 4 ? (Hq - 4) / 2 : 0);
        const blueFix = (Hq < 3 || Hq > 5 ? 0 : Hq < 4 ? Hq - 3 : 5 - Hq) * 3;
        const L = hash * seed3 % lumaAmp + lumaBias + (redFix + blueFix) * lumaFix * S / 100 | 0;
        sheet.insertRule(`a[file-type="${type}"]:not(#foo) { color: hsl(${H},${S}%,${L}%) !important; }`);
      }
    } catch (e) { /* insertRule can fail on some CSP pages */ }
  }
  styleQueue.length = 0;
}

function calcSimpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++)
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
  return Math.abs(hash * config.colorSeed1 | 0);
}

function initLumaScale() {
  try {
    const [, r, g, b] = getComputedStyle(document.body).backgroundColor.split(/[^\d.]+/).map(parseFloat);
    const isDark = (r * .2126 + g * .7152 + b * .0722) < 128;
    [lumaBias, lumaAmp, lumaFix] = isDark ? [30, 50, 12] : [25, 15, 0];
  } catch (e) {
    [lumaBias, lumaAmp, lumaFix] = [25, 15, 0];
  }
}

function createElement(tag, props) {
  return Object.assign(document.createElement(tag), props);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
// @run-at document-idle → body exists; still wait for DOMContentLoaded safety
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

// GitHub is a SPA – also re-run on pushState navigation
(function patchHistory() {
  const _push = history.pushState.bind(history);
  history.pushState = function (...args) {
    _push(...args);
    setTimeout(start, 400); // let React render first
  };
  window.addEventListener('popstate', () => setTimeout(start, 400));
})();
