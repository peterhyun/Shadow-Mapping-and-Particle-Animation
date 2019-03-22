#version 300 es

out vec4 out_FragColor;

in vec3 vcsNormal;
in vec3 vcsPosition;
in vec2 texCoord;

in vec4 lightSpacePosition;

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightDirection;

uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform sampler2D aoMap;
uniform sampler2D shadowMap;

uniform float lightning;

float ShadowCalculation(vec4 fragPosLightSpace){
	vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
	projCoords = projCoords * 0.5 + 0.5;
	// Ask the TA if .r is right!
	float closestDepth = texture(shadowMap, projCoords.xy).r;
	float currentDepth = projCoords.z;
	float shadow = currentDepth - 0.0001 > closestDepth ? 1.0 : 0.0;
	return shadow;
}

void main() {
	// TANGENT SPACE NORMAL
	vec3 Nt = normalize(texture(normalMap, texCoord).xyz * 2.0 - 1.0);

	// PRE-CALCS
	// They are all in eye coordinates!!!
	vec3 Ni = normalize(vcsNormal);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirection, 0.0)));
	vec3 V = normalize(-vcsPosition);
	vec3 H = normalize((V + L) * 0.5);

	//cross Ni to up vector
	vec3 tangent = normalize(cross(Ni,vec3(0.0,1.0,0.0)));
	vec3 biTangent = normalize(cross(Ni, tangent));
	//These are all defined in the eye coordinates.
	mat3 TBH = mat3(tangent, biTangent, Ni);

	//TBH = transpose(TBH);
	L = normalize(TBH * L);
	V = normalize(TBH * V);
	H = normalize((V + L) * 0.5);

	//AMBIENT
	vec3 light_AMB = ambientColor * kAmbient * vec3(texture(aoMap, texCoord));

	//DIFFUSE
	vec3 diffuse = kDiffuse * lightColor * vec3(texture(colorMap, texCoord));
	vec3 light_DFF = diffuse * max(0.0, dot(Nt, L));

	//SPECULAR
	vec3 specular = kSpecular * lightColor;
	vec3 light_SPC = specular * pow(max(0.0, dot(H, Nt)), shininess);

	float shadow = 0.0;
	shadow = ShadowCalculation(lightSpacePosition);

	//TOTAL
	vec3 TOTAL = light_AMB + (1.0-shadow) * (light_DFF + light_SPC);

	out_FragColor = vec4(TOTAL*lightning, 1.0);
}
