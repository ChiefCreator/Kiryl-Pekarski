import DOMElementWatcher from "./../domElementWatcher/DOMElementWatcher";

export default class SliderController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  prevButtonClickHandler() {
    this.model.switchToPrevSlide();
  }
  nextButtonClickHandler() {
    this.model.switchToNextSlide();
  }

  addListeners() {
    this.view.buttonPrev.addEventListener("click", this.prevButtonClickHandler.bind(this));
    this.view.buttonNext.addEventListener("click", this.nextButtonClickHandler.bind(this));
  }
  init() {
    this.addListeners();

    this.watcherForSlider = new DOMElementWatcher({
      elements: this.view.slider,
      callback: () => {
        setTimeout(() => {
          this.model.setSliderRect();
          this.model.updatePositionOnInit();
        })
      }
    });
    this.watcherForSlider.startWatching();
  }
}
