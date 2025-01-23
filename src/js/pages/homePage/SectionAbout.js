import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import "./sectionAbout.scss";

export default class SectionAbout {
  constructor() {
    this.section = this.create();
  }

  create() {
    const innerHTML = `
      <div class="section-about__container">
        <article class="sculpture-block">
          <div class="sculpture-block__wrapper"></div>
        </article>
        <article class="full-information">
          <div class="full-information__text-wrapper">
            <p class="full-information__text full-information__text_behind" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-about">
              Привет!
              Добро пожаловать в мой уголок интернета. Меня зовут Кирилл, и я - фронтенд-разработчик, который превращает идеи в живые, интерактивные и визуально привлекательные веб-приложения.
              Каждая строка кода для меня - это больше, чем просто работа. Это инструмент, который помогает создавать удобный, красивый и запоминающийся цифровой опыт. Я убеждён, что хороший интерфейс - это не только про функциональность, но в том числе про эмоции, которые он вызывает у пользователей.
              Моя цель - делать интернет лучше.
            </p>
            <p class="full-information__text full-information__text_front" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-about">
              Привет!
              Добро пожаловать в мой уголок интернета. Меня зовут Кирилл, и я - фронтенд-разработчик, который превращает идеи в живые, интерактивные и визуально привлекательные веб-приложения.
              Каждая строка кода для меня - это больше, чем просто работа. Это инструмент, который помогает создавать удобный, красивый и запоминающийся цифровой опыт. Я убеждён, что хороший интерфейс - это не только про функциональность, но в том числе про эмоции, которые он вызывает у пользователей.
              Моя цель - делать интернет лучше.
            </p>
          </div>
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-about", id: "section-about" });
    const container = new Container(innerHTML);

    section.append(container.render());

    return section;
  }
  render() {
    return this.section;
  }
}
