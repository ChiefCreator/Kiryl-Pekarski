import FormCheckboxFieldModel from "./FormCheckboxFieldModel";
import FormCheckboxFieldController from "./FormCheckboxFieldController";
import FormCheckboxFieldView from "./FormCheckboxFieldView";
import "./form-checkbox-field.scss";

export default class FormCheckboxField {
  constructor({ data, index }) {
    this.view = new FormCheckboxFieldView();
    this.model = new FormCheckboxFieldModel(this.view, data, index);
    this.controller = new FormCheckboxFieldController(this.model, this.view);
  }

  isClickedOnCheckbox(event) {
    return this.controller.isClickedOnCheckbox(event);
  }
  clickCheckboxHandler(event) {
    this.controller.clickCheckboxHandler(event);
  }

  getData() {
    return this.model.getData();
  }

  getTimelineOfPageRender(isNeedSplitText) {
    return this.view.getTimelineOfPageRender(isNeedSplitText);
  }

  render() {
    return this.view.render();
  }
}