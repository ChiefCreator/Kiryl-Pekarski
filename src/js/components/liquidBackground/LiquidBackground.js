import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import { createDOM } from "../../utils/domUtils";

import "./liquidBackground.scss";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment.glsl";
import fragmentShader2 from "./../../../shaders/fragment2.glsl";
import sculpture3D from "./../../../3d/sculpture3.glb";

import NoiseTextureRenderer from "./NoiseTextureRenderer";
import ColorTextureRenderer from "./ColorTextureRenderer";
import RippleTextureRenderer from "./RippleTextureRenderer";

import envMap from "./../../../img/envMap.jpg";
import normalMap from "./../../../img/normal-map.jpg";

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
    this.textureScene = {};

    this.init();
  }

  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.gltfLoader = new GLTFLoader();
  }
  initTextures() {
    this.mainTexture = this.textureLoader.load(envMap);
    this.cubeTexture = this.cubeTextureLoader.load([envMap, envMap, envMap, envMap, envMap, envMap]);

    this.noiseTextureRenderer = new NoiseTextureRenderer();
    this.noiseTexture = this.noiseTextureRenderer.getTexture();

    // const ranges = [[ 0.0, 0.05 ], [ 0.05, 0.1 ], [ 0.1, 0.2 ], [ 0.2, 0.25 ], [ 0.25, 0.4 ], [ 0.4, 1.0 ]];
    // const colors = ["#99ff00", "#ff0090", "#00ffee", "pink", "#ffff00", "#ff4900"];

    // this.colorTextureRenderer= new ColorTextureRenderer({ colors, ranges: new Float32Array(ranges.flat()) });
    // this.colorTexture = this.colorTextureRenderer.getTexture();

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
    // this.camera = new THREE.OrthographicCamera( -this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize, -this.viewportSettings.frustumSize, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    });

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);

    this.gltfLoader.load(
      sculpture3D,
      (gltf) => {
        this.mesh = gltf.scene;
        this.mesh.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: this.mainTexture,
            });

            // child.material = new THREE.ShaderMaterial({
            //   uniforms: {
            //     uTexture: { value: this.mainTexture },
            //   },
            //   vertexShader,
            //   fragmentShader: textureSculptureFragmentShader,
            // });
          }
        });
        this.mesh.scale.set(1, 1, 1);
        this.mesh.position.set(0, 0, 0);
        this.scene.add(this.mesh);
      },
      undefined,
      (error) => console.error("Ошибка загрузки:", error)
    );

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  initPostprocessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.effect = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uWavesTexture: { value: this.rippleTexture },
        progress: { value: 1 },
        scale: { value: 1 },

        texturePattern: { value: this.texture },
        noise: { val0e: this.noiseTexture },
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

    this.composer.addPass(this.effect);
  }
  createMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        texturePattern: { value: this.texture },
        noise: { val0e: this.noiseTexture },
        uDisplacement: { value: this.rippleTexture },
        meEase: { value: 0.075 },
        time: { value: Math.ceil(50 * Math.random()) },
        ease: { value: 0 },
        alpha: { value: 1.0 },
        distA: { value: 0.64 },
        distB: { value: 2.5 },
        mfBlack: { value: 0.0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
  }
  init() {
    this.initLoaders();
    this.initTextures();

    this.init3DScene();
    this.initPostprocessing();

    this.animate();
    this.animateTransformationFromliquid();

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  updateProgress = (value) => {
    gsap.to(this.effect.uniforms.progress, {
      value: value,
      duration: 2,
    });
  };
  animate = () => {
    requestAnimationFrame(this.animate);

    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;
    this.effect.uniforms.time.value += 0.01;

    if (this.composer) this.composer.render();

    // this.controls.update();
  };
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  animateTransformationFromliquid() {
    ScrollTrigger.create({
      trigger: this.liquidBackground,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => this.updateProgress(1),
      onLeave: () => this.updateProgress(0),
      onEnterBack: () => this.updateProgress(1),
      onLeaveBack: () => this.updateProgress(0),
    });
  }

  create() {
    const liquidBackground = createDOM("div", { className: "liquid-background" });

    return liquidBackground;
  }
  render() {
    return this.liquidBackground;
  }
}
