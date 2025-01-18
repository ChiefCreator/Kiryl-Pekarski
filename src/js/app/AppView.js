import DOMElementWatcher from "../components/domElementWatcher/DOMElementWatcher.js";

export default class AppView {
  constructor() {
    this.root = null;
    this.routes = null;
    this.pageLoader = null;
    this.menu = null;
    this.content = null;

    this.watcher = new DOMElementWatcher({ elements: null, selector: null, callback: null });

    this.timeout = null;
  }

  renderContent(currentPageId, prevPageId) {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      const pageObject = this.routes[currentPageId] || this.routes["error"];
      pageObject.updateCountOfRenders();
      pageObject.initAnimations();

      const page = pageObject.render();

      this.content.innerHTML = "";

      this.content.append(page);
      document.title = pageObject.title;
      window.scrollTo({ top: 0, behavior: "instant" });

      this.pageLoader.hide();
    }, 3000);

    if (this.menu.checkIsOpen()) this.menu.close();

    if (prevPageId) {
      const prevPageObject = this.routes[prevPageId] || this.routes["error"];

      if (prevPageObject.stopAnimations) prevPageObject.stopAnimations();
    }

    this.pageLoader.show();
  }

  init(root, routes, pageLoader, menu) {
    this.root = root;
    this.routes = routes;
    this.pageLoader = pageLoader;
    this.menu = menu;
    this.content = this.root.querySelector("#content");
  }
}
