import LinkMoreModel from "./LinkMoreModel";
import LinkMoreView from "./LinkMoreView";
import LinkMoreController from "./LinkMoreController";
import "./linkMore.scss";

export default class LinkMore {
  constructor({ hasUnderline, className, data }) {
    this.view = new LinkMoreView(hasUnderline, className);
    this.model = new LinkMoreModel(this.view, data);
    this.controller = new LinkMoreController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
