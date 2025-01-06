import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

export default class FormInputFieldView {
  constructor() {
    this.formInputField = null;
    this.input = null;
    this.placeholder = null;
    this.lineSub = null;

    this.placeholderLetters = [];

    this.timelineOnMouseover = gsap.timeline({ paused: true });
    this.timelineOnMouseoverOnError = gsap.timeline({ paused: true });
    this.timelineOnMouseout = gsap.timeline({ paused: true });
    this.timelineOnFocusin = gsap.timeline({ paused: true });
    this.timelineOnFocusout = gsap.timeline({ paused: true });
    this.timelineOnFocusoutWithoutAnimatedText = gsap.timeline({ paused: true });
    this.timelineOfShowText = gsap.timeline({ paused: true });
    this.timelineOfHideText = gsap.timeline({ paused: true });
    this.timelineOfValidationError = gsap.timeline({ paused: true });
    this.timelineOfValidationSuccess = gsap.timeline({ paused: true });
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
      $word.classList.add("form-input-field__placeholder-word");

      Array.from(word).forEach((letter) => {
        const $letter = document.createElement("span");
        $letter.classList.add("form-input-field__placeholder-letter");
        $letter.textContent = letter;
        $letter.dataset.letter = letter;
        $word.append($letter);
      });

      this.placeholder.append($word);

      if (index < arr.length - 1) {
        const $space = document.createElement("span");
        $space.classList.add("form-input-field__placeholder-space");
        $space.textContent = " ";
        $space.dataset.letter = " ";
        this.placeholder.append($space);
      }
    });
  }

  // инициализация
  initTimeline() {
    this.timelineOfShowText.add(this.animateLetters({
      transform: `translate(0, 0)`,
      duration: 0.5,
      ease: "power2.inOut",
    }), 0);
    this.timelineOfHideText.add(this.animateLetters({
      transform: `translate(0, -100%)`,
      duration: 0.5,
      ease: "power2.inOut",
    }), 0);

    this.timelineOnMouseover
      .to(this.lineSub, {
        width: "100%",
        ease: "power4.inOut",
        duration: 0.5,
      })
      .to(
        this.lineSub, {
          backgroundColor: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<")
      .to(this.placeholder, {
          color: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<");

    this.timelineOnMouseout
      .to(this.lineSub, {
        width: "0%",
        ease: "power4.inOut",
        duration: 0.5,
      })
      .to(this.lineSub, {
          backgroundColor: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<")
      .to(this.placeholder, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<");

    this.timelineOnFocusin
      .add(this.animateLetters(
        {
          transform: `translate(0, -100%)`,
          duration: 0.5,
          ease: "power2.inOut",
        }
      ), 0)
      .to(
        this.lineSub, {
          width: "100%",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "#f0f0f0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");

    this.timelineOnFocusout
      .add(this.animateLetters({
          transform: `translate(0, 0)`,
          duration: 0.5,
          ease: "power2.inOut",
        }), 0)
      .to(
        this.lineSub, {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");

    this.timelineOnFocusoutWithoutAnimatedText
      .to(
        this.lineSub, {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "red",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");

    this.timelineOfValidationError
      .to(
        this.lineSub, {
          width: "100%",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "red",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "red",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "red",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");

    this.timelineOfValidationSuccess
      .to(
        this.lineSub, {
          backgroundColor: "#494949",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
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
    this.formInputField = this.create(data);
    this.input = this.formInputField.querySelector(".form-input-field__input");
    this.placeholder = this.formInputField.querySelector(".form-input-field__placeholder");
    this.lineSub = this.formInputField.querySelector(".form-input-field__line-sub");

    this.splitPlaceholder();
    this.placeholderLetters = this.formInputField.querySelectorAll(".form-input-field__placeholder-letter");

    this.initTimeline();
  }
  create(options) {
    const innerHTML = `
      <label for="${options.inputId}" class="form-input-field__label">${options.label}</label>
      <div class="form-input-field__input-wrapper" data-cursor="cursorScale">
        <span class="form-input-field__placeholder" data-title="${options.placeholder}"></span>
        <input class="form-input-field__input" name="${options.name}" type="text" id="${options.inputId}" data-input>
      </div>
      <div class="form-input-field__line">
        <span class="form-input-field__line-sub"></span>
      </div>
    `;

    return createDOM("fieldset", { className: `form-input-field ${options.className}`, innerHTML, id: options.id, attributes: [{ title: "data-input-field", value: true }] });
  }
  render() {
    return this.formInputField;
  }
}
