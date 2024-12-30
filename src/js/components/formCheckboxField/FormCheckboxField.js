import FormCheckboxFieldModel from "./FormCheckboxFieldModel";
import FormCheckboxFieldController from "./FormCheckboxFieldController";
import FormCheckboxFieldView from "./FormCheckboxFieldView";
import "./form-checkbox-field.scss";

export default class FormCheckboxField {
  constructor({ data }) {
    this.view = new FormCheckboxFieldView();
    this.model = new FormCheckboxFieldModel(this.view, data);
    this.controller = new FormCheckboxFieldController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}