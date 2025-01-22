import FooterModel from "./FooterModel";
import FooterView from "./FooterView";
import FooterController from "./FooterController";
import "./footer.scss";

export default class Footer {
  constructor() {
    this.view = new FooterView();
    this.model = new FooterModel(this.view);
    this.controller = new FooterController(this.model, this.view);
  }

  initAnimations() {
    this.controller.initAnimations();
  }

  render() {
    return this.view.render();
  }
}
