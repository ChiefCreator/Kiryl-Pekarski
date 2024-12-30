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

  // рендеринг
  render() {
    return this.view.render();
  }
}