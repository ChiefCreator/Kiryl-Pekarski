import LinkReappearModel from "./LinkReappearModel";
import LinkReappearView from "./LinkReappearView";
import LinkReappearController from "./LinkReappearController";
import "./linkReappear.scss";

export default class LinkReappear {
  constructor({ className, hasUnderline, data }) {
    this.view = new LinkReappearView(className, hasUnderline);
    this.model = new LinkReappearModel(this.view, data);
    this.controller = new LinkReappearController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
