import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import AppController from "./AppController.js";

// страницы
import HomePage from "./../pages/homePage/HomePage.js";
import ErrorPage from "./../pages/errorPage/ErrorPage.js";
import ContactPage from "./../pages/contactPage/ContactPage.js";
import AboutPage from "../pages/aboutPage/AboutPage.js";
// компоненты
import Cursor from "../components/cursor/Cursor.js";
import ProjectsMenu from "../components/projectsMenu/ProjectsMenu.js";
import Header from "./../components/header/Header.js";
import Content from "./../components/content/Content.js";
import Footer from "../components/footer/Footer.js";

export default class App {
  constructor({ root }) {
    this.root = root;

    this.view = new AppView();
    this.model = new AppModel(this.view);
    this.controller = new AppController(this.model);

    this.routes = null;
    this.components = null;

    this.init();
  }

  // методы подписи на определенные события другими классами
  addListenerOfGettingScrollingSpeed(callback) {
    this.model.listenersOfGettingScrollingSpeed.push(callback);
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
        linksData: [ { title: "Проекты", href: null, attributes: [{ title: "data-projects-menu-open", value: true }] }, { title: "Обо мне", href: "#about" }, { title: "Связаться", href: "#contact" }],
      }),
      footer: new Footer(),
      content: new Content(),
    };
    this.routes = {
      main: new HomePage(),
      contact: new ContactPage(),
      about: new AboutPage({ app: this }),
      // default: new HomePage(),
      error: new ErrorPage(),
    };
  }
  render() {
    this.renderComponents();

    this.view.init(this.root, this.routes);
    this.controller.init();
  }
}
