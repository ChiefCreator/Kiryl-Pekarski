import { animateTextOnScroll } from "../utils/animateOnScrollUtils.js";
import DOMElementWatcher from "../components/domElementWatcher/DOMElementWatcher.js";

import gsap from "gsap";
import { splitTextOnLines } from "../utils/domUtils.js";

export default class AppView {
  constructor() {
    this.root = null;
    this.routes = null;
    this.content = null;

    this.watcher = new DOMElementWatcher({ elements: null, selector: null, callback: null });

    this.timelineOfTextAnimation = null
  }

  renderContent(pageId) {
    const pageObject = this.routes[pageId] || this.routes["error"];
    pageObject.updateCountOfRenders();
    pageObject.initAnimations();

    const page = pageObject.render();

    this.content.innerHTML = "";

    this.content.append(page);
    document.title = pageObject.title;

    // this.updateMenu(pageId);
  }

  updateMenu(activePage) {
    const links = Array.from(this.root.querySelectorAll("a.aside-menu-item"));
    const selectedLinks = this.root.querySelectorAll("a.aside-menu-item.selected");
    const filteredLinks = links.filter((link) => link.getAttribute("href").slice(1).toLowerCase() === activePage);

    filteredLinks.forEach((link) => {
      selectedLinks.forEach((selectedLink) => {
        if (selectedLink && selectedLink !== link) {
          selectedLink.classList.remove("selected");
          link.style.color = "rgb(210, 210, 210)";
        }

        link.classList.add("selected");
        link.style.color = link.dataset.color ?? "#4481eb";
      });
    });
  }

  init(root, routes) {
    this.root = root;
    this.routes = routes;
    this.content = this.root.querySelector("#content");
  }
}
