varying vec2 vUv;
    
uniform sampler2D uTexture;
uniform vec2 u_resolution;

void main() {
  vec4 texture = texture2D(uTexture, vUv);

  gl_FragColor = texture;
}