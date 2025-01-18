import * as THREE from "three";

import rippleNoiseMap from "./../../../img/ripple-noise-map.png";

import rippleVertexShader from "./../../../shaders/rippleVertexShader.glsl";
import rippleFragmentShader from "./../../../shaders/rippleFragmentShader.glsl";

export default class RippleTextureRenderer {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.maxCountOfRippleMeshes = 100;
    this.rippleMeshes = [];
    this.rippleOptions = {
      size: .15,
    };
    this.currentRippleIndex = 0;

    this.mouseObj = new THREE.Vector2(0, 0);
    this.prevMouseObj = new THREE.Vector2(0, 0);

    this.init();
  }

  createRippleMesh({ geometry, texture }) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    })

    return new THREE.Mesh(geometry, material);
  }
  animateRipple(posX, posY, currentRippleIndex) {
    const rippleMesh = this.rippleMeshes[currentRippleIndex];
    rippleMesh.visible = true;
    rippleMesh.position.x = posX;
    rippleMesh.position.y = posY;
    rippleMesh.scale.x = rippleMesh.scale.y = 1;
    rippleMesh.material.opacity = 1;
  }
  isMouseActive() {
    return (Math.abs(this.mouseObj.x - this.prevMouseObj.x) >= 0.001 && Math.abs(this.mouseObj.y - this.prevMouseObj.y) >= 0.001);
  }
  startWaveAnimation() {
    if (this.isMouseActive()) {
      this.animateRipple(this.mouseObj.x, this.mouseObj.y, this.currentRippleIndex);
      this.currentRippleIndex = ++this.currentRippleIndex % this.maxCountOfRippleMeshes;
    }

    this.prevMouseObj.x = this.mouseObj.x;
    this.prevMouseObj.y = this.mouseObj.y;
  }

  initMouseEvents() {
    window.addEventListener("pointermove", this.mousemoveHandler.bind(this));
  }
  mousemoveHandler(event) {
    this.mouseObj.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseObj.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  init3DScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.set(0, 0, 1);

    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    this.rippleTexture = new THREE.TextureLoader().load(rippleNoiseMap);

    this.shader = {
      vertexShader: rippleVertexShader,
      fragmentShader: rippleFragmentShader,
      uniforms: {
        uTexture: { value: this.rippleTexture },
      },
      transparent: true,
    };

    const rippleGeometry = new THREE.PlaneGeometry(this.rippleOptions.size, this.rippleOptions.size);
    const rippleTexture = new THREE.TextureLoader().load(rippleNoiseMap);

    for (let i = 0; i < this.maxCountOfRippleMeshes; i++) {
      const rippleMesh = this.createRippleMesh({ geometry: rippleGeometry, texture: rippleTexture });

      rippleMesh.rotation.z = 2 * Math.PI * Math.random();
      rippleMesh.visible = false;

      this.scene.add(rippleMesh);
      this.rippleMeshes.push(rippleMesh);
    }
  }
  init() {
    this.initMouseEvents();
    this.init3DScene();
  }
  render(renderer) {
    this.startWaveAnimation();

    this.rippleMeshes.forEach(mesh => {
      if (!mesh.visible) return;

      mesh.material.opacity *= 0.96;
      mesh.rotation.z += 0.02;
      mesh.scale.x = 0.98 * mesh.scale.x + 0.1;
      mesh.scale.y = mesh.scale.x;

      if (mesh.material.opacity <= 0.02) mesh.visible = false;
    });

    renderer.setRenderTarget(this.renderTarget);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
  }
  getTexture() {
    return this.renderTarget.texture;
  }
}
























// class RingObject {
//   constructor(parent, geometry) {
//     this.parent = parent;
//     this.material = new THREE.MeshBasicMaterial({
//       transparent: true,
//       map: _glMain.parts.getTex("assets/image/texture/burash01.png"),
//     });
//     this.mesh = new THREE.Mesh(geometry, this.material);
//     this.mesh.rotation.z = (360 * Math.random() * Math.PI) / 180;
//     this.mesh.scale.x = this.mesh.scale.y = 0.25;
//     this.mesh.visible = false;
//     _glMain.world.mouseEffect.scene.add(this.mesh);
//   }

