// ==UserScript==
// @name        Wide GitHub Navbar Toggle
// @namespace   https://github.com/xthexder/wide-github
// @description Expand all GitHub pages to full width with a navbar toggle button
// @version     2.1.0
// @author       𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @match       https://github.com/*
// @match       https://gist.github.com/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
  'use strict';

  // ---------------------------
  // 1. CSS for Wide GitHub + Toggle Navbar Button
  // ---------------------------
  const styleSheet = `
    /* Wide GitHub CSS */
    body:not(.wgh-disabled) .application-main .container-xl { max-width: none !important; }
    body:not(.wgh-disabled) .application-main .container-lg { max-width: none !important; margin-left:0 !important; }
    body:not(.wgh-disabled) .react-repos-overview-margin { margin-right:0; }
    body:not(.wgh-disabled) #js-repo-pjax-container div[style^="--sticky-pane-height:"] > div[class^='Box-sc-']:first-child { max-width:none; }
    body:not(.wgh-disabled) .application-main .col-11 { width:100%; }
    body:not(.wgh-disabled) #js-repo-pjax-container .js-issue-row .text-right { max-width:303px !important; }

    /* React layout 2024–2026 */
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='Box-sc-'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='prc-PageLayout-Content-'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='ThreePanesLayout-module__ThreePanesLayoutMiddleOnlyPane-'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='ThreePanesLayout-module__ThreePanesLayoutMiddleOnlyPane__'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='IssueViewer-module__issueViewerContainer-'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='ContentWrapper-module__contentContainer--'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='ContentWrapper-module__contentContainer__'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='IssueCreatePage-module__createPaneContainer-'],
    body:not(.wgh-disabled) .application-main div[data-target="react-app.reactRoot"] div[class^='prc-PageLayout-PageLayoutWrapper-'] { max-width:none; }

    /* Navbar toggle button */
    #wideGithubNavbarToggle {
      font-size: 12px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      margin-left: 8px;
      transition: all 0.2s ease;
    }
    #wideGithubNavbarToggle.enabled { background-color: #2ea44f; color: white; }
    #wideGithubNavbarToggle.disabled { background-color: #d73a49; color: white; }
  `;

  const styleElem = document.createElement('style');
  styleElem.type = 'text/css';
  styleElem.innerHTML = styleSheet;
  (document.head || document.documentElement).appendChild(styleElem);

  // ---------------------------
  // 2. Enable/Disable Wide GitHub
  // ---------------------------
  function setWideGithub(enable) {
    if(enable) {
      document.body.classList.remove('wgh-disabled');
      toggleBtn.classList.remove('disabled');
      toggleBtn.classList.add('enabled');
      toggleBtn.textContent = 'Wide GitHub: ON';
    } else {
      document.body.classList.add('wgh-disabled');
      toggleBtn.classList.remove('enabled');
      toggleBtn.classList.add('disabled');
      toggleBtn.textContent = 'Wide GitHub: OFF';
    }
    localStorage.setItem('wideGithubEnabled', enable);
  }

  // ---------------------------
  // 3. Create Toggle Button in Navbar
  // ---------------------------
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'wideGithubNavbarToggle';
  toggleBtn.addEventListener('click', () => {
    const enabled = !document.body.classList.contains('wgh-disabled');
    setWideGithub(!enabled);
  });

  function appendButton() {
    const navbar = document.querySelector('header.Header div.Header-item:last-child');
    if(navbar && !document.getElementById('wideGithubNavbarToggle')) {
      navbar.appendChild(toggleBtn);
    }
  }

  // Observe navbar in case of PJAX navigation
  const observer = new MutationObserver(() => {
    appendButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // ---------------------------
  // 4. Initialize state
  // ---------------------------
  const saved = localStorage.getItem('wideGithubEnabled');
  setWideGithub(saved === null ? true : saved === 'true');

})();