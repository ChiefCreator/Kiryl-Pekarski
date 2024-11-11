import App from "./app/App.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const app = new App({ root });
  app.render();
});
