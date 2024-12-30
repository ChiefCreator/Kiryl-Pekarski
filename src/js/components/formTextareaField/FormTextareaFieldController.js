export default class FormTextareaFieldController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.init();
    }

    init() {
      this.model.init();
    }
  }
  