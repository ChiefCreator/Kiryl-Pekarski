import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

import { splitTextOnLetters } from "../../utils/domUtils";
import { splitTextOnLines } from "../../utils/domUtils";
import { getAnimateTextTimeline } from "../../utils/animateUtils";

export default class FormTextareaFieldView {
  constructor() {
    this.formTextareaField = null;
    this.textarea = null;
    this.placeholder = null;
    this.lineSub = null;

    this.timelineOnMouseover = gsap.timeline({ paused: true });
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
    this.textarea.value = "";
    this.timelineOnFocusout.restart();
  }

  getTimelineOfPageRender(isNeedSplitText) {
    this.timelineOfPageRender
      .add(getAnimateTextTimeline(this.label, isNeedSplitText))
      .fromTo(
        this.line,
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
      .add(
        this.animateLetters({
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
        }),
        "<"
      );

    return this.timelineOfPageRender;
  }

  animateLetters({ letters, gsapAction = "to", animatedProps, initialProps }) {
    const timeline = gsap.timeline();

    letters.forEach(($letter) => {
      if (gsapAction === "to") {
        timeline.add(gsap.to($letter, animatedProps), "<0.03")
      } else if (gsapAction === "fromTo") {
        timeline.add(gsap.fromTo($letter, initialProps, animatedProps), "<0.03")
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
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.textarea,
        {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

    this.timelineOnMouseout
      .to(this.lineSub, {
        width: "0%",
        ease: "power4.inOut",
        duration: 0.5,
      })
      .to(
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.textarea,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

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
        this.lineSub,
        {
          width: "100%",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.textarea,
        {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-contrast)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

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
        this.lineSub,
        {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.textarea,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

    this.timelineOnFocusoutWithoutAnimatedText
      .to(
        this.lineSub,
        {
          width: "0",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.textarea,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

    this.timelineOfValidationError
      .to(
        this.lineSub,
        {
          width: "100%",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.lineSub,
        {
          backgroundColor: "red",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.input,
        {
          color: "red",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "red",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );

    this.timelineOfValidationSuccess
      .to(
        this.lineSub,
        {
          backgroundColor: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.input,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      )
      .to(
        this.placeholder,
        {
          color: "var(--color-neutral-additional)",
          ease: "power4.inOut",
          duration: 0.5,
        },
        "<"
      );
  }
  init(data) {
    this.formTextareaField = this.create(data);
    this.label = this.formTextareaField.querySelector(".form-textarea-field__label");
    this.textarea = this.formTextareaField.querySelector(".form-textarea-field__textarea");
    this.placeholder = this.formTextareaField.querySelector(".form-textarea-field__placeholder");
    this.line = this.formTextareaField.querySelector(".form-textarea-field__line");
    this.lineSub = this.formTextareaField.querySelector(".form-textarea-field__line-sub");

    splitTextOnLetters(this.placeholder);

    this.placeholderLetters = this.formTextareaField.querySelectorAll(".split-text__letter");

    this.initTimeline();
  }
  create(data) {
    const innerHTML = `
      <label for="${data.inputId}" class="form-textarea-field__label">${data.label}</label>
      <div class="form-textarea-field__textarea-wrapper" data-cursor="cursorScale">
        <span class="form-textarea-field__placeholder" data-title="${data.placeholder}"></span>
        <textarea class="form-textarea-field__textarea" name="${data.name}" type="text" id="${data.inputId}" data-input></textarea>
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
