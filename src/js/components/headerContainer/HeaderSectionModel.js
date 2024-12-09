export default class HeaderSectionModel {
    constructor(view, data) {
      this.view = view;
      this.data = data;
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  