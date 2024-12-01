
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    // varyings
    vUv = uv;
    vPosition = position;
    vNormal = normal;
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );	
	gl_Position = projectionMatrix * mvPosition;
}