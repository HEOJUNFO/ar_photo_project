<template>
    <div>
        <div class="webcam" id="image">
            <canvas class="canvas1" id="canvas1"
                :style="{ display: canvas1Display, position: 'relative', zIndex: 1 }"></canvas>
            <video class="video" id="webcam" playsinline="true"
                :style="{ display: videoDisplay, overflow: 'hidden' }"></video>
            <img v-show="!showCaptureButton" class="canvas1" id="face"
                src="https://cdn.glitch.global/eb18e63f-936a-4172-8bdd-9263c7a6a04a/0.jpg?v=1689605799161"
                crossorigin="anonymous" title="Click to get segmentation!" />
        </div>
        <div v-show="showCaptureButton" class="capture-container">
            <button @click.stop="capture()">촬영</button>
        </div>
        <div v-show="!showCaptureButton" class="png-buttons-container">
            <button @click="colVal('none')" class="png-button" style="background-image: url('path_to_png_1.png')"></button>
            <button @click="colVal('#A52A2A')" class="png-button"
                style="background-image: url('../resource/culture2/hair_01_redbrown.png')"></button>
            <button @click="colVal('#98623c')" class="png-button"
                style="background-image: url('../resource/culture2/hair_02_ashbrown.png')"></button>
            <button @click="colVal('#0047AB')" class="png-button"
                style="background-image: url('../resource/culture2/hair_03_corbaltblue.png')"></button>
            <button @click="colVal('#B2BEB5')" class="png-button"
                style="background-image: url('../resource/culture2/hair_04_ashgray.png')"></button>
            <button @click="colVal('#7B3F00')" class="png-button"
                style="background-image: url('../resource/culture2/hair_05_chocobrown.png')"></button>
            <button @click="colVal('#8f8395')" class="png-button"
                style="background-image: url('../resource/culture2/hair_06_ashpurple.png')"></button>
        </div>
    </div>
</template>

<script>
import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const { ImageSegmenter, SegmentationMask, FilesetResolver } = vision;
let runningMode = "VIDEO"
let imageSegmenter = null;
let labels = [];
let isCapture = false;
let webcamRunning = false;
let legendColors = [
    [0, 0, 0, 0],
    [165, 42, 42, 255],
];

