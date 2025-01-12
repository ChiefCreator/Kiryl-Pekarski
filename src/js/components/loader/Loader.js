import LoaderModel from "./LoaderModel";
import LoaderView from "./LoaderView";
import LoaderController from "./LoaderController";
import "./loader.scss";

export default class Loader {
  constructor() {
    this.view = new LoaderView();
    this.model = new LoaderModel(this.view);
    this.controller = new LoaderController(this.model, this.view);
  }

  animate() {
    this.view.mainTimeline.restart();
  }

  render() {
    return this.view.render();
  }
}
