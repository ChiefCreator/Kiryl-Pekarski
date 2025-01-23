export default class HTMLMessageResponsePage {
  constructor(userData, checkboxData) {
    this.page = null;

    this.init(userData);
  }

  init(userData, checkboxData) {
    this.page = this.create(userData, checkboxData);
  }
  create(userData, checkboxData) {
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
                          ${checkboxData
                            .map((checkboxData, checkboxFieldIndex) => {
                              return `
                                <tr>
                                  <td>
                                    <div class="container">
                                      <span class="table-data__title">${checkboxData.label}</span>
                                      <div class="table-checkboxes">
                                          ${checkboxData.checkboxes
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
