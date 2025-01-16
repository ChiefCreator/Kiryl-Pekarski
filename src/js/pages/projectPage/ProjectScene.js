import { createDOM } from "../../utils/domUtils";
import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import RippleTextureRenderer from "../../components/liquidBackground/RippleTextureRenderer";

export default class ProjectScene {
  constructor({ mainImgElement, mainImgSrc, imagesSrc, imageGaleryObject }) {
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
      prebPosY: null,
    }

    this.imageGaleryObject = imageGaleryObject;
    this.sliderSettings = {
      imageAmount: imagesSrc.length,
      imageWidth: 4.1,
      imageHeight: 2,
      gapX: 1.5,
      gapY: .8,
      sliderHeight: null,
    };
    this.sliderSettings.sliderHeight = (this.sliderSettings.imageAmount - 1) * (this.sliderSettings.imageHeight + this.sliderSettings.gapY);
    this.sliderSettings.sliderWidth = (this.sliderSettings.imageAmount - 1) * (this.sliderSettings.imageWidth + this.sliderSettings.gapX);
    this.sliderMeshPosition = {
      posX: 0,
      posY: 0,
      prevPosX: null,
      prebPosY: null,

    }
    this.imagesSrc = imagesSrc;
    this.sliderMesh = null;
    this.sliderContainerMesh = null;

    this.projectScene = null;

    this.init();
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
    const rect = this.mainImgElement.getBoundingClientRect();
    const size = this.getMainImagePlaneSize(rect.width, rect.height);

    const planeGeometry = new THREE.PlaneGeometry(size.width, size.height);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: this.mainImageTexture,
    });

    this.mainImagePlane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.mainImagePlane.position.set(0, 0, 0);

    this.scene.add(this.mainImagePlane);
  }
  initSlider() {
    this.sliderMesh = new THREE.Object3D();
    this.sliderContainerMesh = new THREE.Object3D();

    const geometry = new THREE.PlaneGeometry(this.sliderSettings.imageWidth, this.sliderSettings.imageHeight);

    geometry.computeVertexNormals();

    this.imagesSrc.forEach((img, imgIndex) => {
      const texture = this.textureLoader.load(img);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const imgMesh = new THREE.Mesh(geometry, material);
      imgMesh.position.x = -imgIndex * (this.sliderSettings.imageWidth + this.sliderSettings.gapX);

      this.sliderContainerMesh.add(imgMesh);
    });

    this.sliderMesh.add(this.sliderContainerMesh);

    this.scene.add(this.sliderMesh);
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
    this.initSlider();

    this.animate();
    this.initSliderScrollAnimation();
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
    this.updateImageGaleryPosition();

    if (this.composer) this.composer.render();

    requestAnimationFrame(this.animate);
  };

  // Привязка 3D объектов к HTML
  getMainImagePlaneSize(width, height) {
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
  updateImageGaleryPosition() {
    const { posX, posY } = this.getMeshPositionByHtmlPosition(this.imageGaleryObject.render());

    if (!this.sliderMeshPosition.prevPosX || this.sliderMeshPosition.prevPosX !== posX || this.sliderMeshPosition.prevPosY !== posY) {
      this.sliderMesh.position.set(posX, posY, 0);

      this.sliderMeshPosition.prevPosX = posX;
      this.sliderMeshPosition.prevPosY = posY;
    }
  }

  // обновление слайдера по скроллу
  initSliderScrollAnimation() {
    this.imageGaleryObject.initScrollAnimation(this);
  }
  updateSliderContainerMeshPosition(position, scrollEnd) {
    const normalizePosition = this.normalizePosition(position, scrollEnd);
    const posX = Math.abs((normalizePosition.normalizedY - 1) / 2) * this.sliderSettings.sliderWidth;

    this.sliderContainerMesh.position.x = posX;
  }
  normalizePosition(position, scrollEnd) {
    return {
      normalizedY: -(position.y / scrollEnd) * 2 + 1,
    };
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
