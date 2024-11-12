import HeaderModel from "./HeaderModel";
import HeaderView from "./HeaderView";
import HeaderController from "./HeaderController";
import "./header.scss";

export default class Header {
  constructor({ linksData }) {
    this.view = new HeaderView();
    this.model = new HeaderModel(this.view, linksData);
    this.controller = new HeaderController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
