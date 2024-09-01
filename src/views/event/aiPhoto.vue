<template>
    <div class="main">
        <div class="top-section">
            <button></button>
            <button></button>
            <button @click="showModal = true"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    viewBox="0 0 40 40" fill="none">
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

        <div v-if="loading" class="loading-container">
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
            <p class="loading-text">{{ currentMessage }}</p>
        </div>

        <div class="image-container" :style="{ width: imageDataStore.width, height: imageDataStore.height }">
            <img :src="imageDataStore.imageData" />
        </div>
        <div class="bottom-section">
            <button @click="changeImageKorea()">한국</button>
            <button @click="changeImageJapan()">일본</button>
            <button @click="changeImageUSA()">미국</button>
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
import axios from "axios";
import FormData from "form-data";

export default {
    name: 'captureReview',
    setup() {
        const showModal = ref(false);
        const imageDataStore = useImageDataStore();
        const originalImage = ref(null);
        const originalFile = ref(null);
        const loading = ref(false);
        const currentMessageIndex = ref(0);
        const currentMessage = ref("");

        const messages = [
            "이미지 생성중...",
            "조금만 기다려 주세요...",
            "잠시 후 이미지가 완성됩니다...",
            "이미지 처리 중...",
            "곧 완료됩니다..."
        ];

        const startMessageRotation = () => {
            currentMessage.value = messages[currentMessageIndex.value];
            setInterval(() => {
                currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.length;
                currentMessage.value = messages[currentMessageIndex.value];
            }, 5500);
        };

        const API_URL = 'https://api.stability.ai/v2beta/stable-image/control/structure';
        const API_KEY = 'sk-jszl1b3O0N7pI3spaKjFRvrNom9h1mck7WfS7rvvM5akbrrB';

        console.log('API_KEY:', API_KEY);

        const transformImage = async (prompt) => {
            loading.value = true;
            startMessageRotation();
            console.log("Transforming image...", API_URL, prompt);
            try {
                const payload = {
                    image: originalFile.value,
                    prompt: prompt,
                    control_strength: 0.9,
                    output_format: "png",
                };

                const response = await axios.postForm(
                    API_URL,
                    axios.toFormData(payload, new FormData()),
                    {
                        validateStatus: undefined,
                        responseType: "arraybuffer",
                        headers: {
                            Authorization: `Bearer ${API_KEY}`,
                            Accept: "image/*",
                        },
                    }
                );

                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: "image/png" });
                    const url = URL.createObjectURL(blob);
                    imageDataStore.imageData = url;
                } else {
                    console.error(`${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error transforming image:', error);
            }
            finally {
                loading.value = false;
            }
        };

        const changeImageKorea = () => transformImage("A child in a stylized Korean webtoon drawing style, with extremely cute, exaggerated, and vibrant features. The person has very large, sparkling eyes, a small, rounded face, and an adorable expression, looking directly at the viewer. The style should be overwhelmingly adorable, with cartoonish qualities being the most prominent aspect.");
        const changeImageJapan = () => transformImage("A child in a Ghibli-style drawing, with exceptionally cute, soft, and whimsical features. The person has rounded cheeks, big, expressive eyes, and a sweet, gentle expression, looking at the viewer. The design should radiate a sense of overwhelming cuteness, with artistic, animation-like qualities being infused with a high level of sweetness.");
        const changeImageUSA = () => transformImage("A child in a Disney animation style, with extremely cute, soft, and expressive features. The person has slightly larger, more expressive eyes, a youthful, rounded face, and a charmingly cute expression, looking at the viewer. The style should strongly emphasize the classic Disney animation characteristics while making the overall look irresistibly adorable.");



        const closeModal = () => {
            showModal.value = false;
        };

        const back = () => {
            router.push('/review');
        };

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        const base64ToBlob = (base64, mime) => {
            const byteString = atob(base64);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], { type: mime });
        };

        const base64ToFile = (base64, filename) => {
            const [header, data] = base64.split(',');
            const mime = header.match(/:(.*?);/)[1];
            const blob = base64ToBlob(data, mime);
            return new File([blob], filename, { type: mime });
        };
        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);

            imageDataStore.getImageData();
            originalImage.value = imageDataStore.imageData;
            imageDataStore.getCanvasSize();

            if (originalImage.value) {
                originalFile.value = base64ToFile(originalImage.value, "image.png");
            }
        });

        return {
            back,
            showModal,
            closeModal,
            imageDataStore,
            changeImageKorea,
            changeImageJapan,
            changeImageUSA,
            loading,
            currentMessage
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

.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.progress-bar-container {
    width: 100%;
    height: 4px;
    background-color: #f3f3f3;
}

.progress-bar {
    width: 100%;
    height: 100%;
    background-color: #D50F4A;
    animation: progressAnimation 25s linear;
}

.loading-text {
    margin-top: 10px;
    font-size: 16px;
    color: #D50F4A;
}

@keyframes progressAnimation {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}
</style>