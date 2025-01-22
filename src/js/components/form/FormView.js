import { createDOM } from "../../utils/domUtils";
// import FormField from "../formField/FormField";
import FormInputField from "../formField/FormInputField";
import FormTextareaField from "../formTextareaField/formTextareaField";
import FormCheckboxField from "../formCheckboxField/FormCheckboxField";
import ButtonSubmit from "../buttonSubmit/ButtonSubmit";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class FormView {
  constructor() {
    this.form = null;

    this.buttonSubmitObject = null;
    this.formInputFieldObjects = [];
    this.formTextareaFieldObject = null;
    this.formInputAndTextareaFieldObjects = [];
    this.checboxFieldObjects = [];

    this.timeLineOnScroll = null;
  }

  removeData() {
    this.formInputAndTextareaFieldObjects.forEach(fieldObject => {
      fieldObject.removeValue();
    });
    this.checboxFieldObjects.forEach(fieldObject => {
      fieldObject.removeData();
    });
  }
  removeError() {
    this.formInputFieldObjects.forEach(fieldObject => {
      fieldObject.removeError();
    })
  }

  initTimelineOnScroll(isNeedSplitText) {
    this.timeLineOnScroll = gsap.timeline({ 
      scrollTrigger: { 
        trigger: this.form,
        start: "top 80%",
        end: "+=500",
      } 
    });

    const timelineOfCheckboxFieldsAnimation = gsap.timeline();
    const timelineOfInputAnimation = gsap.timeline();
    const timelineOfButtonAnimation = gsap.timeline();
    
    this.checboxFieldObjects.forEach(checkboxFieldObject => {
      timelineOfCheckboxFieldsAnimation.add(checkboxFieldObject.getTimelineOfPageRender(isNeedSplitText), "<+=5%");
    });
    this.formInputAndTextareaFieldObjects.forEach(inputObject => {
      timelineOfInputAnimation.add(inputObject.getTimelineOfPageRender(isNeedSplitText), "<+=5%");
    });
    timelineOfButtonAnimation.add(this.buttonSubmitObject.getTimelineOfPageRender());

    this.timeLineOnScroll.add(timelineOfCheckboxFieldsAnimation, 0);
    this.timeLineOnScroll.add(timelineOfInputAnimation, 0);
    this.timeLineOnScroll.add(timelineOfButtonAnimation, 0);
  }
  initAnimations(isNeedSplitText) {
    this.initTimelineOnScroll(isNeedSplitText);
  }

  startButtonSubmitAnimation() {
    return this.buttonSubmitObject.startAnimation();
  }
  endButtonSubmitAnimation(result) {
    return this.buttonSubmitObject.endAnimation(result);
  }

  getData() {
    return new FormData(this.form);
  }

  init(fieldsData, textareaFieldData, checboxFieldsData) {
    this.form = this.create(fieldsData, textareaFieldData, checboxFieldsData);
    this.texarea = this.form.querySelector(".form-textarea-field");
  }
  create(fieldsData, textareaFieldData, checboxFieldsData) {
    const innerHTML = `
      <div class="form__container">
        <div class="form__checkbox-fields-list"></div>
        <div class="form__fields-list"></div>
        <div class="form__field-textarea-wrapper"></div>
        <div class="form__button-wrapper"></div>
      </div>
    `;

    const form = createDOM("form", { className: "form", innerHTML, attributes: [{ title: "action", value: "#" }, {title: "method", value: "post"}] });
    const fieldsList = form.querySelector(".form__fields-list");
    const textareaFieldWrapper = form.querySelector(".form__field-textarea-wrapper");
    const checkboxFieldsList = form.querySelector(".form__checkbox-fields-list");
    const buttonWrapper = form.querySelector(".form__button-wrapper");

    this.formInputFieldObjects = fieldsData.map((data) => new FormInputField({ data }));
    this.formTextareaFieldObject = new FormTextareaField({ data: textareaFieldData });
    this.checboxFieldObjects = checboxFieldsData.map((data, index) => new FormCheckboxField({ data: data, index }));
    this.buttonSubmitObject = new ButtonSubmit();

    this.formInputFieldObjects.forEach(inputFieldObject => {
      fieldsList.append(inputFieldObject.render());
    });
    textareaFieldWrapper.append(this.formTextareaFieldObject.render());
    this.checboxFieldObjects.forEach(field => {
      checkboxFieldsList.append(field.render());
    });  
    buttonWrapper.append(this.buttonSubmitObject.render());

    this.formInputAndTextareaFieldObjects = this.formInputFieldObjects.concat(this.formTextareaFieldObject);

    return form;
  }
  render() {
    return this.form;
  }
}
