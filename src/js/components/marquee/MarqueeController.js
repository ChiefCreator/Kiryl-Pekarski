import DOMElementWatcher from "./../domElementWatcher/DOMElementWatcher";

export default class MarqueeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.updateMovingBind = this.updateMoving.bind(this);

    this.animationMovingId = null;

    this.currentHoveredItem = null;

    this.init();
  }

  updateMoving() {
    this.model.updateMoving();

    this.animationMovingId = requestAnimationFrame(this.updateMovingBind);
  }

  initRowsData() {
    const rowsData = [];

    this.view.rows.forEach((row) => {
      const blockFirst = row.firstElementChild;
      const blockSecond = row.lastElementChild;

      const blockFirstRect = blockFirst.getBoundingClientRect();
      const blockSecondRect = blockSecond.getBoundingClientRect();

      const rowData = {
        direction: row.dataset.direction,
        speed: row.dataset.direction === "left" ? -2 : 2,
        blocksData: [
          {
            posX: 0,
            width: blockFirstRect.width,
            leftLimit: -blockFirstRect.width,
            rightLimit: blockFirstRect.width,
            startPosLeft: blockFirstRect.width,
            startPosRight: -blockFirstRect.width,
          },
          {
            posX: 0,
            width: blockSecondRect.width,
            leftLimit: -blockSecondRect.width * 2,
            rightLimit: 0,
            startPosLeft: 0,
            startPosRight: -blockSecondRect.width * 2,
          },
        ],
      }

      rowsData.push(rowData);
    });

    this.model.initRowsData(rowsData);
  }

  // handlers
  mouseDownHandler(event) {
    event.preventDefault();

    let prevCursorX = event.pageX;

    const mouseMoveDragHandlerBind = mouseMoveDragHandler.bind(this);
    const mouseUpDragHandlerBind = mouseUpDragHandler.bind(this);

    document.addEventListener("mousemove", mouseMoveDragHandlerBind);
    document.addEventListener("mouseup", mouseUpDragHandlerBind);
    this.view.marquee.ondragstart = () => { return false };

    cancelAnimationFrame(this.animationMovingId);

    function mouseMoveDragHandler(event) {
      let currentCursorX = event.pageX;
      let deltaCursorX = currentCursorX - prevCursorX;

      this.model.updateMovingOnMousemove(deltaCursorX);

      prevCursorX = currentCursorX;
    }
    function mouseUpDragHandler() {
      document.removeEventListener("mousemove", mouseMoveDragHandlerBind);
      document.removeEventListener("mouseup", mouseUpDragHandlerBind);

      this.animationMovingId = requestAnimationFrame(this.updateMovingBind);
    }
  }
  mouseoverHandler(event) {
    if (this.currentHoveredItem) return;

    if (event.target.closest(".marquee-item")) {
      this.currentHoveredItem = event.target.closest(".marquee-item");
      this.currentHoveredItem.classList.add("marquee-item_active");
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentHoveredItem) return;

    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentHoveredItem) return;
      relatedTarget = relatedTarget.parentElement;
    }

    this.currentHoveredItem.classList.remove("marquee-item_active");

    this.currentHoveredItem = null;
  }

  // инициализация
  addListeners() {
    this.view.marquee.addEventListener("mousedown", this.mouseDownHandler.bind(this));
    this.view.marquee.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.view.marquee.addEventListener("mouseout", this.mouseoutHandler.bind(this));
  }
  init() {
    this.model.init();

    const watcher = new DOMElementWatcher({
      elements: this.view.blocks,
      callback: () => {
        setTimeout(() => {
          this.initRowsData();

          this.animationMovingId = requestAnimationFrame(this.updateMovingBind);
        }, 1000)
      }
    });
    watcher.startWatching();

    this.addListeners();
  }
}
