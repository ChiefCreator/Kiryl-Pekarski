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
  onWindowResize() {
    this.view.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  addListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
}
