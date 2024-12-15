import SliderModel from "./SliderModel";
import SliderView from "./SliderView";
import SliderController from "./SliderController";
import "./slider.scss";

export default class Slider {
  constructor({ data }) {
    this.view = new SliderView();
    this.model = new SliderModel(this.view, data);
    this.controller = new SliderController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
