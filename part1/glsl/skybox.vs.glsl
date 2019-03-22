#version 300 es

out vec3 texCoord;

void main() {
	gl_Position = projectionMatrix * mat4(mat3(viewMatrix)) * modelMatrix * vec4(position, 1.0);
	texCoord = position;
}
