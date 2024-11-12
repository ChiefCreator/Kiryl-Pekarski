export default class ScrollProgressModel {
  constructor(view) {
    this.view = view;
    this.percentage = 0;

    this.init();
  }

  updatePercentage(percentage) {
    this.percentage = percentage;
    this.view.updatePercentage(percentage);
  }

  init() {
    this.view.init(this.percentage);
  }
}
