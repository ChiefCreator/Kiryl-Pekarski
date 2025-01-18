import { createDOM } from "../../utils/domUtils";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import "./section-project-image-gallery.scss";

export default class SectionProjectImageGalery {
  constructor({ images }) {
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

  initScrollAnimation() {
    const scrollEnd = this.calcScrollEnd();

    gsap.to(this.section, {
      scrollTrigger: {
        trigger: this.section,
        start: `top top`,
        end: `+=${scrollEnd}px`, 
        scrub: true,
        pin: true,
      },
      x: `-${scrollEnd}px`,
    });
  }

  init() {
    this.section = this.create();
    this.container = this.section.querySelector(".section-project-image-gallery__container");
    this.imgs = this.section.querySelectorAll(".section-project-image-gallery__img");
  }
  create() {
    const innerHTML = `
      <div class="section-project-image-gallery__container">
        ${this.images.map(imageSrc => {
          return `
            <div class="section-project-image-gallery__image-wrapper">
              <img class="section-project-image-gallery__img" src="${imageSrc}">
            </div>
          `;
        }).join("")}
      </div>
    `;

    return createDOM("section", { className: "section-project-image-gallery", id: "section-project-image-gallery", innerHTML });
  }
  render() {
    return this.section;
  }
}
