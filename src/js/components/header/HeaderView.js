import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import ScrollProgress from "../scrollProgress/ScrollProgress";
import Logo from "../logo/Logo";
import LinkReappear from "../linkReappear/LinkReappear";
import ThemeToggle from "../themeToggle/ThemeToggle";
import BurgerButton from "../burgerButton/BurgerButton";

export default class HeaderView {
  constructor() {
    this.header = null;
  }

  init(linksData) {
    this.header = this.create(linksData);
  }
  create(linksData) {
    const innerHTML = `
      <div class="header__container">
        <div class="header__content">
          <div class="header__menu">
            <ul class="header__links"></ul>
            <div class="header__tools"></div>
            <div class="header__burger-button-wrapper"></div>
          </div>
        </div>
      </div>
    `;

    const container = new Container(innerHTML);
    const header = createDOM("header", { className: "header", innerHTML: container.render().outerHTML });
    const logo = new Logo({ className: "header__logo", href: "#main" });
    const scrollProgress = new ScrollProgress({ type: "header" });
    const themeToggle = new ThemeToggle();
    const burgerButton = new BurgerButton();
    const burgerButtonWrapper = header.querySelector(".header__burger-button-wrapper");

    header.querySelector(".header__content").prepend(logo.render());
    header.querySelector(".header__container").append(scrollProgress.render());
    header.querySelector(".header__tools").append(themeToggle.render());
    const linksList = header.querySelector(".header__links");
    linksData.forEach(linkData => linksList.append(new LinkReappear({ hasUnderline: true, data: linkData }).render()));
    burgerButtonWrapper.append(burgerButton.render());

    return header;
  }
  render() {
    return this.header;
  }
}
