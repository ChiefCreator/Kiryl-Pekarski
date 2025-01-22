import FormInputFieldModel from "./formInputFieldModel";
import FormInputFieldController from "./FormInputFieldController";
import FormInputFieldView from "./FormInputFieldView";
import "./form-input-field.scss";

export default class FormInputField {
  constructor({ data }) {
    this.view = new FormInputFieldView();
    this.model = new FormInputFieldModel(this.view, data);
    this.controller = new FormInputFieldController(this.model, this.view);
  }

  checkIfErrorExist() {
    return this.model.checkIfErrorExist();
  }
  setError(isError) {
    this.model.setError(isError);
  }
  removeError() {
    this.model.removeError();
  }
  removeValue() {
    this.model.removeValue();
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
  getTimelineOfPageRender(isNeedSplitText) {
    return this.view.getTimelineOfPageRender(isNeedSplitText);
  }

  // рендеринг
  render() {
    return this.view.render();
  }
}