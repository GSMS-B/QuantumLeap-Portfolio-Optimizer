/**
 * Hero Lightning Effect - Pure Vanilla JavaScript WebGL Implementation
 * Converted from React/TypeScript to pure JavaScript for QuantumLeap
 */

class LightningEffect {
    constructor(canvasElement, options = {}) {
        this.canvas = canvasElement;
        this.hue = options.hue || 220;
        this.xOffset = options.xOffset || 0;
        this.speed = options.speed || 1.6;
        this.intensity = options.intensity || 0.6;
        this.size = options.size || 2;
        this.animationId = null;
        this.startTime = null;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.gl = this.canvas.getContext('webgl');
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        this.setupShaders();
        this.setupVertices();
        this.setupUniforms();
        this.startTime = performance.now();
        this.render();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    setupShaders() {
        const vertexShaderSource = `
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float uHue;
            uniform float uXOffset;
            uniform float uSpeed;
            uniform float uIntensity;
            uniform float uSize;
            
            #define OCTAVE_COUNT 10

            // Convert HSV to RGB
            vec3 hsv2rgb(vec3 c) {
                vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
                return c.z * mix(vec3(1.0), rgb, c.y);
            }

            float hash11(float p) {
                p = fract(p * .1031);
                p *= p + 33.33;
                p *= p + p;
                return fract(p);
            }

            float hash12(vec2 p) {
                vec3 p3 = fract(vec3(p.xyx) * .1031);
                p3 += dot(p3, p3.yzx + 33.33);
                return fract((p3.x + p3.y) * p3.z);
            }

            mat2 rotate2d(float theta) {
                float c = cos(theta);
                float s = sin(theta);
                return mat2(c, -s, s, c);
            }

            float noise(vec2 p) {
                vec2 ip = floor(p);
                vec2 fp = fract(p);
                float a = hash12(ip);
                float b = hash12(ip + vec2(1.0, 0.0));
                float c = hash12(ip + vec2(0.0, 1.0));
                float d = hash12(ip + vec2(1.0, 1.0));
                
                vec2 t = smoothstep(0.0, 1.0, fp);
                return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
            }

            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                for (int i = 0; i < OCTAVE_COUNT; ++i) {
                    value += amplitude * noise(p);
                    p *= rotate2d(0.45);
                    p *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }

            void mainImage(out vec4 fragColor, in vec2 fragCoord) {
                // Normalized pixel coordinates
                vec2 uv = fragCoord / iResolution.xy;
                uv = 2.0 * uv - 1.0;
                uv.x *= iResolution.x / iResolution.y;
                // Apply horizontal offset
                uv.x += uXOffset;
                
                // Adjust uv based on size and animate with speed
                uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
                
                float dist = abs(uv.x);
                // Compute base color using hue
                vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
                // Compute color with intensity and speed affecting time
                vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
                col = pow(col, vec3(1.0));
                fragColor = vec4(col, 1.0);
            }

            void main() {
                mainImage(gl_FragColor, gl_FragCoord.xy);
            }
        `;

        this.program = this.createShaderProgram(vertexShaderSource, fragmentShaderSource);
        this.gl.useProgram(this.program);
    }

    createShaderProgram(vertexSource, fragmentSource) {
        const vertexShader = this.compileShader(vertexSource, this.gl.VERTEX_SHADER);
        const fragmentShader = this.compileShader(fragmentSource, this.gl.FRAGMENT_SHADER);
        
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    setupVertices() {
        const vertices = new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
        ]);
        
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const aPosition = this.gl.getAttribLocation(this.program, 'aPosition');
        this.gl.enableVertexAttribArray(aPosition);
        this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 0, 0);
    }

    setupUniforms() {
        this.uniforms = {
            iResolution: this.gl.getUniformLocation(this.program, 'iResolution'),
            iTime: this.gl.getUniformLocation(this.program, 'iTime'),
            uHue: this.gl.getUniformLocation(this.program, 'uHue'),
            uXOffset: this.gl.getUniformLocation(this.program, 'uXOffset'),
            uSpeed: this.gl.getUniformLocation(this.program, 'uSpeed'),
            uIntensity: this.gl.getUniformLocation(this.program, 'uIntensity'),
            uSize: this.gl.getUniformLocation(this.program, 'uSize')
        };
    }

    updateHue(newHue) {
        this.hue = newHue;
    }

    render() {
        this.resizeCanvas();
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        
        // Update uniforms
        this.gl.uniform2f(this.uniforms.iResolution, this.canvas.width, this.canvas.height);
        const currentTime = performance.now();
        this.gl.uniform1f(this.uniforms.iTime, (currentTime - this.startTime) / 1000.0);
        this.gl.uniform1f(this.uniforms.uHue, this.hue);
        this.gl.uniform1f(this.uniforms.uXOffset, this.xOffset);
        this.gl.uniform1f(this.uniforms.uSpeed, this.speed);
        this.gl.uniform1f(this.uniforms.uIntensity, this.intensity);
        this.gl.uniform1f(this.uniforms.uSize, this.size);
        
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.animationId = requestAnimationFrame(() => this.render());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
    }
}

