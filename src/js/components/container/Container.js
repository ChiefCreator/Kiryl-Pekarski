import { createDOM } from "../../utils/domUtils";
import "./container.scss";

export default class Container {
  constructor(innerHTML) {
    this.container = this.create(innerHTML);
  }

  create(innerHTML) {
    return createDOM("div", { className: "container", innerHTML: innerHTML });
  }
  render() {
    return this.container;
  }
}
