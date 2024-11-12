import ThemeToggleModel from "./ThemeToggleModel";
import ThemeToggleView from "./ThemeToggleView";
import ThemeToggleController from "./ThemeToggleController";
import "./themeToggle.scss";

export default class ThemeToggle {
  constructor() {
    this.view = new ThemeToggleView();
    this.model = new ThemeToggleModel(this.view);
    this.controller = new ThemeToggleController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
