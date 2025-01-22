import HeaderSectionModel from "./HeaderSectionModel";
import HeaderSectionView from "./HeaderSectionView";
import HeaderSectionController from "./HeaderSectionController";
import "./header-section.scss";

export default class HeaderSection {
  constructor({ data }) {
    this.view = new HeaderSectionView();
    this.model = new HeaderSectionModel(this.view, data);
    this.controller = new HeaderSectionController(this.model, this.view);
  }

  initAnimations() {
    this.controller.initAnimations();
  }

  render() {
    return this.view.render();
  }
}
