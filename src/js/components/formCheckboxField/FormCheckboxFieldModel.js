export default class FormCheckboxFieldModel {
    constructor(view, data, index) {
      this.view = view;
      this.data = data;
      this.index = index;

      this.selectedIndex = null;
    }

    resetCheckboxes() {
      this.view.resetCheckboxes();
    }
    updateCheckbox(index) {
      this.selectedIndex = index;
      this.view.updateCheckbox(this.selectedIndex);
    }
    getData() {
      let data = {
        name: this.data.name,
      }

      if (this.selectedIndex !== null && this.selectedIndex !== undefined) {
        data = Object.assign({
          checkboxIndex: this.selectedIndex,
          checkbox: this.data.checkboxes[this.selectedIndex]
        }, data);
      }

      return data;
    }
  
    init() {
      this.view.init(this.data, this.index);
    }
  }
  