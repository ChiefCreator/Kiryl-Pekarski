import { createDOM } from "../../utils/domUtils";

export default class ScrollProgressHeaderView {
  constructor() {
    this.scrollProgress = null;
    this.currentLine = null;
  }

  updatePercentage(percentage) {
    this.currentLine.style.width = `${percentage}%`;
  }

  init(percent) {
    this.scrollProgress = this.create(percent);
    this.currentLine = this.scrollProgress.querySelector(".scroll-progress-header__current-line");
  }
  create(percent) {
    const innerHTML = `
      <div class="scroll-progress-header__container">
        <div class="scroll-progress-header__current-line" style="width: ${percent}"></div>
      </div>
    `;

    return createDOM("div", { className: "scroll-progress-header", innerHTML: innerHTML });
  }
  render() {
    return this.scrollProgress;
  }
}
