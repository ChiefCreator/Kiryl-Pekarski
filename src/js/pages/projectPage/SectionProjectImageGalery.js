import { createDOM } from "../../utils/domUtils";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import "./section-project-image-gallery.scss";

export default class SectionProjectImageGalery {
  constructor() {
    this.section = null;

    this.init();
  }

  initScrollAnimation(projectSceneObject) {
    const scrollEnd = 2000;

    gsap.to(this.section, {
      scrollTrigger: {
        trigger: this.section,
        start: `top top`,
        end: `+=${scrollEnd}px`, 
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const position = {
            x: 0,
            y: self.progress * (self.end - self.start),
          }
          projectSceneObject.updateSliderContainerMeshPosition(position, scrollEnd);
        }
      },
      x: 0,
    });
  }

  init() {
    this.section = this.create();
  }
  create() {
    return createDOM("section", { className: "section-project-image-gallery", id: "section-project-image-gallery" });
  }
  render() {
    return this.section;
  }
}
