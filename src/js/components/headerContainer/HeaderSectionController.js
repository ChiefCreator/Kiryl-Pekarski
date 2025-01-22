import { animateElementOnScroll } from "../../utils/animateOnScrollUtils";

export default class HeaderSectionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  initAnimations() {
    animateElementOnScroll(this.view.borderSub, {
      events: {
        onEnter: () => {
          this.view.timeline.restart();
        },
      },
    });
  }

  init() {
    this.model.init();
  }
}
