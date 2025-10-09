/**
 * Hero Odyssey Controller - React Lightning Effect Integration
 * Initializes and manages the Hero Odyssey Lightning and Hue Slider components
 */

class HeroOdysseyController {
    constructor() {
        this.heroOdysseyLightning = null;
        this.elasticHueSlider = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('Initializing Hero Odyssey components...');
        
        // Initialize lightning effect first
        this.initializeHeroOdysseyLightning();
        
        // Initialize hue slider after lightning
        setTimeout(() => {
            this.initializeElasticHueSlider();
        }, 100);
        
        // Setup other interactions
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupButtonAnimations();
        
        this.isInitialized = true;
        console.log('Hero Odyssey initialization complete');
    }

    initializeHeroOdysseyLightning() {
        const canvas = document.getElementById('lightning-canvas');
        if (!canvas) {
            console.warn('Lightning canvas not found');
            return;
        }

        try {
            // Initialize the Hero Odyssey Lightning with exact React parameters
            this.heroOdysseyLightning = new HeroOdysseyLightning(canvas, {
                hue: 220,        // Default cyan-blue like in reference
                xOffset: 0,      // Centered
                speed: 1.6,      // Moderate animation speed
                intensity: 0.6,  // Balanced visibility
                size: 2          // Appropriate scale
            });

            // Store globally for hue slider access
            window.heroOdysseyLightning = this.heroOdysseyLightning;
            console.log('Hero Odyssey Lightning initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Hero Odyssey Lightning:', error);
        }
    }

    initializeElasticHueSlider() {
        const container = document.getElementById('hue-slider-container');
        if (!container) {
            console.warn('Hue slider container not found');
            return;
        }

        try {
            // Initialize the Elastic Hue Slider with React-like behavior
            this.elasticHueSlider = new ElasticHueSlider(container, {
                value: 220,
                min: 0,
                max: 360,
                step: 1,
                label: 'Adjust Lightning Hue',
                onChange: (hue) => {
                    // Real-time lightning hue update
                    if (this.heroOdysseyLightning) {
                        this.heroOdysseyLightning.updateHue(hue);
                    }
                    console.log('Lightning hue updated to:', hue);
                }
            });

            // Store globally
            window.elasticHueSlider = this.elasticHueSlider;
            console.log('Elastic Hue Slider initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Elastic Hue Slider:', error);
        }
    }

    setupNavigation() {
        // Navigation dots functionality
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const target = dot.getAttribute('data-target');
                if (target) {
                    this.navigateToSection(target);
                }
            });

            // Add hover effects
            dot.addEventListener('mouseenter', () => {
                dot.style.transform = 'scale(1.1)';
            });

            dot.addEventListener('mouseleave', () => {
                dot.style.transform = 'scale(1)';
            });
        });

        // Hero navigation buttons
        const heroNavItems = document.querySelectorAll('.hero-nav-item');
        heroNavItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                heroNavItems.forEach(navItem => navItem.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
            });
        });
    }

    setupScrollEffects() {
        // Parallax effects for hero elements
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.getElementById('home');
            
            if (!heroSection) return;
            
            const rect = heroSection.getBoundingClientRect();
            const inView = rect.bottom > 0 && rect.top < window.innerHeight;
            
            if (inView) {
                // Apply parallax to background elements
                const backgroundCircle = document.querySelector('.hero-background-circle');
                if (backgroundCircle) {
                    backgroundCircle.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
                }
                
                // Subtle parallax to main content
                const mainContent = document.querySelector('.hero-main-content');
                if (mainContent) {
                    mainContent.style.transform = `translateY(${scrollY * 0.1}px)`;
                }
            }
        });
    }

    setupButtonAnimations() {
        // Join button animation
        const joinButton = document.querySelector('.hero-join-button');
        if (joinButton) {
            joinButton.addEventListener('mouseenter', () => {
                const svg = joinButton.querySelector('svg');
                if (svg) {
                    svg.style.transform = 'translateX(4px)';
                }
            });

            joinButton.addEventListener('mouseleave', () => {
                const svg = joinButton.querySelector('svg');
                if (svg) {
                    svg.style.transform = 'translateX(0)';
                }
            });
        }

        // CTA button animation
        const ctaButton = document.querySelector('.hero-cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                ctaButton.style.transform = 'scale(1.05)';
            });

            ctaButton.addEventListener('mouseleave', () => {
                ctaButton.style.transform = 'scale(1)';
            });
        }
    }

    navigateToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Public methods for external control
    updateLightningHue(hue) {
        if (this.heroOdysseyLightning) {
            this.heroOdysseyLightning.updateHue(hue);
        }
        if (this.elasticHueSlider) {
            this.elasticHueSlider.setValue(hue);
        }
    }

    updateLightningParameters(params) {
        if (this.heroOdysseyLightning) {
            this.heroOdysseyLightning.updateParameters(params);
        }
    }

    destroy() {
        if (this.heroOdysseyLightning) {
            this.heroOdysseyLightning.destroy();
        }
        if (this.elasticHueSlider) {
            this.elasticHueSlider.destroy();
        }
    }
}

