import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

import { splitTextOnLetters } from "../../utils/domUtils";
import { getAnimateTextTimeline } from "../../utils/animateUtils";

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
    this.timelineOfPageRender = gsap.timeline({ onComplete: () => this.timelineOfPageRender.clear() });
  }

  removeValue() {
    this.input.value = "";
    this.timelineOnFocusout.restart();
  }

  getTimelineOfPageRender(isNeedSplitText) {
    this.timelineOfPageRender
      .add(getAnimateTextTimeline(this.label, isNeedSplitText))
      .fromTo(this.line,
        {
          width: 0,
        },
        {
          width: "100%",
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<+50%"
      )
      .add(this.animateLetters({
        letters: this.placeholderLetters,
        gsapAction: "fromTo",
        initialProps: {
          transform: `translate(0, 100%)`,
        },
        animatedProps: {
          transform: `translate(0, 0)`,
          duration: 0.5,
          ease: "power2.inOut",
        },
      }), "<");

    return this.timelineOfPageRender;
  }

  animateLetters({ letters, gsapAction = "to", animatedProps, initialProps }) {
    const timeline = gsap.timeline();

    letters.forEach(($letter) => {
      if (gsapAction === "to") {
        timeline.add(gsap.to($letter, animatedProps), "<0.03")
      } else {
        timeline.add(gsap.from($letter, initialProps, animatedProps), "<0.03")
      }
    });

    return timeline;
  }

  // инициализация
  initTimeline() {
    this.timelineOfShowText.add(this.animateLetters({
      letters: this.placeholderLetters,
      gsapAction: "to",
      animatedProps: {
        transform: `translate(0, 0)`,
        duration: 0.5,
        ease: "power2.inOut",
      }
    }), 0);
    this.timelineOfHideText.add(this.animateLetters({
      letters: this.placeholderLetters,
      gsapAction: "to",
      animatedProps: {
        transform: `translate(0, -100%)`,
        duration: 0.5,
        ease: "power2.inOut",
      }
    }), 0);

    this.timelineOnMouseover
      .to(this.lineSub, {
        width: "100%",
        ease: "power4.inOut",
        duration: 0.5,
      })
      .to(
        this.lineSub, {
          backgroundColor: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-contrast)",
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
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
      }, "<");

    this.timelineOnFocusin
      .add(this.animateLetters({
        letters: this.placeholderLetters,
        gsapAction: "to",
        animatedProps: {
          transform: `translate(0, -100%)`,
          duration: 0.5,
          ease: "power2.inOut",
        }
      }), 0)
      .to(
        this.lineSub, {
          width: "100%",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");

    this.timelineOnFocusout
      .add(this.animateLetters({
        letters: this.placeholderLetters,
        gsapAction: "to",
        animatedProps: {
          transform: `translate(0, 0)`,
          duration: 0.5,
          ease: "power2.inOut",
        },
      }), 0)
      .to(
        this.lineSub, {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(
        this.lineSub, {
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-additional)",
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
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-additional)",
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
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.input, {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<")
      .to(this.placeholder, {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        }, "<");
  }
  init(data) {
    this.formInputField = this.create(data);
    this.label = this.formInputField.querySelector(".form-input-field__label");
    this.input = this.formInputField.querySelector(".form-input-field__input");
    this.placeholder = this.formInputField.querySelector(".form-input-field__placeholder");
    this.line = this.formInputField.querySelector(".form-input-field__line");
    this.lineSub = this.formInputField.querySelector(".form-input-field__line-sub");

    splitTextOnLetters(this.placeholder);

    this.placeholderLetters = this.placeholder.querySelectorAll(".split-text__letter");

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
