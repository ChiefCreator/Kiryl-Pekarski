import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import ProjectsMenuItem from "./projectsMenuItem";
import CloseButton from "../closeButton/CloseButton";

import vertexShader from "./../../../shaders/projectsMenuImageVertexShader.glsl";
import fragmentShader from "./../../../shaders/projectsMenuImageFragmentShader.glsl";

import * as THREE from "three";

import gsap from "gsap";

export default class ProjectsMenuView {
  constructor() {
    this.projectsMenu = null;

    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };
  }

  // обновление menuList
  updateMenuListPosition(position) {
    if (position >= 0) this.projectsMenuList.style.top = `${-position}px`;
    else this.projectsMenuList.style.top = `0px`;
  }

  // обновление иллюстрации
  updateIllustration(illustrationData) {
    this.imagePlane.position.set(illustrationData.normalizedCenterX, illustrationData.normalizedCenterY, 0);
  }
  setScaleOfIllustrtation(scale) {
    gsap.to(this.imagePlane.scale, {
      x: scale, 
      y: scale,
      z: scale,
      duration: .8,
      ease: "power4.inOut", 
    }
    )
  }
  setIllustrationTexture(texture) {
    this.imagePlane.material.uniforms.uTexture.value = texture;
  }

  // инициализацмя 3D-сцены
  init3D(radius) {
    this.initLoaders();
    this.initScene();
    this.initPlaneImage(radius);

    this.animate();
  }
  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
  }
  initPlaneImage(radius) {
    const planeGeometry = new THREE.CircleGeometry(radius, 256);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
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
        u_noise_freq_1: { value: 1.3 },
        u_noise_amp_1: { value: 0.3 },
        u_spd_modifier_1: { value: 1.0 },
        // wave 2
        u_noise_freq_2: { value: 1.0 },
        u_noise_amp_2: { value: 0.1 },
        u_spd_modifier_2: { value: 0.8 },
      },
      vertexShader,
      fragmentShader,
    });

    this.imagePlane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.imagePlane.position.set(0, 0, 0);

    this.scene.add(this.imagePlane);
  }
  initScene() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
    this.canvasWrapper.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize * this.viewportSettings.aspectRatio, this.viewportSettings.frustumSize, -this.viewportSettings.frustumSize, 0.1, 1000);
    this.camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(0, 1, 4).normalize();
    this.scene.add(light);
  }
  animate = () => {
    this.renderer.render(this.scene, this.camera);
    this.imagePlane.material.uniforms.u_time.value += 0.01;

    requestAnimationFrame(this.animate);
  };

  // инициализация и рендеринг
  init(data) {
    this.projectsMenu = this.create(data);
    this.canvasWrapper = this.projectsMenu.querySelector(".projects-menu__canvas-wrapper");
    this.illustration = this.projectsMenu.querySelector(".projects-menu__illustration");
    this.title = this.projectsMenu.querySelector(".projects-menu__title");
    this.closeButton = this.projectsMenu.querySelector(".close-button");
    this.line = this.projectsMenu.querySelector(".projects-menu__line");
    this.projectsMenuListWrapper = this.projectsMenu.querySelector(".projects-menu__list-wrapper");
    this.projectsMenuList = this.projectsMenu.querySelector(".projects-menu__list");
    this.projectsMenuItems = this.projectsMenu.querySelectorAll(".projects-menu-item");

    this.closeButton.querySelectorAll(".close-button__line").forEach((line) => {
      line.style.width = 0;
      line.style.width = 0;
    });
  }
  create(data) {
    const innerHTML = `
      <div class="projects-menu__container">
        <header class="projects-menu__header">
          <h4 class="projects-menu__title">Все проекты</h4>
          <span class="projects-menu__line"></span>
        </header>
        <div class="projects-menu__list-wrapper">
            <ul class="projects-menu__list"></ul>
        </div>
      </div>
      <div class="projects-menu__canvas-wrapper"></div>
      <div class="projects-menu__illustration"></div>
    `;

    const container = new Container(innerHTML);
    const projectsMenu = createDOM("div", { className: "projects-menu", innerHTML: container.render().outerHTML });
    const projectsMenuList = projectsMenu.querySelector(".projects-menu__list");
    const header = projectsMenu.querySelector(".projects-menu__header");
    const closeButton = new CloseButton({
      className: "projects-menu__close-button",
      attributes: [
        { title: "data-projects-menu-close", Value: true },
        { title: "data-cursor", value: "cursorForceGravity" },
      ],
    });

    header.append(closeButton.render());
    data.forEach((projectData, i) => {
      const itemWrapper = createDOM("li", { className: "projects-menu__item-wrapper" });
      const projectsMenuItem = new ProjectsMenuItem({ data: projectData, index: i });

      itemWrapper.append(projectsMenuItem.render());
      projectsMenuList.append(itemWrapper);
    });

    return projectsMenu;
  }
  render() {
    return this.projectsMenu;
  }
}
