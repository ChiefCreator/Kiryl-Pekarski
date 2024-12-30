export default class FormModel {
  constructor(view, fieldsData, textareaFieldData, checboxFieldsData) {
    this.view = view;
    this.fieldsData = fieldsData;
    this.textareaFieldData = textareaFieldData;
    this.checboxFieldsData = checboxFieldsData;

    this.data = null;
  }

  setData(data) {
    this.data = data;

    this.data.forEach((value, key) => {
      console.log(`Ключ: ${key}, Значение: ${value}`);
    });
  }

  init() {
    this.view.init(this.fieldsData, this.textareaFieldData, this.checboxFieldsData);
  }
}
