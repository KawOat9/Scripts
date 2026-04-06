// ==UserScript==
// @name         Addons & Stay Script Installer
// @version      0.1.0
// @description  Add "Stay" & "Addons" buttons to Greasy Fork / Sleazy Fork pages
// @author       𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @exclude      *://greasyfork.org/*/scripts?q=*
// @exclude      *://greasyfork.org/*/scripts/by-site/*
// @exclude      *://sleazyfork.org/*/scripts?q=*
// @exclude      *://sleazyfork.org/*/scripts/by-site/*
// @match        *://greasyfork.org/*/scripts/*
// @match        *://sleazyfork.org/*/scripts/*
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/addons_scripts.png
// @updateURL    
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // ตรวจสอบว่ามีปุ่มติดตั้งสคริปต์หรือไม่
    let installBtn = document.querySelector("a.install-link");
    if (!installBtn) return; // ถ้าไม่มีปุ่มติดตั้งก็ไม่ทำอะไร

    // ใช้ความกว้างของปุ่มติดตั้งสคริปต์เป็นขนาดของปุ่มใหม่
    let installBtnWidth = installBtn.offsetWidth;

    // ตั้งค่าความกว้างของปุ่มที่ต้องการให้สั้นลง (ตัวอย่างใช้ 80% ของความกว้างเดิม)
    let newButtonWidth = installBtnWidth * 0.8;

    // ปุ่ม Stay
    var buttonStay = document.createElement("a");
    buttonStay.append("Stay");
    buttonStay.className = installBtn.className;
    buttonStay.style.color = "#FFF";
    buttonStay.style.background = "#1E971E";
    buttonStay.style.width = newButtonWidth + "px"; // ใช้ความกว้างที่ลดลง
    buttonStay.style.border = "0.5px solid lightgray";
    buttonStay.style.textAlign = "center";
    buttonStay.style.paddingLeft = "8px";
    buttonStay.style.paddingRight = "8px";
    buttonStay.href = "stay://x-callback-url/install?scriptURL=" + installBtn.href;
    installBtn.parentNode.insertBefore(buttonStay, installBtn.nextSibling.nextSibling);

    // ปุ่ม Addons
    var buttonAddons = document.createElement("a");
    buttonAddons.append("Addons");
    buttonAddons.className = installBtn.className;
    buttonAddons.style.color = "#FFF";
    buttonAddons.style.background = "#1E971E";
    buttonAddons.style.width = newButtonWidth + "px"; // ใช้ความกว้างที่ลดลง
    buttonAddons.style.border = "0.5px solid lightgray";
    buttonAddons.style.textAlign = "center";
    buttonAddons.style.paddingLeft = "8px";
    buttonAddons.style.paddingRight = "8px";
    var encodedURL = encodeURI(installBtn.href);
    var encodedBase64URL = btoa(encodedURL);
    buttonAddons.href = "addons://installJS?command=20&url=" + encodedBase64URL;
    installBtn.parentNode.insertBefore(buttonAddons, installBtn.nextSibling);

    // ซ่อนลิงก์ช่วยติดตั้งถ้ามี
    const installHelpLink = document.querySelector('a.install-help-link');
    if (installHelpLink) {
        installHelpLink.style.display = 'none';
    }
})();