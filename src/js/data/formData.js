const formData = {
  checboxFieldsData: [
    {
      name: "service",
      label: "Чем я могу помочь?",
      id: "checbox-field-service",
      checkboxes: [
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
      name: "budget",
      label: "Предполагаемый бюджет",
      id: "checbox-field-budget",
      checkboxes: [
        {
          title: "<100 $",
        },
        {
          title: "100-200 $",
        },
        {
          title: "200-400 $",
        },
        {
          title: "400+ $",
        },
      ],
    },
    {
      name: "pageNumber",
      label: "Количество страниц",
      id: "checbox-field-page-number",
      checkboxes: [
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
  ],
  inputFieldsData: [
    {
      id: "form-field-name",
      label: "Имя",
      placeholder: "Введите ваше имя",
      name: "name",
      inputId: "input-name",
    },
    {
      id: "form-field-email",
      label: "Почта",
      placeholder: "Введите вашу почту",
      name: "mail",
      inputId: "input-email",
    },
  ],
  textareaFieldData: {
    id: "form-textarea-field-description",
    label: "Расскажите о своем проекте",
    placeholder: "Напишите сообщение",
    name: "description",
    inputId: "textarea-description",
  },
};

export default formData;
