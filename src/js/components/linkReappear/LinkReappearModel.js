export default class LinkReappearModel {
  constructor(view, data) {
    this.view = view;
    this.data = data;

    this.init();
  }

  init() {
    this.view.init(this.data);
  }
}
