
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
    // varyings
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec4 modelViewPosition =  modelViewMatrix * vec4( position, 1.0 );
       vWorldPosition = modelViewPosition.xyz;
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
	gl_Position = projectedPosition;
}