export default class CursorModel {
  constructor(view, options) {
    this.view = view;

    this.settings = {
      inertia: .15,
    }
    this.size = {
      radius: options.radius,
      borderWidth: options.borderWidth,
    }
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.isHoveringElement = false;
  }

  setHoveredElementRectObject(hoveredElementRectObject) {
    this.hoveredElementRectObject = hoveredElementRectObject;
  }
  setIsHoveringElement(isHoveringElement) {
    this.isHoveringElement = isHoveringElement;
  }

  // анимация курсора
  animateRadiusScale(coefficient) {
    const radius = this.size.radius * coefficient - this.size.borderWidth;

    this.view.animateRadiusScale(radius);
  }
  animateEye(isAnimate, radiusCoefficient) {
    const radius = this.size.radius * radiusCoefficient - this.size.borderWidth;

    this.view.animateEye(isAnimate, radius);
  }
  showCursor() {
    this.view.showCursor();
  }
  hideCursor() {
    this.view.hideCursor();
  }

  // обновление позиции
  updatePosition() {
    this.updateCursorPosition();

    this.view.updatePosition(this.cursorPosition);
  }
  updateMousePosition(position) {
    this.mousePosition.x = position.x;
    this.mousePosition.y = position.y;
  }
  updateCursorPosition() {
    if (this.isHoveringElement) {

      const offsetXTargetCenter = (this.hoveredElementRectObject.centerX - this.mousePosition.x) / 3;
      const offsetYTargetCenter = (this.hoveredElementRectObject.centerY - this.mousePosition.y) / 3;

      this.cursorPosition.x += (this.hoveredElementRectObject.centerX - this.cursorPosition.x - this.size.radius - offsetXTargetCenter) * this.settings.inertia
      this.cursorPosition.y += (this.hoveredElementRectObject.centerY - this.cursorPosition.y - this.size.radius - offsetYTargetCenter) * this.settings.inertia;

      return;
    }

    this.cursorPosition.x += (this.mousePosition.x - this.cursorPosition.x - this.size.radius) * this.settings.inertia;
    this.cursorPosition.y += (this.mousePosition.y - this.cursorPosition.y - this.size.radius) * this.settings.inertia;
  }

  // инициализация
  init() {
    this.view.init(this.size);
  }
}
