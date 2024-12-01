import CircularTextModel from "./CircularTextModel";
import CircularTextView from "./CircularTextView";
import CircularTextController from "./CircularTextController";
import "./circularText.scss";

export default class CircularText {
  constructor(options) {
    this.view = new CircularTextView();
    this.model = new CircularTextModel(this.view, options);
    this.controller = new CircularTextController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
