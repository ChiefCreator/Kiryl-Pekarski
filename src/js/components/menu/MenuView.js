import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import ProjectsMenuItem from "./ProjectsMenuItem";
import CloseButton from "../closeButton/CloseButton";
import LinkReappear from "../linkReappear/LinkReappear";

import vertexShader from "./../../../shaders/projectsMenuImageVertexShader.glsl";
import fragmentShader from "./../../../shaders/projectsMenuImageFragmentShader.glsl";

import * as THREE from "three";

import gsap from "gsap";

export default class MenuView {
  constructor() {
    this.menu = null;

    this.viewportSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      frustumSize: 1,
    };

    this.timelineOfShowIllustration = gsap.timeline({ paused: true });;
  }

  initTimelinesFor3DScene() {
    this.timelineOfShowIllustration
      .fromTo(
        this.imagePlane.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          ease: "power4.inOut",
        }
      );
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
  showIllustrtation() {
    this.timelineOfShowIllustration.restart();
  }
  hideIllustrtation() {
    this.timelineOfShowIllustration.reverse();
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

    this.initTimelinesFor3DScene();
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
  init(data, linksData) {
    this.menu = this.create(data, linksData);
    this.canvasWrapper = this.menu.querySelector(".menu__canvas-wrapper");
    this.illustration = this.menu.querySelector(".menu__illustration");
    this.title = this.menu.querySelector(".menu__title");
    this.closeButton = this.menu.querySelector(".close-button");
    this.line = this.menu.querySelector(".menu__line");
    this.projectsMenuListWrapper = this.menu.querySelector(".menu__projects-wrapper");
    this.projectsMenuList = this.menu.querySelector(".menu__projects-list");
    this.projectsMenuItems = this.menu.querySelectorAll(".projects-menu-item");
    this.links = this.menu.querySelectorAll(".link-reappear");
    this.projectsTitle = this.menu.querySelector(".menu__projects-title");

    this.closeButton.querySelectorAll(".close-button__line").forEach((line) => {
      line.style.width = 0;
      line.style.width = 0;
    });
  }
  create(data, linksData) {
    const innerHTML = `
      <div class="menu__container">
        <header class="menu__header">
          <h4 class="menu__title">${window.innerWidth > 800 ? "Все проекты" : "Меню"}</h4>
          <span class="menu__line"></span>
        </header>
        <div class="menu__links-wrapper">
          <ul class="menu__links-list"></ul>
        </div>
        <div class="menu__projects-wrapper">
          <span class="menu__projects-title">Все проекты</span>
          <ul class="menu__projects-list"></ul>
        </div>
      </div>
      <div class="menu__canvas-wrapper"></div>
      <div class="menu__illustration"></div>
    `;

    const container = new Container(innerHTML);
    const menu = createDOM("div", { className: "menu", innerHTML: container.render().outerHTML });
    const projectsMenuList = menu.querySelector(".menu__projects-list");
    const header = menu.querySelector(".menu__header");
    const closeButton = new CloseButton({
      className: "menu__close-button",
      attributes: [
        { title: "data-menu-close", Value: true },
        { title: "data-cursor", value: "cursorForceGravity" },
      ],
    });
    const linksList = menu.querySelector(".menu__links-list");

    header.append(closeButton.render());
    linksData.forEach((linkData) => linksList.append(new LinkReappear({ hasUnderline: true, data: linkData, isSplitByLine: true }).render()));
    data.forEach((projectData, i) => {
      const itemWrapper = createDOM("li", { className: "menu__item-project-wrapper" });
      const projectsMenuItem = new ProjectsMenuItem({ data: projectData, index: i });

      itemWrapper.append(projectsMenuItem.render());
      projectsMenuList.append(itemWrapper);
    });

    return menu;
  }
  render() {
    return this.menu;
  }
}
