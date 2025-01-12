export default class AppModel {
  constructor(view) {
    this.view = view;

    this.listenersOfGettingScrollingSpeed = [];
    this.speedOfScrolledPixelsObj = {
      lastPosition: window.scrollY || window.pageYOffset,
      lastTimestamp: Date.now(),
      speed: 0,
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
    this.view.renderContent(pageId);
  }
}
