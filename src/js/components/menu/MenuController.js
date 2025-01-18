import DOMElementWatcher from "../domElementWatcher/DOMElementWatcher";
import { getAnimateTextTimeline } from "../../utils/animateUtils";

import { getAnimateCloseButtonTimeline } from "../../utils/animateUtils";

import gsap from "gsap";

export default class MenuController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.dataProjectsMenuOpen = "data-menu-open";
    this.dataProjectsMenuClose = "data-menu-close";

    this.currentProject = null;
    this.timeline = null;

    this.viewportSettings = this.view.viewportSettings;
    this.mouse = {
      current: {
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
      }
    }
    this.illustrationData = {
      width: 0,
      height: 0,
      normalizedWidth: 0,
      normalizedHeight: 0,
      normalizedCenterX: 0,
      normalizedCenterY: 0,
    }
    this.isOpen = false;

    this.init();
  }

  checkIsOpen() {
    return this.isOpen;
  }

  getProjectsMenuListProperties() {
    const projectsMenuListRect = this.view.projectsMenuList.getBoundingClientRect();
    const offsetHeight = this.view.projectsMenuListWrapper.offsetHeight;

    return {
      offsetTop: projectsMenuListRect.top,
      height: offsetHeight,
      hiddenHeight: this.view.projectsMenuList.scrollHeight - offsetHeight,
    };
  }

  updateMenuListPosition(event) {
    const cursorY = event.y - this.projectsMenuListProperties.offsetTop;
    const speed = this.projectsMenuListProperties.hiddenHeight / this.projectsMenuListProperties.height;
    const position = cursorY * speed;

    this.model.updateMenuListPosition(position);
  }
  // обновление позиции курсора
  updateMouse(event) {
    this.mouse.current.x = event.x;
    this.mouse.current.y = event.y;

    this.mouse.current.normalizedX = ((event.x / this.viewportSettings.width) * 2 - 1) * 2 - 0.15;
    this.mouse.current.normalizedY = -(event.y / window.innerHeight) * 2 + 1;
  }
  // обновление иллюстрации
  updateIllustrationData() {
    const rect = this.view.illustration.getBoundingClientRect();

    this.illustrationData.width = rect.width;
    this.illustrationData.height = rect.height;
    
    this.illustrationData.normalizedWidth = (rect.width / this.viewportSettings.width) * this.viewportSettings.aspectRatio * 2;
    this.illustrationData.normalizedHeight = (rect.height / this.viewportSettings.height) * 2;

    this.illustrationData.normalizedCenterX = this.mouse.current.normalizedX;
    this.illustrationData.normalizedCenterY = this.mouse.current.normalizedY;
  }
  updateIllustration() {
    this.updateIllustrationData();
    this.model.updateIllustration(this.illustrationData);
  }
  showIllustrtation() {
    this.model.showIllustrtation();
  }
  hideIllustrtation() {
    this.model.hideIllustrtation();
  }
  setIllustrationTexture(texture) {
    this.model.setIllustrationTexture(texture);
  }

  // методы открытия и закрытия
  open() {
    this.timeline.restart();
  }
  close() {
    this.timeline.reverse();
  }

  // обработчики событий
  mousemoveHandler(event) {
    if (!this.isOpen) return;

    this.updateMouse(event);
    this.updateIllustration();

    this.updateMenuListPosition(event);
  }
  mouseoverProjectHandler(event) {
    if (this.currentProject) return;

    if (event.target.closest(".projects-menu-item")) {
      this.currentProject = event.target.closest(".projects-menu-item");

      this.currentProject.classList.add("projects-menu-item_active");

      this.showIllustrtation();

      const imgUrl = this.currentProject.dataset.imageUrl;
      this.setIllustrationTexture(this.view.textureLoader.load(imgUrl));
    }

    return;
  }
  mouseoutProjectHandler(event) {
    if (!this.currentProject) return;

    let $relatedTarget = event.relatedTarget;

    while ($relatedTarget) {
      if ($relatedTarget === this.currentProject) return;
      $relatedTarget = $relatedTarget.parentElement;
    }

    this.hideIllustrtation(0);
    this.currentProject.classList.remove("projects-menu-item_active");

    this.currentProject = null;
  }
  clickTriggerElement(event) {
    if (event.target.closest(`[${this.dataProjectsMenuOpen}]`)) {
      event.preventDefault();
      this.isOpen = true;
      this.open();
    } else if (event.target.closest(`[${this.dataProjectsMenuClose}]`)) {
      event.preventDefault();
      this.isOpen = false;
      this.close();
    }
  }

  // инициализация
  initTimeline() {
    this.timeline = gsap.timeline({ paused: true });

    this.timeline
      .to(this.view.menu, {
        transform: "translateX(0)",
        ease: "power4.inOut",
        duration: 1,
      }, 0)
      .to(this.view.line, {
        width: "100%",
        ease: "power4.inOut",
        duration: 1,
      }, .5)
      .add(getAnimateTextTimeline(this.view.title), "<")
      .add(this.timelineOfLinks, "<")
      .add(getAnimateTextTimeline(this.view.projectsTitle), "<")
      .add(this.timelineOfTitles, "<")
      .add(getAnimateCloseButtonTimeline(this.view.closeButton).restart(), "<+=50%")
  }
  initTimelineOfTitles() {
    this.timelineOfTitles = gsap.timeline();

    this.view.projectsMenuItems.forEach((projectsMenuItem, i) => {
      const numbers = projectsMenuItem.querySelectorAll(".projects-menu-item__num");
      const titles = projectsMenuItem.querySelectorAll(".projects-menu-item__title");

      const iterationDelay = i * 0.1;

      this.timelineOfTitles
        .add(getAnimateTextTimeline(numbers[0]), iterationDelay)
        .add(getAnimateTextTimeline(numbers[1]), "<")
        .add(getAnimateTextTimeline(titles[0]), iterationDelay + 0.05)
        .add(getAnimateTextTimeline(titles[1]), "<")
    })
  }
  initTimelineOfLinks() {
    this.timelineOfLinks = gsap.timeline();

    this.view.links.forEach((link, i) => {
      this.timelineOfLinks.add(getAnimateTextTimeline(link), "<+10%")
    })
  }
  init() {
    this.model.init();

    const watcher = new DOMElementWatcher({
      elements: [this.view.title, this.view.illustration],
      callback: () => {
        setTimeout(() => {
          this.updateIllustrationData();

          this.view.init3D(this.illustrationData.normalizedWidth / 2);

          this.initTimelineOfLinks();
          this.initTimelineOfTitles()
          this.initTimeline();

          this.addListeners();
        }, 100)
      },
    });
    watcher.startWatching();
  }
  addListeners() {
    this.projectsMenuListProperties = this.getProjectsMenuListProperties();

    document.addEventListener("click", this.clickTriggerElement.bind(this));

    if (window.innerWidth > 800) {
      document.addEventListener("mousemove", this.mousemoveHandler.bind(this));
      this.view.projectsMenuList.addEventListener("mouseover", this.mouseoverProjectHandler.bind(this));
      this.view.projectsMenuList.addEventListener("mouseout", this.mouseoutProjectHandler.bind(this));

      this.view.projectsMenuList.addEventListener("wheel", (event) => event.preventDefault());
    }
  }
}
