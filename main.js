import Regl from "regl";
import resl from "resl";
import passThroughVert from "./pass-through-vert.glsl";
import frag from "./frag.glsl";

const regl = Regl({
    pixelRatio: 1,
});

const screenFillingRectangle = regl.buffer([
    [-1, -1], [1, -1], [1,  1],
    [-1, -1], [1, 1,], [-1, 1]
]);

const render = regl({
    frag,
    vert: passThroughVert,
    uniforms: {
        // mousePosition: regl.prop('mousePosition'),
        time: regl.prop('time'),
        texture: regl.prop('video'),
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
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
};

(async () => {
    const video = document.createElement('video');
    try {
        video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.body.appendChild(video);
        video.onloadedmetadata = () => {
            video.play();
            const webcam = regl.texture(video);
            regl.frame(() => {
                webcam.subimage(video);
                render({ 
                    time: performance.now(),
                    video: webcam
                });
            });
        };
    } catch (e) {
        console.log(e)
    }
})();