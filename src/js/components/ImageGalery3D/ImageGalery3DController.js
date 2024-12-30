import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import DOMElementWatcher from '../domElementWatcher/DOMElementWatcher';

export default class ImageGalery3DController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.init();
    }

    initScrollAnimation() {
      const scrollEnd = 1200;

      gsap.to(this.view.imageGalery3D, {
        scrollTrigger: {
          trigger: this.view.imageGalery3D,
          start: `top top`,
          end: `+=${scrollEnd}px`, 
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const position = {
              x: 0,
              y: self.progress * (self.end - self.start),
            }
            this.model.updatePosition(position, scrollEnd);
          }
        },
        x: 0,
      });
    }
  
    init() {
      this.model.init();

      const watcher = new DOMElementWatcher({
        elements: this.view.imageGalery3D,
        callback: () => {
          setTimeout(() => {
            this.model.updatePosition({ y: 0, normalizedY: 0 });
            this.initScrollAnimation();
            this.addListeners();
          }, 1000)
        }
      });
      watcher.startWatching();
    }
    onWindowResize() {
      this.view.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    addListeners() {
      window.addEventListener("resize", this.onWindowResize.bind(this));
    }
  }
  