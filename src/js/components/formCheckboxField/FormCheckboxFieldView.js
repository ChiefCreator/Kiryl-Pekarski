import { createDOM } from "../../utils/domUtils";
import Checkbox from "./Checkbox";

import { getAnimateTextTimeline } from "../../utils/animateUtils";

import gsap from "gsap";

export default class FormCheckboxFieldView {
  constructor() {
    this.checkboxField = null;
    this.lineSub = null;

    this.checkboxObjects = [];
    this.activeCheckboxes = [];

    this.timelineOfPageRender = gsap.timeline({ onComplete: () => this.timelineOfPageRender.clear() });
  }

  getTimelineOfCheckboxesAppearance() {
    const timeline = gsap.timeline();

    this.checkboxObjects.forEach(checkboxObject => {
      timeline.add(checkboxObject.getTimelineOfAppearance(), "<+10%");
    });

    return timeline;
  }
  getTimelineOfPageRender(isNeedSplitText) {
    this.timelineOfPageRender
      .add(getAnimateTextTimeline(this.label, isNeedSplitText), 0)
      .fromTo(this.line,
        {
          width: 0,
        },
        {
          width: "100%",
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<+50%"
      )
      .add(this.getTimelineOfCheckboxesAppearance(), ">")

    return this.timelineOfPageRender;
  }

  updateCheckbox(checkboxIndex) {
    this.checkboxObjects.forEach((checkboxObject) => {
      if (this.checkboxObjects[checkboxIndex] === checkboxObject) return;
      checkboxObject.setStatus(false);
    });

    const checkbox = this.checkboxObjects[checkboxIndex];
    checkbox.toggleStatus();
  }
  sortActiveCheckboxesByIndex() {
    return this.checkboxObjects.sort((a, b) => a.getIndex() - b.getIndex());
  }

  // инициализация
  init(data, index) {
    this.checkboxField = this.create(data, index);
    this.label = this.checkboxField.querySelector(".form-checkbox-field__label");
    this.line = this.checkboxField.querySelector(".form-checkbox-field__line");
    this.lineSub = this.checkboxField.querySelector(".form-checkbox-field__line-sub");
  }
  create(data, index) {
    const innerHTML = `
      <label class="form-checkbox-field__label">${data.label}</label>
      <ul class="form-checkbox-field__list"></ul>
      <div class="form-checkbox-field__line">
        <span class="form-checkbox-field__line-sub"></span>
      </div>
    `;

    const checkboxField = createDOM("fieldset", {
      className: "form-checkbox-field",
      innerHTML,
      id: data.id,
      attributes: [
        { title: "data-checkbox-field", value: true },
        { title: "data-index", value: index },
      ],
    });
    const list = checkboxField.querySelector(".form-checkbox-field__list");

    data.checkboxes.forEach((data, i) => {
      const checkboxWrapper = createDOM("li", { className: "form-checkbox-field__li" });
      const checkbox = new Checkbox({ data: data, index: i });

      this.checkboxObjects.push(checkbox);

      checkboxWrapper.append(checkbox.render());
      list.append(checkboxWrapper);
    });

    return checkboxField;
  }
  render() {
    return this.checkboxField;
  }
}
