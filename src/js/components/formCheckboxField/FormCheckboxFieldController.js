export default class FormCheckboxFieldController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.init();
    }

    clickCheckboxHandler(event) {
      if (event.target.closest(".checkbox")) {
        const checkbox = event.target.closest(".checkbox");
        const checkboxIndex = +checkbox.dataset.index;

        this.model.updateCheckbox(checkboxIndex);
      }
    }
    
    // инициализация
    addListeners() {
      this.view.checkboxField.addEventListener("click", this.clickCheckboxHandler.bind(this));
    }
    init() {
      this.model.init();
  
      this.addListeners();
    }
  }
  