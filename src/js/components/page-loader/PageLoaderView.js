import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import { splitTextOnLines } from "../../utils/domUtils";
import DOMElementWatcher from "../domElementWatcher/DOMElementWatcher";

import gsap from "gsap";

export default class PageLoaderView {
  constructor() {
    this.pageLoader = null;

    this.mainTimeline = gsap.timeline({ paused: true })
    this.timelineOfShow = gsap.timeline();
    this.timelineOfHide = gsap.timeline({ paused: true });
    this.timelineOfTitleAnimation = gsap.timeline();
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
  }
  initTimelineOfTitleAnimation() {
    this.titleLines.forEach(line => {
      const container = line.firstElementChild;

      container.style.transform = "translate(0, 100%)";

      this.timelineOfTitleAnimation.fromTo(
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
  }

  initTimelines() {
    this.initTimelineOfShow();
    this.initTimelineOfHide();
    this.initTimelineOfTitleAnimation();

    this.mainTimeline
      .add(this.timelineOfShow, 0)
      .add(this.timelineOfTitleAnimation, .3)
  }
  init(loaderObject) {
    this.pageLoader = this.create(loaderObject);
    this.title = this.pageLoader.querySelector(".page-loader__title");

    const watcher = new DOMElementWatcher({ 
      elements: this.title,
      callback: () =>{
        setTimeout(() => {
          splitTextOnLines(this.title);

          this.titleLines = this.title.querySelectorAll(".text-line");
  
          this.initTimelines();
        })
      }
    })
    watcher.startWatching()
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