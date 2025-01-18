import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import { splitTextOnLines } from "../../utils/domUtils";
import ElementObserver from "../elementObserver/ElementObserver";

import gsap from "gsap";

export default class PageLoaderView {
  constructor() {
    this.pageLoader = null;

    this.timelineOfShow = gsap.timeline({ paused: true });
    this.timelineOfShowAtFirstAppearance = gsap.timeline({ paused: true });
    this.timelineOfHide = gsap.timeline({ paused: true });
  }

  show() {
    this.timelineOfShow.restart();
  }
  showAtFirstAppearance() {
    this.timelineOfShowAtFirstAppearance.restart();
  }
  hide() {
    this.timelineOfHide.restart();
  }

  initTimelineOfHide() {
    this.timelineOfHide
      .fromTo(this.pageLoader,
        {
          transform: "translate(0, 0)",
        },
        {
          transform: "translate(-100%, 0)",
          duration: 1,
          ease: "power4.inOut",
        }
      )
  }
  initTimelineOfShow() {
    this.timelineOfShow
      .fromTo(this.pageLoader,
        {
          transform: "translate(-100%, 0)",
        },
        {
          transform: "translate(0, 0)",
          duration: 1,
          ease: "power4.inOut",
        }
      )
      .add(this.initTimelineOfTitleAnimation(), .3)
  }
  initTimelineOfShowAtFirstAppearance() {
    this.timelineOfShowAtFirstAppearance
      .set(this.pageLoader,
        {
          transform: "translate(0, 0)",
        },
      )
      .add(this.initTimelineOfTitleAnimation(), .3)
  }
  initTimelineOfTitleAnimation() {
    const timelineOfTitleAnimation = gsap.timeline();

    this.titleLines.forEach(line => {
      const container = line.firstElementChild;

      container.style.transform = "translate(0, 100%)";

      timelineOfTitleAnimation.fromTo(
        container,
        {
          transform: `translate(0, 100%)`,
        },
        {
          transform: `translate(0, 0)`,
          duration: 1.5,
          ease: "power4.inOut",
        },
          "<+10%"
        )
    });

    return timelineOfTitleAnimation;
  }

  initTimelines() {
    this.initTimelineOfShow();
    this.initTimelineOfShowAtFirstAppearance();
    this.initTimelineOfHide();
  }
  init(loaderObject) {
    this.pageLoader = this.create(loaderObject);
    this.title = this.pageLoader.querySelector(".page-loader__title");

    const observer = new ElementObserver({
      target: this.title,
      onRender: () => {
        splitTextOnLines(this.title);

        this.titleLines = this.title.querySelectorAll(".text-line");
  
        this.initTimelines();
      }
    });
    observer.start();
  }
  create(loaderObject) {
    const innerHTML = `
      <div class="page-loader__container">
        <div class="page-loader__title-wrapper">
          <h1 class="page-loader__title">Kiryl Pekarski</h1>
        </div>
        <div class="page-loader__loader-wrapper"></div>
      </div>
    `;

    const container = new Container(innerHTML);
    const pageLoader = createDOM("div", { className: "page-loader", innerHTML: container.render().outerHTML });

    const loaderWrapper = pageLoader.querySelector(".page-loader__loader-wrapper");
    const loader = loaderObject.render();

    loaderWrapper.append(loader);

    return pageLoader;
  }
  render() {
    return this.pageLoader;
  }
}
