
#define PI 3.14159265359

uniform sampler2D texturePattern;
uniform sampler2D uDisplacement;
uniform sampler2D noise;

uniform float time;
uniform float ease;
uniform float alpha;
uniform float meEase;
uniform float mfBlack;
uniform float distA;
uniform float distB;

varying vec2 vUv;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
	vec3 noiseC = texture2D( noise, vec2(vUv.x * 0.3, vUv.y * 0.3) ).rgb;
		
	vec2 ppp = -1.0 + 2.0 * vUv;
	
	float wscale = 1.6;

	vec4 mfColor = texture2D( uDisplacement, vUv );
	float mfSin = sin(mfColor.r);
	float strength = meEase;
	
	ppp += 0.1 * cos( ( 1.5 * wscale ) * ppp.yx + 1.1 * time + vec2(0.1,1.1) + strength * 5.0 * mfSin );
	ppp += 0.1 * cos( ( 2.3 * wscale ) * ppp.yx + 1.3 * time + vec2(3.2,3.4) );
	ppp += 0.1 * cos( ( 2.2 * wscale ) * ppp.yx + 1.7 * time + vec2(1.8,5.2) );
	ppp += distA * cos( ( distB * wscale ) * ppp.yx + 1.4 * time + vec2(6.3,3.9) );
	
	float r = length( ppp );
	
	float vx = (vUv.x * ease) + (r * (1.0 - ease));
	float vy = (vUv.y * ease) + (0.0 * (1.0 - ease));
	
	vec2 effectUv = vec2(vx, vy) + strength * vec2(mfSin, mfSin);
		
	vec4 col1 = texture2D( texturePattern, effectUv );

	vec4 no = vec4(vec2(r + strength * mfSin), 0.0, r + strength * mfSin);
	
	vec3 mixCol = col1.rgb;

	float aa2 = no.a * alpha - ( r * 0.6 * ( 1.0 - ease ) );

	vec4 color = vec4( no.xxx, aa2 * ( 1.0 - mfColor.r * mfBlack ) );
	
	// if ( r > .6 && r < .9) gl_FragColor = vec4(mixCol, 1.0);
	// else gl_FragColor = vec4(color.xyz, 0.0);
	gl_FragColor = vec4(mixCol, 1.0);
//   gl_FragColor = vec4(mixCol, 1.0);
  gl_FragColor = vec4(vec3(effectUv.x), 1.0);
}