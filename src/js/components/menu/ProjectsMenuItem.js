import { createDOM } from "../../utils/domUtils";

export default class ProjectMenuItem {
  constructor({ data, index }) {
    this.projectsMenuItem = null;
    this.data = data;
    this.index = index + 1;

    this.init();
  }

  getNumber() {
    return `${this.index <= 9 ? `0${this.index }` : this.index}`;
  }

  init() {
    this.projectsMenuItem = this.create(this.data);
  }
  create(data) {
    const innerHTML = `
      <div class="projects-menu-item__container projects-menu-item__container_front">
        <div class="projects-menu-item__content">
          <div class="projects-menu-item__num-wrapper">
            <span class="projects-menu-item__num projects-menu-item__num_behind">${this.getNumber()}</span>
            <span class="projects-menu-item__num projects-menu-item__num_front">${this.getNumber()}</span>
          </div>
          <div class="projects-menu-item__title-wrapper">
            <h5 class="projects-menu-item__title projects-menu-item__title_behind">${data.title}</h5>
            <h5 class="projects-menu-item__title projects-menu-item__title_front">${data.title}</h5>
          </div>
        </div>
        <span class="projects-menu-item__line"></span>
      </div>
    `;

    return createDOM("a", { className: "projects-menu-item", innerHTML, attributes: [{ title: "href", value: `#${data.href}` }, { title: "data-image-url", value: data.images.mainVertical }, { title: "data-cursor", value: "cursorScale" }] });
  }
  render() {
    return this.projectsMenuItem;
  }
}
