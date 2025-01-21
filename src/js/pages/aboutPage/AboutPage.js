import { createDOM } from "../../utils/domUtils";
import SectionAbout from "./SectionAbout";
import SectionSkills from "./SectionSkills";
import ElementObserver from "../../components/elementObserver/ElementObserver";

import { animateTextOnScroll } from "../../utils/animateOnScrollUtils";

import "./about-page.scss";

export default class AboutPage {
  constructor({ app }) {
    this.id = "about";
    this.title = "Обо мне";
    this.app = app;
    this.countOfRenders = 0;

    this.sectionAboutObject = null;
    this.sectionSkillsObject = null;
    this.watcher = null;

    this.page = null;

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  onLoad(callbackOnLoad) {
    new ElementObserver({
      target: [this.page.querySelector(".section-information__portrait-img"), ...this.page.querySelectorAll("[data-text-animated-on-scroll]")],
      onRender: () => {
        const isNeedSplitText = !this.isRenderedMoreThanOneTime();

        this.sectionAboutObject.initAnimations();

        this.textsAnimatedOnScroll.forEach((text) => animateTextOnScroll(text, isNeedSplitText));

        callbackOnLoad();
      },
    }).start();
  }
  init() {
    this.sectionAboutObject = new SectionAbout({ app: this.app });
    this.sectionSkillsObject = new SectionSkills({ app: this.app });

    this.page = this.create();
    this.textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");
  }
  create() {
    const innerHTML = `<div class="app-about__container"></div>`;

    const page = createDOM("main", { className: "app-about", innerHTML });
    const pageContainer = page.firstElementChild;

    pageContainer.append(this.sectionAboutObject.render());
    pageContainer.append(this.sectionSkillsObject.render());

    return page;
  }
  render() {
    return this.page;
  }
}