// Elastic Hue Slider Component
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
        
        this.createSlider();
        this.bindEvents();
        this.updateDisplay();
    }

    createSlider() {
        this.container.innerHTML = `
            <div class="hue-slider-container">
                <label for="hue-slider-native" class="hue-slider-label">${this.label}</label>
                <div class="hue-slider-wrapper">
                    <input 
                        id="hue-slider-native"
                        type="range"
                        min="${this.min}"
                        max="${this.max}"
                        step="${this.step}"
                        value="${this.value}"
                        class="hue-slider-input"
                    />
                    <div class="hue-slider-track"></div>
                    <div class="hue-slider-fill"></div>
                    <div class="hue-slider-thumb"></div>
                </div>
                <div class="hue-slider-value">${this.value}°</div>
            </div>
        `;

        this.input = this.container.querySelector('.hue-slider-input');
        this.fill = this.container.querySelector('.hue-slider-fill');
        this.thumb = this.container.querySelector('.hue-slider-thumb');
        this.valueDisplay = this.container.querySelector('.hue-slider-value');
    }

    bindEvents() {
        this.input.addEventListener('input', (e) => {
            this.value = parseInt(e.target.value);
            this.updateDisplay();
            this.onChange(this.value);
        });

        this.input.addEventListener('mousedown', () => {
            this.isDragging = true;
            this.thumb.classList.add('dragging');
        });

        this.input.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.thumb.classList.remove('dragging');
        });

        this.input.addEventListener('touchstart', () => {
            this.isDragging = true;
            this.thumb.classList.add('dragging');
        });

        this.input.addEventListener('touchend', () => {
            this.isDragging = false;
            this.thumb.classList.remove('dragging');
        });
    }

    updateDisplay() {
        const progress = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.fill.style.width = `${progress}%`;
        this.thumb.style.left = `${progress}%`;
        this.valueDisplay.textContent = `${this.value}°`;
    }

    setValue(newValue) {
        this.value = newValue;
        this.input.value = newValue;
        this.updateDisplay();
    }
}

// Feature Item Component
class FeatureItem {
    constructor(container, options = {}) {
        this.container = container;
        this.name = options.name;
        this.value = options.value;
        this.position = options.position;
        this.delay = options.delay || 0;
        
        this.createFeatureItem();
        this.animateIn();
    }

    createFeatureItem() {
        this.container.innerHTML = `
            <div class="feature-item ${this.position}">
                <div class="feature-content">
                    <div class="feature-dot">
                        <div class="feature-dot-inner"></div>
                        <div class="feature-dot-glow"></div>
                    </div>
                    <div class="feature-text">
                        <div class="feature-name">${this.name}</div>
                        <div class="feature-value">${this.value}</div>
                        <div class="feature-text-glow"></div>
                    </div>
                </div>
            </div>
        `;
    }

    animateIn() {
        setTimeout(() => {
            this.container.querySelector('.feature-item').classList.add('animate-in');
        }, this.delay);
    }
}

// Export for use in other scripts
window.LightningEffect = LightningEffect;
window.ElasticHueSlider = ElasticHueSlider;
window.FeatureItem = FeatureItem;