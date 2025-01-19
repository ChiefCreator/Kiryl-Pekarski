export default class AppModel {
  constructor(view) {
    this.view = view;

    this.history = [];
    this.currentPage = null;
    this.prevPage = null;

    // скорость прокрученных пикселей
    this.listenersOfGettingScrollingSpeed = [];
    this.speedOfScrolledPixelsObj = {
      lastPosition: window.scrollY || window.pageYOffset,
      lastTimestamp: Date.now(),
      speed: 0,
    }

    // включение и отключение скролла
    this.scrollOptions = {
      isOpen: true,
    };
  }

  toggleScroll(action) {
    switch(action) {
      case "hide":
        if (!this.scrollOptions.isOpen) return;
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        this.view.hideScroll(scrollWidth);
        this.scrollOptions.isOpen = false;
        break;
      case "open":
        if (this.scrollOptions.isOpen) return;
        this.view.openScroll();
        this.scrollOptions.isOpen = true;
        break;
    }
  }

  updateSpeedOfScrolledPixels() {
    const currentPosition = window.scrollY || window.pageYOffset;
    const currentTime = Date.now();

    const distance = currentPosition - this.speedOfScrolledPixelsObj.lastPosition;
    const timeElapsed = currentTime - this.speedOfScrolledPixelsObj.lastTimestamp;

    if (timeElapsed === 0) return;

    this.speedOfScrolledPixelsObj.speed = distance / timeElapsed;

    this.speedOfScrolledPixelsObj.lastPosition = currentPosition;
    this.speedOfScrolledPixelsObj.lastTimestamp = currentTime;

    this.notifyListenersOfGettingScrollingSpeed();
  }
  notifyListenersOfGettingScrollingSpeed() {
    this.listenersOfGettingScrollingSpeed.forEach(callback => callback(this.speedOfScrolledPixelsObj.speed));
  }

  updateState(pageId) {
    this.history.push(pageId);
    this.currentPage = pageId;
    this.prevPage = this.history.length > 1 ? this.history[this.history.length - 2] : null;

    this.view.renderContent(this.currentPage, this.prevPage, window.innerWidth - document.documentElement.clientWidth);
  }
}
