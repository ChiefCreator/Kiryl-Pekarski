export default class LinkMoreModel {
  constructor(view, data) {
    this.view = view;
    this.data = data;

    this.init();
  }

  init() {
    this.view.init(this.data);
  }
}
