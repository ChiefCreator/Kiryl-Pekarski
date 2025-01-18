export default class DOMElementWatcher {
  constructor({ elements, selector, callback }) {
    this.elements = elements;
    this.selector = selector;
    this.renderedElements = new Set();
    this.callback = callback;
    this.observer = null;
  }

  setElements(elements) {
    this.elements = elements;
  }
  setCallback(callback) {
    this.callback = callback
  }
  clearRenderedElements() {
    this.renderedElements.clear();
  }

  checkIsSingleElement() {
    return this.elements instanceof HTMLElement;
  }
  checkIsSingleSelector() {
    return typeof this.selector === "string";
  }
  isRendered(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  startWatching() {
    if (this.checkIsSingleElement()) {
      this.watchDocumentForSingleElement();
    } else if (this.checkIsSingleSelector(this.selector)) {
      this.watchDocumentForElementsBySelector();
    } else {
      this.watchDocumentForArrElements();
    }

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  watchDocumentForSingleElement() {
    this.observer = new MutationObserver((mutation) => {
      if (this.elements && this.isRendered(this.elements)) {
        this.observer.disconnect();
        this.callback();
        this.stopWatching();
      }
    });
  }
  watchDocumentForArrElements() {
    this.clearRenderedElements();

    this.observer = new MutationObserver((mutation) => {
      this.elements.forEach((element) => {
        if (!this.renderedElements.has(element) && this.isRendered(element)) {
          this.renderedElements.add(element);
        }
      });

      if (this.renderedElements.size === this.elements.length) {
        this.callback(this.renderedElements);
        this.stopWatching();
      }
    });
  }
  watchDocumentForElementsBySelector() {
    this.clearRenderedElements();

    this.observer = new MutationObserver((mutation) => {
      const elements = document.querySelectorAll(this.selector);

      elements.forEach(element => {
        if (!this.renderedElements.has(element) && this.isRendered(element)) {
          this.renderedElements.add(element);
        }
      });

      if (this.renderedElements.size === elements.length && elements.length !== 0) {
        this.callback(this.renderedElements);
        this.stopWatching();
      }
    });
  }
  stopWatching() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}