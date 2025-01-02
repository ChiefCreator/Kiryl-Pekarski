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

  checkIfErrorExist() {
    return this.model.checkIfErrorExist();
  }
  setError(isError) {
    this.model.setError(isError);
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
    return this.view.timelineOnMouseover.invalidate().restart();
  }
  animateOnMouseout() {
    return this.view.timelineOnMouseout.invalidate().restart();
  }
  animateOnFocusin() {
    return this.view.timelineOnFocusin.invalidate().restart();
  }
  animateOnFocusout() {
    return this.view.timelineOnFocusout.invalidate().restart();
  }
  animateOnFocusoutWithoutAnimatedText() {
    return this.view.timelineOnFocusoutWithoutAnimatedText.invalidate().restart();
  }
  showText() {
    return this.view.timelineOfShowText.invalidate().restart();
  }
  hideText() {
    return this.view.timelineOfHideText.invalidate().restart();
  }
  animateOnValidationError() {
    return this.view.timelineOfValidationError.invalidate().restart();
  }
  animateOnValidationSuccess() {
    return this.view.timelineOfValidationSuccess.invalidate().restart();
  }

  render() {
    return this.view.render();
  }
}