import { createDOM } from "../../utils/domUtils";

import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
import LiquidBackground from "../../components/liquidBackground/LiquidBackground";
import SectionMain from "./SectionMain";
import SectionAbout from "./SectionAbout";
import SectionProjects from "./SectionProjects";
import SectionService from "./SectionService";

import { animateTextOnScroll } from "../../utils/animateOnScrollUtils";

import "./homePage.scss";

export default class HomePage {
  constructor() {
    this.id = "main";
    this.title = "Kiryl Pekarski";
    this.countOfRenders = 0;
    this.page = null;

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  initAnimations() {
    this.textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");

    if (!this.textsAnimatedOnScroll.length) return;

    this.watcher = new DOMElementWatcher({
      elements: this.textsAnimatedOnScroll,
      callback: () => {
        setTimeout(() =>
          this.textsAnimatedOnScroll.forEach((text) => {
            const isNeedSplitText = !this.isRenderedMoreThanOneTime();
            animateTextOnScroll(text, isNeedSplitText);
          }), 200
        );
      },
    });

    this.watcher.startWatching();
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
    const liquidBackground = new LiquidBackground();
    const sectionMain = new SectionMain();
    const sectionAbout = new SectionAbout();
    const sectionProjects = new SectionProjects();
    const sectionService = new SectionService();

    page.append(liquidBackground.render());
    pageContainer.append(sectionMain.render());
    pageContainer.append(sectionAbout.render());
    pageContainer.append(sectionProjects.render());
    pageContainer.append(sectionService.render());

    return page;
  }
  render() {
    return this.page;
  }
}
