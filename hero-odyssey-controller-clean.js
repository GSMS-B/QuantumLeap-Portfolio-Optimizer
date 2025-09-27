/**
 * Hero Odyssey Controller - React Lightning Effect Integration
 * Initializes and manages the Hero Odyssey Lightning component and LimelightNav
 * Note: Hue Slider functionality is currently commented out - can be reactivated later
 */

class HeroOdysseyController {
    constructor() {
        this.heroOdysseyLightning = null;
        this.elasticHueSlider = null;
        this.limelightNav = null;
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
        
        // Initialize LimelightNav
        setTimeout(() => {
            this.initializeLimelightNav();
        }, 150);
        
        // Initialize hue slider after lightning - COMMENTED OUT FOR NOW
        /*
        setTimeout(() => {
            this.initializeElasticHueSlider();
        }, 100);
        */
        
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

    // HUE SLIDER METHOD - COMMENTED OUT FOR NOW
    /*
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
    */

    initializeLimelightNav() {
        const container = document.getElementById('limelight-nav-container');
        if (!container) {
            console.warn('LimelightNav container not found');
            return;
        }

        try {
            // Initialize LimelightNav with simple navigation items
            this.limelightNav = new LimelightNav(container, {
                activeIndex: 0,
                className: 'limelight-nav-custom',
                onTabChange: (index) => {
                    console.log('Navigation tab changed to index:', index);
                    
                    // Simple navigation actions that won't disrupt layout
                    switch(index) {
                        case 0: // Home
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            break;
                        case 1: // Technology
                        case 2: // User Guide  
                        case 3: // About Us
                        case 4: // Contact
                            // For now, just scroll to the optimizer section if it exists
                            const optimizer = document.querySelector('.optimizer-section') || document.querySelector('[id*="optimizer"]');
                            if (optimizer) {
                                optimizer.scrollIntoView({ behavior: 'smooth' });
                            }
                            break;
                        default:
                            console.log('Navigation item clicked:', index);
                    }
                }
            });

            // Store globally
            window.limelightNav = this.limelightNav;
            console.log('LimelightNav initialized successfully');
        } catch (error) {
            console.error('Failed to initialize LimelightNav:', error);
        }
    }

    setupNavigation() {
        // Hero navigation items (now functional links)
        const heroNavItems = document.querySelectorAll('.hero-nav-item');
        heroNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                heroNavItems.forEach(navItem => navItem.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
                
                // Navigate to section
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    this.navigateToSection(targetId);
                }
            });
        });

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

        // Update active nav item on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavItem();
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

    updateActiveNavItem() {
        const sections = ['home', 'technology', 'how-to', 'about', 'contact'];
        const navItems = document.querySelectorAll('.hero-nav-item');
        
        let currentSection = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Public methods for external control
    updateLightningHue(hue) {
        if (this.heroOdysseyLightning) {
            this.heroOdysseyLightning.updateHue(hue);
        }
        // HUE SLIDER UPDATE - COMMENTED OUT
        /*
        if (this.elasticHueSlider) {
            this.elasticHueSlider.setValue(hue);
        }
        */
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
        if (this.limelightNav) {
            this.limelightNav.destroy();
        }
        // HUE SLIDER CLEANUP - COMMENTED OUT
        /*
        if (this.elasticHueSlider) {
            this.elasticHueSlider.destroy();
        }
        */
    }
}

// Initialize Hero Odyssey Controller
const heroOdysseyController = new HeroOdysseyController();

// Export for global access
window.HeroOdysseyController = HeroOdysseyController;
window.heroOdysseyController = heroOdysseyController;