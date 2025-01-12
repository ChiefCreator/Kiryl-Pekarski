import Loader from "../loader/Loader";

export default class PageLoaderModel {
  constructor(view) {
    this.view = view;
    this.loaderObject = new Loader();
    this.countOfAppearances = 0;
  }

  show() {
    this.countOfAppearances++;

    if (this.countOfAppearances > 1) {
      this.view.show();
    } else {
      this.view.showAtFirstAppearance();
    }
    this.loaderObject.animate();
  }
  hide() {
    this.view.hide();
  }

  init() {
    this.view.init(this.loaderObject);
  }
}