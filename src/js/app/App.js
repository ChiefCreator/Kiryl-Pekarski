import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import AppController from "./AppController.js";

// страницы
import HomePage from "./../pages/homePage/HomePage.js";
import ErrorPage from "./../pages/errorPage/ErrorPage.js";
// компоненты
import Header from "./../components/header/Header.js";
import Content from "./../components/content/Content.js";
import LiquidBackground from "../components/liquidBackground/LiquidBackground.js";

export default class App {
  constructor({ root }) {
    this.root = root;
    this.routes = null;
    this.components = null;

    this.init();
  }

  renderComponents() {
    this.root.append(this.components.liquidBackground.render(), this.components.header.render(), this.components.content.render());
  }
  init() {
    this.components = {
      liquidBackground: new LiquidBackground(),
      header: new Header({
        linksData: [{ title: "Обо мне" }, { title: "Портфолио" }, { title: "Навыки" }, { title: "Связаться" }],
      }),
      content: new Content(),
    };
    this.routes = {
      main: new HomePage(),
      // default: new HomePage(),
      error: new ErrorPage(),
    };
  }
  render() {
    this.renderComponents();
    const view = new AppView(this.root, this.routes);
    const model = new AppModel(view);
    const controller = new AppController(model);
  }
}
