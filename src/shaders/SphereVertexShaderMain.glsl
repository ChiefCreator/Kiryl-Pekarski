
float yPos = smoothstep(-1.0, 1.0, position.y);
float amount = sin(yPos * PI);
float wavePoleAmount = mix(amount * 1.0, 1.0, surfacePoleAmount);
float gooPoleAmount = mix(amount * 1.0, 1.0, gooPoleAmount);
float goo = pnoise(vec3(position / frequency + mod(time, noisePeriod)), vec3(noisePeriod)) * pow(distort, 2.0);

float surfaceNoise = pnoise(vec3(position / surfaceFrequency + mod(surfaceTime, noisePeriod)), vec3(noisePeriod));
float waves = (position.x * sin((position.y + surfaceNoise) * PI * numberOfWaves) + position.z * cos((position.y + surfaceNoise) * PI * numberOfWaves)) * 0.01 * pow(surfaceDistort, 2.0);

float combinedNoise = waves * wavePoleAmount + goo * gooPoleAmount;

// varyings
vDisplacement = combinedNoise;

float displacement = vDisplacement;

transformed += normalize(objectNormal) * displacement;