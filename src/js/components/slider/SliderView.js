import { createDOM } from "../../utils/domUtils";
import SlideTitle from "./SlideTitle";
import SliderControls from "./SliderControls";

import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment2.glsl";
import RippleTextureRenderer from "./../liquidBackground/RippleTextureRenderer";
import Blob from "./Blob";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class SliderView {
  constructor() {
    this.slider = null;
    this.slideTitles = null;
    this.buttonPrev = null;
    this.buttonNext = null;

    this.sliderRect = {};

    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
  }

  setSliderRect() {
    this.sliderRect = this.slider.getBoundingClientRect();
  }

  // обновление позиции заголовков слайдера
  getSlideTitleOffset(indexPosition) {
    switch(indexPosition) {
      case 1:
        return 0;
      case 0:
        return -1 * this.sliderRect.width / 2;
      default:
        return (indexPosition - 1) * this.sliderRect.width / 2;
    }
  }
  getSlideTitlePosition(slideTitle, indexPosition) {
    const slideTitleWidth = slideTitle.offsetWidth;

    switch(indexPosition) {
      case 1:
        return (this.sliderRect.width - slideTitleWidth) / 2 + this.getSlideTitleOffset(indexPosition);
      case 0:
        return (this.sliderRect.width) / 2 - slideTitleWidth + this.getSlideTitleOffset(indexPosition);
      default:
        return (this.sliderRect.width) / 2 + this.getSlideTitleOffset(indexPosition);
    }
  }
  updatePositionOfTitles(direction, currentIndex, slidesCount) {
    this.slideTitles.forEach((slideTitle, index) => {
      const slideTitleBehindText = slideTitle.querySelector(".slide-title__text_behind");
      const slideTitleFrontText = slideTitle.querySelector(".slide-title__text_front");

      const indexPosition = (index - currentIndex + slidesCount) % slidesCount;
      const position = this.getSlideTitlePosition(slideTitleFrontText, indexPosition);

      const isRemoveTransitionTrue = direction === "next" && indexPosition === 0 || direction === "prev" && indexPosition === slidesCount - 1;

      slideTitleBehindText.classList.toggle("slide-title_none-transition", isRemoveTransitionTrue);
      slideTitleFrontText.classList.toggle("slide-title_none-transition", isRemoveTransitionTrue);
      if (direction === "init") {
        slideTitleBehindText.classList.add("slide-title_none-transition");
        slideTitleFrontText.classList.add("slide-title_none-transition");
      }
      slideTitleBehindText.style.transform = `translate(${position}px, -50%)`;
      slideTitleFrontText.style.transform = `translate(${position}px, -50%)`;
    });
  }

  // обновление позиции слайдера
  updatePosition(direction, currentIndex, slidesCount) {
    this.updatePositionOfTitles(direction, currentIndex, slidesCount);
  }
  updatePositionOnNext(currentIndex, slidesCount) {
    this.updatePosition("next", currentIndex, slidesCount)
  }
  updatePositionOnPrev(currentIndex, slidesCount) {
    this.updatePosition("prev", currentIndex, slidesCount)
  }
  updatePositionOnInit(currentIndex, slidesCount) {
    this.updatePosition("init", currentIndex, slidesCount)
  }

  // инициализация 3D-сцены
  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initTextures() {
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initBlob(blobData) {
    this.blobObject = new Blob({ data: blobData });
    this.blob = this.blobObject.render();

    this.scene.add(this.blob);
  }
  init3DScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.sliderCanvasContainer.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.viewportSettings.aspectRatio, 0.1, 1000);
    this.camera.position.z = 3;

    this.renderTarget = new THREE.WebGLRenderTarget(this.viewportSettings.width, this.viewportSettings.height, {
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    });

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
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

    this.blob.material.userData.shader.uniforms.time.value += 0.005;
    this.blob.material.userData.shader.uniforms.surfaceTime.value += 0.005;

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    if (this.composer) this.composer.render();
    this.orbitControls.update();

    requestAnimationFrame(this.animate);
  };
  updateBlob(blobData) {
    this.blobObject.updateData(blobData);
  }

  // инициализация и рендеринг
  init(data) {
    this.slider = this.create(data);
    this.sliderTrack = this.slider.querySelector(".slider__track");
    this.sliderCanvasContainer = this.slider.querySelector(".slider__canvas-container");
    this.slideTitles = this.slider.querySelectorAll(".slide-title");
    this.buttonPrev = this.slider.querySelector(".slider-button_prev");
    this.buttonNext = this.slider.querySelector(".slider-button_next");

    this.initLoaders();
    this.initTextures();
    this.init3DScene();
    this.initBlob(data[0].blobData);
    this.initPostprocessing();

    this.animate();
  }
  create(data) {
    const innerHTML = `
      <div class="slider__container">
        <div class="slider__track">
        </div>
      </div>
    `;

    const slider = createDOM("div", { className: "slider", innerHTML });
    const sliderContainer = slider.querySelector(".slider__container");
    const sliderTrack = slider.querySelector(".slider__track");
    const sliderCanvasContainer = createDOM("div", { className: "slider__canvas-container" });
    const sliderControls = new SliderControls();

    data.forEach((dataObj) => {
      const generalData = dataObj.general;
      const slideTitle = new SlideTitle({ data: generalData });
      sliderTrack.append(slideTitle.render());
    });
    sliderTrack.append(sliderCanvasContainer);
    sliderContainer.append(sliderControls.render());

    return slider;
  }
  render() {
    return this.slider;
  }
}
