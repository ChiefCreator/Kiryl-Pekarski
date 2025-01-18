import projectsData from "../../data/projectsData";

export default class MenuModel {
    constructor(view, linksData) {
      this.view = view;
      this.linksData = linksData;
      this.data = projectsData;
    }

    updateMenuListPosition(position) {
      this.view.updateMenuListPosition(position);
    }
    setIllustrationTexture(texture) {
      this.view.setIllustrationTexture(texture);
    }
    showIllustrtation() {
      this.view.showIllustrtation();
    }
    hideIllustrtation() {
      this.view.hideIllustrtation();
    }
    updateIllustration(illustrationData) {
      this.view.updateIllustration(illustrationData);
    }
  
    init() {
      this.view.init(this.data, this.linksData);
    }
  }
  