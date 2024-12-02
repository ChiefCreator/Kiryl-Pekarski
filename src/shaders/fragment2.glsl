#define PI 3.14159265359

uniform sampler2D texturePattern;
uniform sampler2D uDisplacement;
uniform sampler2D noise;
uniform sampler2D tDiffuse;
uniform sampler2D uWavesTexture;

uniform float time;
uniform float ease;
uniform float alpha;
uniform float meEase;
uniform float mfBlack;
uniform float distA;
uniform float distB;

uniform float progress;
uniform float scale;

varying vec2 vUv;

void main() {	
	vec2 ppp = 2.0 * vUv - 1.0;
	float wscale = 1.6;
	
	ppp += 0.1 * cos( ( 1.5 * wscale ) * ppp.yx + 1.1 * time + vec2(0.1,1.1) );
	ppp += 0.1 * cos( ( 2.3 * wscale ) * ppp.yx + 1.3 * time + vec2(3.2,3.4) );
	ppp += 0.1 * cos( ( 2.2 * wscale ) * ppp.yx + 1.7 * time + vec2(1.8,5.2) );
	ppp += distA * cos( ( distB * wscale ) * ppp.yx + 1.4 * time + vec2(6.3,3.9) );
	
	float r = length( ppp );

	vec4 waveData = texture2D(uWavesTexture, vUv);
    float distortion = waveData.r / 60.0;

	vec2 newUv = vec2(mix(vUv.x + distortion / 2.0, r / 1.8 + distortion, progress), mix(vUv.y + distortion / 2.0, 0.5 / 1.8 + distortion, progress));
			
	vec4 color = texture2D( tDiffuse, newUv );
	gl_FragColor = color;
}