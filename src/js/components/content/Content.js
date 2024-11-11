import { createDOM } from "../../utils/domUtils";

export default class Content {
  constructor() {
    this.content = this.create();
  }

  create() {
    return createDOM("div", { className: "content", id: "content" });
  }

  render() {
    return this.content;
  }
}
