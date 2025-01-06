import Container from "../../components/container/Container";
import { createDOM } from "../../utils/domUtils";

import LinkMore from "../../components/linkMore/LinkMore";

export default class ArticleProject {
  constructor(data) {
    this.data = data;
    this.article = this.create();
    this.img = this.article.querySelector(".article-project__img");
  }

  create() {
    const innerHTML = `
      <div class="article-project__container">
        <div class="article-project__illustration">
          <img class="article-project__img" data-element-animated-on-scroll data-element-animated-on-scroll-target="${this.data.id}" data-cursor='cursorEye'>
        </div>
        <div class="article-project__information">
          <h3 class="article-project__title" data-text-animated-on-scroll data-text-animated-on-scroll-target="${this.data.id}">${this.data.title}</h3>
          <span class="article-project__year" data-text-animated-on-scroll data-text-animated-on-scroll-target="${this.data.id}" data-color-transition>${this.data.year}</span>
          <p class="article-project__description" data-text-animated-on-scroll data-text-animated-on-scroll-target="${this.data.id}">${this.data.description}</p>
        </div>
      </div>
    `;

    const article = createDOM("article", { className: "article-project", id: this.data.id });
    const container = new Container(innerHTML);

    article.append(container.render());

    const linkMore = new LinkMore({ hasUnderline: true, className: "article-project__link-more", data: { title: "Подробнее", href: null, scrollTrigger: `${this.data.id}` } });
    const articleInformation = article.querySelector(".article-project__information");
    
    articleInformation.append(linkMore.render());

    return article;
  }
  render() {
    return this.article;
  }
}
