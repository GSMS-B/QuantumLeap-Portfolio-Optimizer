/**
 * Enhanced Hero Lightning Effect - Prominent Lightning like Reference Image
 */

class LightningEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        this.hue = 216; // Default blue hue
        this.program = null;
        this.animationId = null;
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        this.setupShaders();
        this.render();
    }

    setupShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform float u_hue;
            
            vec3 hsv2rgb(vec3 c) {
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }
            
            float rand(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }
            
            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                float a = rand(i);
                float b = rand(i + vec2(1.0, 0.0));
                float c = rand(i + vec2(0.0, 1.0));
                float d = rand(i + vec2(1.0, 1.0));
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }
            
            float fbm(vec2 st) {
                float value = 0.0;
                float amplitude = 0.5;
                for(int i = 0; i < 4; i++) {
                    value += amplitude * noise(st);
                    st *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }
            
            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                vec2 pos = st * 2.0 - 1.0;
                pos.x *= u_resolution.x / u_resolution.y;
                
                float time = u_time * 0.001;
                
                // Generate PROMINENT lightning patterns - much brighter
                float lightning = 0.0;
                
                // Main central lightning bolt - very bright
                vec2 center = vec2(0.0, 0.0);
                float centralDist = length(pos - center);
                float centralBolt = exp(-centralDist * 2.0) * 
                    (1.0 + 0.8 * sin(time * 12.0)) * 
                    (1.0 + 0.6 * fbm(st * 6.0 + time * 2.0));
                lightning += centralBolt * 2.5; // Much brighter
                
                // Branching lightning effects
                for(int i = 0; i < 5; i++) {
                    float offset = float(i) * 1.3;
                    vec2 lightningPos = vec2(
                        sin(time * 0.4 + offset) * 1.2,
                        cos(time * 0.3 + offset) * 0.8
                    );
                    
                    float dist = distance(pos, lightningPos);
                    float bolt = exp(-dist * 3.0) * 
                        (0.8 + 0.5 * sin(time * 10.0 + offset)) *
                        (0.7 + 0.4 * noise(st * 8.0 + time + offset));
                    lightning += bolt * 1.8; // Much brighter
                }
                
                // Electric web pattern
                float webPattern = 0.0;
                vec2 webSt = st * 4.0;
                float webNoise = fbm(webSt + time * 0.5);
                webPattern = pow(webNoise, 3.0) * (0.5 + 0.5 * sin(time * 15.0));
                lightning += webPattern * 1.2;
                
                // Pulsing energy field
                float pulse = 0.5 + 0.5 * sin(time * 6.0);
                float energy = exp(-centralDist * 0.5) * pulse;
                lightning += energy * 0.8;
                
                // Add fractal lightning details
                float details = fbm(st * 12.0 + time * 3.0) * 
                    exp(-centralDist * 1.5) * 
                    (0.6 + 0.4 * sin(time * 20.0));
                lightning += details * 1.5;
                
                // Boost overall intensity significantly
                lightning = pow(lightning, 0.7) * 2.0; // Much more visible
                
                // Color based on hue slider - more saturated
                vec3 color = hsv2rgb(vec3(u_hue / 360.0, 0.9, lightning));
                
                // Add electric blue highlights for realism
                vec3 electricBlue = vec3(0.4, 0.7, 1.0);
                color = mix(color, electricBlue, lightning * 0.3);
                
                // Much higher alpha for visibility
                float alpha = clamp(lightning * 0.8, 0.0, 0.9);
                
                gl_FragColor = vec4(color, alpha);
            }
        `;

        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        this.program = this.createProgram(vertexShader, fragmentShader);
        
        // Create buffer for full-screen quad
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]), this.gl.STATIC_DRAW);
        
        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    createShader(type, source) {
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

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program link error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }

    updateHue(newHue) {
        this.hue = newHue;
    }

    render() {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        this.gl.useProgram(this.program);
        
        // Set uniforms
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        const hueLocation = this.gl.getUniformLocation(this.program, 'u_hue');
        
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(timeLocation, Date.now() - this.startTime);
        this.gl.uniform1f(hueLocation, this.hue);
        
        // Enable additive blending for bright lightning
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        
        this.animationId = requestAnimationFrame(() => this.render());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
    }
}