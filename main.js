import Regl from "regl";
import passThroughVert from "./pass-through-vert.glsl";
import frag from "./frag.glsl";

const regl = Regl();

const screenFillingRectangle = regl.buffer([
    [-1, -1], [1, -1], [1,  1],
    [-1, -1], [1, 1,], [-1, 1]
]);
    
const render = regl({
    frag,
    vert: passThroughVert,
    uniforms: {
        mousePosition: regl.prop('mousePosition'),
    },
    attributes: {
        position: screenFillingRectangle,
    },
    count: 6,
});

const mouse = {
    x: 0,
    y: 0,
};

window.onload = () => {
    document.addEventListener("mousemove", (e) => {
        mouse.x = e.screenX;
        mouse.y = e.screenY;
    });
};

requestAnimationFrame(function loop() {
    render({
        mousePosition: [mouse.x, -mouse.y],
    });
    requestAnimationFrame(loop);
});
