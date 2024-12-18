import ProjectsMenuModel from "./ProjectsMenuModel";
import ProjectsMenuView from "./ProjectsMenuView";
import ProjectsMenuController from "./ProjectsMenuController";
import "./projects-menu.scss";

export default class ProjectsMenu {
  constructor() {
    this.view = new ProjectsMenuView();
    this.model = new ProjectsMenuModel(this.view);
    this.controller = new ProjectsMenuController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
