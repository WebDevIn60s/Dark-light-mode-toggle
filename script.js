// ================================
// Theme Toggle JavaScript
// ================================

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const themeIconDark = document.getElementById('themeIconDark');

// ================================
// Theme Functions
// ================================

/**
 * Set the theme and save to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);
    logThemeChange(theme);
}

/**
 * Update theme icon opacity based on current theme
 * @param {string} theme - 'light' or 'dark'
 */
function updateThemeIcons(theme) {
    if (theme === 'dark') {
        themeIcon.style.opacity = '0.5';
        themeIconDark.style.opacity = '1';
    } else {
        themeIcon.style.opacity = '1';
        themeIconDark.style.opacity = '0.5';
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Add toggle animation
    animateToggle();
}

/**
 * Add animation effect to toggle button
 */
function animateToggle() {
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 100);
}

/**
 * Load theme from localStorage or use system preference
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved theme preference
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        setTheme(defaultTheme);
    }
}

/**
 * Log theme change to console (for debugging)
 * @param {string} theme - The new theme
 */
function logThemeChange(theme) {
    console.log(`Theme changed to: ${theme}`);
    console.log(`Saved to localStorage: ${localStorage.getItem('theme')}`);
}

// ================================
// Event Listeners
// ================================

// Toggle theme on click
themeToggle.addEventListener('click', toggleTheme);

// Keyboard support for toggle (Enter or Space)
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        console.log('System theme changed, updating to:', newTheme);
    }
});

// ================================
// Accessibility
// ================================

// Make toggle focusable and accessible
themeToggle.setAttribute('tabindex', '0');
themeToggle.setAttribute('aria-label', 'Toggle dark mode');

// Update aria-label based on current theme
function updateAriaLabel() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const label = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', label);
}

// ================================
// Initialization
// ================================

/**
 * Initialize the theme system
 */
function init() {
    console.log('Theme Toggle initialized');
    
    // Load saved or system theme
    loadTheme();
    
    // Update accessibility labels
    updateAriaLabel();
    
    // Prevent flash of unstyled content
    document.body.style.visibility = 'visible';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================================
// Optional: Transition Management
// ================================

// Prevent transitions on page load
window.addEventListener('load', () => {
    // Temporarily disable transitions
    document.body.style.transition = 'none';
    
    // Re-enable after a short delay
    setTimeout(() => {
        document.body.style.transition = '';
    }, 100);
});

// ================================
// Optional: Observer for Theme Changes
// ================================

// Monitor theme attribute changes
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
            const newTheme = htmlElement.getAttribute('data-theme');
            updateAriaLabel();
            
            // Dispatch custom event for other scripts
            const event = new CustomEvent('themechange', { 
                detail: { theme: newTheme } 
            });
            window.dispatchEvent(event);
        }
    });
});

themeObserver.observe(htmlElement, { 
    attributes: true,
    attributeFilter: ['data-theme']
});

// ================================
// Utility Functions
// ================================

/**
 * Get current theme
 * @returns {string} Current theme ('light' or 'dark')
 */
function getCurrentTheme() {
    return htmlElement.getAttribute('data-theme');
}

/**
 * Check if dark mode is active
 * @returns {boolean} True if dark mode is active
 */
function isDarkMode() {
    return getCurrentTheme() === 'dark';
}

// ================================
// Button Alert Function
// ================================

/**
 * Show alert when "Get Started" button is clicked
 */
function showAlert() {
    const currentTheme = getCurrentTheme();
    alert(`Theme preference saved! ✓\n\nCurrent theme: ${currentTheme}\nYour preference will persist across sessions.`);
}

// Make function globally available
window.showAlert = showAlert;

// ================================
// Export functions (if using modules)
// ================================

// Uncomment if using ES6 modules
// export { setTheme, toggleTheme, getCurrentTheme, isDarkMode };

// ================================
// Debug Information
// ================================

// Log debug info in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('=== Theme Toggle Debug Info ===');
    console.log('Current theme:', getCurrentTheme());
    console.log('Saved theme:', localStorage.getItem('theme'));
    console.log('System prefers dark:', window.matchMedia('(prefers-color-scheme: dark)').matches);
    console.log('==============================');
}

// ================================
// Performance Monitoring
// ================================

/**
 * Track theme toggle performance
 */
let toggleCount = 0;
let lastToggleTime = Date.now();

themeToggle.addEventListener('click', () => {
    toggleCount++;
    const currentTime = Date.now();
    const timeSinceLastToggle = currentTime - lastToggleTime;
    lastToggleTime = currentTime;
    
    console.log(`Toggle #${toggleCount} - Time since last: ${timeSinceLastToggle}ms`);
});

// ================================
// Smooth Scroll (Bonus Feature)
// ================================

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// Window Events
// ================================

// Listen for custom theme change events
window.addEventListener('themechange', (e) => {
    console.log('Custom theme change event fired:', e.detail.theme);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page is visible again, check if theme should be updated
        const savedTheme = localStorage.getItem('theme');
        const currentTheme = getCurrentTheme();
        
        if (savedTheme && savedTheme !== currentTheme) {
            console.log('Theme mismatch detected, syncing...');
            setTheme(savedTheme);
        }
    }
});

// ================================
// Console Message
// ================================

console.log('%c🎨 Theme Toggle Loaded Successfully! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 14px; padding: 8px 12px; border-radius: 4px; font-weight: bold;');
console.log('Available functions: setTheme(theme), toggleTheme(), getCurrentTheme(), isDarkMode()');