// Initialize Hero Odyssey Controller
const heroOdysseyController = new HeroOdysseyController();

// Export for global access
window.HeroOdysseyController = HeroOdysseyController;
window.heroOdysseyController = heroOdysseyController;
                this.animateLightningTransition();
            });

            // Add hover effects
            dot.addEventListener('mouseenter', () => {
                this.addLightningBurst(dot);
            });
        });

        // Main navigation
        const navItems = document.querySelectorAll('.hero-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active from all
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active to clicked
                item.classList.add('active');
            });
        });
    }

    setupSliders() {
        // Hue slider
        const hueSlider = document.getElementById('hue-slider');
        const hueValue = document.getElementById('hue-value');
        
        if (hueSlider && this.lightningEffect) {
            hueSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                hueValue.textContent = value;
                this.lightningEffect.updateHue(value);
                
                // Update CSS custom properties for UI elements
                document.documentElement.style.setProperty('--lightning-hue', value);
            });
        }

        // Setup custom slider appearance
        this.setupCustomSlider();
    }

    setupCustomSlider() {
        const slider = document.getElementById('hue-slider');
        const track = document.querySelector('.hue-slider-track');
        const fill = document.querySelector('.hue-slider-fill');
        const thumb = document.querySelector('.hue-slider-thumb');

        if (!slider || !track || !fill || !thumb) return;

        const updateSlider = () => {
            const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
            fill.style.width = percentage + '%';
            thumb.style.left = percentage + '%';
        };

        slider.addEventListener('input', updateSlider);
        slider.addEventListener('mousedown', () => thumb.classList.add('dragging'));
        slider.addEventListener('mouseup', () => thumb.classList.remove('dragging'));
        
        updateSlider();
    }

    setupScrollEffects() {
        // Semicircle to full circle transition
        const backgroundCircle = document.querySelector('.hero-background-circle');
        
        if (backgroundCircle) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const threshold = 100;
                
                if (scrollY > threshold) {
                    backgroundCircle.classList.add('full-circle');
                } else {
                    backgroundCircle.classList.remove('full-circle');
                }
            });
        }

        // Parallax effects for dots
        window.addEventListener('scroll', () => {
            const dots = document.querySelectorAll('.nav-dot');
            dots.forEach((dot, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(window.scrollY * speed);
                dot.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupButtonAnimations() {
        // Join button animation
        const joinButton = document.querySelector('.hero-join-button');
        if (joinButton) {
            joinButton.addEventListener('click', () => {
                this.animateLightningPulse();
            });
        }

        // CTA button animation
        const ctaButton = document.querySelector('.hero-cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.animateLightningBurst();
            });
        }
    }

    navigateToSection(index) {
        const sections = ['technology', 'guide', 'about', 'contact'];
        const targetSection = sections[index];
        
        // Find target element or create navigation logic
        const target = document.getElementById(targetSection) || 
                      document.querySelector(`[data-section="${targetSection}"]`);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }

        // Update active states
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    addLightningBurst(element) {
        // Create temporary lightning effect at element position
        const rect = element.getBoundingClientRect();
        const burst = document.createElement('div');
        burst.className = 'lightning-burst';
        burst.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(59,130,246,0.8) 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: lightningBurst 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 800);
    }

    animateLightningTransition() {
        // Intensify lightning during navigation
        if (this.lightningEffect) {
            const originalHue = this.lightningEffect.hue;
            
            // Flash effect
            this.lightningEffect.updateHue(60); // Yellow flash
            setTimeout(() => {
                this.lightningEffect.updateHue(originalHue);
            }, 200);
        }
    }

    animateLightningPulse() {
        // Pulse effect for buttons
        const canvas = document.getElementById('hero-lightning-canvas');
        if (canvas) {
            canvas.style.animation = 'lightningPulse 1s ease-out';
            setTimeout(() => {
                canvas.style.animation = '';
            }, 1000);
        }
    }

    animateLightningBurst() {
        // Burst effect for major interactions
        if (this.lightningEffect) {
            const hues = [60, 180, 300, 240]; // Yellow, Cyan, Magenta, Blue
            let index = 0;
            
            const cycle = () => {
                this.lightningEffect.updateHue(hues[index]);
                index = (index + 1) % hues.length;
                if (index < hues.length) {
                    setTimeout(cycle, 150);
                }
            };
            
            cycle();
        }
    }

    // Public API methods
    updateLightningHue(hue) {
        if (this.lightningEffect) {
            this.lightningEffect.updateHue(hue);
        }
    }

    destroy() {
        if (this.lightningEffect) {
            this.lightningEffect.destroy();
        }
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes lightningBurst {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(20);
            opacity: 0.6;
        }
        100% {
            transform: scale(40);
            opacity: 0;
        }
    }
    
    @keyframes lightningPulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize the Hero Odyssey Controller
const heroOdyssey = new HeroOdysseyController();