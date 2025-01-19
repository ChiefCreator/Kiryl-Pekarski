import { createDOM } from "../../utils/domUtils";

import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
import LiquidBackground from "../../components/liquidBackground/LiquidBackground";
import SectionMain from "./SectionMain";
import SectionAbout from "./SectionAbout";
import SectionProjects from "./SectionProjects";
import SectionService from "./SectionService";
import ElementObserver from "../../components/elementObserver/ElementObserver";

import { animateTextOnScroll } from "../../utils/animateOnScrollUtils";

import "./homePage.scss";

export default class HomePage {
  constructor({ app }) {
    this.id = "main";
    this.title = "Kiryl Pekarski";
    this.countOfRenders = 0;
    this.page = null;
    this.app = app;

    this.liquidBackgroundObject = new LiquidBackground({ app: this.app });
    this.sectionProjectsObject = new SectionProjects();

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  stopAnimations() {
    this.liquidBackgroundObject.stopAnimations();
  }

  onLoad(callbackOnLoad) {
    this.textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");
    const sectionMain = this.page.querySelector(".section-main");
    const projectImgs = this.page.querySelectorAll(".article-project__img");

    new ElementObserver({
      target: [...this.textsAnimatedOnScroll, ...projectImgs, sectionMain],
      onRender: () => {
        this.textsAnimatedOnScroll.forEach((text) => {
          const isNeedSplitText = !this.isRenderedMoreThanOneTime();
          animateTextOnScroll(text, isNeedSplitText);
        });

        this.liquidBackgroundObject.initAnimations();
        this.sectionProjectsObject.initAnimations();

        callbackOnLoad();
      },
    }).start();
  }
  init() {
    this.page = this.create();
    this.textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");
  }
  create() {
    const innerHTML = `
      <div class="app-main__container">
        
      </div>
    `;

    const page = createDOM("main", { className: "app-main", innerHTML: innerHTML });
    const pageContainer = page.firstElementChild;
    const liquidBackground = this.liquidBackgroundObject.render()
    const sectionMain = new SectionMain();
    const sectionAbout = new SectionAbout();
    const sectionProjects = this.sectionProjectsObject.render();
    const sectionService = new SectionService();

    page.append(liquidBackground);
    pageContainer.append(sectionMain.render());
    pageContainer.append(sectionAbout.render());
    pageContainer.append(sectionProjects);
    pageContainer.append(sectionService.render());

    return page;
  }
  render() {
    return this.page;
  }
}
