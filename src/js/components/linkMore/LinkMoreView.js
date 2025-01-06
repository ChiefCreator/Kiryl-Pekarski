import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class LinkMoreView {
  constructor(hasUnderline, className) {
    this.hasUnderline = hasUnderline ?? false;
    this.className = className;

    this.link = null;
    this.letters = null;
    this.circle = null;
    this.arrow = null;

    this.timelineOfArrow = gsap.timeline({ paused: true });
    this.timelineOfLetterAppearance = gsap.timeline({ paused: true });
  }

  initTimelineOfArrow() {
    const radius = 50;
    const length = 2 * Math.PI * radius;

    this.timelineOfArrow
      .set(this.circle, { strokeDasharray: length, strokeDashoffset: length, rotation: -90 })
      .set(this.arrow, { opacity: 0, translateX: -10 })
      .to(this.circle, { strokeDashoffset: 0, duration: 2.4, ease: "power4.inOut" })
      .to(this.circle, { rotation: 210, duration: 2, ease: "power4.inOut" }, "<")
      .to(this.arrow, { opacity: 1, translateX: 0, duration: 1, ease: "power4.inOut" }, "<25%")
  }
  initTimelineOfLetterAppearance() {
    this.letters.forEach(($letter) => {
      this.timelineOfLetterAppearance.add(gsap.to($letter, {
        transform: `translate(0, -100%)`,
        duration: .5,
        ease: "power2.inOut",
      }), "<0.03")
    });
  }
  splitTitle() {
    const $linkWrapper = this.link.querySelector(".link-more__title");
    const title = this.link.dataset.title;

    title.split(" ").forEach((word, index, arr) => {
      const $word = document.createElement("span");
      $word.classList.add("link-more__word");

      Array.from(word).forEach((letter) => {
        const $letter = document.createElement("span");
        $letter.classList.add("link-more__letter");
        $letter.textContent = letter;
        $letter.dataset.letter = letter;
        $word.append($letter);
      });

      $linkWrapper.append($word);

      if (index < arr.length - 1) {
        const $space = document.createElement("span");
        $space.classList.add("link-more__space");
        $space.textContent = " ";
        $space.dataset.letter = " ";
        $linkWrapper.append($space);
      }
    });
  }

  initTimelines() {
    gsap.set(this.circle, { strokeDasharray: 2 * Math.PI * 50, strokeDashoffset: 2 * Math.PI * 50, rotation: -90 })
    gsap.set(this.arrow, { opacity: 0, translateX: -10 })
    this.initTimelineOfArrow();
    this.initTimelineOfLetterAppearance();
  }
  init(data) {
    this.data = data;
    this.link = this.create(data);
    this.splitTitle();
    this.letters = this.link.querySelectorAll(".link-more__letter");
    this.circle = this.link.querySelector("circle");
    this.arrow = this.link.querySelector(".link-more__arrow");

    this.initTimelines();
  }
  create(data) {
    const innerHTML = `
      <div class="link-more__container">
        <div class="link-more__arrow-wrapper">
          <svg class="link-more__svg" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="link-more__circle" cx="42" cy="42" r="41" data-svg-origin="42 42" data-color-transition></circle>
            <path class="link-more__arrow" d="M42.9456 52.9577L44.9879 55L58.0272 41.9607L45.0665 29L43.0242 31.0423L52.6073 40.6254H27V43.4532H52.4502L42.9456 52.9577Z" data-svg-origin="27 29" transform="matrix(1,0,0,1,0,0)" data-color-transition></path>
          </svg>
        </div>
        <div class="link-more__title-wrapper" data-cursor="cursorForceGravity">
          <div class="link-more__title"></div>
        </div>
      </div>
    `;

    const attributes = [
      { title: "href", value: data.href },
      { title: "data-title", value: data.title },
      { title: "data-color-transition", value: true },
      { title: "data-element-animated-on-scroll", value: true }, { title: "data-element-animated-on-scroll-target", value: data.scrollTrigger },
    ];

    return createDOM("a", {
      className: `link-more ${this.hasUnderline ? "link-more_underline" : ""} ${this.className}`,
      innerHTML,
      attributes,
    });
  }
  render() {
    return this.link;
  }
}
