import { createDOM } from "../../utils/domUtils";

import gsap from "gsap";

export default class HeaderSectionView {
  constructor() {
    this.headerContainer = null;
    this.borderSub = null;
    this.timeline = gsap.timeline({ paused: true });
  }

  initTimeline() {
    this.timeline
      .to(this.borderSub, {  
        width: "50%",
        left: "100%",
        duration: 2.5,
        ease: "power4.inOut"
      })
  }
  init(data) {
    this.headerContainer = this.create(data);
    this.borderSub = this.headerContainer.querySelector(".header-section__border-sub");

    this.initTimeline();
  }
  create(data) {
    const innerHTML = `
      <div class="header-section__container">
        <h2 class="header-section__title" data-text-animated-on-scroll data-text-animated-on-scroll-target="${data.sectionId}">${data.title}</h2>
        <div class="header-section__border" data-color-transition="true">
          <span class="header-section__border-sub" data-element-animated-on-scroll data-element-animated-on-scroll-target="${data.sectionId}" data-color-transition="true"></span>
        </div>
      </div>
    `;

    const headerContainer = createDOM("header", { className: "header-section", innerHTML });

    return headerContainer;
  }
  render() {
    return this.headerContainer;
  }
}
