<template>
    <div class="main">
        <loading-container @closed="handleClose()">
        </loading-container>
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <video class="video" ref="videoRef" autoplay></video>
        <canvas class="canvas" ref="canvasRef"></canvas>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'
import LoadingContainer from '../components/LoadingContainer.vue'

export default {
    name: 'ImageTracking',
    components: {
        LoadingContainer
    },
    setup() {
        const textIndex = ref(5)
        const characterStore = useCharacterStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common2[textIndex.value] || {}
        })


        let typingTimeout;

        const typeText = () => {
            const content = currentCharacterContent.value.text;
            const textContainer = document.getElementById("typed-text");
            let index = 0;

            clearTimeout(typingTimeout);

            textContainer.textContent = "";

            function typing() {
                if (index < content.length) {
                    textContainer.textContent += content.charAt(index);
                    index++;
                    typingTimeout = setTimeout(typing, 50);
                }
            }
            typing();
        };

        const handleClose = () => {
            setTimeout(() => {
                typeText()
            }, 1000);
        }

        const videoRef = ref(null);
        const canvasRef = ref(null);


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(async () => {
            setVH();
            window.addEventListener('resize', setVH);

            const video = videoRef.value;
            const canvas = canvasRef.value;
            if (!video || !canvas) return;

            const context = canvas.getContext('2d', { willReadFrequently: true });

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment'
                    }
                });
                video.srcObject = stream;

                video.addEventListener('loadedmetadata', () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    video.play().catch(error => console.error('Play error:', error));
                });

                const colors = new tracking.ColorTracker(['yellow']);

                tracking.track(video, colors, { camera: true });

                colors.on('track', event => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    event.data.forEach(rect => {
                        context.strokeStyle = '#a64ceb';
                        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                        context.font = '11px Helvetica';
                        context.fillStyle = "#fff";
                        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                    });
                });
            } catch (err) {
                console.error('Error accessing the camera', err);
            }
        });

        return {
            videoRef,
            canvasRef,
            characterContent: currentCharacterContent,
            handleClose,
        }
    }
};
</script>

<style scoped>
.main {
    position: relative;
    width: 100vw;
    height: calc(100 * var(--vh));
    overflow: hidden;
}

.video,
.canvas {
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
    object-fit: cover;
}



.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: calc(5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 90%;
    position: relative;
    border: 2px dashed #D50F4A;
    border-radius: 16px;
}

.text-container1 p {
    overflow: hidden;
    padding: 20px 10px 20px 10px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    max-width: 30ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: left;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 2.5%;
    top: calc(2.5 * var(--vh));
    z-index: 2;
}

.side-image-container img {
    background-color: #fff;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
    border: 1px solid #D50F4A;
    border-radius: 100px;
}
</style>

