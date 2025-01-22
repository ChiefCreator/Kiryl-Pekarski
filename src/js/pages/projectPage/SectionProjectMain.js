import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";
import Marquee from "../../components/marquee/Marquee";
import LinkMore from "../../components/linkMore/LinkMore";

import gsap from "gsap";
import { animateElementOnScroll } from "../../utils/animateOnScrollUtils";

import "./section-project-main.scss";

export default class SectionProjectMain {
  constructor({ title, role, skillsData, linkToWebsite, images, app }) {
    this.title = title;
    this.role = role;
    this.skillsData = skillsData;
    this.linkToWebsite = linkToWebsite;
    this.images = images;
    this.app = app;

    this.section = null;

    this.init();
  }

  setInitialScaleOfImages() {
    gsap.set(
      window.innerWidth > 1280 ? this.mainImg : this.mainImgMobile,
      {
        transform: "scale(1)",
      },
    );
  }
  initAnimations() {
    const timelineOnScroll = gsap.timeline({ paused: true });
    timelineOnScroll.fromTo(
      window.innerWidth > 1280 ? this.mainImg : this.mainImgMobile,
      {
        transform: "scale(0)",
      },
      {
        transform: "scale(1)",
        duration: 2,
        ease: "power4.inOut",
      }
    );

    animateElementOnScroll(this.section, {
      events: {
        onEnter: () => timelineOnScroll.restart()
      },
    });
  }
  init() {
    this.section = this.create();
    this.mainImg = this.section.querySelector(".project-illustration__img");
    this.mainImgMobile = this.section.querySelector(".project-information__img");
  }
  create() {
    const innerHTML = `
      <div class="section-project-main__container">
        <article class="project-information">
          <div class="project-information__main-content">
            <h2 class="project-information__title" id="project-information__title" data-text-animated-on-scroll>${this.title}</h2>
            <a class="project-information__img-link" href="${this.linkToWebsite}"><img class="project-information__img" src="${this.images.mainHorizontal}" data-cursor='cursorEye' style="opacity: ${this.app.getDevice().isSensoryInput ? 1 : 0};"></a>
            <p class="project-information__role" data-text-animated-on-scroll>${this.role}</p>
            <div class="project-information-skills">
              <h6 class="project-information-skills__title" data-text-animated-on-scroll>Использованные технологии</h6>
              <div class="project-information-skills__marquee-wrapper" id="project-information-skills__marquee-wrapper"></div>
            </div>
            <div class="project-information__button-wrapper"></div>
          </div>
        </article>
        <article class="project-illustration">
          <a class="project-illustration__img-link" href="${this.linkToWebsite}"><img class="project-illustration__img" src="${this.images.mainHorizontal}" data-cursor='cursorEye' style="opacity: ${this.app.getDevice().isSensoryInput ? 1 : 0};"></a>
        </article>
      </div>
    `;

    const section = createDOM("section", { className: "section-project-main", id: "section-project-main" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const marqueeWrapper = section.querySelector(".project-information-skills__marquee-wrapper");
    const marquee = new Marquee({ data: this.skillsData, rowsCount: 1, marqueeItemAttributes: [{ title: "data-text-animated-on-scroll", value: true }], app: this.app });
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
