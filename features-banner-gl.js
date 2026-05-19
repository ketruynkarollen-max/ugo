/**
 * Banner "O que a U.GO faz" — WebGL (textura GPU, pausa fora da tela).
 * PT: features-banner-pt.webp | EN: features-banner-en.webp (fallback .png)
 */
(function () {
  const SRC = {
    pt: { webp: 'features-banner-pt.webp', png: 'features-banner-pt.png' },
    en: { webp: 'features-banner-en.webp', png: 'features-banner-en.png' },
  };

  const VS = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

  const FS = `#version 300 es
precision mediump float;
uniform sampler2D u_tex;
in vec2 v_uv;
out vec4 outColor;
void main() {
  outColor = texture(u_tex, vec2(v_uv.x, 1.0 - v_uv.y));
}`;

  function currentLang() {
    if (window.UgoI18n && typeof window.UgoI18n.getLang === 'function') {
      return window.UgoI18n.getLang() === 'en' ? 'en' : 'pt';
    }
    return document.documentElement.lang === 'en' ? 'en' : 'pt';
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('load failed: ' + url));
      img.src = url;
    });
  }

  async function loadBannerAsset(lang) {
    const paths = SRC[lang] || SRC.pt;
    try {
      return await loadImage(paths.webp);
    } catch {
      return loadImage(paths.png);
    }
  }

  class FeaturesBannerGL {
    constructor(wrap) {
      this.wrap = wrap;
      this.canvas = wrap.querySelector('.features-banner-canvas');
      this.fallback = wrap.querySelector('.features-banner-fallback');
      this.gl = null;
      this.program = null;
      this.tex = null;
      this.aspect = 16 / 9;
      this.visible = false;
      this.raf = 0;
      this.lang = currentLang();
      this._resizeObs = null;
      this._io = null;
    }

    async init() {
      if (!this.canvas) return;
      this.gl =
        this.canvas.getContext('webgl2', {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: 'low-power',
          premultipliedAlpha: false,
        }) || this.canvas.getContext('webgl', { alpha: false, antialias: false });

      if (!this.gl) {
        this.showFallback();
        return;
      }

      try {
        this.setupGL();
        await this.setLanguage(this.lang, false);
        this.bindEvents();
        this.measure();
        if (this.visible) this.draw();
      } catch (e) {
        console.warn('features-banner-gl:', e);
        this.showFallback();
      }
    }

    showFallback() {
      if (this.canvas) this.canvas.hidden = true;
      if (this.fallback) {
        this.fallback.hidden = false;
        this.fallback.src =
          (SRC[this.lang] && SRC[this.lang].png) || SRC.pt.png;
      }
    }

    setupGL() {
      const gl = this.gl;
      const isWebGL2 = gl instanceof WebGL2RenderingContext;

      if (!isWebGL2) {
        throw new Error('WebGL2 required');
      }

      const vs = this.compile(gl.VERTEX_SHADER, VS);
      const fs = this.compile(gl.FRAGMENT_SHADER, FS);
      this.program = gl.createProgram();
      gl.attachShader(this.program, vs);
      gl.attachShader(this.program, fs);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(this.program));
      }

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(this.program, 'a_pos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      this.tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        this.showFallback();
      });
    }

    compile(type, src) {
      const gl = this.gl;
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh));
      }
      return sh;
    }

    uploadImage(img) {
      const gl = this.gl;
      this.aspect = img.naturalWidth / img.naturalHeight || 16 / 9;
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    async setLanguage(lang, drawNow) {
      this.lang = lang === 'en' ? 'en' : 'pt';
      const img = await loadBannerAsset(this.lang);
      if (!this.gl) return;
      this.uploadImage(img);
      if (this.fallback) {
        this.fallback.src = (SRC[this.lang] && SRC[this.lang].png) || SRC.pt.png;
      }
      this.measure();
      if (drawNow !== false && this.visible) this.draw();
    }

    measure() {
      const w = this.wrap.clientWidth || window.innerWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const h = Math.round(w / this.aspect);
      this.canvas.width = Math.max(1, Math.round(w * dpr));
      this.canvas.height = Math.max(1, Math.round(h * dpr));
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.wrap.style.minHeight = h + 'px';
      if (this.gl) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    draw() {
      const gl = this.gl;
      if (!gl || !this.program) return;
      gl.useProgram(this.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.uniform1i(gl.getUniformLocation(this.program, 'u_tex'), 0);
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    bindEvents() {
      this._resizeObs = new ResizeObserver(() => {
        this.measure();
        if (this.visible) this.draw();
      });
      this._resizeObs.observe(this.wrap);

      this._io = new IntersectionObserver(
        (entries) => {
          const on = entries.some((e) => e.isIntersecting);
          this.visible = on;
          if (on) {
            this.measure();
            this.draw();
          }
        },
        { rootMargin: '120px' }
      );
      this._io.observe(this.wrap);

      document.addEventListener('ugo:langchange', (e) => {
        const l = (e.detail && e.detail.lang) || currentLang();
        this.setLanguage(l, true);
      });
    }

    destroy() {
      if (this._resizeObs) this._resizeObs.disconnect();
      if (this._io) this._io.disconnect();
      cancelAnimationFrame(this.raf);
    }
  }

  function boot() {
    const wrap = document.getElementById('features-banner-wrap');
    if (!wrap || wrap.dataset.glInit === '1') return;
    wrap.dataset.glInit = '1';
    const inst = new FeaturesBannerGL(wrap);
    inst.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
