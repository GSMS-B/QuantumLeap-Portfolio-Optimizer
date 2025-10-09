// Enhanced Hue Slider - Perfect 360 Color Control
class ElasticHueSlider {
    constructor(container, options = {}) {
        this.container = container;
        this.value = options.value || 220;
        this.min = options.min || 0;
        this.max = options.max || 360;
        this.step = options.step || 1;
        this.label = options.label || 'Adjust Lightning Hue';
        this.onChange = options.onChange || (() => {});
        
        this.isDragging = false;
        this.init();
    }

    init() {
        this.createSlider();
        this.bindEvents();
        this.updateDisplay();
        
        setTimeout(() => {
            if (this.elements.slider) {
                this.elements.slider.classList.add('initialized');
            }
        }, 100);
    }

    createSlider() {
        this.container.innerHTML = 
            '<div class="elastic-hue-slider">' +
                '<label class="hue-slider-label">' + this.label + '</label>' +
                '<div class="hue-slider-wrapper">' +
                    '<input type="range" class="hue-slider-native" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '">' +
                    '<div class="hue-track-rainbow"></div>' +
                    '<div class="hue-thumb"></div>' +
                '</div>' +
                '<div class="hue-value">' + this.value + '°</div>' +
            '</div>';

        this.elements = {
            slider: this.container.querySelector('.elastic-hue-slider'),
            native: this.container.querySelector('.hue-slider-native'),
            label: this.container.querySelector('.hue-slider-label'),
            track: this.container.querySelector('.hue-track-rainbow'),
            thumb: this.container.querySelector('.hue-thumb'),
            value: this.container.querySelector('.hue-value')
        };
    }

    bindEvents() {
        var self = this;
        
        this.elements.native.addEventListener('input', function(e) {
            self.value = parseInt(e.target.value);
            self.updateDisplay();
            self.onChange(self.value);
        });

        this.elements.native.addEventListener('mousedown', function() {
            self.setDragging(true);
        });
        
        this.elements.native.addEventListener('mouseup', function() {
            self.setDragging(false);
        });
        
        this.elements.native.addEventListener('touchstart', function() {
            self.setDragging(true);
        });
        
        this.elements.native.addEventListener('touchend', function() {
            self.setDragging(false);
        });

        document.addEventListener('mouseup', function() {
            self.setDragging(false);
        });
        
        document.addEventListener('touchend', function() {
            self.setDragging(false);
        });
    }

    setDragging(dragging) {
        this.isDragging = dragging;
        if (dragging) {
            this.elements.slider.classList.add('dragging');
        } else {
            this.elements.slider.classList.remove('dragging');
        }
    }

    getProgress() {
        return ((this.value - this.min) / (this.max - this.min)) * 100;
    }

    updateDisplay() {
        var progress = this.getProgress();
        
        this.elements.thumb.style.left = progress + '%';
        this.elements.value.textContent = this.value + '°';
        this.elements.native.value = this.value;
        
        // Keep thumb transparent - no bright colors
        // The thumb styling is handled by CSS for a subtle transparent look
    }

    setValue(newValue) {
        this.value = Math.max(this.min, Math.min(this.max, newValue));
        this.updateDisplay();
        this.onChange(this.value);
    }
}

var elasticHueSlider = null;

function initializeElasticHueSlider() {
    var container = document.getElementById('hue-slider-container');
    if (container && !elasticHueSlider) {
        elasticHueSlider = new ElasticHueSlider(container, {
            value: 220,
            min: 0,
            max: 360,
            step: 1,
            label: 'Adjust Lightning Hue',
            onChange: function(hue) {
                if (window.heroOdysseyLightning) {
                    window.heroOdysseyLightning.updateHue(hue);
                    console.log('Lightning hue updated to:', hue);
                }
            }
        });
        console.log('Hue slider initialized successfully');
    }
}

window.ElasticHueSlider = ElasticHueSlider;
window.elasticHueSlider = elasticHueSlider;
window.initializeElasticHueSlider = initializeElasticHueSlider;