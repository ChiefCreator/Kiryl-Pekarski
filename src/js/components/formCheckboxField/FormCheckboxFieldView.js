import { createDOM } from "../../utils/domUtils";
import Checkbox from "./Checkbox";

export default class FormCheckboxFieldView {
  constructor() {
    this.checkboxField = null;
    this.lineSub = null;

    this.checkboxObjects = [];
    this.activeCheckboxes = [];
  }

  updateCheckbox(checkboxIndex) {
    this.checkboxObjects.forEach(checkboxObject => {
      if (this.checkboxObjects[checkboxIndex] === checkboxObject) return
      checkboxObject.setStatus(false);
    });

    const checkbox = this.checkboxObjects[checkboxIndex];
    checkbox.toggleStatus();

    // if (checkbox.checkIsActive()) {
    //   this.activeCheckboxes.push(checkbox);
    // } else {
    //   console.log(this.activeCheckboxes.find(item => item === checkbox))
    //   const removedIndex = this.activeCheckboxes.find(item => item === checkbox).getIndex();
    //   this.activeCheckboxes.splice(removedIndex, 1);
    // }
    // this.sortActiveCheckboxesByIndex();

    // console.log(this.activeCheckboxes);
  }
  sortActiveCheckboxesByIndex() {
    return this.checkboxObjects.sort((a, b) => a.getIndex() - b.getIndex());
  }

  // инициализация
  init(data) {
    this.checkboxField = this.create(data);
    this.lineSub = this.checkboxField.querySelector(".form-textarea-field__line-sub");
  }
  create(data) {
    const innerHTML = `
      <label class="form-checkbox-field__label">${data.label}</label>
      <ul class="form-checkbox-field__list"></ul>
      <div class="form-checkbox-field__line">
        <span class="form-checkbox-field__line-sub"></span>
      </div>
    `;

    const checkboxField = createDOM("fieldset", { className: "form-checkbox-field", innerHTML, id: data.id });
    const list = checkboxField.querySelector(".form-checkbox-field__list");

    data.checboxes.forEach((data, i) => {
      const checkboxWrapper = createDOM("li", { className: "form-checkbox-field__li" });
      const checkbox = new Checkbox({ data: data, index: i });

      this.checkboxObjects.push(checkbox);

      checkboxWrapper.append(checkbox.render());
      list.append(checkboxWrapper);
    });

    return checkboxField;
  }
  render() {
    return this.checkboxField;
  }
}
