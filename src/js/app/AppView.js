import DOMElementWatcher from "../components/domElementWatcher/DOMElementWatcher.js";

export default class AppView {
  constructor() {
    this.root = null;
    this.routes = null;
    this.pageLoader = null;
    this.menu = null;
    this.footer = null;
    this.content = null;

    this.watcher = new DOMElementWatcher({ elements: null, selector: null, callback: null });

    this.timeout = null;
  }

  hideScroll(scrollWidth) {
    const body = document.body;

    body.classList.add("no-scroll");
    body.style.paddingRight = `${scrollWidth}px`;
  }
  openScroll() {
    const body = document.body;

    body.classList.remove("no-scroll");
    body.style.paddingRight = 0;
  }

  onPageLoad(pageObject) {
    this.pageLoader.hide();

    document.title = pageObject.title;
      
    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => this.openScroll(), 1000);

    this.footer.initAnimations();
  }

  renderContent(currentPageId, prevPageId, scrollWidth) {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      const pageObject = this.routes[currentPageId] || this.routes["error"];
      const page = pageObject.render();

      pageObject.updateCountOfRenders();
      pageObject.onLoad(() => this.onPageLoad(pageObject));

      this.content.innerHTML = "";
      this.content.append(page);

      if (prevPageId) {
        const prevPageObject = this.routes[prevPageId] || this.routes["error"];
  
        if (prevPageObject.stopAnimations) prevPageObject.stopAnimations();
      }
    }, 3000);

    if (this.menu.checkIsOpen()) this.menu.close();

    this.pageLoader.show();
    this.hideScroll(scrollWidth);
  }

  init(root, routes, pageLoader, menu, footer) {
    this.root = root;
    this.routes = routes;
    this.pageLoader = pageLoader;
    this.menu = menu;
    this.footer = footer;
    this.content = this.root.querySelector("#content");
  }
}
