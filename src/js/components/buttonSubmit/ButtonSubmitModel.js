export default class ButtonSubmitModel {
    constructor(view) {
      this.view = view;
    }

    startAnimation() {
      this.view.startAnimation();
    }
    endAnimation(result) {
      this.view.animateResult(result);
    }
  
    init() {
      this.view.init();
    }
  }
  