import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import { createDOM } from "../../utils/domUtils";

import "./liquidBackground.scss";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader2 from "./../../../shaders/fragment2.glsl";
import sculpture3D from "./../../../3d/sculpture.glb";

import NoiseTextureRenderer from "./NoiseTextureRenderer";
import RippleTextureRenderer from "./RippleTextureRenderer";

import mainTexture from "./../../../img/main-texture.png?as=webp";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class LiquidBackground {
  constructor({ app }) {
    this.app = app;

    this.liquidBackground = this.create();
    this.sculptureWrapper = null;

    this.time = 0;
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
    this.sculptureOptions = {
      angle: 0,
      rotationDirection: -1,
      rotationSpeed: 0.003,
    }
    this.meshScale = null;
    this.meshPosition = new THREE.Vector3(0, 0, 0);

    this.isTr = true;

    this.animationId = null;

    this.init();
  }

  setMeshScale() {
    switch(true) {
      case window.innerWidth <= 450:
        return .65;
      case window.innerWidth <= 600:
        return .7;
      default:
        return 1;
    }
  }

  updateTime(seconds) {
    this.time += seconds;
  }

  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.gltfLoader = new GLTFLoader();
  }
  initTextures() {
    this.mainTexture = this.textureLoader.load(mainTexture);
    this.cubeTexture = this.cubeTextureLoader.load([mainTexture, mainTexture, mainTexture, mainTexture, mainTexture, mainTexture]);

    this.noiseTextureRenderer = new NoiseTextureRenderer();
    this.noiseTexture = this.noiseTextureRenderer.getTexture();

    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  init3DScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.liquidBackground.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.viewportSettings.aspectRatio, 0.1, 1000);
    this.camera.position.z = 4.5;

    this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);

    this.gltfLoader.load(
      sculpture3D,
      (gltf) => {
        this.mesh = gltf.scene;
        this.mesh.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              roughness: 0.25,
              metalness: 1,
              envMap: this.cubeTexture,
            });
          }
        });
        this.mesh.scale.set(...[.5, .5, .5]);
        this.scene.add(this.mesh);
        this.mesh.position.set(this.meshPosition.x, this.meshPosition.y, 0);
      },
      undefined,
      (error) => console.error("Ошибка загрузки:", error)
    );
  }
  initPostprocessing() {
    this.composer = new EffectComposer(this.renderer);

    this.effect = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uWavesTexture: { value: this.rippleTexture },
        progress: { value: 0 },
        scale: { value: 1 },

        texturePattern: { value: this.texture },
        noise: { value: this.noiseTexture },
        uDisplacement: { value: this.app.getDevice().isSensoryInput ? null : this.rippleTexture },
        meEase: { value: 0.075 },
        time: { value: Math.ceil(50 * Math.random()) },
        ease: { value: 0 },
        alpha: { value: 1.0 },
        distA: { value: 0.64 },
        distB: { value: 2.5 },
        mfBlack: { value: 0.0 },
      },
      fragmentShader: fragmentShader2,
      vertexShader,
    });

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effect);
  }
  init() {
    this.meshScale = this.setMeshScale();

    this.initLoaders();
    this.initTextures();

    this.init3DScene();
    this.initPostprocessing();

    this.app.addListenerOfGettingScrollingSpeed(() => this.updateTime(0.02));

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("scroll", this.updateSculpturePosition.bind(this));
  }

  updateSculpturePosition() {
    this.sculptureWrapper = document.querySelector(".sculpture-block__wrapper") ?? null;

    if (!this.sculptureWrapper) return;

    const rect = this.sculptureWrapper.getBoundingClientRect();
    const elementPositionCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  
    const normalizedX = (elementPositionCenter.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(elementPositionCenter.y / window.innerHeight) * 2 + 1;
  
    const vector = new THREE.Vector3(normalizedX, normalizedY, 0.0);
    vector.unproject(this.camera);

    const direction = vector.sub(this.camera.position).normalize();
    const distance = (0 - this.camera.position.z) / direction.z;
    const position = this.camera.position.clone().add(direction.multiplyScalar(distance));
    const yInaccuracy = 0.4;

    this.meshPosition = new THREE.Vector3(position.x, position.y + yInaccuracy, 0.0);

    if (!this.animateMeshPosition) return;

    this.animateMeshPosition.vars.x = this.meshPosition.x;
    this.animateMeshPosition.vars.y = this.meshPosition.y;
    this.animateMeshPosition.invalidate();
  }
  animateSculpturePosition = () => {
    this.mesh.position.set(this.meshPosition.x, this.meshPosition.y, 0);

    this.timeline = requestAnimationFrame(this.animateSculpturePosition);
  }
  updateProgress = (value) => {
    gsap.to(this.effect.uniforms.progress, {
      value: value,
      duration: 2,
    });

    if (!this.mesh) return;

    this.animateMeshPosition = gsap.to(this.mesh.position, {
      x: this.meshPosition.x,
      y: this.meshPosition.y,
      z: 0,
      duration: 2,
      paused: true,
    });

    switch(value) {
      case 1:
        if (this.mesh) {
          gsap.to(this.mesh.position, { x: 0, y: 0, z: 0, duration: 2 });
          gsap.to(this.mesh.scale, { x: this.meshScale, y: this.meshScale, z: this.meshScale, duration: 2 });

          clearTimeout(this.timeoutId);
          cancelAnimationFrame(this.timeline)
        }
        break;
      case 0:
        if (this.mesh && this.meshPosition) {
          gsap.to(this.mesh.scale, { x: 1, y: 1, z: 1, duration: 2 });

          this.animateMeshPosition.invalidate().restart();
          this.timeoutId = setTimeout(() => {
            this.animateSculpturePosition();
          }, 2000)  
        }
        break;
    }
  };
  animate = () => {
    this.updateTime(0.01);
    this.animateSculptureRotation(-0.25, 0.75);

    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    if (!this.app.getDevice().isSensoryInput) this.effect.uniforms.uWavesTexture.value = this.rippleTexture;
    this.effect.uniforms.time.value = this.time;

    if (this.composer) this.composer.render();

    this.animationId = requestAnimationFrame(this.animate);
  };
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  animateTransformationFromliquid() {
    if (this.scrollTrigger) this.scrollTrigger.kill();

    this.scrollTrigger = ScrollTrigger.create({
      trigger: document.querySelector(".section-main"),
      start: "top 75%",
      end: "50% 25%",
      onEnter: () => {
        this.updateProgress(1);
      },
      onLeave: () => {
        this.updateProgress(0);
      },
      onEnterBack: () => {
        this.updateProgress(1);
      },
      onLeaveBack: () => {
        this.updateProgress(0);
      },
    });
  }
  animateSculptureRotation(startAngle, endAngle) {
    if (!this.mesh) return;

    if (this.mesh.rotation.y >= endAngle || this.mesh.rotation.y <= startAngle) { 
      this.sculptureOptions.rotationDirection = -this.sculptureOptions.rotationDirection;
    }
    
    this.mesh.rotation.y += this.sculptureOptions.rotationSpeed * this.sculptureOptions.rotationDirection;
  }

  initAnimations() {
    this.animateTransformationFromliquid();
    this.animate();
  }
  stopAnimations() {
    this.scrollTrigger.kill();
    cancelAnimationFrame(this.animationId);
  }
  create() {
    const liquidBackground = createDOM("div", { className: "liquid-background" });

    return liquidBackground;
  }
  render() {
    return this.liquidBackground;
  }
}
