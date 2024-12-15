import { createDOM } from "../../utils/domUtils";

export default class SlideTitle {
  constructor({ data }) {
    this.data = data;
    this.slideTitle = this.create();
  }

  create() {
    const innerHTML = `
      <div class="slide-title__text slide-title__text_behind">${this.data.title}</div>
      <div class="slide-title__text slide-title__text_front">${this.data.title}</div>
    `;
    const slideTitle = createDOM("div", { className: "slide-title", innerHTML });

    return slideTitle;
  }
  render() {
    return this.slideTitle;
  }
}
