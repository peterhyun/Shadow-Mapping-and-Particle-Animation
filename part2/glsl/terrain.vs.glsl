#version 300 es

out vec3 vcsNormal;
out vec3 vcsPosition;
out vec2 texCoord;

uniform mat4 lightProjectMatrix;
uniform mat4 lightViewMatrix;

out vec4 lightSpacePosition;

void main() {
	// view coordinate system
	vcsNormal = normalMatrix * normal;
	vcsPosition = vec3(modelViewMatrix * vec4(position, 1.0));
	texCoord = uv;

	lightSpacePosition = lightProjectMatrix * lightViewMatrix * modelMatrix * vec4(position,1.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
