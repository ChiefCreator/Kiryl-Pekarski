import * as THREE from "three";

import noiseVertexShader from "./../../../shaders/noiseVertexShader.glsl";
import noiseFragmentShader from "./../../../shaders/noiseFragmentShader.glsl";

export default class NoiseTextureRenderer {
  constructor() {
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
    this.count = 0;
    this.isRender = true;
    this.sepR = 7;
    this.sepG = 5;

    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.set(0, 0, 1);

    this.renderTarget = new THREE.WebGLRenderTarget(this.viewportSettings.width, this.viewportSettings.height, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    this.shader = {
      vertexShader: noiseVertexShader,
      fragmentShader: noiseFragmentShader,
      uniforms: {
        cr: { value: this.sepR },
        cg: { value: this.sepG },
        cb: { value: 0 },
      },
    };

    this.material = new THREE.ShaderMaterial(this.shader);

    this.geometry = new THREE.PlaneGeometry(2 * this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, 2 * this.viewportSettings.frustumSize);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render(renderer) {
    this.shader.uniforms.cb.value = this.count;
    this.count += 0.01;

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }

  getTexture() {
    return this.renderTarget.texture;
  }
}
