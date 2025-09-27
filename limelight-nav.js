/**
 * LimelightNav - Pure JavaScript Implementation
 * Adaptive navigation bar with limelight effect for active item highlighting
 * Converted from React to HTML/CSS/JavaScript stack
 */

class LimelightNav {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            items: options.items || this.getDefaultItems(),
            activeIndex: options.activeIndex || 0,
            onTabChange: options.onTabChange || null,
            className: options.className || '',
            limelightClassName: options.limelightClassName || '',
            iconContainerClassName: options.iconContainerClassName || '',
            iconClassName: options.iconClassName || ''
        };
        
        this.activeIndex = this.options.activeIndex;
        this.isReady = false;
        this.navItemRefs = [];
        this.limelightRef = null;
        
        this.init();
    }
    
    getDefaultItems() {
        return [
            {
                id: 'home',
                icon: this.createHomeIcon(),
                label: 'Home',
                onClick: () => {
                    console.log('Home clicked - scrolling to home section');
                    this.scrollToSection('home');
                }
            },
            {
                id: 'technology',
                icon: this.createTechIcon(),
                label: 'Technology',
                onClick: () => {
                    console.log('Technology clicked - scrolling to technology section');
                    this.scrollToSection('technology');
                }
            },
            {
                id: 'user-guide',
                icon: this.createGuideIcon(),
                label: 'User Guide',
                onClick: () => {
                    console.log('User Guide clicked - scrolling to how-to section');
                    this.scrollToSection('how-to');
                }
            },
            {
                id: 'about',
                icon: this.createAboutIcon(),
                label: 'About Us',
                onClick: () => {
                    console.log('About Us clicked - scrolling to about section');
                    this.scrollToSection('about');
                }
            },
            {
                id: 'contact',
                icon: this.createContactIcon(),
                label: 'Contact',
                onClick: () => {
                    console.log('Contact clicked - scrolling to contact section');
                    this.scrollToSection('contact');
                }
            },
            {
                id: 'launch',
                icon: this.createRocketIcon(),
                label: 'Launch Optimizer',
                onClick: () => {
                    console.log('Launch Optimizer clicked - navigating to optimizer.html');
                    window.location.href = 'optimizer.html';
                }
            }
        ];
    }
    
    createHomeIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>`;
    }
    
    createTechIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>`;
    }
    
    createGuideIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>`;
    }
    
    createAboutIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>`;
    }
    
    createContactIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>`;
    }
    
    createRocketIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>`;
    }
    
    init() {
        this.createNavStructure();
        this.bindEvents();
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            this.isReady = true;
        }, 100);
    }
    
    createNavStructure() {
        const nav = document.createElement('nav');
        nav.className = `limelight-nav ${this.options.className}`;
        
        // Create nav items
        this.options.items.forEach((item, index) => {
            const navItem = document.createElement('a');
            navItem.className = `nav-item ${this.options.iconContainerClassName}`;
            navItem.setAttribute('data-index', index);
            navItem.setAttribute('aria-label', item.label);
            navItem.setAttribute('title', item.label);
            
            const iconContainer = document.createElement('div');
            iconContainer.innerHTML = item.icon;
            iconContainer.className = `nav-icon ${
                this.activeIndex === index ? 'opacity-100' : 'opacity-40'
            } ${this.options.iconClassName}`;
            
            navItem.appendChild(iconContainer);
        nav.appendChild(navItem);
        this.navItemRefs.push(navItem);
    });
    
    this.container.appendChild(nav);
}    bindEvents() {
        this.navItemRefs.forEach((navItem, index) => {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleItemClick(index);
            });
        });
    }
    
    handleItemClick(index) {
        // Always execute the onClick function, regardless of active state
        const item = this.options.items[index];
        if (item.onClick) {
            console.log(`Executing onClick for item: ${item.label}`);
            item.onClick();
        }
        
        // Update visual active state
        this.updateActiveVisualState(index);
        
        // Trigger callback
        if (this.options.onTabChange) {
            this.options.onTabChange(index);
        }
    }
    
    updateActiveVisualState(index) {
        // Update opacity for all icons
        this.navItemRefs.forEach((navItem, i) => {
            const icon = navItem.querySelector('.nav-icon');
            if (i === index) {
                icon.classList.remove('opacity-40');
                icon.classList.add('opacity-100');
            } else {
                icon.classList.remove('opacity-100');
                icon.classList.add('opacity-40');
            }
        });
        
        this.activeIndex = index;
    }
    
    scrollToSection(sectionId) {
        console.log(`Attempting to scroll to section: ${sectionId}`);
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`Found section ${sectionId}, scrolling...`);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Section ${sectionId} not found!`);
            // Fallback for home - scroll to top
            if (sectionId === 'home') {
                console.log('Fallback: scrolling to top');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    scrollToOptimizer() {
        // Look for optimizer section in various ways
        const optimizer = document.querySelector('.optimizer-section') || 
                         document.querySelector('[id*="optimizer"]') ||
                         document.querySelector('.portfolio-optimizer') ||
                         document.querySelector('[class*="optimizer"]');
        
        if (optimizer) {
            optimizer.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback: scroll to a reasonable position (about 80% down the page)
            const scrollTarget = window.innerHeight * 0.8;
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }
    }
    
    // Public method to update active tab programmatically
    updateActiveTab(index) {
        if (index >= 0 && index < this.options.items.length) {
            this.setActiveIndex(index);
        }
    }
    
    destroy() {
        if (this.container && this.container.querySelector('.limelight-nav')) {
            this.container.removeChild(this.container.querySelector('.limelight-nav'));
        }
    }
}

// Export for global use
window.LimelightNav = LimelightNav;