export default {
    data() {
        return {
            canvas1Display: 'none',
            videoDisplay: 'block',
            showCaptureButton: true,

        };
    },
    async created() {
        try {
            await this.createImageSegmenter();
        }
        catch (e) {
            console.log(e)
        }
        this.init();
    },
    methods: {
        colVal(d) {
            if (d === 'none') {
                this.canvas1Display = 'none';
                let canvas = document.getElementById("canvas1");
                canvas.style.display = 'none';
                return;
            }
            const hexToRgb = hex =>
                hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
                    .substring(1).match(/.{2}/g)
                    .map(x => parseInt(x, 16))

            console.log(d)
            let hex = hexToRgb(d);
            hex[3] = 255;
            legendColors[1] = hex;
        },
        capture() {
            let video = document.getElementById("webcam");
            let image = document.getElementById("image");
            let img = document.getElementById("face");

            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext('2d');

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            img.src = canvas.toDataURL();

            video.style.display = 'none';
            image.style.height = '90vh';
            image.style.top = '10vh';

            webcamRunning = false;

            isCapture = true;
            this.showCaptureButton = false;
        },
        async createImageSegmenter() {
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "https://cdn.glitch.global/eb18e63f-936a-4172-8bdd-9263c7a6a04a/hair_segmenter.tflite?v=1689603953377",
                    delegate: "CPU"
                },
                runningMode: runningMode,
                outputCategoryMask: true,
                outputConfidenceMasks: true
            });
            labels = imageSegmenter.getLabels();
        },
        init() {
            let video = document.getElementById("webcam");
            let canvasElement = document.getElementById("canvas1");

            const canvasCtx = canvasElement.getContext("2d", { willReadFrequently: true })

            let enableWebcamButton;
            webcamRunning = false;

            function callbackForVideo(result) {
                if (isCapture === false) {
                    canvasElement.style.display = 'none';
                } else {
                    // canvasElement.style.display = 'block';
                }

                let imageData = canvasCtx.getImageData(0, 0, video.videoWidth, video.videoHeight);
                let data = imageData.data;
                const mask = result.categoryMask.getAsFloat32Array();

                for (let i = 0, j = 0; i < mask.length; i++, j += 4) {
                    const maskVal = Math.round(mask[i] * 255.0);
                    if (maskVal > 0 && maskVal % legendColors.length !== 0) {
                        const legendColor = legendColors[1];

                        data[j] = (legendColor[0] + data[j]) / 2;
                        data[j + 1] = (legendColor[1] + data[j + 1]) / 2;
                        data[j + 2] = (legendColor[2] + data[j + 2]) / 2;
                        data[j + 3] = (legendColor[3] + data[j + 3]) / 2;
                    }
                }

                canvasCtx.imageSmoothingEnabled = true;
                canvasCtx.putImageData(imageData, 0, 0);

                if (webcamRunning) {
                    window.requestAnimationFrame(predictWebcam);
                }
            }

            let lastWebcamTime = -1;
            let lastRequestTime = 0;
            async function predictWebcam() {
                const currentTime = video.currentTime;

                if (currentTime === lastWebcamTime) {
                    return;
                }
                lastWebcamTime = currentTime;

                if (imageSegmenter !== undefined) {
                    canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                } else {
                    return;
                }

                if (runningMode === "IMAGE") {
                    runningMode = "VIDEO";
                    await imageSegmenter.setOptions({
                        runningMode: runningMode
                    });
                }

                let startTimeMs = performance.now();
                imageSegmenter.segmentForVideo(video, startTimeMs, callbackForVideo);
            }

            const imageContainers = document.getElementsByClassName("png-buttons-container");

            for (let i = 1; i < 7; i++) {

                imageContainers[0]
                    .getElementsByTagName("button")[i]
                    .addEventListener("click", handleClick);
            }

            let canvasClick;
            async function handleClick(event) {


                if (imageSegmenter === undefined) {
                    return;
                }
                canvasClick = document.getElementById("canvas1");
                canvasClick.style.display = 'block';
                let img = document.getElementById("face");

                const cxt = canvasClick.getContext("2d");

                const imageUrl = canvasClick.toDataURL();
                const a = document.createElement('a');
                a.href = imageUrl;
                a.download = 'canvasImage.png';  // 다운로드될 파일의 이름을 지정합니다.
                a.textContent = 'Download Image';
                // a.click();




                canvasClick.width = document.getElementById("face").naturalWidth;
                canvasClick.height = document.getElementById("face").naturalHeight;


                cxt.clearRect(0, 0, canvasClick.width, canvasClick.height);
                cxt.drawImage(img, 0, 0, canvasClick.width, canvasClick.height);


                if (runningMode === "VIDEO") {
                    runningMode = "IMAGE";
                    await imageSegmenter.setOptions({
                        runningMode: runningMode
                    });
                }

                imageSegmenter.segment(img, callback);
            }
            function callback(result) {
                const cxt = canvasClick.getContext("2d");
                const { width, height } = result.categoryMask;
                let imageData = cxt.getImageData(0, 0, width, height).data;
                canvasClick.width = width;
                canvasClick.height = height;
                let category = "";
                const mask = result.categoryMask.getAsUint8Array();
                for (let i in mask) {
                    if (mask[i] > 0) {
                        category = labels[mask[i]];
                    }

                    if (mask[i] % legendColors.length == 1) {
                        const legendColor = legendColors[1];
                        imageData[i * 4] = (legendColor[0] + imageData[i * 4]) / 2;
                        imageData[i * 4 + 1] = (legendColor[1] + imageData[i * 4 + 1]) / 2;
                        imageData[i * 4 + 2] = (legendColor[2] + imageData[i * 4 + 2]) / 2;
                        imageData[i * 4 + 3] = (legendColor[3] + imageData[i * 4 + 3]) / 2;
                    }
                }
                const uint8Array = new Uint8ClampedArray(imageData.buffer);
                const dataNew = new ImageData(uint8Array, width, height);
                canvasClick.imageSmoothingEnabled = true;
                cxt.putImageData(dataNew, 0, 0);

            }

            function hasGetUserMedia() {
                return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            }

            async function enableCam(event) {
                if (imageSegmenter === undefined) {
                    return;
                }
                if (webcamRunning === true) {
                    webcamRunning = false;

                }
                else {
                    webcamRunning = true;

                }

                const constraints = {
                    video: true
                };
                video = document.getElementById("webcam");

                video.addEventListener('loadedmetadata', function () {
                    video.setAttribute('width', this.videoWidth);
                    video.setAttribute('height', this.videoHeight);
                    document.getElementById('canvas1').setAttribute('width', this.videoWidth);
                    document.getElementById('canvas1').setAttribute('height', this.videoHeight);
                });

                video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
                video.addEventListener("loadeddata", predictWebcam);
                video.play();
                video.style.display = 'block';
            }


            if (hasGetUserMedia()) {
                enableWebcamButton = document.getElementById("webcamButton");
                setTimeout(() => {
                    enableCam();
                }, 1000);
            }
            else {
                console.warn("getUserMedia() is not supported by your browser");
            }
        }
    },

    async enableCam() {
        if (imageSegmenter === undefined) {
            return;
        }
        if (webcamRunning === true) {
            webcamRunning = false;

        }
        else {
            webcamRunning = true;

        }

        const constraints = {
            video: true
        };
        video = document.getElementById("webcam");

        video.addEventListener('loadedmetadata', function () {
            video.setAttribute('width', this.videoWidth);
            video.setAttribute('height', this.videoHeight);
            document.getElementById('canvas1').setAttribute('width', this.videoWidth);
            document.getElementById('canvas1').setAttribute('height', this.videoHeight);
        });

        video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        video.addEventListener("loadeddata", predictWebcam);
        video.play();
        video.style.display = 'none';
    },


}
</script>

<style scoped>
.capture-container {
    position: absolute;
    top: 85vh;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.capture-container button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #555;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}

.webcam {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
}

.canvas1 {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
}

.png-buttons-container {
    display: grid;
    grid-template-columns: repeat(7, 80px);
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10vh;
    align-items: center;
}

.png-button {
    width: 60px;
    height: 60px;
    border: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #fff;
    cursor: pointer;
}

.png-button:hover {
    border: 1px solid #000;
}
</style>
