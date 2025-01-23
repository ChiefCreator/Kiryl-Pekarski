import { createDOM } from "../../utils/domUtils";

export default class ErrorPage {
  constructor() {
    this.id = "error";
    this.title = "Ошибка";
    this.page = this.create();
  }

  create() {
    const innerHTML = `
      <div class="app-main__container"></div>
    `;
    return createDOM("main", { className: "app-error", innerHTML: innerHTML });
  }
  init() {
    this.page = this.create();
  }
  render() {
    return this.page;
  }
}
