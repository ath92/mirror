precision highp float;
uniform vec2 mousePosition;

void main() {
    float d = distance(mousePosition, gl_FragCoord.xy) / 1000.;
    gl_FragColor = vec4(d, 1., 0., 1.);
}
