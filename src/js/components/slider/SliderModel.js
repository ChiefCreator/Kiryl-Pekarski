export default class SliderModel {
    constructor(view, data) {
      this.view = view;
      this.data = data;

      this.slideCount = data.length;
      this.currentIndex = 0;
  
      this.init();
    }

    switchToPrevSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slideCount;
      this.view.updatePositionOnPrev(this.currentIndex, this.slideCount);
      this.updateBlob();
    }
    switchToNextSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
      this.view.updatePositionOnNext(this.currentIndex, this.slideCount);
      this.updateBlob();
    }

    setSliderRect() {
      this.view.setSliderRect();
    }
    updatePositionOnInit() {
      this.currentIndex = 0;
      this.view.updatePositionOnInit(this.currentIndex, this.slideCount);
      this.updateBlob();
    }
    updateBlob() {
      // this.currentBlobData = this.data[this.currentIndex].blobData;
      // this.view.updateBlob(this.currentBlobData);
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  