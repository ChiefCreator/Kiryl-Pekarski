export default class Controller {
  constructor(model) {
    this.model = model;

    this.init();
  }

  init() {
    this.handleHashChange();
    this.addListeners();
  }
  addListeners() {
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
  }
  handleHashChange() {
    const pageId = location.hash.slice(1).toLowerCase() || "main";
    this.model.updateState(pageId);
  }
}
