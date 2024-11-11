import { createDOM } from "../../utils/domUtils";

export default class Header {
  constructor() {
    this.header = this.create();
  }

  create() {
    const innerHTML = `
      <div class="header__container">
          
      </div>
    `;
    return createDOM("header", { className: "header", innerHTML: innerHTML });
  }
  render() {
    return this.header;
  }
}
