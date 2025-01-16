import { createDOM } from "../../utils/domUtils";
import SectionProjectMain from "./SectionProjectMain";
import ProjectScene from "./ProjectScene";
import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
import SectionProjectImageGalery from "./SectionProjectImageGalery";

import "./project-page.scss";

import skillsData from "../../data/skillsData";

export default class ProjectPage {
  constructor({ data, app }) {
    this.id = data.href;
    this.title = data.title;
    this.skillsData = skillsData.filter(skillData => data.skills.includes(skillData.title));
    this.images = data.images;
    this.role = data.role;
    this.countOfRenders = 0;
    this.app = app;

    this.page = null;

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  initAnimations() {}

  init() {
    this.page = this.create();
  }
  create() {
    const innerHTML = `
      <div class="app-project__container">
    
      </div>
    `;

    const page = createDOM("main", { className: "app-project", innerHTML });
    const container = page.querySelector(".app-project__container");
    const sectionProjectMainObject = new SectionProjectMain({ title: this.title, role: this.role, skillsData: this.skillsData, images: this.images, app: this.app });
    const sectionImageGalleryObject = new SectionProjectImageGalery();

    container.append(sectionProjectMainObject.render());
    container.append(sectionImageGalleryObject.render());

    const mainImg = page.querySelector(".project-illustration__img");
    const watcher = new DOMElementWatcher({
      elements: [mainImg, sectionImageGalleryObject.render()],
      callback: () => {
        const projectSceneObject = new ProjectScene({ mainImgElement: mainImg, mainImgSrc: this.images.mainHorizontal, imagesSrc: this.images.other, imageGaleryObject: sectionImageGalleryObject })

        container.append(projectSceneObject.render());
      }
    });
    watcher.startWatching();

    return page;
  }
  render() {
    return this.page;
  }
}
