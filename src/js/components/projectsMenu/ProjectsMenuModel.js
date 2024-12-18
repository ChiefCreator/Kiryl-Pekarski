import projectsData from "../../data/projectsData";

export default class ProjectsMenuModel {
    constructor(view) {
      this.view = view;
      this.data = projectsData;
    }

    updateMenuListPosition(position) {
      this.view.updateMenuListPosition(position);
    }
    setIllustrationTexture(texture) {
      this.view.setIllustrationTexture(texture);
    }
    setScaleOfIllustrtation(scale) {
      this.view.setScaleOfIllustrtation(scale);
    }
    updateIllustration(illustrationData) {
      this.view.updateIllustration(illustrationData);
    }
  
    init() {
      this.view.init(this.data);
    }
  }
  