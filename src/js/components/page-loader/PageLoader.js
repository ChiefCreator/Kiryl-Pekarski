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
    this.model.show();
  }
  hide() {
    this.model.hide();
  }

  render() {
    return this.view.render();
  }
}