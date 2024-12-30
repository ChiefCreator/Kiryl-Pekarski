import { createDOM } from "../../utils/domUtils";
import * as THREE from "three";

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import fontJson from "./../../../fonts/3D/helvetiker_regular.typeface.json";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import vertexShader from "./../../../shaders/vertex.glsl";
import fragmentShader from "./../../../shaders/fragment3.glsl";
import RippleTextureRenderer from "./../liquidBackground/RippleTextureRenderer";

export default class ImageGalery3DView {
  constructor() {
    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
    this.coordsAndPositions = {
      radius: 1.2,

      projectGapX: .15,
      projectGapY: .15,
      projectWidth: .21,
      projectHeight: .31,
    }

    this.imageGalery3D = null;
    this.centeredPoint = null;
    this.projectGroups = [];
  }

  updatePosition(position) {
    const normalizedYByAngle = (position.normalizedY - 1) * this.coordsAndPositions.angle / 2;
    const normalizedYByHeight = (position.normalizedY - 1) / 2 * this.coordsAndPositions.totalHeight;

    this.projectGroups.forEach((projectGroup, i) => {
      projectGroup.rotation.y = -normalizedYByAngle - i * (this.coordsAndPositions.projectWidth + this.coordsAndPositions.projectGapX);
    });
    this.centeredPoint.position.y = -normalizedYByHeight;
  }

  // инициализация 3D
  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.fontLoader = new FontLoader();
  }
  initTextures() {
    this.rippleTextureRenderer = new RippleTextureRenderer();
    this.rippleTexture = this.rippleTextureRenderer.getTexture();
  }
  initFonts() {
    this.font = this.fontLoader.parse(fontJson);
  }
  initProjectGroups(data) {
    this.coordsAndPositions.angle = ((data.length - 1) * (this.coordsAndPositions.projectWidth + this.coordsAndPositions.projectGapX));
    this.coordsAndPositions.totalHeight = (data.length - 1) * this.coordsAndPositions.projectGapY;
    
    data.forEach((data, i) => {
      const projectGroup = new THREE.Group();
      const plane = this.createPlane(data);

      const projectTitle = this.createText(
        new TextGeometry(data.title.toUpperCase(), {
          font: this.font,
          size: .02,
          depth: 0,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 1,
          bevelSize: 8,
          bevelOffset: 0,
          bevelSegments: 5
        }).translate(0, 0, 1),
        new THREE.MeshBasicMaterial({ color: "white" })
      );

      projectGroup.position.set(0, -i * this.coordsAndPositions.projectGapY, 0);
      projectTitle.position.y = .17

      projectGroup.add(plane);
      projectGroup.add(projectTitle);

      this.centeredPoint.add(projectGroup);
      this.projectGroups.push(projectGroup);
    });
  }
  createPlane(data) {
    const geometry = new THREE.PlaneGeometry(this.coordsAndPositions.projectWidth, this.coordsAndPositions.projectHeight, 30, 30).translate(0, 0, 1);
    const texture = this.textureLoader.load(data.imgUrl);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture,
    });

    let pos = geometry.attributes.position.array;
    let newPos = [];

    for (let i = 0; i < pos.length; i += 3) {
      let x = pos[i];
      let y = pos[i + 1];
      let z = pos[i + 2];

      let xz = new THREE.Vector2(x, z).normalize().multiplyScalar(this.coordsAndPositions.radius);

      newPos.push(xz.x, y, xz.y);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(newPos, 3));

    return new THREE.Mesh(geometry, material);
  }
  createText(geometry, material) {
    let pos = geometry.attributes.position.array;
    let newPos = [];

    for (let i = 0; i < pos.length; i += 3) {
      let x = pos[i] - 0.105;
      let y = pos[i + 1];
      let z = pos[i + 2];

      let xz = new THREE.Vector2(x, z).normalize().multiplyScalar(this.coordsAndPositions.radius + 0.001);

      newPos.push(xz.x, y, xz.y);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(newPos, 3));

    return new THREE.Mesh(geometry, material);
  }
  initScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.imageGalery3D.append(this.renderer.domElement);

    this.renderTarget = new THREE.WebGLRenderTarget(this.viewportSettings.width, this.viewportSettings.height, {
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    });

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.viewportSettings.aspectRatio, 0.1, 1000);
    this.camera.position.z = 1.5;

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);

    this.centeredPoint = new THREE.Object3D();
    this.scene.add(this.centeredPoint);
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
  init3D(data) {
    this.initLoaders();
    this.initTextures();
    this.initFonts();
    this.initScene();
    this.initProjectGroups(data);
    this.initPostprocessing();

    this.animate();
  }
  animate = () => {
    this.rippleTextureRenderer.render(this.renderer);
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

    if (this.composer) this.composer.render();

    requestAnimationFrame(this.animate);
  };

  // инициализация и рендеринг
  init(data) {
    this.imageGalery3D = this.create();

    this.init3D(data);
  }
  create() {
    return createDOM("div", { className: "image-galery-3d" });
  }
  render() {
    return this.imageGalery3D;
  }
}
