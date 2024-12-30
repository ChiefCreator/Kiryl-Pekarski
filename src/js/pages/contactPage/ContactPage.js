import { createDOM } from "../../utils/domUtils";
import Container from "../../components/container/Container";
import Form from "../../components/form/Form";

import "./contact-page.scss";

export default class ContactPage {
  constructor() {
    this.id = "contact";
    this.title = "Связаться";

    this.formChecboxFieldsData = [
      {
        label: "Чем я могу помочь?",
        id: "checbox-field-service",
        checboxes: [
          {
            title: "Лендинг",
          },
          {
            title: "Интернет-магазин",
          },
          {
            title: "Дизайн",
          },
          {
            title: "Другое",
          },
        ],
      },
      {
        label: "Предполагаемый бюджет",
        id: "checbox-field-budget",
        checboxes: [
          {
            title: "<200 BYN",
          },
          {
            title: "200-400 BYN",
          },
          {
            title: "400-800 BYN",
          },
          {
            title: "800+ BYN",
          },
        ],
      },
      {
        label: "Количество страниц",
        id: "checbox-field-page-number",
        checboxes: [
          {
            title: "1-3",
          },
          {
            title: "3-6",
          },
          {
            title: "6-10",
          },
          {
            title: "10+",
          },
        ],
      },
    ];
    this.formFieldsData = [
      {
        id: "form-field-name",
        label: "Имя",
        placeholder: "Введите ваше имя",
        name: "input-name",
        inputId: "input-name"
      },
      {
        id: "form-field-email",
        label: "Почта",
        placeholder: "Введите вашу почту",
        name: "input-email",
        inputId: "input-email"
      }, 
    ];
    this.formTextareaFieldData = {
      id: "form-textarea-field-description",
      label: "Расскажите о своем проекте",
      placeholder: "Напишите сообщение",
      name: "textarea-description",
      inputId: "textarea-description"
    };

    this.page = this.create();
  }

  create() {
    const innerHTML = `
      <div class="app-contact__container">
        <article class="app-contact__introductory-content">
          <h1 class="app-contact__title">У Вас есть на примете какой-нибудь проект? <span class="app-contact__title-let-talk">Давайте поговорим.</span></h1>
          <p class="app-contact__description">Я всегда готов помочь! Если Вы заинтересованы в запуске нового проекта, доработке существующего сайта, поиске предложения или обсуждении возможного сотрудничества, не стесняйтесь обращаться ко мне!</p>
        </article>
        <article class="app-contact__form-wrapper">
          
        </article>
      </div>
    `;

    const container = new Container(innerHTML);
    const page = createDOM("main", { className: "app-contact" });

    page.append(container.render());

    const formWrapper = page.querySelector(".app-contact__form-wrapper");
    
    formWrapper.append(new Form({ fieldsData: this.formFieldsData, textareaFieldData: this.formTextareaFieldData, checboxFieldsData: this.formChecboxFieldsData }).render());

    return page;
  }
  render() {
    return this.page;
  }
}
