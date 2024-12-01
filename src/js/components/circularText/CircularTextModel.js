export default class CircularTextModel {
  constructor(view, options) {
    this.view = view;
    this.options = options;
  }

  getTransformedOptions() {
    return {
      size: 2 * (this.options.radius + this.options.fontSize),
      center: this.options.radius + this.options.fontSize,
      ...this.options,
    }
  }
  init() {
    this.view.init(this.getTransformedOptions());
  }
}
