import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import ArticleProject from "./ArticleProject";
import ProjectImages from "../../components/projectImages/ProjectImages";

import "./sectionProjects.scss";
import project_1 from "./../../../img/project_1-1.jpg";
import project_2 from "./../../../img/project_2-1.jpg";
import project_3 from "./../../../img/project_3-1.jpg";
import project_4 from "./../../../img/project_4-1.jpg";
import project_5 from "./../../../img/project_5-1.png";
import project_6 from "./../../../img/project_6-1.jpg";

export default class SectionProjects {
  constructor() {
    this.articlesData = [
      {
        id: "article-project-NikitaEfremov",
        title: "Nikita Efremov",
        description: "Разработка сайта для фотографа из Могилева, запечатлевающего важные моменты и создающего неповторимые кадры",
        year: "2023",
        isCompleted: true,
        imgSrc: project_1,
        colorTheme: "projectThemeOfNikitaEfremov",
      },
      {
        id: "article-project-LimitedCharm",
        title: "Limited Charm",
        description: "Разработка сайта для Limited Charm, бренда, созданного для переосмысления ухода за кожей",
        year: "2024",
        isCompleted: true,
        imgSrc: project_2,
        colorTheme: "projectThemeOfLimitedCharm",
      },
      {
        id: "article-project-Studio57",
        title: "Studio fifty-seven",
        description: "Дизайн и разработка для Studio fifty-seven, компании, специализирующейся на строительстве стильных домов и создании современного дизайна",
        year: "2024",
        isCompleted: true,
        imgSrc: project_3,
        colorTheme: "projectThemeOfStudio57",
      },
      {
        id: "article-project-Panto",
        title: "Panto",
        description: "Верстка сайта для бренда Panto, предлагающего современную мебель, где эстетика встречается с функциональностью",
        year: "2023",
        isCompleted: true,
        imgSrc: project_4,
        colorTheme: "projectThemeOfPanto",
      },
      {
        id: "article-project-Tennis",
        title: "Tennis",
        description: "Верстка сайта для Tennis, компании, предлагающей теннисные услуги",
        year: "2023",
        isCompleted: true,
        imgSrc: project_5,
        colorTheme: "projectThemeOfTennis",
      },
      {
        id: "article-project-KolyanKovsh",
        title: "Kolyan Kovsh",
        description: "Дизайн и разработка для KolyanKovsh, компании, предоставляющей строительную технику в аренду",
        year: "2023",
        isCompleted: true,
        imgSrc: project_6,
        colorTheme: "projectThemeOfKolyanKovsh",
      },
    ];
    this.section = this.create();

    this.currentElem = null;
    this.currentTheme = "dark";
    this.timeoutRemoveClass = null;

    this.addListeners();
  }

  getArticleImgData() {
    return this.articlesData.map(data => {
      const img = document.querySelector(`#${data.id}`).querySelector(".article-project__img");
      const rect = img.getBoundingClientRect();
      return {
        img: img,
        url: data.imgSrc,
        width: rect.width,
        height: rect.height,
      }
    })
  }

  addListeners() {
    this.section.addEventListener("mouseover", this.mouseoverHandler.bind(this));
    this.section.addEventListener("mouseout", this.mouseoutHandler.bind(this));
  }
  changeColorTheme(theme, isAddThemeColor) {
    document.body.setAttribute("data-theme", theme);

    if (isAddThemeColor) {
      clearTimeout(this.timeoutRemoveClass);
      document.querySelectorAll('[data-color-transition]').forEach(elem => elem.classList.add("colorfull-theme-transition"));
    } else {
      this.timeoutRemoveClass = setTimeout(() => document.querySelectorAll('[data-color-transition]').forEach(elem => elem.classList.remove("colorfull-theme-transition")), 1000);
    }
  }
  mouseoverHandler(event) {
    if (this.currentElem) return;

    if (event.target.closest(".article-project__img")) {
      this.currentElem = event.target.closest(".article-project__img");
      const articleId = this.currentElem.closest(".article-project").getAttribute("id");
      const currentData = this.articlesData.find(data => data.id === articleId);
      const colorTheme = currentData.colorTheme;

      this.currentTheme = document.body.getAttribute("data-theme");
      this.changeColorTheme(colorTheme, true);
    }

    return;
  }
  mouseoutHandler(event) {
    if (!this.currentElem) return;

    let relatedTarget = event.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget === this.currentElem) return;
      relatedTarget = relatedTarget.parentElement;
    }

    this.changeColorTheme(this.currentTheme, false);

    this.currentElem = null;
  }

  create() {
    const innerHTML = `<div class="section-projects__container"></div>`;

    const section = createDOM("section", { className: "section-projects" });
    const container = new Container(innerHTML);

    section.append(container.render());

    const projectsContainer = section.querySelector(".section-projects__container");
    this.articlesData.forEach(data => {
      const articleProject = new ArticleProject(data);
      projectsContainer.append(articleProject.render());
    });
    setTimeout(() => {
      const projectImages = new ProjectImages({ data: this.getArticleImgData() });
      projectsContainer.append(projectImages.render());
    }, 100)

    return section;
  }
  render() {
    return this.section;
  }
}
