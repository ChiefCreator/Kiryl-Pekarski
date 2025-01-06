export default class CursorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.position = {
      x: 0,
      y: 0,
    };
    this.scrollValues = {
      lastX: 0,
      lastY: 0,
    };
    this.currentHoveredElement = null;

    this.animateBind = this.animate.bind(this);

    this.init();
  }

  // обновление позиции курсора
  animate() {
    const currentScrollX = window.scrollX;
    const currentScrollY = window.scrollY;

    this.position.x += currentScrollX - this.scrollValues.lastX;
    this.position.y += currentScrollY - this.scrollValues.lastY;

    this.scrollValues.lastX = currentScrollX;
    this.scrollValues.lastY = currentScrollY;

    this.model.updateMousePosition(this.position);
    this.model.updatePosition();

    requestAnimationFrame(this.animateBind);
  }

  // обработчики событий
  mousemoveHandler(event) {
    this.position.x = event.x + window.scrollX;
    this.position.y = event.y + window.scrollY;
  }
  mouseoverHandler(event) {
    if (this.currentHoveredElement) return;

    if (event.target.closest("[data-cursor='cursorForceGravity']")) {
      this.currentHoveredElement = event.target.closest("[data-cursor='cursorForceGravity']");

      const rect = this.currentHoveredElement.getBoundingClientRect();
      const hoveredElementRectObject = {
        centerX: rect.left + rect.width / 2 + window.scrollX,
        centerY: rect.top + rect.height / 2 + window.scrollY,
      }

      this.model.setHoveredElementRectObject(hoveredElementRectObject);
      this.model.setIsHoveringElement(true);
      this.model.animateRadiusScale(2);
    }
    if (event.target.closest("[data-cursor='cursorScale']")) {
      this.currentHoveredElement = event.target.closest("[data-cursor='cursorScale']");

      this.model.animateRadiusScale(2);
    }
    if (event.target.closest("[data-cursor='cursorEye']")) {
      this.currentHoveredElement = event.target.closest("[data-cursor='cursorEye']");

      this.model.animateEye(true, 2);
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentHoveredElement) return;

    let $relatedTarget = event.relatedTarget;

    while ($relatedTarget) {
      if ($relatedTarget === this.currentHoveredElement) return;
      $relatedTarget = $relatedTarget.parentElement;
    }

    if (event.target.closest("[data-cursor='cursorForceGravity']")) {
      this.model.setIsHoveringElement(false);
      this.model.animateRadiusScale(1);
    }
    else if (event.target.closest("[data-cursor='cursorScale']")) {
      this.model.animateRadiusScale(1);
    } else if (event.target.closest("[data-cursor='cursorEye']")) {
      this.model.animateEye(false, 1);
    }

    this.currentHoveredElement = null;
  }
  mouseenterDocumentHandler() {
    this.model.showCursor();
  }
  mouseleaveDocumentHandler() {
    this.model.hideCursor();
  }

  // инициализация
  addListeners() {
    document.addEventListener("mousemove", this.mousemoveHandler.bind(this));
    document.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    document.addEventListener("mouseout", this.mouseoutHandler.bind(this));
    document.addEventListener("mouseenter", this.mouseenterDocumentHandler.bind(this));
    document.addEventListener("mouseleave", this.mouseleaveDocumentHandler.bind(this));
  }
  init() {
    this.model.init();

    this.addListeners();
    this.animateBind();
  }
}
