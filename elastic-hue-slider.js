// Enhanced Hue Slider - Perfect 360 Degree Color Control/**/**/**

class ElasticHueSlider {

    constructor(container, options = {}) { * Enhanced Hue Slider - Perfect 360 Degree Color Control

        this.container = container;

        this.value = options.value || 220; * Beautiful styling with full hue spectrum functionality * Enhanced Hue Slider - Perfect 360 Degree Color Control * Enhanced Hue Slider - Perfect 360° Color Control

        this.min = options.min || 0;

        this.max = options.max || 360; */

        this.step = options.step || 1;

        this.label = options.label || 'Adjust Lightning Hue'; * Beautiful styling with full hue spectrum functionality * Beautiful styling with full hue spectrum functionality

        this.onChange = options.onChange || (() => {});

        class ElasticHueSlider {

        this.isDragging = false;

        this.init();    constructor(container, options = {}) { */ */

    }

        this.container = container;

    init() {

        this.createSlider();        this.value = options.value || 220;

        this.bindEvents();

        this.updateDisplay();        this.min = options.min || 0;

        

        // Smooth initialization animation        this.max = options.max || 360;class ElasticHueSlider {class ElasticHueSlider {

        setTimeout(() => {

            if (this.elements.slider) {        this.step = options.step || 1;

                this.elements.slider.classList.add('initialized');

            }        this.label = options.label || 'Adjust Lightning Hue';    constructor(container, options = {}) {    constructor(container, options = {}) {

        }, 100);

    }        this.onChange = options.onChange || (() => {});



    createSlider() {                this.container = container;        this.container = container;

        this.container.innerHTML = `

            <div class="elastic-hue-slider">        this.isDragging = false;

                <label class="hue-slider-label">${this.label}</label>

                <div class="hue-slider-wrapper">                this.value = options.value || 220;        this.value = options.value || 220;

                    <input 

                        type="range"         this.init();

                        class="hue-slider-native"

                        min="${this.min}"     }        this.min = options.min || 0;        this.min = options.min || 0;

                        max="${this.max}" 

                        step="${this.step}" 

                        value="${this.value}"

                    />    init() {        this.max = options.max || 360;        this.max = options.max || 360;

                    <div class="hue-track-rainbow"></div>

                    <div class="hue-thumb"></div>        this.createSlider();

                </div>

                <div class="hue-value">${this.value}°</div>        this.bindEvents();        this.step = options.step || 1;        this.step = options.step || 1;

            </div>

        `;        this.updateDisplay();



        this.elements = {    }        this.label = options.label || 'Adjust Lightning Hue';        this.label = options.label || 'Adjust Lightning Hue';

            slider: this.container.querySelector('.elastic-hue-slider'),

            native: this.container.querySelector('.hue-slider-native'),

            label: this.container.querySelector('.hue-slider-label'),

            track: this.container.querySelector('.hue-track-rainbow'),    createSlider() {        this.onChange = options.onChange || (() => {});        this.onChange = options.onChange || (() => {});

            thumb: this.container.querySelector('.hue-thumb'),

            value: this.container.querySelector('.hue-value')        this.container.innerHTML = `

        };

    }            <div class="elastic-hue-slider">                



    bindEvents() {                <label class="hue-slider-label">${this.label}</label>

        this.elements.native.addEventListener('input', (e) => {

            this.value = parseInt(e.target.value);                <div class="hue-slider-wrapper">        this.isDragging = false;        this.isDragging = false;

            this.updateDisplay();

            this.onChange(this.value);                    <input 

        });

                        type="range"         this.animationId = null;        this.animationId = null;

        this.elements.native.addEventListener('mousedown', () => this.setDragging(true));

        this.elements.native.addEventListener('mouseup', () => this.setDragging(false));                        class="hue-slider-native"

        this.elements.native.addEventListener('touchstart', () => this.setDragging(true));

        this.elements.native.addEventListener('touchend', () => this.setDragging(false));                        min="${this.min}"                 



        document.addEventListener('mouseup', () => this.setDragging(false));                        max="${this.max}" 

        document.addEventListener('touchend', () => this.setDragging(false));

    }                        step="${this.step}"         this.init();        this.init();



    setDragging(dragging) {                        value="${this.value}"

        this.isDragging = dragging;

        this.elements.slider.classList.toggle('dragging', dragging);                    />    }    }

    }

                    <div class="hue-track-rainbow"></div>

    getProgress() {

        return ((this.value - this.min) / (this.max - this.min)) * 100;                    <div class="hue-thumb"></div>

    }

                </div>

    updateDisplay() {

        const progress = this.getProgress();                <div class="hue-value">${this.value}°</div>    init() {    init() {

        

        // Update thumb position and color            </div>

        this.elements.thumb.style.left = progress + '%';

        this.elements.value.textContent = this.value + '°';        `;        this.createSlider();        this.createSlider();

        this.elements.native.value = this.value;

        

        // Update thumb color to match hue

        const color = 'hsl(' + this.value + ', 100%, 60%)';        this.elements = {        this.bindEvents();        this.bindEvents();

        const shadowColor = 'hsl(' + this.value + ', 100%, 50%)';

                    slider: this.container.querySelector('.elastic-hue-slider'),

        this.elements.thumb.style.backgroundColor = color;

        this.elements.thumb.style.boxShadow =             native: this.container.querySelector('.hue-slider-native'),        this.updateDisplay();        this.updateDisplay();

            '0 0 20px ' + shadowColor + ', ' +

            '0 0 40px ' + shadowColor + '88, ' +            label: this.container.querySelector('.hue-slider-label'),

            '0 2px 10px rgba(0, 0, 0, 0.3)';

    }            track: this.container.querySelector('.hue-track-rainbow'),        this.animateInitialShow();        this.animateInitialShow();



    setValue(newValue) {            thumb: this.container.querySelector('.hue-thumb'),

        this.value = Math.max(this.min, Math.min(this.max, newValue));

        this.updateDisplay();            value: this.container.querySelector('.hue-value'),    }    }

        this.onChange(this.value);

    }            wrapper: this.container.querySelector('.hue-slider-wrapper')



    destroy() {        };

        document.removeEventListener('mouseup', () => this.setDragging(false));

        document.removeEventListener('touchend', () => this.setDragging(false));    }

    }

}    createSlider() {    createSlider() {



// Global instance    bindEvents() {

let elasticHueSlider = null;

        this.elements.native.addEventListener('input', (e) => {        this.container.innerHTML = `        this.container.innerHTML = `

// Initialize function

function initializeElasticHueSlider() {            this.value = parseInt(e.target.value);

    const container = document.getElementById('hue-slider-container');

    if (container && !elasticHueSlider) {            this.updateDisplay();            <div class="elastic-hue-slider">            <div class="elastic-hue-slider">

        elasticHueSlider = new ElasticHueSlider(container, {

            value: 220,            this.updateThumbColor();

            min: 0,

            max: 360,            this.onChange(this.value);                <label class="hue-slider-label">${this.label}</label>                <label class="hue-slider-label">${this.label}</label>

            step: 1,

            label: 'Adjust Lightning Hue',        });

            onChange: (hue) => {

                if (window.heroOdysseyLightning) {                <div class="hue-slider-wrapper">                <div class="hue-slider-wrapper">

                    window.heroOdysseyLightning.updateHue(hue);

                    console.log('Lightning hue updated to:', hue);        this.elements.native.addEventListener('mousedown', () => this.setDragging(true));

                }

            }        this.elements.native.addEventListener('mouseup', () => this.setDragging(false));                    <input                     <!-- Native range input for functionality -->

        });

        console.log('Hue slider initialized successfully');        this.elements.native.addEventListener('touchstart', () => this.setDragging(true));

    }

}        this.elements.native.addEventListener('touchend', () => this.setDragging(false));                        type="range"                     <input 



// Export globals

window.ElasticHueSlider = ElasticHueSlider;

window.elasticHueSlider = elasticHueSlider;        document.addEventListener('mouseup', () => this.setDragging(false));                        class="hue-slider-native"                        type="range" 

window.initializeElasticHueSlider = initializeElasticHueSlider;
        document.addEventListener('touchend', () => this.setDragging(false));

    }                        min="${this.min}"                         class="hue-slider-native"



    setDragging(dragging) {                        max="${this.max}"                         min="${this.min}" 

        this.isDragging = dragging;

        this.elements.slider.classList.toggle('dragging', dragging);                        step="${this.step}"                         max="${this.max}" 

        this.updateThumbScale();

    }                        value="${this.value}"                        step="${this.step}" 



    updateThumbScale() {                    />                        value="${this.value}"

        const scale = this.isDragging ? 1.3 : 1;

        this.elements.thumb.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';                    <div class="hue-track-rainbow"></div>                    />

    }

                    <div class="hue-thumb"></div>                    <!-- Rainbow gradient track -->

    getProgress() {

        return ((this.value - this.min) / (this.max - this.min)) * 100;                </div>                    <div class="hue-track-rainbow"></div>

    }

                <div class="hue-value">${this.value}°</div>                    <!-- Active thumb with glow -->

    updateDisplay() {

        const progress = this.getProgress();            </div>                    <div class="hue-thumb"></div>

        

        this.elements.thumb.style.left = progress + '%';        `;                </div>

        this.elements.value.textContent = this.value + '°';

        this.elements.native.value = this.value;                <div class="hue-value">${this.value}°</div>

        

        this.updateThumbColor();        this.elements = {            </div>

    }

            slider: this.container.querySelector('.elastic-hue-slider'),        `;

    updateThumbColor() {

        const hue = this.value;            native: this.container.querySelector('.hue-slider-native'),

        const color = 'hsl(' + hue + ', 100%, 60%)';

        const shadowColor = 'hsl(' + hue + ', 100%, 50%)';            label: this.container.querySelector('.hue-slider-label'),        this.elements = {

        

        this.elements.thumb.style.backgroundColor = color;            track: this.container.querySelector('.hue-track-rainbow'),            slider: this.container.querySelector('.elastic-hue-slider'),

        this.elements.thumb.style.boxShadow = 

            '0 0 20px ' + shadowColor + ', ' +            thumb: this.container.querySelector('.hue-thumb'),            native: this.container.querySelector('.hue-slider-native'),

            '0 0 40px ' + shadowColor + '88, ' +

            '0 2px 10px rgba(0, 0, 0, 0.3)';            value: this.container.querySelector('.hue-value'),            label: this.container.querySelector('.hue-slider-label'),

    }

            wrapper: this.container.querySelector('.hue-slider-wrapper')            track: this.container.querySelector('.hue-track-rainbow'),

    setValue(newValue) {

        this.value = Math.max(this.min, Math.min(this.max, newValue));        };            thumb: this.container.querySelector('.hue-thumb'),

        this.updateDisplay();

        this.onChange(this.value);    }            value: this.container.querySelector('.hue-value'),

    }

            wrapper: this.container.querySelector('.hue-slider-wrapper')

    destroy() {

        document.removeEventListener('mouseup', () => this.setDragging(false));    bindEvents() {        };

        document.removeEventListener('touchend', () => this.setDragging(false));

    }        this.elements.native.addEventListener('input', (e) => {    }

}

            this.value = parseInt(e.target.value);

let elasticHueSlider = null;

            this.updateDisplay();    bindEvents() {

function initializeElasticHueSlider() {

    const container = document.getElementById('hue-slider-container');            this.updateThumbColor();        // Native input events for precise control

    if (container && !elasticHueSlider) {

        elasticHueSlider = new ElasticHueSlider(container, {            this.onChange(this.value);        this.elements.native.addEventListener('input', (e) => {

            value: 220,

            min: 0,            console.log('Hue changed to:', this.value);            this.value = parseInt(e.target.value);

            max: 360,

            step: 1,        });            this.updateDisplay();

            label: 'Adjust Lightning Hue',

            onChange: (hue) => {            this.updateThumbColor();

                if (window.heroOdysseyLightning) {

                    window.heroOdysseyLightning.updateHue(hue);        this.elements.native.addEventListener('mousedown', () => this.setDragging(true));            this.onChange(this.value);

                }

            }        this.elements.native.addEventListener('mouseup', () => this.setDragging(false));            console.log('Hue changed to:', this.value);

        });

    }        this.elements.native.addEventListener('touchstart', () => this.setDragging(true));        });

}

        this.elements.native.addEventListener('touchend', () => this.setDragging(false));

window.ElasticHueSlider = ElasticHueSlider;

window.elasticHueSlider = elasticHueSlider;        // Touch and mouse events for visual feedback

window.initializeElasticHueSlider = initializeElasticHueSlider;
        document.addEventListener('mouseup', () => this.setDragging(false));        this.elements.native.addEventListener('mousedown', () => this.setDragging(true));

        document.addEventListener('touchend', () => this.setDragging(false));        this.elements.native.addEventListener('mouseup', () => this.setDragging(false));

    }        this.elements.native.addEventListener('touchstart', () => this.setDragging(true));

