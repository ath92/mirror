precision highp float;
uniform float time;
varying vec2 uv;
uniform sampler2D texture;

void main() {
    float d = distance(vec2(0, 0), uv);
    // float g = sin(gl_FragCoord.y * d * (sin(time / 10000. - 1.6))) / 10.;
    float hor = sin(gl_FragCoord.x / 100.) * d / 2.;
    float ver = cos(gl_FragCoord.y / 100.) * d / 2.;
    float g = hor * ver;
    vec4 color = texture2D(texture, vec2(.5 + .5 * uv.x, .5 + .5 * -uv.y) + vec2(g));
    gl_FragColor = color;
}
