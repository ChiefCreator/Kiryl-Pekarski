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
              Привет! Меня зовут Кирилл, мне восемнадцать лет. Я frontend-разработчик, создаю сайты, приложения и онлайн-сервисы для больших и малых компаний.
              Я использую свою страсть и навыки, чтобы создавать качественные цифровые продукты.
              Я ответственно подхожу к выполнению поставленных задач, хорошо организованный человек, позитивный с хорошим чувстов юмора. Фанат футбола, активного отдыха и, конечно же, программирования.
              Интересуюсь всем спектром фронтенда и работаю над амбициозными проектами с интересными людьми.
            </p>
            <p class="full-information__text full-information__text_front" data-text-animated-on-scroll data-text-animated-on-scroll-target="section-about">
              Привет! Меня зовут Кирилл, мне восемнадцать лет. Я frontend-разработчик, создаю сайты, приложения и онлайн-сервисы для больших и малых компаний.
              Я использую свою страсть и навыки, чтобы создавать качественные цифровые продукты.
              Я ответственно подхожу к выполнению поставленных задач, хорошо организованный человек, позитивный с хорошим чувстов юмора. Фанат футбола, активного отдыха и, конечно же, программирования.
              Интересуюсь всем спектром фронтенда и работаю над амбициозными проектами с интересными людьми.
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
