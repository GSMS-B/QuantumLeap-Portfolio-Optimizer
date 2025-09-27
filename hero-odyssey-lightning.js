/**
 * Hero Odyssey Lightning Effect - Exact React Implementation
 * WebGL Lightning with HSV color conversion and fractal Brownian motion
 */

class HeroOdysseyLightning {
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

        // EXACT fragment shader from React Lightning component
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

            // Convert HSV to RGB.
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

            void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
                // Normalized pixel coordinates.
                vec2 uv = fragCoord / iResolution.xy;
                uv = 2.0 * uv - 1.0;
                uv.x *= iResolution.x / iResolution.y;
                // Apply horizontal offset.
                uv.x += uXOffset;
                
                // Adjust uv based on size and animate with speed.
                uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
                
                float dist = abs(uv.x);
                // Compute base color using hue.
                vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
                // Compute color with intensity and speed affecting time.
                vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
                col = pow(col, vec3(1.0));
                fragColor = vec4(col, 1.0);
            }

            void main() {
                mainImage(gl_FragColor, gl_FragCoord.xy);
            }
        `;

        this.vertexShader = this.compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
        this.fragmentShader = this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        
        if (!this.vertexShader || !this.fragmentShader) return;
        
        this.program = this.gl.createProgram();
        if (!this.program) return;
        
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(this.program));
            return;
        }
        
        this.gl.useProgram(this.program);
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        if (!shader) return null;
        
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
        // Full-screen quad vertices
        const vertices = new Float32Array([
            -1, -1,  1, -1, -1,  1,
            -1,  1,  1, -1,  1,  1
        ]);
        
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
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
        
        // Draw
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        
        this.animationId = requestAnimationFrame(() => this.render());
    }

    updateHue(newHue) {
        this.hue = newHue;
    }

    updateParameters(params) {
        if (params.hue !== undefined) this.hue = params.hue;
        if (params.xOffset !== undefined) this.xOffset = params.xOffset;
        if (params.speed !== undefined) this.speed = params.speed;
        if (params.intensity !== undefined) this.intensity = params.intensity;
        if (params.size !== undefined) this.size = params.size;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
    }
}

// Global lightning instance
let heroOdysseyLightning = null;

// Initialize Hero Odyssey Lightning
function initializeHeroOdysseyLightning() {
    const canvas = document.getElementById('lightning-canvas');
    if (canvas && !heroOdysseyLightning) {
        heroOdysseyLightning = new HeroOdysseyLightning(canvas, {
            hue: 220,
            xOffset: 0,
            speed: 1.6,
            intensity: 0.6,
            size: 2
        });
    }
}

// Export for global access
window.HeroOdysseyLightning = HeroOdysseyLightning;
window.heroOdysseyLightning = heroOdysseyLightning;
window.initializeHeroOdysseyLightning = initializeHeroOdysseyLightning;