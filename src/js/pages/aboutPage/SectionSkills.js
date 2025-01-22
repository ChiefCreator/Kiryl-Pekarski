import { createDOM } from "../../utils/domUtils";

import Container from "../../components/container/Container";
import HeaderSection from "../../components/headerContainer/HeaderSection";
import Marquee from "../../components/marquee/Marquee";

import skillsData from "./../../data/skillsData";

import "./section-skills.scss";

export default class SectionSkills {
  constructor({ app }) {
    this.app = app;
    this.section = this.create();
  }

  initAnimations() {
    this.sectionHeader.initAnimations();
  }

  create() {
    const innerHTML = `
      <div class="section-skills__container">
        <div class="section-skills__header-wrapper"></div>
        <article class="article-skills">

        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-skills", id: "section-skills" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const sectionHeaderWrapper = section.querySelector(".section-skills__header-wrapper");
    const articleSkills = section.querySelector(".article-skills");
    this.sectionHeader = new HeaderSection({
      data: {
        title: "Мои Hard Skills",
        sectionId: "section-skills",
      },
    });
    const marquee = new Marquee({ data: skillsData, rowsCount: 3, app: this.app });

    sectionHeaderWrapper.append(this.sectionHeader.render());
    articleSkills.append(marquee.render());

    return section;
  }
  render() {
    return this.section;
  }
}
