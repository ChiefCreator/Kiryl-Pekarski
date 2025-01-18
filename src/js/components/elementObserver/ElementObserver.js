export default class ElementObserver {
  constructor({ target, timeout = 500, onAppear, onRender }) {
    this.target = target;
    this.timeout = timeout;
    this.onAppear = onAppear;
    this.onRender = onRender;

    this.observer = null;
    this.resizeObservers = [];

    this.appearedElements = new Set();
    this.renderedElements = new Set();
  }

  setTarget(target) {
    this.target = target;
  }
  setCallback(callback) {
    this.callback = callback;
  }
  clearElements(arr) {
    arr.clear();
  }

  checkIfTargetIsSingleElement() {
    return this.target instanceof HTMLElement;
  }
  checkIfTargetIsSelector() {
    return typeof this.target === "string";
  }

  isRendered(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  start() {
    if (this.checkIfTargetIsSingleElement()) {
      this.observeElement(this.target);
    } else if (this.checkIfTargetIsSelector()) {
      this.observeSelector(this.target);
    } else {
      this.observeElements(this.target);
    }

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  observeElement(element) {
    this.observer = new MutationObserver((mutation) => {
      if (element && element.getBoundingClientRect().width !== 0) {
        if (this.onAppear) this.onAppear({ elements: this.appearedElements });

        this.stop("onAppear");

        this.observeElementBoundingClientRect(element, 1);
      }
    });
  }
  observeElements(elements) {
    this.clearElements(this.appearedElements);

    this.observer = new MutationObserver((mutation) => {
      elements.forEach((element) => {
        if (!this.appearedElements.has(element) && element.getBoundingClientRect().width !== 0) {
          this.appearedElements.add(element);
        }
      });

      if (this.appearedElements.size === elements.length && elements.length !== 0) {
        if (this.onAppear) this.onAppear({ elements: this.appearedElements });

        this.stop("onAppear");

        this.clearElements(this.renderedElements);
        elements.forEach((element) => this.observeElementBoundingClientRect(element, elements.length));
      }
    });
  }
  observeSelector(selector) {
    this.clearElements(this.appearedElements);

    this.observer = new MutationObserver((mutation) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        if (!this.appearedElements.has(element) && element.getBoundingClientRect().width !== 0) {
          this.appearedElements.add(element);
        }
      });

      if (this.appearedElements.size === elements.length && elements.length !== 0) {
        if (this.onAppear) this.onAppear({ elements: this.appearedElements });

        this.stop("onAppear");

        this.clearElements(this.renderedElements);
        elements.forEach((element) => this.observeElementBoundingClientRect(element, elements.length));
      }
    });
  }
  observeElementBoundingClientRect(element, elementAmount) {
    let timeoutId;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.contentRect;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          this.renderedElements.add(element);

          if (this.renderedElements.size === elementAmount && elementAmount !== 0) {
            if (this.onRender) this.onRender({ elements: this.renderedElements });
          }

          this.stop("onRender");
        }, this.timeout);
      });
    });

    resizeObserver.observe(element);
    this.resizeObservers.push(resizeObserver);
  }

  stop(observingStage) {
    if (observingStage === "onAppear") {
      if (!this.observer) return;

      this.observer.disconnect();
      this.observer = null;
    } else if (observingStage === "onRender") {
      if (!this.resizeObservers.length) return;

      this.resizeObservers.forEach((observer) => observer.disconnect());
      this.resizeObservers = [];
    }
  }
}
