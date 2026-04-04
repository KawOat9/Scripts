// ==UserScript==
// @name         GitHub Raw Link Converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically convert GitHub links to raw GitHub links
// @author       𝒦𝒶𝓌𝒪𝒶𝓉 (KawOat) ✨
// @matchBK        https://github.com/*
// @match        https://github.com/*/*/blob/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if a given GitHub link is valid
    function isValidGithubLink(link) {
        const pattern = /^https?:\/\/github\.com/;
        return pattern.test(link);
    }

    // Function to convert GitHub link to raw GitHub link
    function convertToRawLink() {
        let githubLink = window.location.href; // Get the current URL

        // Check if it's a valid GitHub link
        if (!isValidGithubLink(githubLink)) {
            alert('This is not a valid GitHub link');
            return;
        }

        // Process the GitHub link to convert it to a raw link
        let rawLink = githubLink.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        console.log('Converted Raw Link:', rawLink);

        // Automatically copy the raw link to clipboard
        copyToClipboard(rawLink);

        // Show alert with the raw link
        alert('Raw Link copied to clipboard: ' + rawLink);
    }

    // Function to copy a string to the clipboard
    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    // Convert the current GitHub link to a raw link when the page is loaded
    convertToRawLink();
})();