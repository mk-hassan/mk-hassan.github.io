/**
 * Main Application Controller
 * Coordinates all modules and handles global functionality
 */

class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.modules = {};
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.handlePageLoad();
        this.setupGlobalFeatures();
        this.setupErrorHandling();
    }
    
    setupEventListeners() {
        // Page load events
        document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
        window.addEventListener('load', this.onWindowLoad.bind(this));
        
        // Theme change events
        document.addEventListener('themeChanged', this.onThemeChange.bind(this));
        
        // Resize events (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(this.onResize.bind(this), 250);
        });
        
        // Visibility change (for performance optimization)
        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        
        // Custom events from other modules
        document.addEventListener('elementAnimated', this.onElementAnimated.bind(this));
    }
    
    onDOMReady() {
        console.log('📚 Portfolio loaded - DOM ready');
        
        // Initialize core modules
        this.initializeModules();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Add loaded class for CSS transitions
        document.body.classList.add('dom-loaded');
    }
    
    onWindowLoad() {
        console.log('🚀 Portfolio fully loaded');
        
        this.isLoaded = true;
        document.body.classList.add('fully-loaded');
        
        // Initialize non-critical features
        this.initializeEnhancements();
        
        // Hide loading indicators if any
        this.hideLoadingIndicators();
    }
    
    initializeModules() {
        // Store references to global modules
        this.modules = {
            theme: window.themeManager,
            navigation: window.navigationManager,
            animation: window.animationManager
        };
        
        // Verify all modules loaded successfully
        Object.keys(this.modules).forEach(moduleName => {
            if (!this.modules[moduleName]) {
                console.warn(`⚠️ Module ${moduleName} failed to initialize`);
            }
        });
    }
    
    setupGlobalFeatures() {
        // Add smooth scrolling to all anchor links
        this.enhanceAnchorLinks();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup contact form handling (if exists)
        this.setupContactForm();
        
        // Add Easter eggs
        this.setupEasterEggs();
    }
    
    enhanceAnchorLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        
        externalLinks.forEach(link => {
            // Add external link indicators
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual indicator for external links
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt external-icon';
                icon.style.marginLeft = '0.3rem';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only trigger shortcuts when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key.toLowerCase()) {
                case 't':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.modules.theme?.toggleTheme();
                    }
                    break;
                case '1':
                    e.preventDefault();
                    this.modules.navigation?.scrollToSection('hero');
                    break;
                case '2':
                    e.preventDefault();
                    this.modules.navigation?.scrollToSection('about');
                    break;
                case '3':
                    e.preventDefault();
                    this.modules.navigation?.scrollToSection('projects');
                    break;
                case '4':
                    e.preventDefault();
                    this.modules.navigation?.scrollToSection('contact');
                    break;
                case 'escape':
                    // Close any open modals or overlays
                    this.closeAllOverlays();
                    break;
            }
        });
    }
    
    setupContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
    }
    
    handleContactSubmission(form) {
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    }
    
    setupEasterEggs() {
        // Konami code easter egg
        let konamiSequence = [];
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A
        
        document.addEventListener('keydown', (e) => {
            konamiSequence.push(e.keyCode);
            
            if (konamiSequence.length > konamiCode.length) {
                konamiSequence.shift();
            }
            
            if (konamiSequence.toString() === konamiCode.toString()) {
                this.triggerEasterEgg();
                konamiSequence = [];
            }
        });
        
        // Console message for developers
        console.log('%c👋 Hello fellow developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
        console.log('%cThanks for checking out the code! Feel free to reach out if you have any questions.', 'color: #64748b;');
    }
    
    triggerEasterEgg() {
        // Fun animation when Konami code is entered
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Add rainbow animation styles temporarily
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 2000);
        
        console.log('🎉 Easter egg activated!');
    }
    
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would integrate with a real performance monitoring service
            console.log('📊 Performance monitoring active');
        }
        
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }, 0);
        });
    }
    
    initializeEnhancements() {
        // Progressive enhancements that aren't critical for initial load
        this.setupAdvancedAnimations();
        this.setupIntersectionObservers();
        this.optimizeImages();
    }
    
    setupAdvancedAnimations() {
        // Add additional animations that enhance but aren't critical
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('skill-reveal');
        });
    }
    
    setupIntersectionObservers() {
        // Setup observers for performance optimizations
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    optimizeImages() {
        // Lazy load images and optimize based on connection
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce image quality for slow connections
                document.body.classList.add('low-bandwidth');
            }
        }
    }
    
    hideLoadingIndicators() {
        const loadingElements = document.querySelectorAll('.loading-indicator');
        loadingElements.forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Event handlers
    onThemeChange(event) {
        const { theme } = event.detail;
        console.log(`🎨 Theme changed to: ${theme}`);
        
        // Update meta theme-color for mobile browsers
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f0f23' : '#ffffff');
        }
    }
    
    onResize() {
        console.log('📱 Window resized');
        
        // Refresh animations that might need recalculation
        this.modules.animation?.refresh();
        
        // Update viewport height for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            // Pause expensive animations when tab is not visible
            console.log('👁️ Page hidden - pausing animations');
        } else {
            // Resume animations when tab becomes visible
            console.log('👁️ Page visible - resuming animations');
        }
    }
    
    onElementAnimated(event) {
        const { element } = event.detail;
        // Could be used for analytics or additional effects
    }
    
    closeAllOverlays() {
        // Close any open modals, dropdowns, etc.
        const openElements = document.querySelectorAll('[data-open="true"]');
        openElements.forEach(el => {
            el.setAttribute('data-open', 'false');
        });
    }
    
    // Public API methods
    getModule(name) {
        return this.modules[name];
    }
    
    isReady() {
        return this.isLoaded;
    }
    
    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('❌ JavaScript Error:', e.error);
            // In production, send to error reporting service
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('❌ Unhandled Promise Rejection:', e.reason);
            // In production, send to error reporting service
        });
    }
}

// Initialize the main application
window.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}