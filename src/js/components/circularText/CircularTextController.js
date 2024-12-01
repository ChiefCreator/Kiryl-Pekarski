import gsap from "gsap";

export default class CircularTextController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  initRotateAnimation() {
    let angle = 0;

    const animateRotation = () => {
      if (angle > 360) angle = 0;
      angle += 0.5;

      this.view.svg.style.transform = `rotate(${angle}deg)`;

      requestAnimationFrame(animateRotation.bind(this));
    };
    animateRotation();
  }
  mousemoveHandler(event) {
    const mouse = {
      x: event.clientX,
      y: event.clientY,
    };
    const normalizedMouse = {
      x: 2 * (mouse.x / window.innerWidth - 0.5),
      y: 2 * (1 - mouse.y / window.innerHeight - 0.5),
    };

    this.view.circularText.style.transform = `translate(${normalizedMouse.x * 10}px, ${-normalizedMouse.y * 10}px)`;
  }
  addListeners() {
    window.addEventListener("mousemove", this.mousemoveHandler.bind(this));
  }
  init() {
    this.model.init();

    this.initRotateAnimation();
    this.addListeners();
  }
}
