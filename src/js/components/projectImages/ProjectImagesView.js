import { createDOM } from "../../utils/domUtils";
import * as THREE from "three";
import gsap from "gsap";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import RippleTextureRenderer from "./../liquidBackground/RippleTextureRenderer";

import { animateElementOnScroll } from "./../../utils/animateOnScrollUtils";

export default class ProjectImagesView {
  constructor() {
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
    this.projectImages = null;

    this.planeImages = [];
  }

  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initTextures() {
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initPlaneImages() {
    this.data.forEach((data, i) => {
      const planeWidth = (data.width / this.viewportSettings.width) * this.viewportSettings.aspectRatio * 2;
      const planeHeight = (data.height / this.viewportSettings.height) * 2; 

      const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const texture = this.textureLoader.load(data.url);
      const planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      this.planeImages.push(plane);
      this.scene.add(plane);

      const timelineOnScroll = gsap.timeline({ paused: true });
      timelineOnScroll
        .fromTo(
          data.img,
          {
            transform: `translate(0, 100%)`,
          },
          {
            transform: `translate(0, 0)`,
            duration: 2,
            ease: "power4.inOut",
          }
        )

      animateElementOnScroll(data.img, {
        events: {
          onEnter: () => {
            timelineOnScroll.restart()
          }
        }
      });
    });
  }
  init3DScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.projectImages.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize, -this.viewportSettings.frustumSize, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderTarget = new THREE.WebGLRenderTarget(this.viewportSettings.width, this.viewportSettings.height, {
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    });

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);
  }
  initPostprocessing() {
    this.composer = new EffectComposer(this.renderer);

    this.effect = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uWavesTexture: { value: this.rippleTexture },
        texturePattern: { value: this.texture },
      },
      fragmentShader: fragmentShader,
      vertexShader,
    });

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effect);
  }
  initTimelines() {
    
  }
  init(data) {
    this.data = data;
    this.projectImages = this.create();

    this.initLoaders();
    this.initTextures();
    this.init3DScene();
    this.initPlaneImages();
    this.initPostprocessing();

    this.animate();
    this.updatePosition();

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  animate = () => {
    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    if (this.composer) this.composer.render();

    this.updatePosition();

    requestAnimationFrame(this.animate);
  };
  updatePosition() {
    this.data.forEach((dataObj, i) => {

    const elementCenterX = dataObj.img.getBoundingClientRect().left + dataObj.img.offsetWidth / 2;
    const elementCenterY = dataObj.img.getBoundingClientRect().top + dataObj.img.offsetHeight / 2;

    const posX = (elementCenterX / this.viewportSettings.width) * 2 * this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio - this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio;
    const posY = this.viewportSettings.frustumSize - (elementCenterY / this.viewportSettings.height) * 2 * this.viewportSettings.frustumSize;
    
    this.planeImages[i].position.set(posX, posY, 0);
    });
  }
  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  create() {
    return createDOM("div", { className: "project-images" });
  }
  render() {
    return this.projectImages;
  }
}
