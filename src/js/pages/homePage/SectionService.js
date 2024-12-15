import "./sectionService.scss";
import { createDOM } from "../../utils/domUtils";
import modelMapUrl_1 from "./../../../img/envMap.jpg";
import Slider from "../../components/slider/Slider";

export default class SectionService {
  constructor() {
    this.sliderData = [
      {
        general: {
          id: "article-service-DevelopmentOfUserInterfaces",
          title: "Разработка пользовательских интерфейсов",
          description: "Создание красивых и функциональных интерфейсов для веб-сайтов и приложений, ориентированных на пользователя, с учетом принципов дизайна и юзабилити",
          colorTheme: "projectThemeOfNikitaEfremov",
        },
        blobData: {
          geometry: {
            radius: 1,
            detail: 150,
            fixNormals: true,
          },
          material: {
            roughness: 1,
            metalness: 1,
            envMap: modelMapUrl_1,
            wireframe: false,
            shaders: {
              blobNoise: {
                distortion: 1,
                frequency: 2,
                speed: 1,
                poleAmount: 1,
              },
              blobSurfaceNoise: {
                distortion: 1,
                frequency: 1,
                wavesNumber: 2,
                speed: 1,
                poleAmount: 1,
              }
            }
          }
        }
      },
      {
        general: {
          id: "article-service-AdaptiveAndResponsiveLayout",
          title: "Адаптивная и отзывчивая верстка",
          description: "Создание веб-страниц, которые корректно отображаются на разных устройствах (мобильных телефонах, планшетах, компьютерах) с использованием технологий CSS3 и медиазапросов",
          colorTheme: "projectThemeOfNikitaEfremov",
        },
        blobData: {
          geometry: {
            radius: 1,
            detail: 256,
            fixNormals: true,
          },
          material: {
            roughness: 1,
            metalness: 1,
            envMap: 0,
            wireframe: false,
            shaders: {
              blobNoise: {
                distortion: 1,
                frequency: 1,
                speed: 1,
                poleAmount: 1,
              },
              blobSurfaceNoise: {
                distortion: 2.5,
                frequency: 1,
                wavesNumber: 0,
                speed: 1,
                poleAmount: 1,
              }
            }
          }
        }
      },
      {
        general: {
          id: "article-service-IntegrationWithTheBackend",
          title: "Интеграция с бэкендом",
          description: "Создание и поддержка собственных серверов и баз данных",
          colorTheme: "projectThemeOfNikitaEfremov",
        },
        blobData: {
          geometry: {
            radius: 1,
            detail: 256,
            fixNormals: true,
          },
          material: {
            roughness: 1,
            metalness: 1,
            envMap: 0,
            wireframe: false,
            shaders: {
              blobNoise: {
                distortion: 1,
                frequency: 2,
                speed: 2,
                poleAmount: .6,
              },
              blobSurfaceNoise: {
                distortion: 1,
                frequency: 1,
                wavesNumber: 5,
                speed: 2,
                poleAmount: 1,
              }
            }
          }
        }
      },
      {
        general: {
          id: "article-service-DesignDevelopment",
          title: "Разработка дизайна",
          description: "Разработка дизайна в Figma",
          colorTheme: "projectThemeOfNikitaEfremov",
        },
        blobData: {
          geometry: {
            radius: 1,
            detail: 256,
            fixNormals: true,
          },
          material: {
            roughness: 1,
            metalness: 1,
            envMap: 0,
            wireframe: false,
            shaders: {
              blobNoise: {
                distortion: 1,
                frequency: 1,
                speed: 2,
                poleAmount: 1,
              },
              blobSurfaceNoise: {
                distortion: 2,
                frequency: 0.5,
                wavesNumber: 5,
                speed: 2,
                poleAmount: 1,
              }
            }
          }
        }
      },

      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "3D-моделирование",
      //   description: "Создание анимированных и интерактивных 3D-объектов и целых сцен",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "Оптимизация производительности сайта",
      //   description: "Повышение скорости загрузки страниц и улучшение производительности интерфейса через оптимизацию изображений, минимизацию и сжатие файлов, использование кэширования",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "Разработка одностраничных приложений (SPA)",
      //   description: "Создание динамичных одностраничных приложений с использованием React, обеспечивающих мгновенную загрузку контента без перезагрузки страниц",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "Сборка и настройка проекта",
      //   description: "Использование инструментов для сборки и компиляции фронтенд-кода (например, Webpack, Gulp, Parcel), настройка окружения для разработки и деплоя",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "Анимации и визуальные эффекты",
      //   description: "Разработка плавных анимаций и интерактивных элементов с использованием CSS, JavaScript и библиотек (например, GSAP), чтобы улучшить пользовательский опыт",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-DevelopmentOfUserInterfaces",
      //   title: "Анимации и визуальные эффекты",
      //   description: "Разработка плавных анимаций и интерактивных элементов с использованием CSS, JavaScript и библиотек (например, GSAP), чтобы улучшить пользовательский опыт",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
      // {
      //   id: "article-service-WebsiteSupportAndUpdating",
      //   title: "Поддержка и обновление сайта",
      //   description: "Обеспечение постоянной поддержки, исправление багов, обновление функционала и улучшение UI/UX с учетом новых требований бизнеса и пользователей",
      //   colorTheme: "projectThemeOfNikitaEfremov",
      // },
    ];
   
    this.section = null;

    this.init();
  }

