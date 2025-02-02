import { createDOM } from "../../utils/domUtils";
import Container from "../../components/container/Container";
import Form from "../../components/form/Form";
import ElementObserver from "../../components/elementObserver/ElementObserver";

import { animateTextOnScroll } from "../../utils/animateOnScrollUtils";

import formData from "../../data/formData";

import "./contact-page.scss";

export default class ContactPage {
  constructor() {
    this.id = "contact";
    this.title = "Связаться";
    this.countOfRenders = 0;

    this.formChecboxFieldsData = formData.checboxFieldsData;
    this.formFieldsData = formData.inputFieldsData;
    this.formTextareaFieldData = formData.textareaFieldData;

    this.formObject = new Form({ fieldsData: this.formFieldsData, textareaFieldData: this.formTextareaFieldData, checboxFieldsData: this.formChecboxFieldsData, page: this });

    this.page = null;

    this.init();
  }

  updateCountOfRenders() {
    this.countOfRenders++;
  }
  isRenderedMoreThanOneTime() {
    return this.countOfRenders > 1;
  }

  stopAnimations() {
    this.formObject.reset();
  }

  onLoad(callbackOnLoad) {
    new ElementObserver({
      target: [this.page.querySelector(".form"), ...this.page.querySelectorAll("[data-text-animated-on-scroll]")],
      onRender: () => {
        const isNeedSplitText = !this.isRenderedMoreThanOneTime();

        this.formObject.initAnimations(isNeedSplitText);

        this.textsAnimatedOnScroll.forEach((text) => animateTextOnScroll(text, isNeedSplitText));

        callbackOnLoad();
      },
    }).start();
  }
  init() {
    this.page = this.create();
    this.textsAnimatedOnScroll = this.page.querySelectorAll("[data-text-animated-on-scroll]");
  }
  create() {
    const innerHTML = `
      <div class="app-contact__container">
        <article class="app-contact__introductory-content">
          <h1 class="app-contact__title" data-text-animated-on-scroll data-text-animated-on-scroll-target="app-contact">У Вас есть на примете какой-нибудь проект? <span class="app-contact__title-let-talk">Давайте поговорим.</span></h1>
          <p class="app-contact__description" data-text-animated-on-scroll data-text-animated-on-scroll-target="app-contact">Я всегда готов помочь! Если Вы заинтересованы в запуске нового проекта, доработке существующего сайта, поиске предложения или обсуждении возможного сотрудничества, не стесняйтесь обращаться ко мне!</p>
        </article>
        <article class="app-contact__form-wrapper">
          
        </article>
      </div>
    `;

    const container = new Container(innerHTML);
    const page = createDOM("main", { className: "app-contact", id: "app-contact" });

    page.append(container.render());

    const formWrapper = page.querySelector(".app-contact__form-wrapper");

    formWrapper.append(this.formObject.render());

    return page;
  }
  render() {
    return this.page;
  }
}
