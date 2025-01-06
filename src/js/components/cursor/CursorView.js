import { createDOM } from "../../utils/domUtils";
import gsap from "gsap";

export default class CursorView {
  constructor() {
    this.cursor = null;

    this.timelineOfCircleRotation = gsap.timeline({ paused: true });
    this.timelineOfEyeBlinking = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1 });
    this.timelineOfEyeAnimation = gsap.timeline({ paused: true });
  }

  animateRadiusScale(radius) {
    gsap.to(this.circle, {
      duration: .5,
      attr: { r: radius },
      ease: "power4.inOut",
    });
  }
  animateEye(isAnimate, radius) {
    if (isAnimate) {
      gsap.to(this.circle, {
        duration: .5,
        attr: { r: radius },
        ease: "power4.inOut",
      });

      this.timelineOfCircleRotation.restart();
      this.timelineOfEyeBlinking.restart();
      this.timelineOfEyeAnimation.restart();
    }
    else {
      gsap.to(this.circle, {
        duration: .5,
        attr: { r: radius },
        delay: .5,
        ease: "power4.inOut",
      });

      this.timelineOfCircleRotation.pause();
      this.timelineOfEyeBlinking.pause();
      this.timelineOfEyeAnimation.reverse();
    }
  }
  showCursor() {
    this.cursor.classList.remove("cursor_hidden");
  }
  hideCursor() {
    this.cursor.classList.add("cursor_hidden");
  }
  updatePosition(position) {
    this.cursor.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }

  // инициализация
  initTimelines() {
    this.timelineOfCircleRotation
      .to(this.circle, {
        rotation: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        duration: 2,
        ease: "linear",
      }, 0)

    this.timelineOfEyeBlinking
      .to(this.eyeLid, {
        duration: .3,
        transform: "translateY(15px) scaleY(0)",
        ease: "ease-in",
      }, "blink")
      .to(this.eyeLid, {
        duration: .5,
        transform: "translateY(0) scaleY(1)",
        ease: "ease-out",
      }, "blink+=.5")
      .to(this.eye, {
        duration: 0.3,
        transform: "translateY(3px) scaleY(0.8)",
        ease: "ease-in",
      }, "blink")
      .to(this.eye, {
        duration: 0.5,
        transform: "none",
        ease: "ease-out",
      }, "blink+=.5");

    this.timelineOfEyeAnimation
      .to(this.circle, {
        strokeDasharray: "20 20",
        duration: 1,
        ease: "power4.inOut",
      }, 0)
      .to(this.eyeSvg, {
        opacity: 1,
        duration: .5,
        ease: "power4.inOut",
      }, "<")
  }
  init(size) {
    this.cursor = this.create(size);
    this.circleSvg = this.cursor.querySelector(".cursor__circle-svg");
    this.circle = this.cursor.querySelector(".cursor__circle");
    this.eyeSvg = this.cursor.querySelector(".cursor__eye-svg");
    this.eyeLid = this.cursor.querySelector("#lid");
    this.eye = this.cursor.querySelector("#eye");

    this.initTimelines();
  }
  create(size) {
    const innerHTML = `
      <div class="cursor__container">
        <div class="cursor__circle-container">
          <svg class="cursor__circle-svg">
            <circle class="cursor__circle" cx="${2 * size.radius}" cy="${2 * size.radius}" r="${size.radius - size.borderWidth}" stroke-width="${size.borderWidth}" />
          </svg>
        </div>
        <div class="cursor__eye-container">
          <svg class="cursor__eye-svg" viewBox="0 0 30 30" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z" id="outline"></path>
              <mask id="mask">
                <rect width="100%" height="100%" fill="white"></rect>
                <use xlink:href="#outline" id="lid" fill="black"/>
              </mask>
            </defs>
            <g id="eye">
              <path class="cursor__eye-path" d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z M14.9348958,22.081464 C11.2690863,22.081464 8.29688487,18.9510766 8.29688487,15.089434 C8.29688487,11.2277914 11.2690863,8.09740397 14.9348958,8.09740397 C18.6007053,8.09740397 21.5725924,11.2277914 21.5725924,15.089434 C21.5725924,18.9510766 18.6007053,22.081464 14.9348958,22.081464 L14.9348958,22.081464 Z M18.2535869,15.089434 C18.2535869,17.0200844 16.7673289,18.5857907 14.9348958,18.5857907 C13.1018339,18.5857907 11.6162048,17.0200844 11.6162048,15.089434 C11.6162048,13.1587835 13.1018339,11.593419 14.9348958,11.593419 C15.9253152,11.593419 14.3271242,14.3639878 14.9348958,15.089434 C15.451486,15.7055336 18.2535869,14.2027016 18.2535869,15.089434 L18.2535869,15.089434 Z"></path>
              <use class="cursor__eye-lid" xlink:href="#outline" mask="url(#mask)" />
            </g>
          </svg>
        </div>
      </div>
    `;

    return createDOM("div", { className: "cursor", innerHTML });
  }
  render() {
    return this.cursor;
  }
}
