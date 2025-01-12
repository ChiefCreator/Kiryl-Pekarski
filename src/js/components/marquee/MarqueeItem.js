import { createDOM } from "../../utils/domUtils";

export default class MarqueeItem {
  constructor(data) {
    this.marqueeItem = null;

    this.init(data);
  }

  init(data) {
    this.marqueeItem = this.create(data);
  }
  create(data) {
    const innerHTML = `
      <div class="marquee-item__container">
        <h4 class="marquee-item__title" data-content="${data.title}">${data.title}</h4>
      </div>
    `;

    const marqueeItem = createDOM("div", { className: "marquee-item", innerHTML });

    return marqueeItem;
  }
  render() {
    return this.marqueeItem;
  }
}
