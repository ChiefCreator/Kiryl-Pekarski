import { createDOM } from "../../utils/domUtils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { animateElementOnScroll } from "../../utils/animateOnScrollUtils";

import "./section-project-image-gallery.scss";

export default class SectionProjectImageGalery {
  constructor({ images, app }) {
    this.app = app;
    this.section = null;
    this.imgs = null;

    this.images = images;

    this.init();
  }

  calcScrollEnd() {
    if (!this.imgs) return 0;

    const gap = parseFloat(window.getComputedStyle(this.container).gap);

    return Array.from(this.imgs).reduce((scrollEnd, img, index) => {
      if (index === 0) return 0;

      scrollEnd += img.offsetWidth + gap;

      return scrollEnd;
    }, 0);
  }

  initAnimations() {
    if (this.app.getDevice().isSensoryInput) {
      this.imgs.forEach((img) => {
        const timelineOnScroll = gsap.timeline({ paused: true });
        timelineOnScroll.fromTo(
          img,
          {
            transform: "scale(0)",
          },
          {
            transform: "scale(1)",
            duration: 2,
            ease: "power4.inOut",
          }
        );

        animateElementOnScroll(img, {
          start: "top bottom",
          events: {
            onEnter: () => timelineOnScroll.restart(),
          },
        });
      });
    } else {
      const sectionRect = this.section.getBoundingClientRect();
      const scrollStartRegardingElement = -(window.innerHeight - sectionRect.height) / 2;
      const scrollEnd = this.calcScrollEnd();

      gsap.to(this.section, {
        scrollTrigger: {
          trigger: this.section,
          start: `${scrollStartRegardingElement}px top`,
          end: `+=${scrollEnd}px`,
          scrub: true,
          pin: true,
        },
        x: `-${scrollEnd}px`,
      });
    }
  }

  init() {
    this.section = this.create();
    this.container = this.section.querySelector(".section-project-image-gallery__container");
    this.imgs = this.section.querySelectorAll(".section-project-image-gallery__img");
  }
  create() {
    const innerHTML = `
      <div class="section-project-image-gallery__container">
        ${this.images
          .map((imageSrc, index) => {
            return `
            <div class="section-project-image-gallery__image-wrapper">
              <img class="section-project-image-gallery__img" id="section-project-image-gallery-${index}" src="${imageSrc}" data-element-animated-on-scroll data-element-animated-on-scroll-target="section-project-image-gallery-${index}">
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    return createDOM("section", { className: `section-project-image-gallery ${this.app.getDevice().isSensoryInput ? "section-project-image-gallery_sensory-device" : ""}`, id: "section-project-image-gallery", innerHTML });
  }
  render() {
    return this.section;
  }
}
