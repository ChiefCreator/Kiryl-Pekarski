
const int maxColorsLength = 5;
uniform vec3 uColors[maxColorsLength];
uniform float uRanges[maxColorsLength];
uniform float uTime;

varying vec2 vUv;

float noise(float x) {
    return sin(x) * 0.5 + 0.5;
}
float generateNoise(vec2 uv, float frequency, float amplitude, float speed, float time) {
    uv *= frequency;

    float noiseValue = noise(uv.x + time * speed); // Можно добавить time для анимации

    noiseValue *= amplitude;

    return noiseValue;
}
 
vec3 interpolateColors(float value) {
    vec3 result = vec3(0.0);
for (int i = 0; i < maxColorsLength - 1; i++) {
                if (value >= uRanges[i] && value <= uRanges[i + 1]) {
                    float t = (value - uRanges[i]) / (uRanges[i + 1] - uRanges[i]);
                    result = mix(uColors[i], uColors[i + 1], t);
                    break;
                }
            }
    return result;
}

void main() {
    float frequency = 1000.0;
    float amplitude = 0.5;
    float speed = 5.0;
    float time = 1.0;

    float noiseValue = generateNoise(vUv, frequency, amplitude, speed, time);
    // vec3 color = vec3(0.0);

    float normalizedNoise = fract(noiseValue);

    //  for (int i = 0; i < maxColorsLength; i++) {
    //     float minRange = uRanges[i].x;
    //     float maxRange = uRanges[i].y;

    //     if (normalizedNoise >= minRange && normalizedNoise <= maxRange) {
    //         color = uColors[i];
    //         break;
    //     }
    // }

    vec3 color = interpolateColors(normalizedNoise); // Интерполяция цветов
    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(vec3(normalizedNoise), 1.0);
}


