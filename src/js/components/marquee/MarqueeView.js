import { createDOM } from "../../utils/domUtils";

import MarqueeItem from "./MarqueeItem";

export default class MarqueeView {
  constructor() {
    this.marquee = null;
    this.rows = null;
  }

  updateMoving(rowsData) {
    rowsData.forEach((rowData, rowIndex) => {
      const rowBlocks = this.rows[rowIndex].querySelectorAll(".marquee__block");

      rowData.blocksData.forEach((blockObject, blockIndex) => {
        rowBlocks[blockIndex].style.transform = `translate(${blockObject.posX}px, 0)`;
      });
    });
  }

  // инициализация
  init(data) {
    this.marquee = this.create(data);
    this.rows = this.marquee.querySelectorAll(".marquee__row");
    this.blocks = this.marquee.querySelectorAll(".marquee__block");
  }
  create(data) {
    const innerHTML = `
      <div class="marquee__container">
      
      </div>
    `;

    const marquee = createDOM("div", { className: "marquee", innerHTML });
    const container = marquee.querySelector(".marquee__container");

    data.forEach((subData, rowIndex) => {
      const marqueeRow = createDOM("div", { className: "marquee__row", attributes: [{ title: "data-direction", value: rowIndex % 2 === 0 ? "left" : "right" }] });
      const marqueeBlockFirst = createDOM("div", { className: "marquee__block marquee__block_first" });
      const marqueeBlockSecond = createDOM("div", { className: "marquee__block marquee__block_second" });

      subData.forEach(dataObj => {
        const marqueeItemFirst = new MarqueeItem(dataObj);
        const marqueeItemSecond = new MarqueeItem(dataObj);

        marqueeBlockFirst.append(marqueeItemFirst.render());
        marqueeBlockSecond.append(marqueeItemSecond.render());
      });

      marqueeRow.append(marqueeBlockFirst);
      marqueeRow.append(marqueeBlockSecond);
      container.append(marqueeRow);
    });

    return marquee;
  }
  render() {
    return this.marquee;
  }
}
