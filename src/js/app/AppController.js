export default class Controller {
  constructor(model) {
    this.model = model;
  }

  // обработчики
  handleHashChange() {
    const pageId = location.hash.slice(1) || "main";
    console.log(pageId)
    this.model.updateState(pageId);
  }
  scrollHandler() {
    this.model.updateSpeedOfScrolledPixels();
  }

  // инициализация
  addListeners() {
    window.addEventListener("hashchange", this.handleHashChange.bind(this));

    window.addEventListener("scroll", this.scrollHandler.bind(this));
  }
  init() {
    this.handleHashChange();
    this.addListeners();
  }
}
