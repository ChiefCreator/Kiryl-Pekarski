import { createDOM } from "../../utils/domUtils";
import ElementObserver from "../../components/elementObserver/ElementObserver";
import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import RippleTextureRenderer from "../../components/liquidBackground/RippleTextureRenderer";

import gsap from "gsap";

import { getMeshSizeByHtmlElement } from "../../utils/threeJsUtils";
import { loadTexture } from "../../utils/threeJsUtils";
import { adjustTextureToCover } from "../../utils/threeJsUtils";

export default class Portrait {
  constructor({ imgSrc, img }) {
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };

    this.imgElement = img;
    this.imgSrc = imgSrc;

    this.portrait = null;
    this.portraitPlane = null;
    
    this.isPortraitPlaneRendered = false;

    this.init();
  }

  animateScale() {
    if (!this.isPortraitPlaneRendered) return;

    gsap.fromTo(
      this.portraitPlane.scale,
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
  }

  getPortraitPlaneRect() {
    return {
      ...this.getPortraitPlanePosition(this.imgElement),
      prevPosX: null,
      prevPosY: null,
    };
  }

  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initTextures() {
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initPortrait() {
    loadTexture(this.textureLoader, this.imgSrc).then((texture) => {
      const size = getMeshSizeByHtmlElement(this.imgElement, this.viewportSettings);

      const planeGeometry = new THREE.PlaneGeometry(size.width, size.height);
      const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });

      this.portraitPlane = new THREE.Mesh(planeGeometry, planeMaterial);
      this.portraitPlane.position.set(0, 0, 0);

      this.scene.add(this.portraitPlane);

      adjustTextureToCover(texture, size.width, size.height);

      this.isPortraitPlaneRendered = true;

      this.animateScale();
    });
  }
  initScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.portrait.append(this.renderer.domElement);

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
  init3D() {
    this.initLoaders();
    this.initTextures();
    this.initScene();
    this.initPortrait();
    this.initPostprocessing();

    this.animate();
  }
  animate = () => {
    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    this.updatePortraitPlanePosition();

    if (this.composer) this.composer.render();

    requestAnimationFrame(this.animate);
  };

  getPortraitPlanePosition(imgElement) {
    const rect = imgElement.getBoundingClientRect();

    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const posX = (elementCenterX / this.viewportSettings.width) * 2 * this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio - this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio;
    const posY = this.viewportSettings.frustumSize - (elementCenterY / this.viewportSettings.height) * 2 * this.viewportSettings.frustumSize;

    return { posX, posY };
  }
  updatePortraitPlanePosition() {
    const { posX, posY } = this.getPortraitPlanePosition(this.imgElement);
    const portraitPlneRect = this.getPortraitPlaneRect();

    if (this.portraitPlane && (!portraitPlneRect.prevPosX || portraitPlneRect.prevPosX !== posX || portraitPlneRect.prevPosY !== posY)) {
      this.portraitPlane.position.set(posX, posY, 0);

      portraitPlneRect.prevPosX = posX;
      portraitPlneRect.prevPosY = posY;
    }
  }

  init() {
    this.portrait = this.create();

    new ElementObserver({
      target: this.imgElement,
      onRender: () => this.init3D(),
    }).start();
  }
  create() {
    return createDOM("div", { className: "portrait" });
  }
  render() {
    return this.portrait;
  }
}