  init() {
    this.section = this.create();
  }
  create() {
    const section = createDOM("section", { className: "section-service", id: "section-service" });
    // const slider = new Slider({ data: this.sliderData });

    // section.append(slider.render());

    return section;
  }
  render() {
    return this.section;
  }
}





























// // THREE js
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
// // gsap
// import gsap from "gsap";
// // data
// import "./sectionService.scss";
// import sculpture from "./../../../3d/sculpture3.glb";
// import vertexShader from "./../../../shaders/vertex.glsl";
// import fragmentShader from "./../../../shaders/fragment3.glsl";
// import modelMapUrl_1 from "./../../../img/envMap.jpg";
// // scripts
// import Container from "../../components/container/Container";
// import { createDOM } from "../../utils/domUtils";
// import ArticleService from "./ArticleService";
// import DOMElementWatcher from "../../components/domElementWatcher/DOMElementWatcher";
// import RippleTextureRenderer from "../../components/liquidBackground/RippleTextureRenderer";

// export default class SectionService {
//   constructor() {
//     this.serviceData = [
//       {
//         id: "article-service-DevelopmentOfUserInterfaces",
//         title: "Разработка пользовательских интерфейсов",
//         description: "Создание красивых и функциональных интерфейсов для веб-сайтов и приложений, ориентированных на пользователя, с учетом принципов дизайна и юзабилити",
//         colorTheme: "projectThemeOfNikitaEfremov",
//         mapUrl: modelMapUrl_1,
//         model: sculpture,
//       },
//       {
//         id: "article-service-AdaptiveAndResponsiveLayout",
//         title: "Адаптивная и отзывчивая верстка",
//         description: "Создание веб-страниц, которые корректно отображаются на разных устройствах (мобильных телефонах, планшетах, компьютерах) с использованием технологий CSS3 и медиазапросов",
//         colorTheme: "projectThemeOfNikitaEfremov",
//         mapUrl: modelMapUrl_1,
//         model: sculpture,
//       },
//       {
//         id: "article-service-IntegrationWithTheBackend",
//         title: "Интеграция с бэкендом",
//         description: "Создание и поддержка собственных серверов и баз данных",
//         colorTheme: "projectThemeOfNikitaEfremov",
//         mapUrl: modelMapUrl_1,
//         model: sculpture,
//       },
//       {
//         id: "article-service-DesignDevelopment",
//         title: "Разработка дизайна",
//         description: "Разработка дизайна в Figma",
//         colorTheme: "projectThemeOfNikitaEfremov",
//         mapUrl: modelMapUrl_1,
//         model: sculpture,
//       },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "3D-моделирование",
//       //   description: "Создание анимированных и интерактивных 3D-объектов и целых сцен",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "Оптимизация производительности сайта",
//       //   description: "Повышение скорости загрузки страниц и улучшение производительности интерфейса через оптимизацию изображений, минимизацию и сжатие файлов, использование кэширования",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "Разработка одностраничных приложений (SPA)",
//       //   description: "Создание динамичных одностраничных приложений с использованием React, обеспечивающих мгновенную загрузку контента без перезагрузки страниц",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "Сборка и настройка проекта",
//       //   description: "Использование инструментов для сборки и компиляции фронтенд-кода (например, Webpack, Gulp, Parcel), настройка окружения для разработки и деплоя",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "Анимации и визуальные эффекты",
//       //   description: "Разработка плавных анимаций и интерактивных элементов с использованием CSS, JavaScript и библиотек (например, GSAP), чтобы улучшить пользовательский опыт",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-DevelopmentOfUserInterfaces",
//       //   title: "Анимации и визуальные эффекты",
//       //   description: "Разработка плавных анимаций и интерактивных элементов с использованием CSS, JavaScript и библиотек (например, GSAP), чтобы улучшить пользовательский опыт",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//       // {
//       //   id: "article-service-WebsiteSupportAndUpdating",
//       //   title: "Поддержка и обновление сайта",
//       //   description: "Обеспечение постоянной поддержки, исправление багов, обновление функционала и улучшение UI/UX с учетом новых требований бизнеса и пользователей",
//       //   colorTheme: "projectThemeOfNikitaEfremov",
//       // },
//     ];
//     this.viewportSettings = {
//       width: window.innerWidth,
//       height: window.innerHeight,
//       aspectRatio: window.innerWidth / window.innerHeight,
//       frustumSize: 1,
//     };
//     this.models = [];
//     this.modelRects = [];
//     this.section = null;
//     this.container = null;

