import MarqueeModel from "./MarqueeModel";
import MarqueeView from "./MarqueeView";
import MarqueeController from "./MarqueeController";
import "./marquee.scss";

export default class Marquee {
  constructor({ data, rowsCount, app }) {
    this.view = new MarqueeView();
    this.model = new MarqueeModel(this.view, data, rowsCount, app);
    this.controller = new  MarqueeController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}