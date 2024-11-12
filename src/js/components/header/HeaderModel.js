export default class HeaderModel {
  constructor(view, linksData) {
    this.view = view;
    this.linksData = linksData;

    this.init();
  }

  init() {
    this.view.init(this.linksData);
  }
}
