/**
 * Animation Manager
 * Handles scroll-triggered animations, typing effects, and interactive animations
 */

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.animatedElements = new Set();
        this.observer = null;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupTypingEffect();
        this.setupProjectCardAnimations();
        this.setupParallaxEffects();
    }
    
    setupIntersectionObserver() {
        // Check if IntersectionObserver is supported
        if (!window.IntersectionObserver) {
            // Fallback for older browsers
            this.fallbackAnimations();
            return;
        }
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all elements with animation classes
        this.observeAnimatableElements();
    }
    
    observeAnimatableElements() {
        const animatableElements = document.querySelectorAll('.animate-on-scroll');
        animatableElements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    animateElement(element) {
        // Add stagger delay for elements in the same container
        const siblings = element.parentElement.querySelectorAll('.animate-on-scroll');
        const index = Array.from(siblings).indexOf(element);
        const delay = index * 100; // 100ms stagger
        
        setTimeout(() => {
            element.classList.add('animated');
            
            // Dispatch custom event for element animation
            const event = new CustomEvent('elementAnimated', {
                detail: { element }
            });
            document.dispatchEvent(event);
        }, delay);
    }
    
    setupScrollAnimations() {
        // Additional scroll-based animations
        window.addEventListener('scroll', this.handleScrollAnimations.bind(this), { passive: true });
    }
    
    handleScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
        
        // Header background opacity based on scroll
        const header = document.querySelector('header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            const blur = Math.min(scrolled / 10, 20);
            header.style.backdropFilter = `blur(${blur}px)`;
        }
    }
    
    setupTypingEffect() {
        const subtitle = document.querySelector('.hero .subtitle');
        if (!subtitle) return;
        
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        // Start typing effect after hero animation
        setTimeout(() => {
            this.typeWriter(originalText, subtitle, 100);
        }, 1500);
    }
    
    typeWriter(text, element, speed = 100) {
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Add blinking cursor effect
                element.classList.add('typing-complete');
            }
        };
        
        type();
    }
    
    setupProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, 'leave');
            });
        });
    }
    
    animateProjectCard(card, action) {
        if (action === 'enter') {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            
            // Animate tech tags
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                }, index * 50);
            });
            
        } else {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            
            // Reset tech tags
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        }
    }
    
    setupParallaxEffects() {
        // Subtle parallax effects for various elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }
    
    // Utility method to animate elements with custom options
    animateElementCustom(element, animationType, options = {}) {
        const {
            duration = 600,
            delay = 0,
            easing = 'ease',
            direction = 'normal'
        } = options;
        
        element.style.animationDuration = `${duration}ms`;
        element.style.animationDelay = `${delay}ms`;
        element.style.animationTimingFunction = easing;
        element.style.animationDirection = direction;
        
        element.classList.add(animationType);
        
        // Remove animation class after completion
        setTimeout(() => {
            element.classList.remove(animationType);
        }, duration + delay);
    }
    
    // Method to create loading animation
    createLoadingAnimation(element) {
        element.classList.add('loading');
        return {
            stop: () => element.classList.remove('loading')
        };
    }
    
    // Method to animate numbers (counter animation)
    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Method to create staggered animations for lists
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }
    
    // Fallback for browsers without IntersectionObserver
    fallbackAnimations() {
        const animatableElements = document.querySelectorAll('.animate-on-scroll');
        
        // Simple scroll-based animation fallback
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            animatableElements.forEach(element => {
                const elementTop = element.offsetTop;
                
                if (scrollTop + windowHeight > elementTop + 100) {
                    element.classList.add('animated');
                }
            });
        });
    }
    
    // Public method to refresh observer (useful when DOM changes)
    refresh() {
        if (this.observer) {
            this.observer.disconnect();
            this.animatedElements.clear();
            this.observeAnimatableElements();
        }
    }
    
    // Public method to destroy the animation manager
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}