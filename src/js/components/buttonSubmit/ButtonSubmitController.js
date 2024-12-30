import gsap from "gsap";

export default class ButtonSubmitController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  clickHandler() {
    this.model.startAnimation();
  }

  addListeners() {
    this.view.button.addEventListener("click", this.clickHandler.bind(this));
  }
  init() {
    this.model.init();
  
    this.addListeners();
  }
}
