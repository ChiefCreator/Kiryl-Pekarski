#define PI 3.14159265359

uniform sampler2D tDiffuse;
uniform sampler2D uWavesTexture;

varying vec2 vUv;

void main() {	
	vec4 waveData = texture2D(uWavesTexture, vUv);
    float distortion = waveData.r / 60.0;

	vec2 newUv = vec2(vUv.x + distortion / 2.0, vUv.y + distortion / 2.0);
			
	vec4 color = texture2D( tDiffuse, newUv );
	gl_FragColor = color;
}