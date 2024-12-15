import { createDOM } from "../../utils/domUtils";

import SectionMain from "./SectionMain";
import SectionAbout from "./SectionAbout";
import SectionProjects from "./SectionProjects";
import SectionService from "./SectionService";

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
    const sectionAbout = new SectionAbout();
    const sectionProjects = new SectionProjects();
    const sectionService = new SectionService();

    pageContainer.append(sectionMain.render());
    pageContainer.append(sectionAbout.render());
    pageContainer.append(sectionProjects.render());
    pageContainer.append(sectionService.render());

    return page;
  }
  init() {
    document.title = this.title;
  }
  render() {
    return this.page;
  }
}
