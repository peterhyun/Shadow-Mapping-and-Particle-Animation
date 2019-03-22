#version 300 es

out vec4 out_FragColor;

uniform samplerCube skybox;

in vec3 texCoord;

void main() {
	out_FragColor = texture(skybox, texCoord);
}
