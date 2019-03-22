#version 300 es

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
