export default class FormTextareaFieldModel {
    constructor(view, data) {
      this.view = view;
      this.data = data;
      
      this.value = "";
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
  