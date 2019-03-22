#version 300 es

out vec4 out_FragColor;

in vec3 vcsNormal;
in vec3 vcsPosition;

uniform vec3 lightDirection;

uniform samplerCube skybox;

uniform mat4 matrixWorldInverse;

uniform float lightning;

void main( void ) {

  vec3 I = normalize(vcsPosition);
  vec3 N = normalize(vcsNormal);

  vec3 R = reflect(I,N);

  R = vec3(matrixWorldInverse * vec4(R, 0.0));

  out_FragColor = vec4((texture(skybox, R).rgb) * lightning, 1.0);

}
