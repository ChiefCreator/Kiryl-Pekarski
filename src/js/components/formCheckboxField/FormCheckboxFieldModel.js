export default class FormCheckboxFieldModel {
    constructor(view, data) {
      this.view = view;
      this.data = data;
    }

    updateCheckbox(index) {
      this.view.updateCheckbox(index);
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  