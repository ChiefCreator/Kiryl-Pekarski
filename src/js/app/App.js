import AppModel from "./AppModel.js";
import AppView from "./AppView.js";
import AppController from "./AppController.js";

// страницы
import HomePage from "./../pages/homePage/HomePage.js";
import ErrorPage from "./../pages/errorPage/ErrorPage.js";
import ContactPage from "./../pages/contactPage/ContactPage.js";
import AboutPage from "../pages/aboutPage/AboutPage.js";
import ProjectPage from "../pages/projectPage/ProjectPage.js";
// компоненты
import Cursor from "../components/cursor/Cursor.js";
import Menu from "../components/menu/Menu.js";
import Header from "./../components/header/Header.js";
import Content from "./../components/content/Content.js";
import Footer from "../components/footer/Footer.js";
import PageLoader from "../components/page-loader/PageLoader.js";

import projectsData from "../data/projectsData.js";

import { createDOM } from "../utils/domUtils.js";

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
    this.components.mainStructure.append(
      this.components.header.render() ?? "",
      this.components.content.render() ?? "",
      this.components.footer.render() ?? ""
    );
    this.root.append(
      this.components.pageLoader.render() ?? "",
      this.components.cursor.render() ?? "",
      this.components.menu.render() ?? "",
      this.components.mainStructure
    );
  }
  init() {
    const pageLoaderObject = new PageLoader();
    const homePage = new HomePage({ app: this });

    this.components = {
      mainStructure: createDOM("div", { className: "main-structure" }),
      cursor: new Cursor({ 
        radius: 26,
        borderWidth: 1.5,
      }),
      menu: new Menu({ 
        linksData: [ { title: "Главная", href: "#main" }, { title: "Обо мне", href: "#about" }, { title: "Связаться", href: "#contact" }],
      }),
      header: new Header({
        linksData: [ { title: "Проекты", href: null, attributes: [{ title: "data-menu-open", value: true }] }, { title: "Обо мне", href: "#about" }, { title: "Связаться", href: "#contact" }],
      }),
      footer: new Footer(),
      content: new Content(),
      pageLoader: pageLoaderObject,
    };
    this.routes = {
      main: homePage,
      about: new AboutPage({ app: this }),
      contact: new ContactPage(),
      "nikita-efremov": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Nikita Efremov"),
        app: this,
      }),
      "limited-charm": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Limited Charm"),
        app: this,
      }),
      "studio-fifty-seven": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Studio fifty-seven"),
        app: this,
      }),
      "panto": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Panto"),
        app: this,
      }),
      "tennis": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Tennis"),
        app: this,
      }),
      "kolyan-kovsh": new ProjectPage({ 
        data: projectsData.find(dataObject => dataObject.title === "Kolyan Kovsh"),
        app: this,
      }),
      default: homePage,
      error: new ErrorPage(),
    };
  }
  render() {
    this.renderComponents();

    this.view.init(this.root, this.routes, this.components.pageLoader, this.components.menu);
    this.controller.init();
  }
}
