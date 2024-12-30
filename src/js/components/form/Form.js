import FormModel from "./FormModel";
import FormView from "./FormView";
import FormController from "./FormController";
import "./form.scss";

export default class Form {
  constructor({ fieldsData, textareaFieldData, checboxFieldsData }) {
    this.view = new FormView();
    this.model = new FormModel(this.view, fieldsData, textareaFieldData, checboxFieldsData);
    this.controller = new FormController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}