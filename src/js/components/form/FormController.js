export default class FormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

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
    console.log("submit")
    event.preventDefault();
    console.log("dwd")
    this.model.setData(this.view.getData());
  }

  mouseoverHandler(event) {
    if (this.currentHoveredField) return;

    if (event.target.closest(this.inputFieldSelector)) {
      this.currentHoveredField = event.target.closest(this.inputFieldSelector);
      const formFieldId = this.currentHoveredField.id;
      this.currentHoveredFieldObject = this.view.formInputAndTextareaFieldObjects.find(field => field.model.data.id === formFieldId);
    
      this.currentHoveredFieldObject.animateOnMouseover();

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

    if (!this.isFocinTrue) this.currentHoveredFieldObject.animateOnMouseout();
    else if (this.currentHoveredField !== this.currentFocusedField) this.currentHoveredFieldObject.animateOnMouseout();;

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

      if (this.currentFocusedFieldObject.checkIfInputEmpty()) {
        this.currentFocusedFieldObject.animateOnFocusin();
      }

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
        if (this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.animateOnFocusout();
        else this.currentFocusedFieldObject.animateOnFocusoutWithoutAnimatedText();
  
        this.isFocinTrue = false;
      } else {
        if (this.currentFocusedFieldObject.checkIfInputEmpty()) this.currentFocusedFieldObject.animateOnFocusoutText();
        else this.currentFocusedFieldObject.animateOnFocusoutWithoutAnimatedText();
      }

      this.currentFocusedField = null;
      this.currentFocusedFieldObject = null;
    }
  }
  inputHandler(event) {
    if (event.target.closest(this.inputSelector)) {
      const input = event.target.closest(this.inputSelector);
      const value = input.value;

      this.currentFocusedFieldObject.updateValue(value);
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
    this.view.form.addEventListener("submit", this.submitHandler.bind(this));
  }
  init() {
    this.model.init();

    this.addListeners();
  }
}