//     this.init();
//   }

//   getModelRects(data) {
//     return data.map((dataObj) => {
//       const modelEl = this.section.querySelector(`#${dataObj.id}`).querySelector(".article-service__illustration");

//       return {
//         modelEl,
//         ...this.getModelPosition(modelEl),
//         prevPosX: null,
//         prebPosY: null,
//       };
//     });
//   }

//   initLoaders() {
//     this.textureLoader = new THREE.TextureLoader();
//     this.gltfLoader = new GLTFLoader();
//   }
//   initTextures() {
//     this.rippleTextureRenderer = new RippleTextureRenderer();
//     this.rippleTexture = this.rippleTextureRenderer.getTexture();
//   }
//   init3DScene() {
//     this.renderer = new THREE.WebGLRenderer({ alpha: true });
//     this.renderer.setSize(this.viewportSettings.width, this.viewportSettings.height);
//     this.section.append(this.renderer.domElement);

//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(75, this.viewportSettings.aspectRatio, 0.1, 1000);
//     this.camera.position.z = 5;

//     this.renderTarget = new THREE.WebGLRenderTarget(this.viewportSettings.width, this.viewportSettings.height, {
//       format: THREE.RGBAFormat,
//       minFilter: THREE.LinearFilter,
//       magFilter: THREE.LinearFilter,
//       stencilBuffer: false,
//     });

//     const light = new THREE.DirectionalLight(0xffffff, 5);
//     light.position.set(0, 1, 4).normalize();
//     this.scene.add(light);
//   }
//   initServiceModels() {
//     this.serviceData.forEach((data, i) => {
//       const texture = this.textureLoader.load(data.mapUrl);

//       this.gltfLoader.load(
//         data.model,
//         (gltf) => {
//           const model = gltf.scene;
//           model.traverse((child) => {
//             if (child.isMesh) {
//               child.material = new THREE.MeshStandardMaterial({
//                 map: texture,
//               });
//             }
//           });
//           model.scale.set(1, 1, 1);
//           this.models.push(model);
//           this.scene.add(model);
//         },
//         undefined,
//         (error) => console.error("Ошибка загрузки:", error)
//       );
//     });
//   }
//   initPostprocessing() {
//     this.composer = new EffectComposer(this.renderer);

