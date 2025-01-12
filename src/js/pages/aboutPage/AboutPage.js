import { createDOM } from "../../utils/domUtils";
import SectionAbout from "./SectionAbout";
import SectionSkills from "./SectionSkills";
import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";

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

  initAnimations() {
    const watcher = new DOMElementWatcher({
      selector: ".section-information__portrait-img",
      callback: () => {
        setTimeout(() => this.sectionAboutObject.initAnimations(), 100);
      }
    });
    watcher.startWatching();

    this.textsAnimatedOnScroll = this.page.querySelectorAll('[data-text-animated-on-scroll]');

    if (!this.textsAnimatedOnScroll.length) return;

    this.watcher = new DOMElementWatcher({
      elements: this.textsAnimatedOnScroll,
      callback: () => {
        setTimeout(() => this.textsAnimatedOnScroll.forEach(text => {
          const isNeedSplitText = !this.isRenderedMoreThanOneTime();
          animateTextOnScroll(text, isNeedSplitText);
        }), 100);
      }
    });
    this.watcher.startWatching();
  }

  init() {
    this.sectionAboutObject = new SectionAbout();
    this.sectionSkillsObject = new SectionSkills({ app: this.app });

    this.page = this.create();
    this.textsAnimatedOnScroll = this.page.querySelectorAll('[data-text-animated-on-scroll]');
  }
  create() {
    const innerHTML = `
      <div class="app-about__container">
    
      </div>
    `;

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
