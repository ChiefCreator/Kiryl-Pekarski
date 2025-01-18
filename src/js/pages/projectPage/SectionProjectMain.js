import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";
import Marquee from "../../components/marquee/Marquee";
import LinkMore from "../../components/linkMore/LinkMore";

import "./section-project-main.scss";

export default class SectionProjectMain {
  constructor({ title, role, skillsData, linkToWebsite, images, app }) {
    this.title = title;
    this.role = role;
    this.skillsData = skillsData;
    this.linkToWebsite = linkToWebsite;
    this.images = images;
    this.app = app;

    this.section = this.create();
  }

  create() {
    const innerHTML = `
      <div class="section-project-main__container">
        <article class="project-information">
          <div class="project-information__main-content">
            <h2 class="project-information__title" id="project-information__title" data-text-animated-on-scroll data-text-animated-on-scroll-target="project-information__title">${this.title}</h2>
            <img class="project-information__img" src="${this.images.mainHorizontal}" data-cursor='cursorEye'>
            <p class="project-information__role" id="project-information__role" data-text-animated-on-scroll data-text-animated-on-scroll-target="project-information__role">${this.role}</p>
            <div class="project-information-skills">
              <h6 class="project-information-skills__title" id="project-information-skills__title" data-text-animated-on-scroll data-text-animated-on-scroll-target="project-information-skills__title">Использованные технологии</h6>
              <div class="project-information-skills__marquee-wrapper" id="project-information-skills__marquee-wrapper"></div>
            </div>
            <div class="project-information__button-wrapper"></div>
          </div>
        </article>
        <article class="project-illustration">
          <img class="project-illustration__img" src="${this.images.mainHorizontal}" data-cursor='cursorEye'>
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-project-main", id: "section-project-main" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const marqueeWrapper = section.querySelector(".project-information-skills__marquee-wrapper");
    const marquee = new Marquee({ data: this.skillsData, rowsCount: 1, marqueeItemAttributes: [{ title: "data-text-animated-on-scroll", value: true }, { title: "data-text-animated-on-scroll-target", value: "project-information-skills__marquee-wrapper" }], app: this.app });
    const buttonWrapper = section.querySelector(".project-information__button-wrapper");
    const buttonVisit = new LinkMore({ hasUnderline: true, className: "project-information__button-visit", data: { title: "Посетить сайт", href: `${this.linkToWebsite}`, scrollTrigger: null } });

    marqueeWrapper.append(marquee.render());
    buttonWrapper.append(buttonVisit.render())

    return section;
  }
  render() {
    return this.section;
  }
}
