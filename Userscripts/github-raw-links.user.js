// ==UserScript==
// @name        GitHub Raw Links
// @version     0.1
// @description Add a button to show raw links for GitHub repository files
// @license     MIT
// @author      𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @namespace   https://github.com/KawOat9
// @match       https://github.com/*
// @run-at      document-idle
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     api.github.com
// @connect     raw.githubusercontent.com
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @updateURL   
// @downloadURL 
// ==/UserScript==

(() => {
	"use strict";

	GM.addStyle(`
		.github-raw-links { cursor:pointer; }
	`);

	const item = document.createElement("li");
	item.className = "d-inline-block mr-3";

	function addButton(node) {
		const button = item.cloneNode();
		button.innerHTML = `
			<details class="details-reset details-overlay select-menu github-raw-wrapper">
				<summary class="select-menu-button" aria-haspopup="menu">
					<span class="github-raw-links" data-menu-button>🍣 Raw URLs</span>
				</summary>
				<details-menu class="select-menu-modal position-absolute github-raw-files" style="z-index: 99;" role="menu" aria-label="Raw file links">
					<div class="select-menu-list">
						<img src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif" width="32">
					</div>
				</details-menu>
			</details>`;
		node.insertBefore(button, node.childNodes[0]);
	}

	function update() {
		const files = $$(".file");
		let indx = files.length;
		if (indx) {
			while (indx--) {
				if (!$(".github-raw-links", files[indx])) {
					addButton($(".file-actions", files[indx]));
				}
			}
		}
	}

	function addList(link, file) {
		let html = "";
		const url = `https://raw.githubusercontent.com${file.href.split("/blob/").slice(-1)}`;
		html += `
			<a href="${url}" class="select-menu-item github-raw-file" role="menuitem">
				${file.textContent.trim()}
			</a>`;
		$(".github-raw-files", link.closest("li")).innerHTML = html;
	}

	function loadFileList(link) {
		let el = link.closest("li");
		el = $("a", el && el.nextElementSibling);
		if (el) {
			const path = el.href.split("/").slice(-2).join("/");
			const repo = window.location.pathname.split("/").slice(1, 3).join("/");
			const url = `https://api.github.com/repos/${repo}/contents/${path}`;
			GM.xmlHttpRequest({
				method : "GET",
				url : url,
				onload : response => {
					if (response.status !== 200) {
						$(".github-raw-files", link.parentNode).innerHTML = response.message;
						return console.error(response);
					}
					let json = false;
					try {
						json = JSON.parse(response.responseText);
					} catch (err) {
						return console.error(`Invalid JSON for file ${path}`);
					}
					if (json && json.download_url) {
						addList(link, json);
					}
				}
			});
		}
	}

	function addBindings() {
		document.addEventListener("click", function(event) {
			const target = event.target.closest("details");
			if (target && target.classList.contains("github-raw-wrapper")) {
				loadFileList(target);
			}
		});
	}

	function $(str, el) {
		return (el || document).querySelector(str);
	}

	function $$(str, el) {
		return Array.from((el || document).querySelectorAll(str));
	}

	document.addEventListener("pjax:end", update);
	update();
	addBindings();
})();