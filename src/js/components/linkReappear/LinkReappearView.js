import { createDOM } from "../../utils/domUtils";

export default class LinkReappearView {
  constructor(className, hasUnderline) {
    this.className = className;
    this.hasUnderline = hasUnderline ?? false;

    this.link = null;
    this.letters = null;
  }

  splitTitle() {
    const $linkWrapper = this.link.firstElementChild;
    const title = this.link.dataset.title;

    title.split(" ").forEach((word, index, arr) => {
      const $word = document.createElement("span");
      $word.classList.add("link-reappear__word");

      Array.from(word).forEach((letter) => {
        const $letter = document.createElement("span");
        $letter.classList.add("link-reappear__letter");
        $letter.textContent = letter;
        $letter.dataset.letter = letter;
        $word.append($letter);
      });

      $linkWrapper.append($word);

      if (index < arr.length - 1) {
        const $space = document.createElement("span");
        $space.classList.add("link-reappear__space");
        $space.textContent = " ";
        $space.dataset.letter = " ";
        $linkWrapper.append($space);
      }
    });
  }

  init(data) {
    this.link = this.create(data);
    this.splitTitle();
    this.letters = this.link.querySelectorAll(".link-reappear__letter");
  }
  create(data) {
    const innerHTML = `
      <div class="link-reappear__wrapper"></div>
    `;

    let attributes = [
      { title: "href", value: data.href },
      { title: "data-title", value: data.title },
      { title: "data-color-transition", value: true },
    ];

    attributes = data.attributes ? attributes.concat(data.attributes) : attributes;

    return createDOM("a", {
      className: `link-reappear ${this.hasUnderline ? "link-reappear_underline" : ""} ${this.className ?? ""}`,
      innerHTML,
      attributes,
    });
  }
  render() {
    return this.link;
  }
}
