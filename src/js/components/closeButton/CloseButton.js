import "./close-button.scss";
import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";
import { getAnimateCloseButtonTimeline } from "../../utils/animateUtils";

export default class CloseButton {
  constructor(options) {
    this.button = null;
    this.options = options;

    this.currentElem = null;

    this.init(this.options);
  }

  addListeners() {
    this.button.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.button.addEventListener("mouseout", this.mouseoutHandler.bind(this));
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".close-button")) {
      this.currentElem = event.target.closest(".close-button");
      this.timeline.restart();
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

    this.currentElem = null;
  }
  initTimeline() {
    this.timeline = getAnimateCloseButtonTimeline(this.button);
  }
  init(options) {
    this.button = this.create(options);
    this.firstLine = this.button.querySelector(".close-button__line:first-child");
    this.lastLine = this.button.querySelector(".close-button__line:last-child");

    this.initTimeline();
    this.addListeners();
  }
  create(options) {
    const innerHTML = `
      <div class="close-button__container">
        <span class="close-button__line"></span>
        <span class="close-button__line"></span>
      </div>
    `;

    return createDOM("button", { className: `close-button ${options.className}`, innerHTML, attributes: options.attributes });
  }
  render() {
    return this.button;
  }
}
