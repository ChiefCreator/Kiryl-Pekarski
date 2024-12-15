import { createDOM } from "../../utils/domUtils";
import Container from "../container/Container";

export default class SliderControls {
  constructor() {
    this.sliderControls = this.create();
  }

  create() {
    const innerHTML = `
      <div class="slider-controls__container">
        <div class="slider-buttons-list slider-controls__buttons-list">
          <button class="slider-button slider-button_prev">
            <span class="slider-button__line"></span>
          </button>
          <button class="slider-button slider-button_next">
            <span class="slider-button__line"></span>
          </button>
        </div>
      </div>
    `;

    const container = new Container(innerHTML);
    const sliderControls = createDOM("div", { className: "slider-controls" });

    sliderControls.append(container.render());

    return sliderControls;
  }
  render() {
    return this.sliderControls;
  }
}
