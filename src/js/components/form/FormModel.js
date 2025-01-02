export default class FormModel {
  constructor(view, fieldsData, textareaFieldData, checboxFieldsData) {
    this.view = view;

    this.fieldsData = fieldsData;
    this.textareaFieldData = textareaFieldData;
    this.checboxFieldsData = checboxFieldsData;

    this.data = {
      checkboxes: {},
    };

    this.error = false;
  }

  // обновление данных
  updateDataOnInput(prop, value) {
    this.data[prop] = value;

    if (this.error) this.validate();
  }
  updateDataCheckboxesOnClick(checkboxData, checkboxFieldIndex) {
    this.data.checkboxes[checkboxFieldIndex] = checkboxData;
  }
  setData(inputsData, checkboxesData) {
    this.data = Object.fromEntries(inputsData);
    this.data.checkboxes = checkboxesData;
  }

  // валидация
  validate() {
    this.validateName();
    this.validateMail();
  }
  checkIsValid() {
    return !this.error;
  }
  validateName() {
    if (!this.data.name) {
      this.error = true;
      this.view.formInputFieldObjects[0].setError(true);
      this.view.formInputFieldObjects[0].animateOnValidationError();
      return;
    }

    this.view.formInputFieldObjects[0].setError(false);
    this.view.formInputFieldObjects[0].animateOnValidationSuccess();
    this.error = false;
  }
  validateMail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.data.mail) {
      this.error = true;
      this.view.formInputFieldObjects[1].setError(true);
      this.view.formInputFieldObjects[1].animateOnValidationError();
      return;
    }

    if (!emailRegex.test(this.data.mail)) {
      this.error = true;
      this.view.formInputFieldObjects[1].setError(true);
      this.view.formInputFieldObjects[1].animateOnValidationError();
      return;
    }

    this.view.formInputFieldObjects[1].setError(false);
    this.view.formInputFieldObjects[1].animateOnValidationSuccess();
    this.error = false;
  }

  // отправка
  send() {
    this.validate();

    if (!this.checkIsValid()) return;

    this.view.startButtonSubmitAnimation();

    fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.data),
    })
    .then(response => {
      if (response.ok) {
        this.view.endButtonSubmitAnimation("success");
      } else {
        this.view.endButtonSubmitAnimation("error");
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
      this.view.endButtonSubmitAnimation("error");
      console.log(error)
    })
  }

  // инициализация
  init() {
    this.view.init(this.fieldsData, this.textareaFieldData, this.checboxFieldsData);
  }
}
