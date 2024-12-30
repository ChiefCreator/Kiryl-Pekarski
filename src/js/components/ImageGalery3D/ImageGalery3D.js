import ImageGalery3DModel from "./ImageGalery3DModel";
import ImageGalery3DView from "./ImageGalery3DView";
import ImageGalery3DController from "./ImageGalery3DController";

import "./image-galery-3d.scss";

export default class ImageGalery3D {
  constructor({ projectsData }) {
    this.view = new ImageGalery3DView();
    this.model = new ImageGalery3DModel(this.view, projectsData);
    this.controller = new ImageGalery3DController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