//   setPos(x, y) {
//     this.mesh.scale.x = this.mesh.scale.y = 0.2;
//     this.mesh.position.x = x;
//     this.mesh.position.y = y;
//     this.mesh.visible = true;

//     if (_glMain.scrollMng.isDown) {
//       this.material.opacity = 0.55;
//     } else {
//       this.material.opacity = 0.9;
//     }

//     _glMain.removeEnterFrame(this);
//     _glMain.addEnterFrame(this, "enterFrame");
//   }

//   enterFrame() {
//     this.mesh.rotation.z += 0.02;
//     this.material.opacity = 0.98 * this.material.opacity + 0;
//     this.mesh.scale.x = 0.982 * this.mesh.scale.x + 6 * 0.018;
//     this.mesh.scale.y = this.mesh.scale.x;

//     if (this.material.opacity <= 0.002) {
//       _glMain.removeEnterFrame(this);
//       this.mesh.visible = false;
//     }
//   }
// }

// class MouseObject {
//   constructor(parent) {
//     this.parent = parent;
//     this.count = 0;
//     this.geometry = new THREE.PlaneGeometry(64, 64, 1, 1);
//     this.mx = -1000;
//     this.my = -1000;
//     this.maxRings = 50;
//     this.ringNum = 0;
//     this.ringList = [];

//     for (let i = 0; i < this.maxRings; i++) {
//       const ring = new RingObject(this, this.geometry);
//       this.ringList.push(ring);
//     }
//   }

//   setPos(x, y) {
//     const deltaX = Math.abs(this.mx - x);
//     const deltaY = Math.abs(this.my - y);
//     this.mx = x;
//     this.my = y;
//     this.count++;

//     if (deltaX >= 4 || deltaY >= 4) {
//       const scale = 1 / _glMain.world.display.mesh.scale.x;
//       const newX = (x - 0.5 * window.innerWidth) * scale * 0.5;
//       const newY = 0.5 * -y * scale;

//       if (this.count >= 4) {
//         this.count = 0;
//         if (this.ringNum < this.maxRings) {
//           this.ringList[this.ringNum].setPos(newX, newY);
//           this.ringNum++;
//           if (this.ringNum >= this.maxRings) {
//             this.ringNum = 0;
//           }
//         }
//       }
//     }
//   }
// }

// export default class MouseTextureRenderer {
//   constructor() {
//     this.width = 1400 * 0.5;
//     this.height = 788 * 0.5;
//     this.renderTarget = null;
//     this.scene = null;
//     this.camera = null;
//     this.renderFlg = 0;
//     this.mx = 0.5 * window.innerWidth;
//     this.my = 0.5 * window.innerHeight;
//     this.mObj = null;
//     this.viewPort = null;

//     this.init();
//   }

//   init() {
//     this.setViewPort();

//     this.camera = new THREE.OrthographicCamera(this.viewPort.left, this.viewPort.right, this.viewPort.top, this.viewPort.bottom, this.viewPort.near, this.viewPort.far);
//     this.camera.position.set(0, -0.5 * this.height, 100);

//     this.scene = new THREE.Scene();

//     this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
//       magFilter: THREE.LinearFilter,
//       minFilter: THREE.LinearFilter,
//       wrapS: THREE.ClampToEdgeWrapping,
//       wrapT: THREE.ClampToEdgeWrapping,
//     });

//     this.mouseObject = new MouseObject(this);
//   }

//   enterFrame() {
//     _glMain._world._render.render(this.scene, this.camera, this.renderTarget);
//     this.mouseObject.setPos(_glMain._scrollMng.mx, _glMain._scrollMng.my);
//   }

//   setViewPort() {
//     this.viewPort = {};
//     let t = this.width;
//     let e = this.height;
//     t = t / e;

//     this.viewPort = {
//       viewSize: e,
//       aspectRatio: t,
//       left: (-t * e) / 2,
//       right: (t * e) / 2,
//       top: e / 2,
//       bottom: -e / 2,
//       near: 0,
//       far: 1e4,
//     };
//   }
// }
