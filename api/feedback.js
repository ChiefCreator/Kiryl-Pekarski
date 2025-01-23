import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formChecboxFieldsData = [
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
    ];

    class HTMLMessageResponsePage {
      constructor(userData) {
        this.page = null;

        this.init(userData);
      }

      init(userData) {
        this.page = this.create(userData);
      }
      create(userData) {
        const innerHTML = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Новая заявка</title>
              <style>
                h1, h2, h3, h4, h5, h6 {
                  margin: 0;
                  padding: 0;
                  border: none;
                }
                th, td {
                  font-family: initial;
                  text-align: left;
                }
            
                .body {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #0f0f0f;
                }
                .container {
                  height: 100%;
                  padding: 0 15px;
                  margin: 0 auto;
                }
                .table-container {
                  width: 100%;
                  background-color: #0f0f0f;
                }
                .table-header {
                  width: 100%;
                }
                .table-body {
                  width: 100%;
                }
                .table-header__title {
                  font-size: 4vw;
                  color: #f0f0f0;
                }
                .table-data {
                  width: 100%;
                  border-spacing: 0 20px;
                }
                .table-data__content {
                  padding-left: 20px;
                }
                .table-data__title {
                  display: block;
                  color: #494949;
                  font-size: 18px;
                  margin-bottom: 10px;
                }
                .table-data__value {
                  display: block;
                  color: #f0f0f0;
                  font-size: 20px;
                }
                .table-data__line {
                  margin-top: 10px;
                  display: block;
                  width: 100%;
                  height: .5px;
                  background-color: #494949;
                }
                .table-checkboxes {
                  display: flex;
                  flex-wrap: wrap;
                }
                .checkbox {
                  display: block;
                  padding: 9px 18px;
                  border: .5px solid #f0f0f0;
                  border-radius: 5px;
                  position: relative;
                  cursor: pointer;
                  margin-right: 20px;
                }
                .checkbox__title {
                  white-space: nowrap;
                  font-size: 20px;
                  font-family: var(--font-secondary);
                  color: #f0f0f0;
                }
                .checkbox_active {
                  background-color: #f0f0f0;
                }
                .checkbox_active .checkbox__title {
                  color: #494949;
                }
              </style>
            </head>
            <body class="body">
              <table class="table-container">
                <thead class="table-container__header">
                  <tr>
                    <th>
                      <table class="table-header">
                        <tr>
                          <td>
                            <div class="container">
                              <h1 class="table-header__title">Новая заявка</h1>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <table class="table-body">
                        <tr>
                          <td>
                            <table class="table-data">
                              <tr>
                                <td>
                                  <div class="container">
                                    <span class="table-data__title">Имя</span>
                                    <span class="table-data__value">${userData.name}</span>
                                  </div>
                                  <span class="table-data__line"></span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div class="container">
                                    <span class="table-data__title">Почта</span>
                                    <span class="table-data__value">${userData.mail}</span>
                                  </div>
                                  <span class="table-data__line"></span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div class="container">
                                    <span class="table-data__title">Описание проекта</span>
                                    <span class="table-data__value">${userData.description}</span>
                                  </div>
                                  <span class="table-data__line"></span>
                                </td>
                              </tr>
                              ${formChecboxFieldsData
                                .map((formChecboxFieldData, checkboxFieldIndex) => {
                                  return `
                                    <tr>
                                      <td>
                                        <div class="container">
                                          <span class="table-data__title">${formChecboxFieldData.label}</span>
                                          <div class="table-checkboxes">
                                              ${formChecboxFieldData.checkboxes
                                                .map((checkboxData, checkboxIndex) => {
                                                  return `
                                                    <div class="table-checkboxes__cell">
                                                      <div class="checkbox ${userData.checkboxes[checkboxFieldIndex].checkboxIndex === checkboxIndex ? "checkbox_active" : ""}">
                                                        <span class="checkbox__title">${checkboxData.title}</span>
                                                      </div>
                                                    </div>
                                                  `;
                                                })
                                                .join("")}
                                          </div>
                                        </div>
                                        <span class="table-data__line"></span>
                                      <td>
                                    </tr>
                                  `;
                                })
                                .join("")}
                            </table>
                          </td>
                        </tr>
                      </table>
                    </th>
                  </tr>
                </tbody>
              </table>
            </body>
          </html>
          `;

        return innerHTML;
      }
      render() {
        return this.page;
      }
    }

    try {
      const { name, mail, description, checkboxes } = req.body;

      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER_HOST,
        port: process.env.MAIL_SERVER_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_SERVER_ADRESS,
          pass: process.env.MAIL_SERVER_PASSWORD,
        },
      });

      // Отправка письма
      await transporter.sendMail({
        from: process.env.MAIL_SERVER_ADRESS,
        to: process.env.MAIL_SERVER_ADRESS,
        subject: "Requests from Kiryl Pekarski",
        text: `Name: ${name}; Mail: ${mail}; Description: ${description}; Checkboxes: ${checkboxes}`,
        html: new HTMLMessageResponsePage(req.body).render(),
      });

      res.status(200).json({
        status: 200,
        message: "Успешная отправка",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Ошибка при запросе",
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
