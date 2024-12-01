import { createDOM } from "../../utils/domUtils";

import SectionMain from "./SectionMain";

import "./homePage.scss";

export default class HomePage {
  constructor() {
    this.id = "main";
    this.title = "Kiryl Pekarski";
    this.page = this.create();

    this.init();
  }

  create() {
    const innerHTML = `
      <div class="app-main__container">
        
      </div>
    `;
    
    const page = createDOM("main", { className: "app-main", innerHTML: innerHTML });
    const pageContainer = page.firstElementChild;
    const sectionMain = new SectionMain();

    pageContainer.append(sectionMain.render());

    return page;
  }
  init() {
    document.title = this.title;
  }
  render() {
    return this.page;
  }
}
