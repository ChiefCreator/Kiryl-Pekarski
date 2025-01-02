import ButtonSubmitModel from "./ButtonSubmitModel";
import ButtonSubmitView from "./ButtonSubmitView";
import ButtonSubmitController from "./ButtonSubmitController";
import "./button-submit.scss";

export default class ButtonSubmit {
  constructor() {
    this.view = new ButtonSubmitView();
    this.model = new ButtonSubmitModel(this.view);
    this.controller = new ButtonSubmitController(this.model, this.view);
  }

  startAnimation() {
    this.model.startAnimation();
  }
  endAnimation(result) {
    this.model.endAnimation(result);
  }

  render() {
    return this.view.render();
  }
}
