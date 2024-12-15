import Container from "../../components/container/Container";
import CircularText from "../../components/circularText/CircularText";
import { createDOM } from "../../utils/domUtils";

import "./sectionMain.scss";

export default class SectionMain {
  constructor() {
    this.section = this.create();
  }

  create() {
    const innerHTML = `
      <div class="section-main__container">
        <article class="introductory-information">
          <div class="introductory-information__main-content">
            <div class="introductory-information__title-wrapper">
              <h1 class="introductory-title introductory-title_behind introductory-information__title">
                <span class="introductory-title__name" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-main">Кирилл</span>
                <span class="introductory-title__surname" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-main">Пекарский</span>
              </h1>
              <h1 class="introductory-title introductory-title_front introductory-information__title">
                <span class="introductory-title__name" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-main">Кирилл</span>
                <span class="introductory-title__surname" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-main">Пекарский</span>
              </h1>
            </div>
          </div>
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-main", id: "section-main" });
    const container = new Container(innerHTML);

    section.append(container.render());
    const circularTextWrapper = section.querySelector(".introductory-information__main-content");
    const circularText = new CircularText({ text: "Creative Front-end Web Developer", fontSize: 36, radius: 77, className: "introductory-information__circular-text" });

    circularTextWrapper.append(circularText.render());

    return section;
  }
  render() {
    return this.section;
  }
}
