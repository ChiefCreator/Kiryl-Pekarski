import * as THREE from "three";

export function getMeshSizeByHtmlElement(element, viewportSettings) {
  const rect = element.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  return {
    width: (width / viewportSettings.width) * viewportSettings.aspectRatio * 2,
    height: (height / viewportSettings.height) * 2,
  };
}

export function adjustTextureToCover(texture, planeWidth, planeHeight) {
  const imageAspect = texture.image.width / texture.image.height;
  const planeAspect = planeWidth / planeHeight;

  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1);
  } else {
    texture.repeat.set(1, imageAspect / planeAspect);
  }

  texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
}

export function loadTexture(loader, path) {
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (texture) => resolve(texture),
      undefined,
      (error) => reject(error)
    );
  });
}
