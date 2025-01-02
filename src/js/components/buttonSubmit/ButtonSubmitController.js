import gsap from "gsap";

export default class ButtonSubmitController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init() {
    this.model.init();
  }
}
