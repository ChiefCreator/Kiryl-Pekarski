export default class FormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.checkboxFieldSelector = "[data-checkbox-field]";
    this.inputFieldSelector = "[data-input-field]";
    this.inputSelector = "[data-input]";

    this.currentHoveredField = null;
    this.currentHoveredFieldObject = null;

    this.currentFocusedField = null;
    this.currentFocusedFieldObject = null;

    this.isMouseoverTrue = false;
    this.isFocinTrue = false;

    this.init();
  }

  submitHandler(event) {
    event.preventDefault();

    const inputsData = this.view.getData();
    const checkboxesData = this.view.checboxFieldObjects.reduce((acc, checboxFieldObject) => {
      acc.push(checboxFieldObject.getData());
      return acc;
    }, []);

    this.model.setData(inputsData, checkboxesData);
    this.model.send();
  }

  mouseoverHandler(event) {
    if (this.currentHoveredField) return;

    if (event.target.closest(this.inputFieldSelector)) {
      this.currentHoveredField = event.target.closest(this.inputFieldSelector);
      const formFieldId = this.currentHoveredField.id;
      this.currentHoveredFieldObject = this.view.formInputAndTextareaFieldObjects.find(field => field.model.data.id === formFieldId);
    
      if (!this.currentHoveredFieldObject.checkIfErrorExist()) this.currentHoveredFieldObject.animateOnMouseover();

      this.isMouseoverTrue = true;
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentHoveredField) return;

    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentHoveredField) return;
      relatedTarget = relatedTarget.parentElement;
    }

    if (!this.currentHoveredFieldObject.checkIfErrorExist()) {
      if (!this.isFocinTrue) this.currentHoveredFieldObject.animateOnMouseout();
      else if (this.currentHoveredField !== this.currentFocusedField) this.currentHoveredFieldObject.animateOnMouseout();
    }

    this.isMouseoverTrue = false;
    this.currentHoveredField = null;
    this.currentHoveredFieldObject = null;
  }
  focusinHandler(event) {
    if (event.target.closest(this.inputSelector)) {
      const input = event.target.closest(this.inputSelector);
      this.currentFocusedField = input.closest(this.inputFieldSelector);
      const formFieldId = this.currentFocusedField.id;
      this.currentFocusedFieldObject = this.view.formInputAndTextareaFieldObjects.find(field => field.model.data.id === formFieldId);

      if (!this.currentFocusedFieldObject.checkIfErrorExist() && this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.animateOnFocusin();
      else if (this.currentFocusedFieldObject.checkIfErrorExist()) this.currentFocusedFieldObject.hideText();

      this.isFocinTrue = true;
    }
  }
  mousedownHandler(event) {
    if (event.target.closest(this.inputFieldSelector) && this.isFocinTrue) {
      if (this.currentFocusedField !== event.target.closest(this.inputFieldSelector)) return;
      this.isFocinTrue = false;
    }
  }
  focusoutHandler(event) {
    if (event.target.closest(this.inputSelector)) {
      if (this.isFocinTrue) {
        if (!this.currentFocusedFieldObject.checkIfErrorExist() && !this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.animateOnFocusoutWithoutAnimatedText();
        if (!this.currentFocusedFieldObject.checkIfErrorExist() && this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.animateOnFocusout();
        else if (this.currentFocusedFieldObject.checkIfErrorExist() && this.currentFocusedFieldObject.checkIfInputEmpty()) {
          this.currentFocusedFieldObject.showText();
        }
        else if (!this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.hideText();
  
        this.isFocinTrue = false;
      } else {
        if (this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.showText();
        else if (this.currentFocusedFieldObject.checkIfErrorExist() && !this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.hideText();
      }

      this.currentFocusedField = null;
      this.currentFocusedFieldObject = null;
    }
  }
  inputHandler(event) {
    if (event.target.closest(this.inputSelector)) {
      const input = event.target.closest(this.inputSelector);
      const value = input.value;
      const name = input.name;

      this.currentFocusedFieldObject.updateValue(value);
      this.model.updateDataOnInput(name, value)
    }
  }
  clickCheckboxFieldHandler(event) {
    if (event.target.closest(this.checkboxFieldSelector)) {
      const checkboxField = event.target.closest(this.checkboxFieldSelector);
      const checkboxFieldIndex = +checkboxField.dataset.index;
      const checboxFieldObject = this.view.checboxFieldObjects[checkboxFieldIndex];

      if (checboxFieldObject.isClickedOnCheckbox(event)) {
        checboxFieldObject.clickCheckboxHandler(event);

        const checkboxData = checboxFieldObject.getData();
        this.model.updateDataCheckboxesOnClick(checkboxData, checkboxFieldIndex);
      }
    }
  }

  // инициализация
  addListeners() {
    this.view.form.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.view.form.addEventListener("mouseout", this.mouseoutHandler.bind(this));

    this.view.form.addEventListener("focusin", this.focusinHandler.bind(this));
    document.addEventListener("mousedown", this.mousedownHandler.bind(this));
    this.view.form.addEventListener("focusout", this.focusoutHandler.bind(this));

    this.view.form.addEventListener("input", this.inputHandler.bind(this));
    this.view.form.addEventListener("click", this.clickCheckboxFieldHandler.bind(this));
    this.view.form.addEventListener("submit", this.submitHandler.bind(this));
  }
  init() {
    this.model.init();

    this.addListeners();
  }
}
