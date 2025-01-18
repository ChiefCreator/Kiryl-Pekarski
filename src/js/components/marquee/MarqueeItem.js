import { createDOM } from "../../utils/domUtils";

export default class MarqueeItem {
  constructor({ data, attributes }) {
    this.marqueeItem = null;

    this.init(data, attributes);
  }

  init(data, attributes) {
    this.marqueeItem = this.create(data, attributes);
  }
  create(data, attributes) {
    const innerHTML = `
      <div class="marquee-item__container">
        <h4 class="marquee-item__title" data-content="${data.title}" ${attributes ? attributes.map(obj => {
          return `${obj.title}="${obj.value}"`
        }).join(' ') : ''}>${data.title}</h4>
      </div>
    `;

    const marqueeItem = createDOM("div", { className: "marquee-item", innerHTML });

    return marqueeItem;
  }
  render() {
    return this.marqueeItem;
  }
}
