import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import "./section-information.scss";

import Portrait from "./Portrait";

import portraitImgSrc from "./../../../img/portrait.jpg";

export default class SectionAbout {
  constructor() {
    this.section = null;
    this.textElements = null;

    this.init();
  }

  initAnimations() {
    this.portraitObject.animateScale();
  }

  init() {
    this.section = this.create();
    this.textElements = this.section.querySelectorAll('[data-open-animation="text"]');
  }
  create() {
    const innerHTML = `
      <div class="section-information__container">
        <article class="section-information__content">
          <h1 class="section-information__title" data-text-animated-on-scroll>Чуть информации обо мне</h1>
          <p class="section-information__description" data-text-animated-on-scroll>
            Меня зовут Кирилл, мне восемнадцать лет. Я frontend-разработчик,
            создаю сайты, приложения и онлайн-сервисы для больших и малых
            компаний. Я использую свою страсть и навыки, чтобы создавать
            качественные цифровые продукты. Я ответственно подхожу к выполнению
            поставленных задач, хорошо организованный человек, позитивный с
            хорошим чувстов юмора. Фанат футбола, активного отдыха и, конечно же,
            программирования. Интересуюсь всем спектром фронтенда и работаю над
            амбициозными проектами с интересными людьми.
          </p>
        </article>
        <article class="section-information__illustration-wrapper">
          <img class="section-information__portrait-img">
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-information", id: "section-information" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const portaitImg = section.querySelector(".section-information__portrait-img");
    this.portraitObject = new Portrait({ imgSrc: portraitImgSrc, img: portaitImg });

    section.append(this.portraitObject.render());

    return section;
  }
  render() {
    return this.section;
  }
}
