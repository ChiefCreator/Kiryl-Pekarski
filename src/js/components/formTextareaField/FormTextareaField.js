import FormTextareaFieldModel from "./formTextareaFieldModel";
import FormTextareaFieldController from "./FormTextareaFieldController";
import FormTextareaFieldView from "./FormTextareaFieldView";
import "./form-textarea-field.scss";

export default class FormTextareaField {
  constructor({ data }) {
    this.view = new FormTextareaFieldView();
    this.model = new FormTextareaFieldModel(this.view, data);
    this.controller = new FormTextareaFieldController(this.model, this.view);
  }

  // Методы с значением input
  checkIfInputEmpty() {
    return this.model.checkIfValueEmpty();
  }
  updateValue(value) {
    this.model.updateValue(value);
  }

  // методы для анимации
  animateOnMouseover() {
    return this.view.timelineOnMouseover.restart();
  }
  animateOnMouseout() {
    return this.view.timelineOnMouseover.reverse();
  }
  animateOnFocusin() {
    return this.view.timelineOnFocusin.restart();
  }
  animateOnFocusout() {
    return this.view.timelineOnFocusout.restart();
  }
  animateOnFocusoutWithoutAnimatedText() {
    return this.view.timelineOnFocusoutWithoutAnimatedText.restart();
  }
  animateOnFocusoutText() {
    return this.view.timelineOfAnimatedText.restart();
  }

  render() {
    return this.view.render();
  }
}