        this.elements.native.addEventListener('touchend', () => this.setDragging(false));

    setDragging(dragging) {

        this.isDragging = dragging;        // Global events to handle dragging state

        this.elements.slider.classList.toggle('dragging', dragging);        document.addEventListener('mouseup', () => this.setDragging(false));

        this.updateThumbScale();        document.addEventListener('touchend', () => this.setDragging(false));

    }        

        // Mouse move for smooth visual updates

    updateThumbScale() {        this.elements.native.addEventListener('mousemove', (e) => {

        const scale = this.isDragging ? 1.3 : 1;            if (this.isDragging) {

        this.elements.thumb.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';                this.updateThumbColor();

    }            }

        });

    getProgress() {    }

        return ((this.value - this.min) / (this.max - this.min)) * 100;

    }    setDragging(dragging) {

        this.isDragging = dragging;

    updateDisplay() {        this.elements.slider.classList.toggle('dragging', dragging);

        const progress = this.getProgress();        this.updateThumbScale();

            }

        this.elements.thumb.style.left = progress + '%';

        this.elements.value.textContent = this.value + '°';    updateThumbScale() {

        this.elements.native.value = this.value;        const scale = this.isDragging ? 1.3 : 1;

                this.elements.thumb.style.transform = `translate(-50%, -50%) scale(${scale})`;

        this.updateThumbColor();    }

    }

    getProgress() {

    updateThumbColor() {        return ((this.value - this.min) / (this.max - this.min)) * 100;

        const hue = this.value;    }

        const color = 'hsl(' + hue + ', 100%, 60%)';

        const shadowColor = 'hsl(' + hue + ', 100%, 50%)';    updateDisplay() {

                const progress = this.getProgress();

        this.elements.thumb.style.backgroundColor = color;        

        this.elements.thumb.style.boxShadow =         // Update thumb position

            '0 0 20px ' + shadowColor + ', ' +        this.elements.thumb.style.left = `${progress}%`;

            '0 0 40px ' + shadowColor + '88, ' +        

            '0 2px 10px rgba(0, 0, 0, 0.3)';        // Update value display with current hue

    }        this.elements.value.textContent = `${this.value}°`;

        

    setValue(newValue) {        // Update native input

        this.value = Math.max(this.min, Math.min(this.max, newValue));        this.elements.native.value = this.value;

        this.updateDisplay();        

        this.onChange(this.value);        // Update thumb color to match current hue

    }        this.updateThumbColor();

    }

    animateInitialShow() {

        setTimeout(() => {    updateThumbColor() {

            this.elements.slider.style.opacity = '1';        const hue = this.value;

            this.elements.slider.style.transform = 'translateY(0)';        const color = `hsl(${hue}, 100%, 60%)`;

        }, 100);        const shadowColor = `hsl(${hue}, 100%, 50%)`;

    }        

        this.elements.thumb.style.backgroundColor = color;

    destroy() {        this.elements.thumb.style.boxShadow = `

        if (this.animationId) {            0 0 20px ${shadowColor},

            cancelAnimationFrame(this.animationId);            0 0 40px ${shadowColor}aa,

        }            0 2px 10px rgba(0, 0, 0, 0.3)

        document.removeEventListener('mouseup', () => this.setDragging(false));        `;

        document.removeEventListener('touchend', () => this.setDragging(false));    }

    }

}    setValue(newValue) {

        this.value = Math.max(this.min, Math.min(this.max, newValue));

let elasticHueSlider = null;        this.updateDisplay();

        this.onChange(this.value);

function initializeElasticHueSlider() {    }

    const container = document.getElementById('hue-slider-container');

    if (container && !elasticHueSlider) {    animateInitialShow() {

        elasticHueSlider = new ElasticHueSlider(container, {        // Smooth initial animation

            value: 220,        setTimeout(() => {

            min: 0,            this.elements.slider.style.opacity = '1';

            max: 360,            this.elements.slider.style.transform = 'translateY(0)';

            step: 1,        }, 100);

            label: 'Adjust Lightning Hue',    }

            onChange: (hue) => {

                if (window.heroOdysseyLightning) {    destroy() {

                    window.heroOdysseyLightning.updateHue(hue);        if (this.animationId) {

                    console.log('Lightning hue updated to:', hue, 'degrees');            cancelAnimationFrame(this.animationId);

                } else {        }

                    console.warn('Lightning effect not found');        document.removeEventListener('mouseup', () => this.setDragging(false));

                }        document.removeEventListener('touchend', () => this.setDragging(false));

            }    }

        });}

        console.log('Elastic Hue Slider initialized with full 360 degree range');

    }// Global hue slider instance

}let elasticHueSlider = null;



