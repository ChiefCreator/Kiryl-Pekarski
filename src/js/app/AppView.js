import DOMElementWatcher from "../components/domElementWatcher/DOMElementWatcher.js";

export default class AppView {
  constructor() {
    this.root = null;
    this.routes = null;
    this.pageLoader = null;
    this.content = null;

    this.watcher = new DOMElementWatcher({ elements: null, selector: null, callback: null });

    this.timeout = null;
  }

  renderContent(pageId) {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      const pageObject = this.routes[pageId] || this.routes["error"];
      pageObject.updateCountOfRenders();
      pageObject.initAnimations();

      const page = pageObject.render();

      this.content.innerHTML = "";

      this.content.append(page);
      document.title = pageObject.title;

      this.pageLoader.hide();
    }, 2500);

    this.pageLoader.show();
  }

  init(root, routes, pageLoader) {
    this.root = root;
    this.routes = routes;
    this.pageLoader = pageLoader;
    this.content = this.root.querySelector("#content");
  }
}