//     this.effect = new ShaderPass({
//       uniforms: {
//         tDiffuse: { value: null },
//         uWavesTexture: { value: this.rippleTexture },
//       },
//       fragmentShader: fragmentShader,
//       vertexShader,
//     });

//     this.composer.addPass(new RenderPass(this.scene, this.camera));
//     this.composer.addPass(this.effect);
//   }

//   animate = () => {
//     this.rippleTextureRenderer.render(this.renderer);
//     this.renderer.setRenderTarget(this.renderTarget);
//     this.renderer.render(this.scene, this.camera);
//     this.renderer.setRenderTarget(null);

//     this.effect.uniforms.uWavesTexture.value = this.rippleTexture;

//     if (this.composer) this.composer.render();

//     this.updateModelsPosition();

//     requestAnimationFrame(this.animate);
//   };
//   getModelPosition(modelEl) {
//     const rect = modelEl.getBoundingClientRect();

//     const elementCenterX = rect.left + rect.width / 2;
//     const elementCenterY = rect.top + rect.height / 2;

//     const posX = (elementCenterX / this.viewportSettings.width) * 2 - 1;
//     const posY = -(elementCenterY / this.viewportSettings.height) * 2 + 1;

//     return { posX, posY };
//   }
//   updateModelsPosition() {
//     this.modelRects.forEach((modelRect, i) => {
//       const { posX, posY } = this.getModelPosition(modelRect.modelEl);

//       if (this.models[i] && (!modelRect.prevPosX || modelRect.prevPosX !== posX || modelRect.prevPosY !== posY)) {
//         const vector = new THREE.Vector3(posX, posY, 0.5);
//         vector.unproject(this.camera);

//         const dir = vector.sub(this.camera.position).normalize();
//         const targetZ = 0;
//         const distance = (targetZ - this.camera.position.z) / dir.z;
//         const position = this.camera.position.clone().add(dir.multiplyScalar(distance));

//         this.models[i].position.copy(position);

//         modelRect.prevPosX = posX;
//         modelRect.prevPosY = posY;
//       }
//     });
//   }
//   animateArticlesOnScroll() {
//     const headerHeight = document.querySelector(".header").offsetHeight;
//     const containerWidth = this.container.scrollWidth;

//     gsap.to(this.container, {
//       x: () => -(containerWidth - this.viewportSettings.width),
//       ease: "none",
//       scrollTrigger: {
//         trigger: this.container,
//         start: `top ${headerHeight}px`,
//         pin: true,
//         scrub: 1,
//         end: () => "+=" + containerWidth,
//       },
//     });
//   }

//   addListeners() {
//     setTimeout(() => {
//       const watcher = new DOMElementWatcher({
//         elements: this.container,
//         callback: () => {
//           this.animateArticlesOnScroll();
//         },
//       });
//       watcher.startWatching();
//     }, 0);
//   }
//   init() {
//     this.section = this.create();
//     this.container = this.section.querySelector(".section-service__container");
//     this.modelRects = this.getModelRects(this.serviceData);

//     this.initLoaders();
//     this.initTextures();
//     this.init3DScene();
//     this.initServiceModels();
//     this.initPostprocessing();

//     this.animate();

//     this.addListeners();
//   }
//   create() {
//     const innerHTML = `<div class="section-service__container"></div>`;

//     const section = createDOM("section", { className: "section-service", id: "section-service" });
//     const container = new Container(innerHTML);

//     section.append(container.render());

//     const serviceContainer = section.querySelector(".section-service__container");

//     this.serviceData.forEach((data, i) => {
//       const articleService = new ArticleService(data);
//       const articleServiceElement = articleService.render();
//       serviceContainer.append(articleServiceElement);
//     });

//     return section;
//   }
//   render() {
//     return this.section;
//   }
// }
