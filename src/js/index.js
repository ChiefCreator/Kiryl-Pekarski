import App from "./app/App.js";

import "./../scss/base/_vars.scss";
import "./../scss/base/_base.scss";
import "./../scss/base/_utils.scss";
import "./../scss/base/_reset.scss";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const app = new App({ root });
  app.render();
});