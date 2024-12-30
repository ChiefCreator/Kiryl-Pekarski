import { createDOM } from "../../utils/domUtils";
// import FormField from "../formField/FormField";
import FormInputField from "../formField/FormInputField";
import FormTextareaField from "../formTextareaField/formTextareaField";
import FormCheckboxField from "../formCheckboxField/FormCheckboxField";
import ButtonSubmit from "../buttonSubmit/ButtonSubmit";

export default class FormView {
  constructor() {
    this.form = null;

    this.formInputFieldObjects = [];
    this.formTextareaFieldObject = null;
    this.formInputAndTextareaFieldObjects = [];
  }

  getData() {
    return new FormData(this.form);
  }

  init(fieldsData, textareaFieldData, checboxFieldsData) {
    this.form = this.create(fieldsData, textareaFieldData, checboxFieldsData);
    this.texarea = this.form.querySelector(".form-textarea-field");
  }
  create(fieldsData, textareaFieldData, checboxFieldsData) {
    const innerHTML = `
      <div class="form__container">
        <div class="form__checkbox-fields-list"></div>
        <div class="form__fields-list"></div>
        <div class="form__field-textarea-wrapper"></div>
        <div class="form__button-wrapper"></div>
      </div>
    `;

    const form = createDOM("form", { className: "form", innerHTML, attributes: [{ title: "action", value: "#" }, {title: "method", value: "post"}] });
    const fieldsList = form.querySelector(".form__fields-list");
    const textareaFieldWrapper = form.querySelector(".form__field-textarea-wrapper");
    const checkboxFieldsList = form.querySelector(".form__checkbox-fields-list");
    const buttonWrapper = form.querySelector(".form__button-wrapper");

    this.formInputFieldObjects = fieldsData.map((data) => new FormInputField({ data }));
    this.formTextareaFieldObject = new FormTextareaField({ data: textareaFieldData });
    this.checboxFields = checboxFieldsData.map(data => new FormCheckboxField({ data: data }));
    this.buttonSubmitObject = new ButtonSubmit();

    this.formInputFieldObjects.forEach(inputFieldObject => {
      fieldsList.append(inputFieldObject.render());
    });
    textareaFieldWrapper.append(this.formTextareaFieldObject.render());
    this.checboxFields.forEach(field => {
      checkboxFieldsList.append(field.render());
    });  
    buttonWrapper.append(this.buttonSubmitObject.render());

    this.formInputAndTextareaFieldObjects = this.formInputFieldObjects.concat(this.formTextareaFieldObject);

    return form;
  }
  render() {
    return this.form;
  }
}
