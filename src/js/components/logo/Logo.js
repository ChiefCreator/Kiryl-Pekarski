import { createDOM } from "../../utils/domUtils";
import "./logo.scss";

export default class Logo {
  constructor({ className }) {
    this.className = className;
    this.logo = this.create();
  }

  create() {
    return createDOM("span", { className: `logo ${this.className}`, textContent: "Kiryl Pekarski" });
  }
  render() {
    return this.logo;
  }
}
