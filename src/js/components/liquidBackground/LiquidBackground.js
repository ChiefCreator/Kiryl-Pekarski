import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import { createDOM } from "../../utils/domUtils";

import "./liquidBackground.scss";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment.glsl";
import fragmentShader2 from "./../../../shaders/fragment2.glsl";
import sculpture3D from "./../../../3d/sculpture.glb";

import NoiseTextureRenderer from "./NoiseTextureRenderer";
import ColorTextureRenderer from "./ColorTextureRenderer";
import RippleTextureRenderer from "./RippleTextureRenderer";

import envMap from "./../../../img/envMap.jpg";
import normalMap from "./../../../img/normal-map.jpg";
import mainTexture from "./../../../img/main-texture.png";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class LiquidBackground {
  constructor() {
    this.liquidBackground = this.create();

    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };

    this.sculptureWrapper = null;
    this.meshPosition = new THREE.Vector3(0, 0, 0);

    this.sculptureOptions = {
      angle: 0,
      rotationDirection: -1,
      rotationSpeed: 0.003,
    }

    this.isTr = true;

    this.init();
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

    const ranges = [[ 0.0, 0.05 ], [ 0.05, 0.1 ], [ 0.1, 0.2 ], [ 0.2, 0.25 ], [ 0.25, 0.4 ], [ 0.4, 1.0 ]];
    const colors = ["#ff4900", "#ff4900", "#00ffee", "pink", "#ffff00", "#ff4900"];

    this.colorTextureRenderer= new ColorTextureRenderer({ colors, ranges: new Float32Array(ranges.flat()) });
    this.colorTexture = this.colorTextureRenderer.getTexture();

    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();

    this.normalTexture = this.textureLoader.load(normalMap);
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
        this.mesh.scale.set(1, 1, 1);
        this.animateTransformationFromliquid();
        this.scene.add(this.mesh);
        this.mesh.position.set(this.meshPosition.x, this.meshPosition.y, 0)
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
        uDisplacement: { value: this.rippleTexture },
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
    this.initLoaders();
    this.initTextures();

    this.init3DScene();
    this.initPostprocessing();

    this.animate();

    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("scroll", this.updateSculpturePosition.bind(this));
  }

  updateSculpturePosition() {
    this.sculptureWrapper = document.querySelector(".sculpture-block__wrapper") ?? null;

    if (!this.sculptureWrapper) return;

    const rect = this.sculptureWrapper.getBoundingClientRect();
    const elementPosition = {
      x: rect.left,
      y: rect.top 
    };
  
    const normalizedX = (elementPosition.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(elementPosition.y / window.innerHeight) * 2 + 1;
  
    const vector = new THREE.Vector3(normalizedX + .5, normalizedY - .5, 0.0);
    vector.unproject(this.camera);

    const direction = vector.sub(this.camera.position).normalize();
    const distance = (0 - this.camera.position.z) / direction.z;
    const position = this.camera.position.clone().add(direction.multiplyScalar(distance));
    const yInaccuracy = 0.3;

    this.meshPosition = new THREE.Vector3(position.x,position.y + yInaccuracy, 0.0);

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
          gsap.to(this.mesh.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
          });
          clearTimeout(this.timeoutId);
          cancelAnimationFrame(this.timeline)
        }
        break;
      case 0:
        if (this.mesh && this.meshPosition) {
          this.animateMeshPosition.invalidate();
          this.animateMeshPosition.restart(); 
          this.timeoutId = setTimeout(() => {
            this.animateSculpturePosition();
          }, 2000)  
        }
        break;
    }
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.animateSculptureRotation(-0.25, 0.75);

    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;
    this.effect.uniforms.time.value += 0.01;

    if (this.composer) this.composer.render();
  };
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  animateTransformationFromliquid() {
    ScrollTrigger.create({
      trigger: document.querySelector(".section-main"),
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        console.log("liquid");
        this.updateProgress(1);
      },
      onLeave: () => {
        console.log("sculpture");
        this.updateProgress(0);
      },
      onEnterBack: () => {
        console.log("liquid again");
        this.updateProgress(1);
      },
      onLeaveBack: () => {
        console.log("sculpture again");
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

  create() {
    const liquidBackground = createDOM("div", { className: "liquid-background" });

    return liquidBackground;
  }
  render() {
    return this.liquidBackground;
  }
}
