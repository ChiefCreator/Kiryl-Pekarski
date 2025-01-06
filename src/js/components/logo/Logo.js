import { createDOM } from "../../utils/domUtils";
import "./logo.scss";

export default class Logo {
  constructor({ className, href }) {
    this.className = className;
    this.href = href;
    this.logo = this.create();
  }

  create() {
    return createDOM("a", { className: `logo ${this.className}`, textContent: "Kiryl Pekarski", attributes: [{ title: "href", value: this.href }, { title: "data-cursor", value: "cursorForceGravity" },] });
  }
  render() {
    return this.logo;
  }
}
