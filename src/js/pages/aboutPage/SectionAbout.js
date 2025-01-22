import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import "./section-information.scss";

import Portrait from "./Portrait";

import portraitImgSrc from "./../../../img/portrait.jpg?as=webp";

import gsap from "gsap";

export default class SectionAbout {
  constructor({ app }) {
    this.app = app;
    this.section = null;
    this.portraitImg = null;
    this.textElements = null;

    this.init();
  }

  initAnimations() {
    if (!this.app.getDevice().isSensoryInput) {
      this.portraitObject.animateScale();
    } else {
      gsap.fromTo(
        this.portraitImg,
        {
          transform: "scale(0)"
        },
        {
          transform: "scale(1)",
          duration: 2,
          ease: "power4.inOut",
        }
      );
    }
  }

  init() {
    this.section = this.create();
    this.portraitImg = this.section.querySelector(".section-information__portrait-img");
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
          <img class="section-information__portrait-img" src="${portraitImgSrc}">
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-information", id: "section-information" });
    const container = new Container(innerHTML);

    section.append(container.render());

    if (!this.app.getDevice().isSensoryInput) {
      const portaitImg = section.querySelector(".section-information__portrait-img");
      this.portraitObject = new Portrait({ imgSrc: portraitImgSrc, img: portaitImg });

      section.append(this.portraitObject.render());
    }

    return section;
  }
  render() {
    return this.section;
  }
}
