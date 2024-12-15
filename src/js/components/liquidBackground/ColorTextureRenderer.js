import * as THREE from "three";

import colorVertexShader from "./../../../shaders/colorVertexShader.glsl";
import colorFragmentShader from "./../../../shaders/colorFragmentShader.glsl";

export default class ColorTextureRenderer {
  constructor({ colors, ranges }) {
    this.colors = colors;
    this.ranges = ranges;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;

    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.camera.position.set(0, 0, 1);

    this.renderTarget = new THREE.WebGLRenderTarget(512, 512, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    this.shader = {
      vertexShader: colorVertexShader,
      fragmentShader: colorFragmentShader,
      uniforms: {
        uColors: { value: this.colors.map(color => new THREE.Color(color)) },
        uRanges: { value: this.ranges },
        uTime: { value: 0 },
      },
    };

    this.material = new THREE.ShaderMaterial(this.shader);

    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render(renderer) {
    this.shader.uniforms.uTime.value = this.time;
    this.time += 0.008;

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }

  getTexture() {
    return this.renderTarget.texture;
  }
}