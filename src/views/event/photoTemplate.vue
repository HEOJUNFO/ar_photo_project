<template>
    <div class="main">
        <div id="webgl" class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="bottom-section">

            <button class="button1" onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70"
                    height="70" viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle opacity="0.3" cx="35" cy="35" r="33.5" stroke="#D50F4A" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
        </div>
        <div class="frame">
            <img src="https://cdn.jsdelivr.net/gh/HEOJUNFO/pin/filter.png" alt="봄" />
        </div>
    </div>
</template>

<script>
import Experience from '../../ar/capture/Experience.js'
import { onMounted, ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../router';
import { useImageDataStore } from '../../stores/imageData.js'

export default {
    name: 'capture',
    setup() {

        let experience;
        const imageDataStore = useImageDataStore()

        const eventName = ref('capture')

        const saveImage = (image) => {
            imageDataStore.setImageData(image);
            imageDataStore.setEventName(eventName.value);

            // Assuming the image is in a canvas or an Image element and needs to be converted to a data URL
            let imageDataUrl = image;

            // If the image is an HTMLImageElement or CanvasElement, convert it to a data URL
            if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                // Set canvas dimensions to the image dimensions
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0, image.width, image.height);

                // Get the data URL of the image
                imageDataUrl = canvas.toDataURL();
            }

            // Save the image data URL to local storage
            localStorage.setItem('savedImage', imageDataUrl);

            let canvas = document.querySelector('canvas.webgl');
            let width = canvas.style.width;
            let height = canvas.style.height;
            imageDataStore.setCanvasSize(width, height);

            localStorage.setItem('canvasSize', JSON.stringify({ width, height }));

        }

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);
            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
            experience.resources.on('ready', () => {
                setTimeout(() => {

                }, 1000);
            })
        });

        return {

        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.webgl-container {
    height: calc(75 * var(--vh));
    width: calc((4/6) * 75 * var(--vh));
    top: calc(10 * var(--vh));
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.webgl {
    position: relative;
    outline: none;
}

.bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(15 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: #fff;
    position: absolute;
    bottom: 0;
}

.bottom-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.button1 svg {
    width: auto;
    height: calc(10* var(--vh));

}

.frame {
    position: absolute;
    top: calc(10* var(--vh));
    height: calc(75 * var(--vh));
    width: calc((4/6) * 75 * var(--vh));
    pointer-events: none;
}

.frame img {
    width: 100%;
    height: 100%;
}
</style>