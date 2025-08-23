/**
 * Theme Management System
 * Handles light/dark theme switching with localStorage persistence
 * and system preference detection
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.themeIcon = this.themeToggle?.querySelector('i');
        this.currentTheme = 'light';
        
        this.init();
    }
    
    init() {
        // Initialize theme from localStorage or system preference
        this.loadTheme();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Determine which theme to use
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme(this.currentTheme);
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            this.body.classList.add('dark');
            this.updateThemeIcon('sun');
        } else {
            this.body.classList.remove('dark');
            this.updateThemeIcon('moon');
        }
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Dispatch custom event for other components
        this.dispatchThemeChange(theme);
    }
    
    updateThemeIcon(icon) {
        if (!this.themeIcon) return;
        
        this.themeIcon.className = icon === 'sun' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        
        // Add a subtle animation to the toggle button
        this.animateToggle();
    }
    
    animateToggle() {
        if (!this.themeToggle) return;
        
        this.themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
    
    setupEventListeners() {
        if (!this.themeToggle) return;
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Handle keyboard navigation
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addListener((e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
            }
        });
    }
    
    dispatchThemeChange(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }
    
    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }
    
    // Method to clear theme preference (revert to system)
    clearThemePreference() {
        localStorage.removeItem('theme');
        this.loadTheme();
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}