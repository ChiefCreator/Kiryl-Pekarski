import { element } from "three/webgpu";


export default class DOMElementWatcher {
  constructor({ elements, callback }) {
    this.elements = elements;
    this.renderedElements = new Set();
    this.callback = callback;
    this.observer = null;
  }

  checkIsSingleElement() {
    return this.elements instanceof HTMLElement;
  }
  isRendered(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  startWatching() {
    if (this.checkIsSingleElement()) {
      this.watchDocumentForSingleElement();
    } else {
      this.watchDocumentForArrElements();
    }

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  watchDocumentForSingleElement() {
    this.observer = new MutationObserver((mutation) => {
      if (this.elements && this.isRendered(this.elements)) {
        this.observer.disconnect();
        this.callback();
        this.stopWatching();
      }
    });
  }
  watchDocumentForArrElements() {
    this.observer = new MutationObserver((mutation) => {
      this.elements.forEach(element => {
        if (!this.renderedElements.has(element)) {
          this.renderedElements.add(element);
        }
      });

      if (this.renderedElements.size === this.elements.length) {
        this.callback(this.renderedElements);
        this.stopWatching();
      }
    });
  }
  stopWatching() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// export default class DOMElementWatcher {
//   constructor({ elements, callback }) {
//     this.elements = elements;
//     this.renderedElements = new Set();

//     this.callback = callback;
//     this.observer = null;

//     this.init();
//   }

//   checkIsSingleElement() {
//     return this.elements instanceof HTMLElement;
//   }
//   checkIsElementRendered(entry) {
//     return entry.contentRect.width > 0 && entry.contentRect.height > 0;
//   }

//   handleResize(entries) {
//     entries.forEach((entry) => {
//       if (this.checkIsSingleElement()) {
//         if (this.checkIsElementRendered(entry) && entry.target.offsetParent !== null) {
//           console.log(entry)
//           this.callback();
//           this.disconnect();
//         }
//       } else {
//         if (entry.target) {
//           if (this.checkIsElementRendered(entry) && entry.target.offsetParent !== null) {
//             this.renderedElements.add(entry.target);
//             this.observer.unobserve(entry.target);

//             if (this.renderedElements.size === this.elements.length) {
//               console.log("ssss")
//               this.callback();
//               this.disconnect();
//             }
//           }
//         }
//       }
//     });
//   }
//   disconnect() {
//     this.observer.disconnect();
//     if (!this.checkIsSingleElement()) {
//       this.renderedElements.clear();
//     }
//   }

//   init() {
//     this.observer = new ResizeObserver(this.handleResize.bind(this));
//   }
//   startWatching() {
//     if (this.checkIsSingleElement()) {
//       this.observer.observe(this.elements);
//     } else {
//       this.elements.forEach((element) => {
//         if (element instanceof HTMLElement) {
//           this.observer.observe(element);
//         }
//       });
//     }
//   }
// }

// export default class DOMElementWatcher {
//   constructor({ elements, callback }) {
//       if (!elements || typeof callback !== 'function') {
//           throw new Error('Invalid arguments: provide a target(s) and a callback function.');
//       }

//       // Определяем, передан ли один элемент или массив
//       this.isSingleElement = elements instanceof HTMLElement;
//       this.elements = this.isSingleElement ? [elements] : Array.isArray(elements) ? elements : [elements];
//       this.callback = callback;
//       this.observer = new MutationObserver(this.handleMutations.bind(this));

//       // Наблюдение за добавлением элементов в DOM
//       this.observeelements();
//   }

//   observeelements() {
//       if (this.isSingleElement) {
//           this.startObserving(this.elements[0]);
//       } else {
//           this.elements.forEach((target) => this.startObserving(target));
//       }
//   }

//   startObserving(target) {
//       const config = { childList: true, subtree: true };

//       // Ожидаем добавление элемента в DOM
//       this.observer.observe(document.body, config);

//       // Проверяем сразу, если элемент уже есть в DOM
//       this.checkIfElementRendered(target);
//   }

//   checkIfElementRendered(target) {
//       // Проверяем, появился ли элемент и отрендерился ли он
//       if (target && target.offsetParent !== null) {
//           this.callback(target);
//           this.disconnect(target);
//       }
//   }

//   handleMutations(mutations) {
//       mutations.forEach((mutation) => {
//           mutation.addedNodes.forEach((node) => {
//               if (this.elements.includes(node) && node instanceof HTMLElement) {
//                   // Когда элемент добавлен в DOM, проверяем его отображение
//                   this.checkIfElementRendered(node);
//               }
//           });
//       });
//   }

//   disconnect(target) {
//       // Останавливаем наблюдение, когда элемент найден и обработан
//       this.observer.disconnect();
//   }
// }
