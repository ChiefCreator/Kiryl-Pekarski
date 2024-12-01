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

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.set(0, 0, 1);

    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
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

    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render(renderer) {
    this.shader.uniforms.uTime.value = this.time;
    // this.time += 0.008;

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }

  getTexture() {
    return this.renderTarget.texture;
  }
}

// export default class GL_DummyScene {
//   constructor() {
//     this.width = 1400;
//     this.height = 788;
//     this.renderTarget = null;
//     this.scene = null;
//     this.camera = null;
//     this.bg = null;
//     this.viewPort = null;

//     this.init();
//   }

//   init() {
//     this.setViewPort();

//     this.camera = new THREE.OrthographicCamera(this.viewPort.left, this.viewPort.right, this.viewPort.top, this.viewPort.bottom, this.viewPort.near, this.viewPort.far);
//     this.camera.position.set(0, -0.5 * this.height, 1000);

//     this.scene = new THREE.Scene();

//     this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
//       magFilter: THREE.LinearFilter,
//       minFilter: THREE.LinearFilter,
//       wrapS: THREE.ClampToEdgeWrapping,
//       wrapT: THREE.ClampToEdgeWrapping,
//     });
//   }

//   render(renderer) {
//     renderer.setRenderTarget(this.renderTarget);
//     renderer.render(this.scene, this.camera);
//     renderer.setRenderTarget(null);
//   }

//   getTexture() {
//     return this.renderTarget.texture;
//   }

//   setViewPort() {
//     this.viewPort = {};
//     let t = this.width;
//     let e = this.height;
//     t = t / e;

//     this.viewPort = {
//       viewSize: e,
//       aspectRatio: t,
//       left: (-t * e) / 2,
//       right: (t * e) / 2,
//       top: e / 2,
//       bottom: -e / 2,
//       near: 0,
//       far: 1e4,
//     };
//   }

//   getTexture() {
//     return this.texture;
//   }
// }
