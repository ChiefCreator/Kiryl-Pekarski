import "./burger-button.scss";
import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

export default class BurgerButton {
  constructor() {
    this.button = null;
    this.firstLine = null;
    this.secondLine = null;
    this.lastLine = null;

    this.timeline = null;

    this.currentElem = null;

    this.init();
  }

  addListeners() {
    this.button.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.button.addEventListener("mouseout", this.mouseoutHandler.bind(this));
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".burger-button")) {
      this.currentElem = event.target.closest(".burger-button");
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
    this.timeline = gsap.timeline({ paused: true });

    this.lines.forEach((line, i) => {
      this.timeline
        .set(line, { width: 0 }, 0)
        .to(line, {
          width: "100%",
          duration: .5,
          ease: "power4.inOut",
        }, i * .1)
    });
  }
  init() {
    this.button = this.create();
    this.lines = this.button.querySelectorAll(".burger-button__line");

    this.initTimeline();
    this.addListeners();
  }
  create() {
    const innerHTML = `
      <div class="burger-button__container">
        <span class="burger-button__line"></span>
        <span class="burger-button__line"></span>
        <span class="burger-button__line"></span>
      </div>
    `;

    return createDOM("button", { className: `burger-button`, innerHTML, attributes: [{ title: "data-menu-open", Value: true }, { title: "data-cursor", value: "cursorForceGravity" }], });
  }
  render() {
    return this.button;
  }
}
