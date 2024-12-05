import ProjectImagesModel from "./ProjectImagesModel";
import ProjectImagesView from "./ProjectImagesView";
import ProjectImagesController from "./ProjectImagesController";

import "./projectImages.scss";

export default class ProjectImages {
  constructor({ data }) {
    this.view = new ProjectImagesView();
    this.model = new ProjectImagesModel(this.view, data);
    this.controller = new ProjectImagesController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
