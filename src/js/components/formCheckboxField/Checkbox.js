import "./checkbox.scss";
import { createDOM } from "../../utils/domUtils";

export default class Checkbox {
  constructor({ data, index }) {
    this.checkbox = null;
    this.data = data;
    this.index = index;

    this.isActive = false;

    this.init(this.data);
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

    return createDOM("div", { className: `checkbox`, innerHTML, attributes: [{ title: "data-index", value: this.index }] });
  }
  render() {
    return this.checkbox;
  }
}