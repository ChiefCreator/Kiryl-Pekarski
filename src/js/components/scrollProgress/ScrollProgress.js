import ScrollProgressModel from "./ScrollProgressModel";
import ScrollProgressHeaderView from "./ScrollProgressHeaderView";
import ScrollProgressController from "./ScrollProgressController";
import "./scrollProgressHeader.scss";

export default class ScrollProgress {
  constructor({ type }) {
    this.type = type;

    this.model = null;
    this.view = null;
    this.controller = null;

    this.init();
  }

  init() {
    switch (this.type) {
      case "header":
        this.initScrollProgressHeader();
        break;
    }
  }
  initScrollProgressHeader() {
    this.view = new ScrollProgressHeaderView();
    this.model = new ScrollProgressModel(this.view);
    this.controller = new ScrollProgressController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
