import * as THREE from "three";

import sphereVertexShaderPars from "./../../../shaders/sphereVertexShaderPars.glsl";
import sphereVertexShaderMain from "./../../../shaders/sphereVertexShaderMain.glsl";

import sphereFragmentShaderPars from "./../../../shaders/sphereFragmentShaderPars.glsl";
import sphereFragmentShaderMain from "./../../../shaders/sphereFragmentShaderMain.glsl";

import mainTexture from "./../../../img/main-texture.png";

export default class Blob {
  constructor({ data }) {
    this.blob = null;
    this.data = data;

    this.init();
  }

  // Создание модели капли (Blob)
  initLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  getGeometry() {
    return new THREE.IcosahedronGeometry(this.data.geometry.radius, this.data.geometry.detail);
  }
  getMaterial() {
    const material = new THREE.MeshStandardMaterial({
      metalness: 1,
      roughness: .25,
      envMap: this.cubeTextureLoader.load([mainTexture, mainTexture, mainTexture, mainTexture, mainTexture, mainTexture]),
      onBeforeCompile: (shader) => {
        material.userData.shader = shader
  
        shader.uniforms.time = { value: 0.0 };
        shader.uniforms.radius = { value: this.data.geometry.radius };
        shader.uniforms.distort = { value: this.data.material.shaders.blobNoise.distortion };
        shader.uniforms.frequency = { value: this.data.material.shaders.blobNoise.frequency };
        shader.uniforms.speed = { value: this.data.material.shaders.blobNoise.speed };
        shader.uniforms.gooPoleAmount = { value: this.data.material.shaders.blobNoise.poleAmount };

        shader.uniforms.surfaceTime = { value: 0 };
        shader.uniforms.surfaceDistort = { value: this.data.material.shaders.blobSurfaceNoise.distortion };
        shader.uniforms.surfaceFrequency = { value: this.data.material.shaders.blobSurfaceNoise.frequency };
        shader.uniforms.surfaceSpeed = { value: this.data.material.shaders.blobSurfaceNoise.speed };
        shader.uniforms.numberOfWaves = { value: this.data.material.shaders.blobSurfaceNoise.wavesNumber };
        shader.uniforms.fixNormals = { value: this.data.geometry.fixNormals };
        shader.uniforms.surfacePoleAmount = { value: this.data.material.shaders.blobSurfaceNoise.poleAmount };
        shader.uniforms.noisePeriod = { value: 4 };
  
        const parsVertexString = /* glsl */ `#include <displacementmap_pars_vertex>`
        shader.vertexShader = shader.vertexShader.replace(
          parsVertexString,
          parsVertexString + sphereVertexShaderPars
        )
  
        const mainVertexString = /* glsl */ `#include <displacementmap_vertex>`
        shader.vertexShader = shader.vertexShader.replace(
          mainVertexString,
          mainVertexString + sphereVertexShaderMain
        )
  
        const mainFragmentString = /* glsl */ `#include <normal_fragment_maps>`
        const parsFragmentString = /* glsl */ `#include <bumpmap_pars_fragment>`
        shader.fragmentShader = shader.fragmentShader.replace(
          parsFragmentString,
          parsFragmentString + sphereFragmentShaderPars
        )
        shader.fragmentShader = shader.fragmentShader.replace(
          mainFragmentString,
          mainFragmentString + sphereFragmentShaderMain
        )
      },
    });
    return material;
    // return new THREE.ShaderMaterial({
    //   uniforms: {
    //     time: { value: 0.0 },
    //     radius: { value: this.data.geometry.radius },
    //     distort: { value: this.data.material.shaders.blobNoise.distortion },
    //     frequency: { value: this.data.material.shaders.blobNoise.frequency },
    //     speed: { value: this.data.material.shaders.blobNoise.speed },
    //     gooPoleAmount: { value: this.data.material.shaders.blobNoise.poleAmount },

    //     surfaceTime: { value: 0 },
    //     surfaceDistort: { value: this.data.material.shaders.blobSurfaceNoise.distortion },
    //     surfaceFrequency: { value: this.data.material.shaders.blobSurfaceNoise.frequency },
    //     surfaceSpeed: { value: this.data.material.shaders.blobSurfaceNoise.speed },
    //     numberOfWaves: { value: this.data.material.shaders.blobSurfaceNoise.wavesNumber },
    //     fixNormals: { value: this.data.geometry.fixNormals },
    //     surfacePoleAmount: { value: this.data.material.shaders.blobSurfaceNoise.poleAmount },
    //     noisePeriod: { value: 4 },
    //   },
    //   vertexShader: sphereVertexShader,
    //   fragmentShader: sphereFragmentShader,
    // });
  }
  initModel() {
    const blobGeometry = this.getGeometry();
    const blobMaterial = this.getMaterial();

    this.blob = new THREE.Mesh(blobGeometry, blobMaterial);
  }

  // Обновление при изменении данных Blob-а
  updateData(data) {
    this.data = data;

    // this.updateGeometry();
    this.updateMaterial();
  }
  updateGeometry() {
    this.blob.geometry.dispose();
    this.blob.geometry = this.getGeometry();
  }
  updateMaterial() {
    this.blob.material.dispose();
    this.blob.material = this.getMaterial();
  }

  // Инициализация и рендеринг
  init() {
    this.initLoaders();
    this.initModel();
  }
  render() {
    return this.blob;
  }
}