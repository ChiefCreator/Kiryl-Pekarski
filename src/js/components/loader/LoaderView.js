import { createDOM } from "../../utils/domUtils";

import gsap from "gsap";

export default class LoaderView {
  constructor() {
    this.loader = null;

    this.mainTimeline = gsap.timeline({ paused: true });
  }

  initTimelines() {
    this.mainTimeline
      .fromTo(this.lineSub,
        {
          left: "-100px",
          width: 0,
        },
        {
        left: "100%",
        width: "50%",
        repeat: -1,
        duration: 3,
        ease: "power4.inOut"
      }, 0)
  }
  init() {
    this.loader = this.create();
    this.lineSub = this.loader.querySelector(".loader__line-sub");

    this.initTimelines();
  }
  create() {
    const innerHTML = `
      <div class="loader__line">
        <span class="loader__line-sub"></span>
      </div>
    `;

    const loader = createDOM("div", { className: "loader", innerHTML });

    return loader;
  }
  render() {
    return this.loader;
  }
}
