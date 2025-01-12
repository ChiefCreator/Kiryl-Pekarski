import Loader from "../loader/Loader";

export default class PageLoaderModel {
  constructor(view) {
    this.view = view;
    this.loaderObject = new Loader();
  }

  init() {
    this.view.init(this.loaderObject);
  }
}