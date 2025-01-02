export default class FormCheckboxFieldController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.init();
    }

    isClickedOnCheckbox(event) {
      return event.target.closest(".checkbox");
    }
    clickCheckboxHandler(event) {
      if (event.target.closest(".checkbox")) {
        const checkbox = event.target.closest(".checkbox");
        const checkboxIndex = +checkbox.dataset.index;

        this.model.updateCheckbox(checkboxIndex);
      }
    }
    
    init() {
      this.model.init();
    }
  }
  