import "./checkbox.scss";
import { createDOM } from "../../utils/domUtils";

import gsap from "gsap";

export default class Checkbox {
  constructor({ data, index }) {
    this.checkbox = null;
    this.data = data;
    this.index = index;

    this.isActive = false;

    this.init(this.data);
  }

  getTimelineOfAppearance() {
    const timeline = gsap.timeline();

    timeline.fromTo(this.checkbox, 
      {
        transform: "translate(0, calc(100% + 2px))",
      },
      {
        transform: "translate(0, 0)",
        duration: 1,
        ease: "power4.inOut",
      }
    )

    return timeline;
  }

  getIndex() {
    return this.index;
  }
  checkIsActive() {
    return this.isActive;
  }
  setStatus(isActive) {
    this.isActive = isActive;
    this.checkbox.checked = this.isActive;
    this.checkbox.classList.toggle("checkbox_active", this.isActive);
  }
  toggleStatus() {
    this.isActive = !this.isActive;
    this.checkbox.checked = this.isActive;
    this.checkbox.classList.toggle("checkbox_active", this.isActive);
  }

  // инициализация
  init(data) {
    this.checkbox = this.create(data);
  }
  create(data) {
    const innerHTML = `
      <span class="checkbox__title">${data.title}</span>
      <input class="checkbox__input" type="checkbox">
    `;

    return createDOM("div", { className: `checkbox`, innerHTML, attributes: [{ title: "data-index", value: this.index }, { title: "data-cursor", value: "cursorForceGravity" }] });
  }
  render() {
    return this.checkbox;
  }
}
