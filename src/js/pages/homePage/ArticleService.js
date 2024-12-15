import { createDOM } from "../../utils/domUtils";

export default class ArticleService {
  constructor(data) {
    this.data = data;
    this.article = null;

    this.init();
  }

  setHeight() {
    const headerWidth = document.querySelector(".header").offsetHeight;
    const screenHeight = window.innerHeight;
    const articleHeightVH = 100 - (headerWidth / screenHeight) * 100;
    this.article.style.minHeight = `${articleHeightVH}vh`
  }

  init() {
    this.article = this.create();
    setTimeout(() => this.setHeight())
  }
  create() {
    const innerHTML = `
      <div class="article-service__container">
        <div class="article-service__illustration-wrapper">
          <div class="article-service__illustration"></div>
        </div>
        <div class="article-service__content">
          <h3 class="article-service__title">${this.data.title}</h3>
          <p class="article-service__description">${this.data.description}</p>
        </div>
      </div>
    `;

    const article = createDOM("article", { className: "article-service", id: this.data.id, innerHTML });

    return article;
  }
  render() {
    return this.article;
  }
}
