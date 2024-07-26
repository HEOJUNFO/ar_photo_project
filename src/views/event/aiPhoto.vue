<template>
    <div class="main">
        <div class="top-section">
            <button></button>
            <button></button>
            <button @click="showModal = true, showHashTag = false"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                    height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_541_1827" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1827)">
                        <path
                            d="M20 21.4L15.1 26.3C14.9167 26.4833 14.6833 26.575 14.4 26.575C14.1167 26.575 13.8833 26.4833 13.7 26.3C13.5167 26.1167 13.425 25.8833 13.425 25.6C13.425 25.3167 13.5167 25.0833 13.7 24.9L18.6 20L13.7 15.1C13.5167 14.9167 13.425 14.6833 13.425 14.4C13.425 14.1167 13.5167 13.8833 13.7 13.7C13.8833 13.5167 14.1167 13.425 14.4 13.425C14.6833 13.425 14.9167 13.5167 15.1 13.7L20 18.6L24.9 13.7C25.0833 13.5167 25.3167 13.425 25.6 13.425C25.8833 13.425 26.1167 13.5167 26.3 13.7C26.4833 13.8833 26.575 14.1167 26.575 14.4C26.575 14.6833 26.4833 14.9167 26.3 15.1L21.4 20L26.3 24.9C26.4833 25.0833 26.575 25.3167 26.575 25.6C26.575 25.8833 26.4833 26.1167 26.3 26.3C26.1167 26.4833 25.8833 26.575 25.6 26.575C25.3167 26.575 25.0833 26.4833 24.9 26.3L20 21.4Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
        </div>

        <div class="image-container" :style="{ width: imageDataStore.width, height: imageDataStore.height }">
            <img :src="imageDataStore.imageData" />
        </div>
        <div class="bottom-section">
            <button @click="changeImageKorea()">한국</button>
            <button @click="">일본</button>
            <button @click="">중국</button>
        </div>

        <div v-if="showModal" class="modal">
            <p>정말 종료하시겠습니까?</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="back()">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '../../stores/imageData.js'
import { onMounted, ref } from 'vue';
import router from '../../router';
import OpenAI from 'openai';

export default {
    name: 'captureReview',
    setup() {
        const showModal = ref(false);


        const imageDataStore = useImageDataStore()

        const changeImageKorea = async () => {
            function base64ToBlob(base64, mime) {
                const byteString = atob(base64);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);

                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ab], { type: mime });
            }

            function base64ToFile(base64, filename) {
                const [header, data] = base64.split(',');
                const mime = header.match(/:(.*?);/)[1];
                const blob = base64ToBlob(data, mime);
                return new File([blob], filename, { type: mime });
            }

            function makeCenterTransparent(img, mime) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the original image on the canvas
                ctx.drawImage(img, 0, 0);

                // Define the transparent region
                const width = img.width;
                const height = img.height;
                const centerX = width / 2;
                const centerY = height / 2;
                const transparentWidth = width * 0.8;
                const transparentHeight = height * 0.8;

                // Clear the center area (make it transparent)
                ctx.clearRect(centerX - transparentWidth / 2, centerY - transparentHeight / 2, transparentWidth, transparentHeight);

                // Convert canvas to base64
                return canvas.toDataURL(mime);
            }

            function downloadBase64File(base64Data, filename) {
                const link = document.createElement('a');
                link.href = base64Data;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            const base64Data = imageDataStore.imageData;
            const [header, data] = base64Data.split(',');
            const mime = header.match(/:(.*?);/)[1];
            const originalFile = base64ToFile(base64Data, "image.png");

            // Create a temporary image to get the dimensions
            const tempImg = new Image();
            tempImg.src = base64Data;
            tempImg.onload = async () => {
                const newBase64Data = makeCenterTransparent(tempImg, mime);
                const maskFile = base64ToFile(newBase64Data, "mask.png");

                // Convert the new base64 data to a file and trigger download
                downloadBase64File(newBase64Data, "image_with_transparent_center.png");

                console.log('imagechange');
                const response = await openai.images.edit({
                    model: "dall-e-2",
                    image: originalFile,
                    mask: maskFile,
                    prompt: "원본사진 최대한 유지하면서 사진에 사람이 안보이게 해줘",
                    n: 1,
                    size: "1024x1024"
                });
                const image_url = response.data[0].url;
                console.log(image_url);

            };
        };


        const closeModal = () => {
            showModal.value = false;
        };

        const back = () => {
            router.push('/review')
        };

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);

            imageDataStore.getImageData();
            imageDataStore.getCanvasSize();

        });

        return {
            back,
            showModal,
            closeModal,
            imageDataStore,
            changeImageKorea
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

.image-container {

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-container img {
    width: 100%;
    height: 100%;
    position: absolute;
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
    justify-content: center;
    align-items: center;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.bottom-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}


.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(15 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 20px;
    padding-bottom: 10px;
    transform: translate(-50%, -50%);
}

.modal p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal button {
    width: 40%;
    padding: 10px;
}


.modal button:first-child {
    border-radius: 100px;
    border: 2px solid var(--Text-Gray, #767676);
    background: #D9D9D9;
    color: var(--Text-Gray, #545454);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin-right: 2%;
    box-shadow: 0px 3px #767676
}

.modal button:last-child {
    border-radius: 100px;
    border: 2px solid var(--Dark-Red, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-Black, #fff);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    box-shadow: 0px 3px #922142
}

.top-section {
    display: flex;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: #fff
}

.top-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 15%;
    height: 100%;

}

.top-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}
</style>