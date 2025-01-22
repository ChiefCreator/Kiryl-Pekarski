import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import HeaderSection from "../../components/headerContainer/HeaderSection";
import ArticleProject from "./ArticleProject";
import ProjectImages from "../../components/projectImages/ProjectImages";
import ElementObserver from "../../components/elementObserver/ElementObserver";

import { animateElementOnScroll } from "../../utils/animateOnScrollUtils";

import gsap from "gsap";

import "./sectionProjects.scss";

import projectsData from "../../data/projectsData";

export default class SectionProjects {
  constructor({ app }) {
    this.articlesData = projectsData;
    this.app = app;
    this.section = this.create();

    this.currentElem = null;
    this.currentTheme = "dark";
    this.timeoutRemoveClass = null;

    this.addListeners();
  }

  getArticleImgData() {
    return this.articlesData.map((data) => {
      const img = document.querySelector(`#${data.articleId}`).querySelector(".article-project__img");
      const rect = img.getBoundingClientRect();
      return {
        img: img,
        url: data.images.mainVertical,
        width: rect.width,
        height: rect.height,
      };
    });
  }

  addListeners() {
    if (!this.app.getDevice().isSensoryInput) {
      this.section.addEventListener("mouseover", this.mouseoverHandler.bind(this));
      this.section.addEventListener("mouseout", this.mouseoutHandler.bind(this));
    }
  }
  changeColorTheme(theme, isAddThemeColor) {
    document.body.setAttribute("data-theme", theme);

    if (isAddThemeColor) {
      clearTimeout(this.timeoutRemoveClass);
      document.querySelectorAll("[data-color-transition]").forEach((elem) => elem.classList.add("colorfull-theme-transition"));
    } else {
      this.timeoutRemoveClass = setTimeout(() => document.querySelectorAll("[data-color-transition]").forEach((elem) => elem.classList.remove("colorfull-theme-transition")), 1000);
    }
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".article-project__img")) {
      this.currentElem = event.target.closest(".article-project__img");
      const articleId = this.currentElem.closest(".article-project").getAttribute("id");
      const currentData = this.articlesData.find((data) => data.articleId === articleId);
      const colorTheme = currentData.colorTheme;

      this.currentTheme = document.body.getAttribute("data-theme");
      this.changeColorTheme(colorTheme, true);
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentElem) return;

    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentElem) return;
      relatedTarget = relatedTarget.parentElement;
    }

    this.changeColorTheme(this.currentTheme, false);

    this.currentElem = null;
  }

  setInitialScaleOfImages(projectImgs) {
    projectImgs.forEach(img => {
      gsap.set(
        img,
        {
          transform: "scale(1)",
        },
      );
    });
  }
  initAnimations(projectImgs) {
    if (this.app.getDevice().isSensoryInput) {
      projectImgs.forEach(img => {
        const timelineOnScroll = gsap.timeline({ paused: true });
        timelineOnScroll.fromTo(
          img,
          {
            transform: "scale(0)",
          },
          {
            transform: "scale(1)",
            duration: 2,
            ease: "power4.inOut",
          }
        );
      
        animateElementOnScroll(img, {
          events: {
            onEnter: () => { timelineOnScroll.restart() },
          },
        });
      });
    } else {
      this.projectImages.initAnimations();
    }

    this.sectionHeader.initAnimations()
  }
  create() {
    const innerHTML = `<div class="section-projects__container id="section-projects__container"></div>`;

    const section = createDOM("section", { className: "section-projects", id: "section-projects" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const projectsContainer = section.querySelector(".section-projects__container");
    this.sectionHeader = new HeaderSection({ 
      data: {
        title: "Избранные проекты",
        sectionId: "section-projects",
      },
    })

    projectsContainer.append(this.sectionHeader.render());
    this.articlesData.forEach((data, i) => {
      const articleProject = new ArticleProject({ data, app: this.app });
      const articleProjectElement = articleProject.render();
      projectsContainer.append(articleProjectElement);
    });

    const observer = new ElementObserver({
      target: ".article-project__img",
      onRender: () => { 
        if (this.app.getDevice().isSensoryInput) return;

        this.projectImages = new ProjectImages({ data: this.getArticleImgData() });
        projectsContainer.append(this.projectImages.render());
      }
    });
    observer.start();

    return section;
  }
  render() {
    return this.section;
  }
}
