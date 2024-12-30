import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

export default class FormTextareaFieldView {
  constructor() {
    this.formTextareaField = null;
    this.textarea = null;
    this.placeholder = null;
    this.lineSub = null;

    this.timelineOnMouseover = gsap.timeline({ paused: true });
    this.timelineOnFocusin = gsap.timeline({ paused: true });
    this.timelineOnFocusout = gsap.timeline({ paused: true });
    this.timelineOnFocusoutWithoutAnimatedText = gsap.timeline({ paused: true });
    this.timelineOfAnimatedText = gsap.timeline({ paused: true });
  }

  animateLetters(animatedProps) {
    const timeline = gsap.timeline();

    this.placeholderLetters.forEach(($letter) => timeline.add(gsap.to($letter, animatedProps), "<0.03"));

    return timeline;
  }

  splitPlaceholder() {
    const title = this.placeholder.dataset.title;

    title.split(" ").forEach((word, index, arr) => {
      const $word = document.createElement("span");
      $word.classList.add("form-textarea-field__placeholder-word");

      Array.from(word).forEach((letter) => {
        const $letter = document.createElement("span");
        $letter.classList.add("form-textarea-field__placeholder-letter");
        $letter.textContent = letter;
        $letter.dataset.letter = letter;
        $word.append($letter);
      });

      this.placeholder.append($word);

      if (index < arr.length - 1) {
        const $space = document.createElement("span");
        $space.classList.add("form-textarea-field__placeholder-space");
        $space.textContent = " ";
        $space.dataset.letter = " ";
        this.placeholder.append($space);
      }
    });
  }

  // инициализация
  initTimeline() {
    this.timelineOfAnimatedText.add(this.animateLetters({
      transform: `translate(0, 0)`,
      duration: 0.5,
      ease: "power2.inOut",
    }), 0);

    this.timelineOnMouseover
      .to(this.lineSub, {
        width: "100%",
        ease: "power4.inOut",
        duration: .5,
      })
      .to(this.textarea, {
        color: "#f0f0f0",
        ease: "power4.inOut",
        duration: .5,
      }, "<")
      .to(this.placeholder, {
        color: "#f0f0f0",
        ease: "power4.inOut",
        duration: .5,
      }, "<")

    this.timelineOnFocusin
    .add(this.animateLetters(
      {
        transform: `translate(0, -100%)`,
        duration: 0.5,
        ease: "power2.inOut",
      }
    ), 0)
      .to(this.lineSub, {
        width: "100%",
        ease: "power4.inOut",
        duration: .5,
      }, "<")
      .to(this.textarea, {
        color: "#f0f0f0",
        ease: "power4.inOut",
        duration: .5,
      }, "<")
      .to(this.placeholder, {
        color: "#f0f0f0",
        ease: "power4.inOut",
        duration: .5,
      }, "<")

    this.timelineOnFocusout
      .add(this.animateLetters({
        transform: `translate(0, 0)`,
        duration: 0.5,
        ease: "power2.inOut",
      }), 0)
      .to(this.lineSub, {
        width: "0",
        ease: "power4.inOut",
        duration: .5,
      }, "<")
      .to(this.textarea, {
        color: "#494949",
        ease: "power4.inOut",
        duration: .5,
      }, "<")
      .to(this.placeholder, {
        color: "#494949",
        ease: "power4.inOut",
        duration: .5,
      }, "<")

    this.timelineOnFocusoutWithoutAnimatedText
      .to(
        this.lineSub, {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.textarea, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");
  }
  init(data) {
    this.formTextareaField = this.create(data);
    this.textarea = this.formTextareaField.querySelector(".form-textarea-field__textarea");
    this.placeholder = this.formTextareaField.querySelector(".form-textarea-field__placeholder");
    this.lineSub = this.formTextareaField.querySelector(".form-textarea-field__line-sub");

    this.splitPlaceholder();
    this.placeholderLetters = this.formTextareaField.querySelectorAll(".form-textarea-field__placeholder-letter");

    this.initTimeline();
  }
  create(data) {
    const innerHTML = `
      <label for="${data.inputId}" class="form-textarea-field__label">${data.label}</label>
      <div class="form-textarea-field__textarea-wrapper">
        <span class="form-textarea-field__placeholder" data-title="${data.placeholder}"></span>
        <textarea class="form-textarea-field__textarea" name="${data.name}" type="text" id="${data.inputId}" required="" data-input></textarea>
      </div>
      <div class="form-textarea-field__line">
        <span class="form-textarea-field__line-sub"></span>
      </div>
    `;

    const formTextareaField = createDOM("div", { className: "form-textarea-field", innerHTML, id: data.id, attributes: [{ title: "data-input-field", value: true }] });

    return formTextareaField;
  }
  render() {
    return this.formTextareaField;
  }
}
