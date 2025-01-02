export default class FormInputFieldModel {
  constructor(view, data) {
    this.view = view;
    this.data = data;

    this.value = "";
    this.error = false;
  }

  checkIfErrorExist() {
    return this.error;
  }
  setError(isError) {
    this.error = isError;
  }
 
  checkIfValueEmpty() {
    return !this.value;
  }
  getValue() {
    return this.value;
  }
  updateValue(value) {
    this.value = value;
  }

  init() {
    this.view.init(this.data);
  }
}