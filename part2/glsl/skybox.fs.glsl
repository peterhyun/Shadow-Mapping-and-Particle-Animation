#version 300 es

out vec4 out_FragColor;

uniform samplerCube skybox;

in vec3 texCoord;

uniform float lightning;

void main() {
	vec4 temp = texture(skybox, texCoord);
	temp.rgb = lightning * temp.rgb;
	out_FragColor = temp;
}