window.ElasticHueSlider = ElasticHueSlider;// Initialize Elastic Hue Slider

window.elasticHueSlider = elasticHueSlider;function initializeElasticHueSlider() {

window.initializeElasticHueSlider = initializeElasticHueSlider;    const container = document.getElementById('hue-slider-container');
    if (container && !elasticHueSlider) {
        elasticHueSlider = new ElasticHueSlider(container, {
            value: 220,
            min: 0,
            max: 360,
            step: 1,
            label: 'Adjust Lightning Hue',
            onChange: (hue) => {
                // Connect to lightning effect
                if (window.heroOdysseyLightning) {
                    window.heroOdysseyLightning.updateHue(hue);
                    console.log('Lightning hue updated to:', hue, 'degrees');
                } else {
                    console.warn('Lightning effect not found');
                }
            }
        });
        console.log('Elastic Hue Slider initialized with full 360° range');
    }
}

// Export for global access
window.ElasticHueSlider = ElasticHueSlider;
window.elasticHueSlider = elasticHueSlider;
window.initializeElasticHueSlider = initializeElasticHueSlider;
        `;

        this.elements = {
            native: this.container.querySelector('.hue-slider-native'),
            label: this.container.querySelector('.hue-slider-label'),
            fill: this.container.querySelector('.hue-fill'),
            thumb: this.container.querySelector('.hue-thumb'),
            value: this.container.querySelector('.hue-value')
        };
    }

    bindEvents() {
        // Native input events
        this.elements.native.addEventListener('input', (e) => {
            this.value = Number(e.target.value);
            this.updateDisplay();
            this.onChange(this.value);
        });

        this.elements.native.addEventListener('mousedown', () => {
            this.setDragging(true);
        });

        this.elements.native.addEventListener('mouseup', () => {
            this.setDragging(false);
        });

        this.elements.native.addEventListener('touchstart', () => {
            this.setDragging(true);
        });

        this.elements.native.addEventListener('touchend', () => {
            this.setDragging(false);
        });

        // Global mouse/touch events
        document.addEventListener('mouseup', () => {
            this.setDragging(false);
        });

        document.addEventListener('touchend', () => {
            this.setDragging(false);
        });
    }

    getProgress() {
        return ((this.value - this.min) / (this.max - this.min)) * 100;
    }

    setDragging(dragging) {
        this.isDragging = dragging;
        this.updateAnimations();
    }

    updateAnimations() {
        const targetScale = this.isDragging ? 1.2 : 1;
        const targetOpacity = this.isDragging ? 1 : 0;
        
        this.animateProperty('scale', targetScale, 500, this.isDragging ? 20 : 30);
        this.animateProperty('labelOpacity', targetOpacity, 200);
        this.animateProperty('valueOpacity', targetOpacity, 200);
        
        this.applyAnimations();
    }

    animateProperty(property, target, duration, damping = 30) {
        const current = this.animationStates[property];
        const diff = target - current;
        const increment = diff / (duration / 16); // Assuming 60fps
        
        const animate = () => {
            if (Math.abs(this.animationStates[property] - target) > 0.01) {
                this.animationStates[property] += increment;
                this.applyAnimations();
                requestAnimationFrame(animate);
            } else {
                this.animationStates[property] = target;
                this.applyAnimations();
            }
        };
        
        animate();
    }

    applyAnimations() {
        const { scale, labelOpacity, valueOpacity } = this.animationStates;
        
        // Apply scale to thumb
        this.elements.thumb.style.transform = `translateX(-50%) scale(${scale})`;
        
        // Apply opacity to label and value
        this.elements.label.style.opacity = labelOpacity;
        this.elements.value.style.opacity = valueOpacity;
    }

    updateDisplay() {
        const progress = this.getProgress();
        
        // Update fill width
        this.elements.fill.style.width = `${progress}%`;
        
        // Update thumb position
        this.elements.thumb.style.left = `${progress}%`;
        
        // Update value display
        this.elements.value.textContent = `${this.value}°`;
        
        // Update native input value
        this.elements.native.value = this.value;
    }

    setValue(newValue) {
        this.value = Math.max(this.min, Math.min(this.max, newValue));
        this.updateDisplay();
        this.onChange(this.value);
    }

    destroy() {
        // Clean up event listeners
        document.removeEventListener('mouseup', () => this.setDragging(false));
        document.removeEventListener('touchend', () => this.setDragging(false));
    }
}

// Global hue slider instance
let elasticHueSlider = null;

// Initialize Elastic Hue Slider
function initializeElasticHueSlider() {
    const container = document.getElementById('hue-slider-container');
    if (container && !elasticHueSlider) {
        elasticHueSlider = new ElasticHueSlider(container, {
            value: 220,
            min: 0,
            max: 360,
            step: 1,
            label: 'Adjust Lightning Hue',
            onChange: (hue) => {
                // Connect to lightning effect
                if (window.heroOdysseyLightning) {
                    window.heroOdysseyLightning.updateHue(hue);
                }
            }
        });
    }
}

// Export for global access
window.ElasticHueSlider = ElasticHueSlider;
window.elasticHueSlider = elasticHueSlider;
window.initializeElasticHueSlider = initializeElasticHueSlider;