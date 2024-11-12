import { getScrollPercentage } from "../../utils/domUtils";

export default class ScrollProgressController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.addListeners();
  }

  addListeners() {
    window.addEventListener("scroll", this.scrollHandler.bind(this));
  }
  scrollHandler() {
    this.model.updatePercentage(getScrollPercentage());
  }
}
