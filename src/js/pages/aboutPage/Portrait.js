import { createDOM } from "../../utils/domUtils";
import * as THREE from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import blobVertexShader from "./../../../shaders/projectsMenuImageVertexShader.glsl";
import blobFragmentShader from "./../../../shaders/projectsMenuImageFragmentShader.glsl";
import RippleTextureRenderer from "../../components/liquidBackground/RippleTextureRenderer";

import gsap from "gsap";

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
    this.blob = null;

    this.init();
  }

  animateScale() {
    gsap.fromTo(
      this.blob.scale,
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

  getBlobRect() {
    return {
      ...this.getBlobPosition(this.imgElement),
      prevPosX: null,
      prebPosY: null,
    };
  }

  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initTextures() {
    this.texture = this.textureLoader.load(this.imgSrc);
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initPortrait() {
    const planeGeometry = new THREE.CircleGeometry(.6, 256);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: this.texture },
        u_time: { value: 0.0 },
        u_mouse: {
          value: {
            x: 0.0,
            y: 0.0,
          },
        },
        u_resolution: {
          value: {
            x: window.innerWidth * window.devicePixelRatio,
            y: window.innerHeight * window.devicePixelRatio,
          },
        },
        u_pointsize: { value: 2.0 },
        // wave 1
        u_noise_freq_1: { value: 1 },
        u_noise_amp_1: { value: 0.1 },
        u_spd_modifier_1: { value: 1.0 },
        // wave 2
        u_noise_freq_2: { value: 2.0 },
        u_noise_amp_2: { value: 0.1 },
        u_spd_modifier_2: { value: 0.8 },
      },
      vertexShader: blobVertexShader,
      fragmentShader: blobFragmentShader,
    });

    this.blob = new THREE.Mesh(planeGeometry, planeMaterial);
    this.blob.position.set(0, 0, 0);

    this.scene.add(this.blob);
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

    this.blob.material.uniforms.u_time.value += 0.01;
    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    this.updateBlobPosition();

    if (this.composer) this.composer.render();

    requestAnimationFrame(this.animate);
  };

  getBlobPosition(imgElement) {
    const rect = imgElement.getBoundingClientRect();

    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const posX = (elementCenterX / this.viewportSettings.width) * 2 * this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio - this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio;
    const posY = this.viewportSettings.frustumSize - (elementCenterY / this.viewportSettings.height) * 2 * this.viewportSettings.frustumSize;

    return { posX, posY };
  }
  updateBlobPosition() {
    const { posX, posY } = this.getBlobPosition(this.imgElement);
    const blobRect = this.getBlobRect();

    if (!blobRect.prevPosX || blobRect.prevPosX !== posX || blobRect.prevPosY !== posY) {
      this.blob.position.set(posX, posY, 0);

      blobRect.prevPosX = posX;
      blobRect.prevPosY = posY;
    }
  }

  init() {
    this.portrait = this.create();

    this.init3D();
  }
  create() {
    return createDOM("div", { className: "portrait" });
  }
  render() {
    return this.portrait;
  }
}
