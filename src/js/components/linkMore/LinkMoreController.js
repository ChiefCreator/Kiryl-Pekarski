import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateElementOnScroll } from "./../../utils/animateOnScrollUtils";

gsap.registerPlugin(ScrollTrigger);

export default class LinkMoreController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.timeline = gsap.timeline({ paused: true });
    this.currentElem = null;

    this.addListeners();
  }

  addListeners() {
    this.view.link.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.view.link.addEventListener("mouseout", this.mouseoutHandler.bind(this));

    animateElementOnScroll(this.view.link, {
      events: {
        onEnter: () => {
          this.view.timelineOfArrow.restart()
        }
      }
    });
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".link-more")) {
      this.currentElem = event.target.closest(".link-more");

      this.view.isTimelineOfLetterAppearanceAnimating = true;

      this.view.timelineOfArrow.restart();
      gsap.delayedCall(.5, () => this.view.timelineOfLetterAppearance.restart());
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentElem) return;

    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentElem) return;
      relatedTarget = relatedTarget.parentElement;
    }

    this.view.timelineOfLetterAppearance.reverse();

    this.currentElem = null;
  }
}
