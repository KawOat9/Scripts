// ==UserScript==
// @name         App-Friendly Script Installer
// @version      0.1.0
// @description  เพิ่มปุ่ม Stay และ Addons บนหน้า Greasy Fork / Sleazy Fork
// @author       npc
// @exclude      *://greasyfork.org/*/scripts?q=*
// @exclude      *://greasyfork.org/*/scripts/by-site/*
// @exclude      *://sleazyfork.org/*/scripts?q=*
// @exclude      *://sleazyfork.org/*/scripts/by-site/*
// @match        *://greasyfork.org/*/scripts/*
// @match        *://sleazyfork.org/*/scripts/*
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/addons_scripts.png
// @updateURL    https://raw.githubusercontent.com/KawOat9/Scripts/main/Userscripts/App(Stay_Addons).user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ฟังก์ชันช่วยสร้างปุ่ม
    function createButton(label, href, width) {
        let btn = document.createElement("a");
        btn.textContent = label;
        btn.className = installBtn.className || "";
        btn.href = href;
        btn.style.color = "#FFF";
        btn.style.background = "#1E971E";
        btn.style.width = width + "px";
        btn.style.border = "0.5px solid lightgray";
        btn.style.textAlign = "center";
        btn.style.padding = "4px 8px";
        btn.style.marginLeft = "4px";
        btn.style.borderRadius = "4px";
        btn.style.textDecoration = "none";
        btn.style.fontWeight = "bold";
        btn.target = "_blank"; // ป้องกันโหลดแท็บปัจจุบัน
        return btn;
    }

    // ตรวจสอบว่ามีปุ่มติดตั้งเดิมหรือไม่
    let installBtn = document.querySelector("a.install-link");
    if (!installBtn) return; // ถ้าไม่มีปุ่มติดตั้ง เดินหน้าไม่ต่อ

    // ปุ่ม Stay
    let stayURL = "stay://x-callback-url/install?scriptURL=" + encodeURIComponent(installBtn.href);
    let buttonStay = createButton("Stay", stayURL, 50);
    installBtn.parentNode.insertBefore(buttonStay, installBtn.nextSibling);

    // ปุ่ม Addons
    let encodedURL = btoa(encodeURIComponent(installBtn.href));
    let addonsURL = "addons://installJS?command=20&url=" + encodedURL;
    let buttonAddons = createButton("Addons", addonsURL, 65);
    installBtn.parentNode.insertBefore(buttonAddons, buttonStay.nextSibling);

    // ซ่อนลิงก์ช่วยติดตั้งถ้ามี
    const helpLink = document.querySelector('a.install-help-link');
    if (helpLink) helpLink.style.display = 'none';

    // ปรับการตอบสนองแบบ Hover (เพิ่มความสวยงาม)
    [buttonStay, buttonAddons].forEach(btn => {
        btn.addEventListener("mouseover", () => btn.style.background = "#169116");
        btn.addEventListener("mouseout", () => btn.style.background = "#1E971E");
    });

})();