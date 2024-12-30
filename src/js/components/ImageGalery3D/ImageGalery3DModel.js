export default class ImageGalery3DModel {
    constructor(view, data) {
      this.data = data;
      this.view = view;

      this.viewportSettings = {
        width: window.innerWidth,
        height: window.innerHeight,
        aspectRatio: window.innerWidth / window.innerHeight,
        frustumSize: 1,
      };

      this.position = {
        y: 0,
        normalizedY: 0,
      }
    }

    normalizePosition(position, scrollEnd) {
      return {
        normalizedY: -(position.y / scrollEnd) * 2 + 1,
      };
    }

    updatePosition(position, scrollEnd) {
      this.position.y = position.y;
      this.position.normalizedY = this.normalizePosition(position, scrollEnd).normalizedY;
      
      this.view.updatePosition(this.position);
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  