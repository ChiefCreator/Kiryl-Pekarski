export default class ProjectImagesModel {
    constructor(view, data) {
      this.data = data;
      this.view = view;
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  