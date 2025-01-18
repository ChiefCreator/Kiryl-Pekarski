import { createDOM } from "../../utils/domUtils";
import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import RippleTextureRenderer from "../../components/liquidBackground/RippleTextureRenderer";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { animateElementOnScroll } from "../../utils/animateOnScrollUtils";

export default class ProjectScene {
  constructor({ mainImgElement, mainImgSrc, sliderImages, imagesSrc, imageGaleryObject }) {
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };

    this.mainImgElement = mainImgElement;
    this.mainImgSrc = mainImgSrc;
    this.mainImagePlane = null;
    this.mainImageMeshPosition = {
      posX: 0,
      posY: 0,
      prevPosX: null,
      prevPosY: null,
    };

    this.imageGaleryObject = imageGaleryObject;

    this.sliderImages = sliderImages;
    this.imagesSrc = imagesSrc;
    this.sliderImageMeshes = [];
    this.sliderImagesMeshPositions = Array.from({ length: this.sliderImages.length }).map((item) => (item = { posX: 0, posY: 0, prevPosX: null, prevPosY: null }));

    this.projectScene = null;

    this.init();
  }

  initAnimations() {
    const timelineOnScroll = gsap.timeline({ paused: true });
    timelineOnScroll.fromTo(
      this.mainImagePlane.scale,
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 1,
        duration: 2,
        ease: "power4.inOut",
      }
    );

    animateElementOnScroll(this.mainImgElement, {
      events: {
        onEnter: () => {
          timelineOnScroll.restart();
        },
      },
    });
  }

  // инициализация 3D
  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initTextures() {
    this.mainImageTexture = this.textureLoader.load(this.mainImgSrc);
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initMainImagePlane() {
    const size = this.getMeshSizeByHtmlElement(this.mainImgElement);

    const planeGeometry = new THREE.PlaneGeometry(size.width, size.height);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: this.mainImageTexture,
    });

    this.mainImagePlane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.mainImagePlane.position.set(0, 0, 0);

    this.scene.add(this.mainImagePlane);
  }
  initSliderImages() {
    this.imagesSrc.forEach((img, imgIndex) => {
      const size = this.getMeshSizeByHtmlElement(this.sliderImages[imgIndex]);

      const geometry = new THREE.PlaneGeometry(size.width, size.height);
      const material = new THREE.MeshBasicMaterial({ map: this.textureLoader.load(img) });

      const imgMesh = new THREE.Mesh(geometry, material);

      this.scene.add(imgMesh);
      this.sliderImageMeshes.push(imgMesh);
    });
  }
  initScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.projectScene.append(this.renderer.domElement);

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
  init3D() {
    this.initLoaders();
    this.initTextures();
    this.initScene();
    this.initPostprocessing();
    this.initMainImagePlane();
    this.initSliderImages();

    this.animate();
    this.imageGaleryObject.initScrollAnimation();
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
  animate = () => {
    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    this.updateMainImagePlanePosition();
    this.updateSliderImagesPositions();

    if (this.composer) this.composer.render();

    requestAnimationFrame(this.animate);
  };

  // Привязка 3D объектов к HTML
  getMeshSizeByHtmlElement(element) {
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    return {
      width: (width / this.viewportSettings.width) * this.viewportSettings.aspectRatio * 2,
      height: (height / this.viewportSettings.height) * 2,
    };
  }
  getMeshPositionByHtmlPosition(element) {
    const rect = element.getBoundingClientRect();

    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const posX = (elementCenterX / this.viewportSettings.width) * 2 * this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio - this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio;
    const posY = this.viewportSettings.frustumSize - (elementCenterY / this.viewportSettings.height) * 2 * this.viewportSettings.frustumSize;

    return { posX, posY };
  }
  updateMainImagePlanePosition() {
    const { posX, posY } = this.getMeshPositionByHtmlPosition(this.mainImgElement);

    if (!this.mainImageMeshPosition.prevPosX || this.mainImageMeshPosition.prevPosX !== posX || this.mainImageMeshPosition.prevPosY !== posY) {
      this.mainImagePlane.position.set(posX, posY, 0);

      this.mainImageMeshPosition.prevPosX = posX;
      this.mainImageMeshPosition.prevPosY = posY;
    }
  }
  updateSliderImagesPositions() {
    this.sliderImages.forEach((img, imgIndex) => {
      const { posX, posY } = this.getMeshPositionByHtmlPosition(img);

      if (!this.sliderImagesMeshPositions[imgIndex].prevPosX || this.sliderImagesMeshPositions[imgIndex].prevPosX !== posX || this.sliderImagesMeshPositions[imgIndex].prevPosY !== posY) {
        this.sliderImageMeshes[imgIndex].position.set(posX, posY, 0);

        this.sliderImagesMeshPositions[imgIndex].prevPosX = posX;
        this.sliderImagesMeshPositions[imgIndex].prevPosY = posY;
      }
    });
  }

  // инициализация и рендеринг
  init() {
    this.projectScene = this.create();

    this.init3D();
  }
  create() {
    return createDOM("div", { className: "project-scene" });
  }
  render() {
    return this.projectScene;
  }
}
