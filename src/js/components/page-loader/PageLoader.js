import PageLoaderModel from "./PageLoaderModel";
import PageLoaderView from "./PageLoaderView";
import PageLoaderController from "./PageLoaderController";
import "./page-loader.scss";

export default class PageLoader {
  constructor() {
    this.view = new PageLoaderView();
    this.model = new PageLoaderModel(this.view);
    this.controller = new PageLoaderController(this.model, this.view);
  }

  show() {
    this.view.mainTimeline.restart();
    this.model.loaderObject.animate();
  }
  hide() {
    this.view.mainTimeline.pause();
    this.view.timelineOfHide.restart();
  }

  render() {
    return this.view.render();
  }
}