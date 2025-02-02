import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

import DOMElementWatcher from "./../domElementWatcher/DOMElementWatcher";

export default class ButtonSubmitView {
  constructor() {
    this.button = null;
    this.rect = null;

    // основные анимации
    this.timelineOfLoadingAnimation = gsap.timeline({ paused: true });
    this.timelineOfGettingSuccess = gsap.timeline({ paused: true });
    this.timelineOfGettingError = gsap.timeline({ paused: true });

    // второстепенные анимации
    this.timelineAnimationOfTransformButtonToCircle = gsap.timeline({ paused: true });
    this.timelineAnimationOfDots = gsap.timeline({ paused: true });
    this.timelineAnimationOfDotsAppearance = gsap.timeline({ paused: true });
    this.timelineAnimationOfSuccess = gsap.timeline({ paused: true });
    this.timelineAnimationOfError = gsap.timeline({ paused: true });
    this.timelineOfPageRender = gsap.timeline({ onComplete: () => this.timelineOfPageRender.clear() });
  }

  getTimelineOfPageRender() {
    this.timelineOfPageRender
      .fromTo(this.button, 
        {
          transform: "translate(0, 100%)",
        },
        {
          transform: "translate(0, 0%)",
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )

    return this.timelineOfPageRender;
  }
  getRect() {
    return this.button.getBoundingClientRect();
  }

  startAnimation() {
    this.timelineOfLoadingAnimation.restart();
  }
  animateResult(result) {
    if (result === "success") {
      this.timelineOfGettingSuccess.restart();
    } else if (result === "error") {
      this.timelineOfGettingError.restart();
    }
  }

  getTimelineOfDotAnimation(dot) {
    const timeline = gsap.timeline({ repeat: -1 });

    timeline
      .to(
        dot,
        {
          transform: "translate(0, 50%)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        dot,
        {
          transform: "translate(0, -50%)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        ">"
      );

    return timeline;
  }

  // инициализация
  initSecondaryTimelines() {
    this.timelineAnimationOfTransformButtonToCircle
      .to(
        this.button,
        {
          width: this.rect.height,
          height: this.rect.height,
          borderRadius: "50%",
          duration: 0.5,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        this.titleVisible,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
        },
        0
      );

    this.timelineAnimationOfDotsAppearance.to(
      this.dots,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power4.inOut",
      },
      0
    );

    this.timelineAnimationOfDots.add(this.getTimelineOfDotAnimation(this.dots[0]), 0).add(this.getTimelineOfDotAnimation(this.dots[1]), 0.2).add(this.getTimelineOfDotAnimation(this.dots[2]), 0.4);

    this.timelineAnimationOfSuccess.to(
      this.iconSuccess,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power4.inOut",
      },
      0
    );

    this.timelineAnimationOfError.to(
      this.iconError,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power4.inOut",
      },
      0
    );
  }
  initMainTimelines() {
    this.timelineOfLoadingAnimation
      .add(() => this.timelineAnimationOfTransformButtonToCircle.restart(), 0)
      .add(() => this.timelineAnimationOfDotsAppearance.restart(), 0.1)
      .add(() => this.timelineAnimationOfDots.restart(), 0.1);

    this.timelineOfGettingSuccess
      .add(() => this.timelineAnimationOfDotsAppearance.reverse(), 0)
      .add(() => this.timelineAnimationOfDots.pause(), 0.2)
      .add(() => this.timelineAnimationOfSuccess.restart(), 0.5)
      .add(() => this.timelineAnimationOfSuccess.reverse(), 1.5)
      .add(() => this.timelineAnimationOfTransformButtonToCircle.reverse(), 2);

    this.timelineOfGettingError
      .add(() => this.timelineAnimationOfDotsAppearance.reverse(), 0)
      .add(() => this.timelineAnimationOfDots.pause(), 0.2)
      .add(() => this.timelineAnimationOfError.restart(), 0.5)
      .add(() => this.timelineAnimationOfError.reverse(), 1.5)
      .add(() => this.timelineAnimationOfTransformButtonToCircle.reverse(), 2);
  }
  initTimelines() {
    this.initSecondaryTimelines();
    this.initMainTimelines();
  }
  init() {
    this.button = this.create();
    this.titleVisible = this.button.querySelector(".button-submit__title_visible");
    this.dotsWrapper = this.button.querySelector(".button-submit__dots-wrapper");
    this.dots = this.button.querySelectorAll(".button-submit__dot");
    this.iconSuccess = this.button.querySelector(".button-submit__check");
    this.iconError = this.button.querySelector(".button-submit__cross");

    const watcher = new DOMElementWatcher({
      elements: this.button,
      callback: () => {
        this.rect = this.getRect();
        this.initTimelines();
      },
    });
    watcher.startWatching();
  }
  create() {
    const innerHTML = `
      <div class="button-submit__container">
        <div class="button-submit__title-wrapper">
          <span class="button-submit__title button-submit__title_invisible">Отправить</span>
          <span class="button-submit__title button-submit__title_visible">Отправить</span>
        </div>
        <div class="button-submit__dots-wrapper">
          <span class="button-submit__dot"></span>
          <span class="button-submit__dot"></span>
          <span class="button-submit__dot"></span>
        </div>
        <div class="button-submit__icon-wrapper">
          <svg class="button-submit__icon button-submit__icon_success" version="1.1" width="30px" height="30px" viewBox="0 0 64.5 37.4">
            <polyline class="button-submit__check" points="5,13 21.8,32.4 59.5,5 "></polyline>
          </svg>
          <svg class="button-submit__icon button-submit__icon_error" version="1.1" width="30px" height="30px" viewBox="0 0 52 52">
            <path class="button-submit__cross" fill="none" d="M16 16 36 36 M36 16 16 36" />
          </svg>
        </div>
      </div>
    `;

    return createDOM("button", {
      className: "button-submit",
      innerHTML,
      attributes: [
        { title: "type", value: "submit" },
        { title: "data-cursor", value: "cursorForceGravity" },
      ],
    });
  }
  render() {
    return this.button;
  }
}
