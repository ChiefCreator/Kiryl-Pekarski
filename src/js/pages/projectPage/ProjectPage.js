import { createDOM } from "../../utils/domUtils";
import SectionProjectMain from "./SectionProjectMain";
import ProjectScene from "./ProjectScene";
import ElementObserver from "../../components/elementObserver/ElementObserver";
import SectionProjectImageGalery from "./SectionProjectImageGalery";
import { animateTextOnScroll } from "../../utils/animateOnScrollUtils";

import "./project-page.scss";

import skillsData from "../../data/skillsData";

export default class ProjectPage {
  constructor({ data, app }) {
    this.id = data.href;
    this.title = data.title;
    this.skillsData = skillsData.filter((skillData) => data.skills.includes(skillData.title));
    this.images = data.images;
    this.role = data.role;
    this.linkToWebsite = data.linkToWebsite;
    this.countOfRenders = 0;
    this.app = app;

    this.page = null;

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  stopAnimations() {
    this.sectionProjectMainObject.setInitialScaleOfImages();
  }
  onLoad(callbackOnLoad) {
    const textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");
    const mainImg = this.page.querySelector(".project-illustration__img");
    const mobileImg = this.page.querySelector(".project-information__img");

    new ElementObserver({
      target: window.innerWidth > 1280 ? [mainImg, ...textsAnimatedOnScroll] : [mobileImg, ...textsAnimatedOnScroll],
      onRender: () => {
        const isNeedSplitText = !this.isRenderedMoreThanOneTime();

        textsAnimatedOnScroll.forEach((text) => animateTextOnScroll(text, isNeedSplitText));

        if (this.app.getDevice().isSensoryInput) {
          this.sectionProjectMainObject.initAnimations();
        } else {
          this.projectSceneObject.initAnimations();
        }
        this.sectionImageGalleryObject.initAnimations();

        callbackOnLoad();
      },
    }).start();
  }
  init() {
    this.page = this.create();
  }
  create() {
    const innerHTML = `<div class="app-project__container"></div>`;

    const page = createDOM("main", { className: "app-project", innerHTML });
    const container = page.querySelector(".app-project__container");
    this.sectionProjectMainObject = new SectionProjectMain({ title: this.title, role: this.role, skillsData: this.skillsData, images: this.images, app: this.app, linkToWebsite: this.linkToWebsite });
    this.sectionImageGalleryObject = new SectionProjectImageGalery({ images: this.images.other, app: this.app });
    const sectionImageGallery = this.sectionImageGalleryObject.render();

    container.append(this.sectionProjectMainObject.render());
    container.append(sectionImageGallery);

    const mainImg = page.querySelector(".project-illustration__img");
    const mobileImg = page.querySelector(".project-information__img");
    const galeryImages = page.querySelectorAll(".section-project-image-gallery__img");

    const observer = new ElementObserver({
      target: window.innerWidth > 1280 ? [mainImg, sectionImageGallery, ...galeryImages] : [mobileImg, sectionImageGallery, ...galeryImages],
      onRender: () => {
        if (!this.app.getDevice().isSensoryInput) {
          this.projectSceneObject = null;
          
          if (window.innerWidth > 1280) {
            this.projectSceneObject = new ProjectScene({ mainImgElement: mainImg, mainImgSrc: this.images.mainHorizontal, imagesSrc: this.images.other, sliderImages: galeryImages });
          } else {
            this.projectSceneObject = new ProjectScene({ mainImgElement: mobileImg, mainImgSrc: this.images.mainHorizontal, imagesSrc: this.images.other, sliderImages: galeryImages });
          }

          container.append(this.projectSceneObject.render());
        }
      },
    });
    observer.start();

    return page;
  }
  render() {
    return this.page;
  }
}
