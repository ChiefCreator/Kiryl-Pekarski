import MenuModel from "./MenuModel";
import MenuView from "./MenuView";
import MenuController from "./MenuController";
import "./menu.scss";

export default class Menu {
  constructor({ linksData, app }) {
    this.view = new MenuView();
    this.model = new MenuModel(this.view, linksData);
    this.controller = new MenuController(this.model, this.view, app);
  }

  checkIsOpen() {
    return this.controller.checkIsOpen();
  }
  open() {
    this.controller.timeline.restart();
  }
  close() {
    this.controller.timeline.reverse();
  }

  render() {
    return this.view.render();
  }
}
