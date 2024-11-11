import { createDOM } from "../../utils/domUtils";

export default class HomePage {
  constructor() {
    this.id = "main";
    this.title = "Kiryl Pekarski";
    this.page = this.create();

    this.init();
  }

  create() {
    const innerHTML = `
      <div class="app-main__container"></div>
    `;
    return createDOM("main", { className: "app-main", innerHTML: innerHTML });
  }
  init() {
    document.title = this.title;
  }
  render() {
    return this.page;
  }
}
