import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import AppController from "./AppController.js";

// страницы
import HomePage from "./../pages/homePage/HomePage.js";
import ErrorPage from "./../pages/errorPage/ErrorPage.js";
import ContactPage from "./../pages/contactPage/ContactPage.js";
// компоненты
import Cursor from "../components/cursor/Cursor.js";
import ProjectsMenu from "../components/projectsMenu/ProjectsMenu.js";
import Header from "./../components/header/Header.js";
import Content from "./../components/content/Content.js";
import Footer from "../components/footer/Footer.js";

export default class App {
  constructor({ root }) {
    this.root = root;
    this.routes = null;
    this.components = null;

    this.init();
  }

  renderComponents() {
    this.root.append( this.components.cursor.render(), this.components.header.render(), this.components.content.render(), this.components.projectsMenu.render(), this.components.footer.render());
  }
  init() {
    this.components = {
      cursor: new Cursor({ 
        radius: 26,
        borderWidth: 1.5,
      }),
      projectsMenu: new ProjectsMenu(),
      header: new Header({
        linksData: [ { title: "Проекты", href: null, attributes: [{ title: "data-projects-menu-open", value: true }] }, { title: "Обо мне" }, { title: "Портфолио" }, { title: "Навыки" }, { title: "Связаться", href: "#contact" }],
      }),
      footer: new Footer(),
      content: new Content(),
    };
    this.routes = {
      main: new HomePage(),
      contact: new ContactPage(),
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
