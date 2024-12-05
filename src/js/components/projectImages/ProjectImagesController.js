import gsap from "gsap";

export default class ProjectImagesController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init() {
    this.model.init();
    this.addListeners();
  }
  addListeners() {
  }
}
