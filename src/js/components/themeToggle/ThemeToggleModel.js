export default class ThemeToggleModel {
  constructor(view) {
    this.view = view;

    this.theme = "dark";

    this.init();
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.view.toggleTheme(this.theme); 
  }

  init() {
    this.view.init(this.theme);
  }
}
