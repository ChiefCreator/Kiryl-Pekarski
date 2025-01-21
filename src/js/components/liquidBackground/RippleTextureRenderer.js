import * as THREE from "three";

import rippleNoiseMap from "./../../../img/ripple-noise-map.png";

import rippleVertexShader from "./../../../shaders/rippleVertexShader.glsl";
import rippleFragmentShader from "./../../../shaders/rippleFragmentShader.glsl";

export default class RippleTextureRenderer {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.maxCountOfRippleMeshes = 100;
    this.rippleMeshes = [];
    this.rippleOptions = {
      size: .15,
    };
    this.currentRippleIndex = 0;

    this.mouseObj = new THREE.Vector2(0, 0);
    this.prevMouseObj = new THREE.Vector2(0, 0);

    this.init();
  }

  createRippleMesh({ geometry, texture }) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    })

    return new THREE.Mesh(geometry, material);
  }
  animateRipple(posX, posY, currentRippleIndex) {
    const rippleMesh = this.rippleMeshes[currentRippleIndex];
    rippleMesh.visible = true;
    rippleMesh.position.x = posX;
    rippleMesh.position.y = posY;
    rippleMesh.scale.x = rippleMesh.scale.y = 1;
    rippleMesh.material.opacity = 1;
  }
  isMouseActive() {
    return (Math.abs(this.mouseObj.x - this.prevMouseObj.x) >= 0.001 && Math.abs(this.mouseObj.y - this.prevMouseObj.y) >= 0.001);
  }
  startWaveAnimation() {
    if (this.isMouseActive()) {
      this.animateRipple(this.mouseObj.x, this.mouseObj.y, this.currentRippleIndex);
      this.currentRippleIndex = ++this.currentRippleIndex % this.maxCountOfRippleMeshes;
    }

    this.prevMouseObj.x = this.mouseObj.x;
    this.prevMouseObj.y = this.mouseObj.y;
  }

  initMouseEvents() {
    window.addEventListener("pointermove", this.mousemoveHandler.bind(this));
  }
  mousemoveHandler(event) {
    this.mouseObj.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseObj.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  init3DScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.set(0, 0, 1);

    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    this.rippleTexture = new THREE.TextureLoader().load(rippleNoiseMap);

    this.shader = {
      vertexShader: rippleVertexShader,
      fragmentShader: rippleFragmentShader,
      uniforms: {
        uTexture: { value: this.rippleTexture },
      },
      transparent: true,
    };

    const rippleGeometry = new THREE.PlaneGeometry(this.rippleOptions.size, this.rippleOptions.size);
    const rippleTexture = new THREE.TextureLoader().load(rippleNoiseMap);

    for (let i = 0; i < this.maxCountOfRippleMeshes; i++) {
      const rippleMesh = this.createRippleMesh({ geometry: rippleGeometry, texture: rippleTexture });

      rippleMesh.rotation.z = 2 * Math.PI * Math.random();
      rippleMesh.visible = false;

      this.scene.add(rippleMesh);
      this.rippleMeshes.push(rippleMesh);
    }
  }
  init() {
    this.initMouseEvents();
    this.init3DScene();
  }
  render(renderer) {
    this.startWaveAnimation();

    this.rippleMeshes.forEach(mesh => {
      if (!mesh.visible) return;

      mesh.material.opacity *= 0.96;
      mesh.rotation.z += 0.02;
      mesh.scale.x = 0.98 * mesh.scale.x + 0.1;
      mesh.scale.y = mesh.scale.x;

      if (mesh.material.opacity <= 0.02) mesh.visible = false;
    });

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }
  getTexture() {
    return this.renderTarget.texture;
  }
}