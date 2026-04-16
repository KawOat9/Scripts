/**
 * Theme Toggle Script
 * Default: Light Mode
 * Toggle: Switch to Dark Mode
 */

(function () {
    'use strict';

    const THEME_KEY = 'site-theme';
    const LIGHT_MODE_CLASS = 'light-mode';

    // Get saved theme or default to light
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || 'light';
    }

    // Save theme preference
    function saveTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    // Apply theme to body
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add(LIGHT_MODE_CLASS);
        } else {
            document.body.classList.remove(LIGHT_MODE_CLASS);
        }
        updateToggleButton(theme);
    }

    // Update toggle button icon
    function updateToggleButton(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        if (theme === 'light') {
            // Show moon icon (click to go dark)
            btn.innerHTML = '🌙';
            btn.title = 'เปลี่ยนเป็น Dark Mode';
        } else {
            // Show sun icon (click to go light)
            btn.innerHTML = '☀️';
            btn.title = 'เปลี่ยนเป็น Light Mode';
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        saveTheme(newTheme);
        applyTheme(newTheme);
    }

    // Create toggle button
    function createToggleButton() {
        // Check if button already exists
        if (document.getElementById('theme-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.className = 'btn-theme-toggle';
        btn.innerHTML = '🌙';
        btn.addEventListener('click', toggleTheme);

        document.body.appendChild(btn);

        // Update icon based on current theme
        updateToggleButton(getSavedTheme());

        console.log('Theme toggle button created');
    }

    // Initialize
    function init() {
        // Apply saved theme immediately
        applyTheme(getSavedTheme());

        // Create toggle button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createToggleButton);
        } else {
            createToggleButton();
        }
    }

    // Run initialization
    init();

})();
