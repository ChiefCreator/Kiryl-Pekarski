export default class ThemeToggleController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.addListeners();
  }

  addListeners() {
    this.view.themeToggle.addEventListener("click", this.clickHandler.bind(this));
  }
  clickHandler() {
    this.model.toggleTheme();
  }
}
