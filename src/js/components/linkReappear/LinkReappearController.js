import gsap from "gsap";

export default class LinkReappearController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.timeline = gsap.timeline({ paused: true });
    this.currentElem = null;

    this.initTimeline();
    this.addListeners();
  }

  initTimeline() {
    this.timeline.add(this.animateLetter());
  }
  animateLetter() {
    this.view.letters.forEach(($letter) => {
      this.timeline.add(gsap.to($letter, {
        transform: `translate(0, -100%)`,
        duration: .5,
        ease: "power2.inOut",
      }), "<0.03")
    });
    return this.timeline;
  }
  addListeners() {
    this.view.link.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.view.link.addEventListener("mouseout", this.mouseoutHandler.bind(this));
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".link-reappear")) {
      this.currentElem = event.target.closest(".link-reappear");
      this.timeline.restart();
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

    this.timeline.reverse();

    this.currentElem = null;
  }
}
